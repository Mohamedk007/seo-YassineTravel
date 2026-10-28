// Runtime content-override layer behind the /admin panel.
//
// Every editable dataset in src/data/** registers its exported object/array
// here under a stable key (e.g. 'tours.en'). The admin panel stores edits as
// JSON overrides (outside the build, see admin-server.js at the repo root);
// they are applied by mutating the registered objects *in place*, so every
// existing import — getter functions, legacy constant exports, derived
// lookups that hold references — sees the edited content without any page
// or component having to change.
//
// - Server (SSR bundle): all data modules load at import time, then
//   admin-server.js calls applyContentOverrides() with the stored overrides
//   (and again after each save). Defaults are snapshotted at registration so
//   a dataset can be reset without restarting the process.
// - Client: server.js emits window.__SITE_CONTENT__ before the app bundle
//   runs, and each data module applies its own override the moment it
//   registers — so lazy route chunks keep their code-splitting and
//   hydration sees exactly the content the server rendered.
//
// Plain relative-import-free JS on purpose: site-config.js and seo.config.js
// import this and are also loaded by plain-Node tools without a bundler.

const IMAGE_TOKEN_PREFIX = '@img:';
const IS_SERVER = typeof window === 'undefined';

const entries = new Map();
const pendingImageKeys = new Set();
let imageMap = null;
let urlToImageKey = new Map();
let activeOverrides = (!IS_SERVER && globalThis.__SITE_CONTENT__) || {};

function isPlainObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function kindOf(value) {
	if (Array.isArray(value)) return 'array';
	if (value === null) return 'null';
	return typeof value;
}

function sameContainerKind(a, b) {
	return (Array.isArray(a) && Array.isArray(b)) || (isPlainObject(a) && isPlainObject(b));
}

function deepClone(value) {
	return typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
}

// Stable identity used to keep the same object instance when an array is
// reordered/filtered, so references held elsewhere (named airport exports,
// image-meta lookups) keep pointing at the same logical entity.
function identityOf(value) {
	if (!isPlainObject(value)) return null;
	return value.id ?? value.slug ?? value.code ?? value.routeKey ?? null;
}

function syncInPlace(target, source) {
	if (Array.isArray(target)) {
		const pool = new Map();
		for (const item of target) {
			const id = identityOf(item);
			if (id != null && !pool.has(id)) pool.set(id, item);
		}
		const next = source.map((item, index) => {
			const id = identityOf(item);
			let candidate;
			if (id != null) candidate = pool.get(id);
			else if (identityOf(target[index]) == null) candidate = target[index];

			if (candidate !== undefined && sameContainerKind(candidate, item)) {
				if (id != null) pool.delete(id);
				syncInPlace(candidate, item);
				return candidate;
			}
			return item;
		});
		target.splice(0, target.length, ...next);
		return;
	}

	for (const key of Object.keys(target)) {
		if (!Object.prototype.hasOwnProperty.call(source, key)) delete target[key];
	}
	for (const [key, value] of Object.entries(source)) {
		if (sameContainerKind(target[key], value)) syncInPlace(target[key], value);
		else target[key] = value;
	}
}

function resolveImageTokens(value, onUnresolved) {
	if (typeof value === 'string') {
		if (!value.startsWith(IMAGE_TOKEN_PREFIX)) return value;
		if (!imageMap) {
			onUnresolved();
			return value;
		}
		return imageMap[value.slice(IMAGE_TOKEN_PREFIX.length)] || '';
	}
	if (Array.isArray(value)) return value.map((item) => resolveImageTokens(item, onUnresolved));
	if (isPlainObject(value)) {
		const out = {};
		for (const [key, item] of Object.entries(value)) out[key] = resolveImageTokens(item, onUnresolved);
		return out;
	}
	return value;
}

// Build-hashed asset URLs (/assets/foo-AbC123.webp) change whenever the file
// does, so they're stored as symbolic `@img:<key>` tokens instead — an
// override saved today keeps working after the next rebuild.
function tokenizeImages(value) {
	if (typeof value === 'string') {
		const key = urlToImageKey.get(value);
		return key ? `${IMAGE_TOKEN_PREFIX}${key}` : value;
	}
	if (Array.isArray(value)) return value.map(tokenizeImages);
	if (isPlainObject(value)) {
		const out = {};
		for (const [key, item] of Object.entries(value)) out[key] = tokenizeImages(item);
		return out;
	}
	return value;
}

function applyOne(key, rawValue) {
	const entry = entries.get(key);
	if (!entry) return;
	let unresolved = false;
	const value = resolveImageTokens(deepClone(rawValue), () => {
		unresolved = true;
	});
	if (unresolved) pendingImageKeys.add(key);
	syncInPlace(entry.target, value);
}

export function registerContent(key, target) {
	entries.set(key, { target, defaults: IS_SERVER ? deepClone(target) : null });
	if (Object.prototype.hasOwnProperty.call(activeOverrides, key)) applyOne(key, activeOverrides[key]);
	return target;
}

export function registerImages(map) {
	imageMap = map;
	urlToImageKey = new Map();
	for (const [key, url] of Object.entries(map)) {
		if (typeof url === 'string' && !urlToImageKey.has(url)) urlToImageKey.set(url, key);
	}
	for (const key of [...pendingImageKeys]) {
		pendingImageKeys.delete(key);
		if (Object.prototype.hasOwnProperty.call(activeOverrides, key)) applyOne(key, activeOverrides[key]);
	}
}

/** Server-side: swap the full override set (keys missing from it revert to defaults). */
export function applyContentOverrides(overrides = {}) {
	const previous = activeOverrides;
	activeOverrides = overrides || {};
	for (const [key, entry] of entries) {
		if (Object.prototype.hasOwnProperty.call(activeOverrides, key)) {
			applyOne(key, activeOverrides[key]);
		} else if (Object.prototype.hasOwnProperty.call(previous, key) && entry.defaults) {
			syncInPlace(entry.target, deepClone(entry.defaults));
		}
	}
}

export function getContentKeys() {
	return [...entries.keys()];
}

/** Built-in (code) value for a dataset, with image URLs tokenized. */
export function getContentDefaults(key) {
	const entry = entries.get(key);
	if (!entry?.defaults) return undefined;
	return tokenizeImages(deepClone(entry.defaults));
}

export function getImageLibrary() {
	return imageMap ? { ...imageMap } : {};
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateEntityArray(label, items, sample) {
	const errors = [];
	const fields = ['id', 'slug', 'code', 'routeKey'].filter((field) => sample && typeof sample[field] === 'string');
	const seen = Object.fromEntries(fields.map((field) => [field, new Set()]));

	items.forEach((item, index) => {
		if (!isPlainObject(item)) {
			errors.push(`${label}[${index}] must be an object.`);
			return;
		}
		for (const field of fields) {
			const value = item[field];
			if (typeof value !== 'string' || !value.trim()) {
				errors.push(`${label}[${index}] is missing "${field}".`);
				continue;
			}
			if (field === 'slug' && !SLUG_PATTERN.test(value)) {
				errors.push(`${label}[${index}] slug "${value}" must be lowercase letters, numbers and dashes only.`);
			}
			if (seen[field].has(value)) errors.push(`${label}: duplicate ${field} "${value}".`);
			seen[field].add(value);
		}
	});
	return errors;
}

/** Structural checks run before an override is accepted. Returns error strings. */
export function validateContentOverride(key, value) {
	const entry = entries.get(key);
	if (!entry?.defaults) return [`Unknown content key "${key}".`];
	const defaults = entry.defaults;
	const errors = [];

	if (kindOf(value) !== kindOf(defaults)) {
		return [`Expected ${kindOf(defaults)} at the top level, got ${kindOf(value)}.`];
	}

	if (Array.isArray(defaults)) {
		if (isPlainObject(defaults[0])) errors.push(...validateEntityArray(key, value, defaults[0]));
		return errors;
	}

	if (isPlainObject(defaults)) {
		for (const [field, defaultValue] of Object.entries(defaults)) {
			if (defaultValue === null || defaultValue === undefined) continue;
			if (!Object.prototype.hasOwnProperty.call(value, field)) {
				errors.push(`Missing required field "${field}".`);
				continue;
			}
			const expected = kindOf(defaultValue);
			const actual = kindOf(value[field]);
			const isContainer = (kind) => kind === 'array' || kind === 'object';
			if (expected !== actual && (isContainer(expected) || isContainer(actual))) {
				errors.push(`Field "${field}" must be ${expected}, got ${actual}.`);
			}
			if (Array.isArray(defaultValue) && isPlainObject(defaultValue[0]) && Array.isArray(value[field])) {
				errors.push(...validateEntityArray(`${key}.${field}`, value[field], defaultValue[0]));
			}
		}
	}
	return errors;
}
