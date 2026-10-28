import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { api } from './api';
import { humanize, itemLabel } from './catalog';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

export const EditorContext = createContext({ images: {}, filter: '', openPicker: () => {}, hints: null });

const IMAGE_TOKEN = '@img:';
const IMAGE_NAME_PATTERN = /(^|[^a-z])(image|images|img|photo|photos|gallery|picture|thumbnail|cover|src|ogimage|heroimage|backgroundimage)$/i;
const IMAGE_VALUE_PATTERN = /\.(?:jpe?g|png|webp|avif|gif)(?:\?.*)?$/i;
const LONG_TEXT_NAME_PATTERN = /(description|summary|body|content|text|answer|intro|excerpt|paragraph|details|note|story|bio|quote|message|tagline|lead)$/i;

export const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isContainer = (value) => Array.isArray(value) || isPlainObject(value);

export function isImageName(name) {
	return typeof name === 'string' && IMAGE_NAME_PATTERN.test(name);
}

export function looksLikeImage(value) {
	return typeof value === 'string' && (value.startsWith(IMAGE_TOKEN) || value.startsWith('/uploads/') || IMAGE_VALUE_PATTERN.test(value));
}

export function resolveImageUrl(value, images) {
	if (typeof value !== 'string' || !value) return '';
	if (value.startsWith(IMAGE_TOKEN)) return images[value.slice(IMAGE_TOKEN.length)] || '';
	return value;
}

function subtreeMatches(value, path, query) {
	if (!query) return true;
	if (path.toLowerCase().includes(query)) return true;
	if (typeof value === 'string') return value.toLowerCase().includes(query);
	if (typeof value === 'number' || typeof value === 'boolean') return String(value).toLowerCase().includes(query);
	if (Array.isArray(value)) return value.some((item, index) => subtreeMatches(item, `${path}.${index}`, query));
	if (isPlainObject(value)) return Object.entries(value).some(([key, item]) => subtreeMatches(item, `${path}.${key}`, query));
	return false;
}

/** A blank value with the same shape as `sample` (used for "Add item"). */
export function blankLike(sample) {
	if (typeof sample === 'string') return '';
	if (typeof sample === 'number') return 0;
	if (typeof sample === 'boolean') return false;
	if (Array.isArray(sample)) return [];
	if (isPlainObject(sample)) return Object.fromEntries(Object.entries(sample).map(([key, value]) => [key, blankLike(value)]));
	return null;
}

/** "3.content.0.heading" -> "*.content.*.heading" (the key format of catalog field hints). */
function hintPath(path) {
	return String(path)
		.split('.')
		.filter(Boolean)
		.map((segment) => (/^\d+$/.test(segment) ? '*' : segment))
		.join('.');
}

function useHint(path) {
	const { hints } = useContext(EditorContext);
	return hints?.[hintPath(path)] || null;
}

/** Object keys in hint order, plus hinted optional fields (with a default) the object doesn't have yet. */
function orderedKeys(value, hints, path) {
	const own = Object.keys(value);
	if (!hints) return own;
	const prefix = path ? `${hintPath(path)}.` : '';
	const hinted = [];
	for (const [pattern, hint] of Object.entries(hints)) {
		if (!pattern.startsWith(prefix)) continue;
		const key = pattern.slice(prefix.length);
		if (!key || key === '*' || key.includes('.')) continue;
		if (own.includes(key) || hint.default !== undefined) hinted.push(key);
	}
	return [...hinted, ...own.filter((key) => !hinted.includes(key))];
}

function moveItem(list, from, to) {
	if (to < 0 || to >= list.length) return list;
	const next = [...list];
	const [item] = next.splice(from, 1);
	next.splice(to, 0, item);
	return next;
}

function uniqueSuffix() {
	return Math.random().toString(36).slice(2, 6);
}

/** New entity for an id/slug-keyed list: blank shape, with fresh identifiers. */
function newEntity(sample, source) {
	const base = source ? structuredClone(source) : blankLike(sample);
	if (!isPlainObject(base)) return base;
	const suffix = uniqueSuffix();
	const shape = source || sample;
	if (typeof shape?.id === 'string') base.id = source ? `${source.id}-copy-${suffix}` : `new-${suffix}`;
	if (typeof shape?.slug === 'string') base.slug = source ? `${source.slug}-copy-${suffix}` : `new-item-${suffix}`;
	if (typeof shape?.code === 'string' && !source) base.code = `NEW${suffix.toUpperCase()}`;
	if (typeof shape?.title === 'string' && source) base.title = `${source.title} (copy)`;
	return base;
}

// ---------------------------------------------------------------------------
// Primitive fields
// ---------------------------------------------------------------------------

function StringField({ name, value, onChange, forceMultiline = false }) {
	const multiline = forceMultiline || value.length > 90 || value.includes('\n') || LONG_TEXT_NAME_PATTERN.test(String(name));
	if (!multiline) {
		return <input className="adm-input" type="text" value={value} onChange={(event) => onChange(event.target.value)} />;
	}
	const rows = Math.min(14, Math.max(2, value.split('\n').length + Math.floor(value.length / 100)));
	return <textarea className="adm-input adm-textarea" rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />;
}

function SelectField({ value, onChange, options }) {
	const known = options.some((option) => option.value === value);
	return (
		<select className="adm-input adm-input-number" value={value} onChange={(event) => onChange(event.target.value)}>
			{known ? null : <option value={value}>{value || '(empty)'}</option>}
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}

// Same syntax as src/components/site/RichText.jsx, which renders it on the site.
const INLINE_LINK_PATTERN = /\[([^\]\n]+)\]\(\s*([^\s()]+)(?:\s+"([a-z ]+)")?\s*\)/gi;
const LINK_URL_PATTERN = /^(?:https?:\/\/[^\s/]+\.[^\s]+|mailto:\S+|tel:\S+|\/(?!\/)\S*|#\S*)$/i;

/** Text with inline [anchor](url) links and **bold**, plus helpers to insert them. */
function RichTextField({ value, onChange }) {
	const textarea = useRef(null);
	const [linkForm, setLinkForm] = useState(null);

	const selection = () => {
		const el = textarea.current;
		return el ? [el.selectionStart, el.selectionEnd] : [value.length, value.length];
	};
	const insert = (start, end, text) => {
		onChange(value.slice(0, start) + text + value.slice(end));
		requestAnimationFrame(() => {
			const el = textarea.current;
			if (!el) return;
			el.focus();
			el.setSelectionRange(start + text.length, start + text.length);
		});
	};
	const bold = () => {
		const [start, end] = selection();
		insert(start, end, `**${value.slice(start, end) || 'bold text'}**`);
	};
	const openLinkForm = () => {
		const [start, end] = selection();
		setLinkForm({ start, end, text: value.slice(start, end), url: '', nofollow: false, error: '' });
	};
	const submitLink = () => {
		const text = linkForm.text.replace(/[[\]\n]+/g, ' ').trim();
		const url = linkForm.url.trim().replace(/\s/g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
		if (!text) return setLinkForm({ ...linkForm, error: 'Enter the anchor text (the clickable words).' });
		if (!LINK_URL_PATTERN.test(url)) {
			return setLinkForm({ ...linkForm, error: 'Use a site path starting with "/" (e.g. /tour/marrakech-merzouga-desert) or a full https:// address.' });
		}
		insert(linkForm.start, linkForm.end, `[${text}](${url}${linkForm.nofollow ? ' "nofollow"' : ''})`);
		setLinkForm(null);
	};
	const onFormKey = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			submitLink();
		} else if (event.key === 'Escape') {
			setLinkForm(null);
		}
	};

	const links = [...value.matchAll(INLINE_LINK_PATTERN)];
	const rows = Math.min(14, Math.max(3, value.split('\n').length + Math.floor(value.length / 100)));

	return (
		<div className="adm-rich">
			<div className="adm-rich-toolbar">
				<button type="button" className="adm-btn adm-btn-small" onClick={bold} title="Wrap the selected words in **bold**">
					<strong>B</strong> Bold
				</button>
				<button type="button" className="adm-btn adm-btn-small" onClick={openLinkForm} title="Select the anchor words first, then click">
					Insert link
				</button>
			</div>
			<textarea ref={textarea} className="adm-input adm-textarea" rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
			{linkForm ? (
				<div className="adm-linkform" onKeyDown={onFormKey}>
					<label>
						<span className="adm-label">Anchor text</span>
						<input className="adm-input" type="text" value={linkForm.text} onChange={(event) => setLinkForm({ ...linkForm, text: event.target.value, error: '' })} />
					</label>
					<label>
						<span className="adm-label">URL</span>
						<input
							className="adm-input"
							type="text"
							autoFocus
							placeholder="/tour/marrakech-merzouga-desert or https://..."
							value={linkForm.url}
							onChange={(event) => setLinkForm({ ...linkForm, url: event.target.value, error: '' })}
						/>
					</label>
					<label className="adm-switch">
						<input type="checkbox" checked={linkForm.nofollow} onChange={(event) => setLinkForm({ ...linkForm, nofollow: event.target.checked })} />
						<span>nofollow (leave unticked for a normal do-follow link)</span>
					</label>
					{linkForm.error ? <p className="adm-field-error">{linkForm.error}</p> : null}
					<div className="adm-row">
						<button type="button" className="adm-btn adm-btn-small adm-btn-primary" onClick={submitLink}>
							Insert link
						</button>
						<button type="button" className="adm-btn adm-btn-small adm-btn-ghost" onClick={() => setLinkForm(null)}>
							Cancel
						</button>
					</div>
				</div>
			) : null}
			{links.length ? (
				<ul className="adm-rich-links">
					{links.map((match) => {
						const nofollow = /nofollow|sponsored|ugc/i.test(match[3] || '');
						return (
							<li key={match.index}>
								<span className={`adm-rel ${nofollow ? 'is-nofollow' : ''}`}>{nofollow ? match[3].trim() : 'do-follow'}</span>
								<strong>{match[1]}</strong> <span className="adm-muted">{'\u2192'}</span> <code>{match[2]}</code>
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
}

function NumberField({ value, onChange }) {
	return (
		<input
			className="adm-input adm-input-number"
			type="number"
			step="any"
			value={Number.isFinite(value) ? value : ''}
			onChange={(event) => {
				const next = event.target.valueAsNumber;
				onChange(Number.isNaN(next) ? 0 : next);
			}}
		/>
	);
}

function BooleanField({ value, onChange }) {
	return (
		<label className="adm-switch">
			<input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
			<span>{value ? 'Yes' : 'No'}</span>
		</label>
	);
}

export function ImageField({ value, onChange }) {
	const { images, openPicker } = useContext(EditorContext);
	const url = resolveImageUrl(value, images);
	return (
		<div className="adm-image-field">
			<button type="button" className="adm-thumb" onClick={() => openPicker(value, onChange)} title="Choose image">
				{url ? <img src={url} alt="" loading="lazy" /> : <span>No image</span>}
			</button>
			<div className="adm-image-meta">
				<input className="adm-input" type="text" value={value || ''} onChange={(event) => onChange(event.target.value)} />
				<div className="adm-row">
					<button type="button" className="adm-btn adm-btn-small" onClick={() => openPicker(value, onChange)}>
						Choose / upload
					</button>
					{value ? (
						<button type="button" className="adm-btn adm-btn-small adm-btn-ghost" onClick={() => onChange('')}>
							Clear
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Recursive field editor
// ---------------------------------------------------------------------------

export function FieldEditor({ name, value, onChange, path = '', depth = 0, imageHint = false, forceShow = false }) {
	const { filter } = useContext(EditorContext);
	const hint = useHint(path);
	if (!forceShow && filter && !subtreeMatches(value, path, filter)) return null;
	const showAll = forceShow || (filter && path.toLowerCase().includes(filter));

	let control;
	if (typeof value === 'string') {
		if (hint?.readOnly) {
			const shown = hint.options?.find((option) => option.value === value)?.label ?? value;
			control = <input className="adm-input" type="text" value={shown} readOnly disabled />;
		} else if (hint?.options) {
			control = <SelectField value={value} onChange={onChange} options={hint.options} />;
		} else if (hint?.type === 'date' && /^(?:\d{4}-\d{2}-\d{2})?$/.test(value)) {
			control = <input className="adm-input adm-input-number" type="date" value={value} onChange={(event) => onChange(event.target.value)} />;
		} else if (hint?.image || imageHint || isImageName(name) || looksLikeImage(value)) {
			control = <ImageField value={value} onChange={onChange} />;
		} else if (hint?.rich) {
			control = <RichTextField value={value} onChange={onChange} />;
		} else {
			control = <StringField name={name} value={value} onChange={onChange} forceMultiline={Boolean(hint?.multiline)} />;
		}
	} else if (typeof value === 'number') {
		control = <NumberField value={value} onChange={onChange} />;
	} else if (typeof value === 'boolean') {
		control = <BooleanField value={value} onChange={onChange} />;
	} else if (value === null || value === undefined) {
		control = (
			<div className="adm-row">
				<span className="adm-muted">Empty</span>
				<button type="button" className="adm-btn adm-btn-small" onClick={() => onChange('')}>
					Set text
				</button>
			</div>
		);
	} else if (Array.isArray(value)) {
		return <ArrayField name={name} value={value} onChange={onChange} path={path} depth={depth} forceShow={showAll} />;
	} else {
		return <ObjectField name={name} value={value} onChange={onChange} path={path} depth={depth} forceShow={showAll} />;
	}

	const maxLength = typeof value === 'string' ? hint?.maxLength : undefined;
	return (
		<div className="adm-field">
			<div className="adm-label-row">
				<label className="adm-label" title={path}>
					{hint?.label ?? humanize(name)}
				</label>
				{maxLength ? (
					<span className={`adm-counter ${value.length > maxLength ? 'is-over' : ''}`}>
						{value.length}/{maxLength}
					</span>
				) : null}
			</div>
			{control}
			{hint?.help ? <p className="adm-field-help">{hint.help}</p> : null}
		</div>
	);
}

function ObjectFields({ value, onChange, path, depth, forceShow }) {
	const { hints } = useContext(EditorContext);
	return orderedKeys(value, hints, path).map((key) => {
		const childPath = path ? `${path}.${key}` : key;
		const present = Object.prototype.hasOwnProperty.call(value, key);
		return (
			<FieldEditor
				key={key}
				name={key}
				value={present ? value[key] : structuredClone(hints[hintPath(childPath)].default)}
				path={childPath}
				depth={depth + 1}
				forceShow={forceShow}
				onChange={(next) => onChange({ ...value, [key]: next })}
			/>
		);
	});
}

function ObjectField({ name, value, onChange, path, depth, forceShow }) {
	const { filter } = useContext(EditorContext);
	const hint = useHint(path);
	const [open, setOpen] = useState(depth < 2);
	const expanded = open || Boolean(filter);
	return (
		<fieldset className={`adm-group adm-depth-${Math.min(depth, 4)}`}>
			<legend>
				<button type="button" className="adm-collapse" onClick={() => setOpen(!open)} aria-expanded={expanded}>
					<span className="adm-caret">{expanded ? '\u25BE' : '\u25B8'}</span> {hint?.label ?? humanize(name)}
				</button>
			</legend>
			{hint?.help && expanded ? <p className="adm-field-help">{hint.help}</p> : null}
			{expanded ? <ObjectFields value={value} onChange={onChange} path={path} depth={depth} forceShow={forceShow} /> : null}
		</fieldset>
	);
}

function ArrayField({ name, value, onChange, path, depth, forceShow }) {
	const { filter } = useContext(EditorContext);
	const hint = useHint(path);
	const [open, setOpen] = useState(depth < 2);
	const expanded = open || Boolean(filter);
	const imageList = isImageName(name) || value.some(looksLikeImage);
	const sample = value[0];
	const label = hint?.label ?? humanize(name);

	const update = (index, next) => onChange(value.map((item, i) => (i === index ? next : item)));
	const remove = (index) => onChange(value.filter((_, i) => i !== index));
	const add = () => {
		if (hint && hint.item !== undefined) {
			onChange([...value, structuredClone(hint.item)]);
			return;
		}
		if (sample === undefined) {
			onChange([...value, '']);
			return;
		}
		onChange([...value, isPlainObject(sample) ? newEntity(sample) : blankLike(sample)]);
	};

	return (
		<fieldset className={`adm-group adm-depth-${Math.min(depth, 4)}`}>
			<legend>
				<button type="button" className="adm-collapse" onClick={() => setOpen(!open)} aria-expanded={expanded}>
					<span className="adm-caret">{expanded ? '\u25BE' : '\u25B8'}</span> {label} <span className="adm-count">{value.length}</span>
				</button>
			</legend>
			{hint?.help && expanded ? <p className="adm-field-help">{hint.help}</p> : null}
			{expanded ? (
				<div className="adm-array">
					{value.map((item, index) => {
						const itemPath = `${path}.${index}`;
						if (!forceShow && filter && !subtreeMatches(item, itemPath, filter)) return null;
						return (
							<div className="adm-array-item" key={index}>
								<div className="adm-array-head">
									<span className="adm-array-title">{isContainer(item) ? itemLabel(item, index) : `#${index + 1}`}</span>
									<div className="adm-row">
										<button type="button" className="adm-icon-btn" title="Move up" disabled={index === 0} onClick={() => onChange(moveItem(value, index, index - 1))}>
											{'\u2191'}
										</button>
										<button
											type="button"
											className="adm-icon-btn"
											title="Move down"
											disabled={index === value.length - 1}
											onClick={() => onChange(moveItem(value, index, index + 1))}
										>
											{'\u2193'}
										</button>
										<button type="button" className="adm-icon-btn adm-danger" title="Remove" onClick={() => remove(index)}>
											{'\u2715'}
										</button>
									</div>
								</div>
								{isContainer(item) ? (
									isPlainObject(item) ? (
										<ObjectFields value={item} onChange={(next) => update(index, next)} path={itemPath} depth={depth + 1} forceShow={forceShow} />
									) : (
										<FieldEditor name={`${humanize(name)} ${index + 1}`} value={item} onChange={(next) => update(index, next)} path={itemPath} depth={depth + 1} forceShow={forceShow} />
									)
								) : typeof item === 'string' && (imageList || looksLikeImage(item)) ? (
									<ImageField value={item} onChange={(next) => update(index, next)} />
								) : (
									<FieldEditor name="" value={item} onChange={(next) => update(index, next)} path={itemPath} depth={depth + 1} forceShow />
								)}
							</div>
						);
					})}
					<button type="button" className="adm-btn adm-btn-small" onClick={add}>
						+ Add {hint?.itemName || label.toLowerCase() || 'item'}
					</button>
				</div>
			) : null}
		</fieldset>
	);
}

// ---------------------------------------------------------------------------
// Two-pane editors for big collections
// ---------------------------------------------------------------------------

function useSearch(list, getText) {
	const [query, setQuery] = useState('');
	const matches = useMemo(() => {
		const q = query.trim().toLowerCase();
		return list.map((entry, index) => ({ entry, index })).filter(({ entry }) => !q || getText(entry).toLowerCase().includes(q));
	}, [list, query, getText]);
	return [query, setQuery, matches];
}

/** Arrays of entities (tours, posts, airports...): list on the left, form on the right. */
export function EntityListEditor({ items, onChange, previewFor, label = 'item', template, itemTypes, itemTitle }) {
	const [selected, setSelected] = useState(0);
	const [newType, setNewType] = useState(itemTypes?.[0]?.value ?? '');
	const getText = useCallback((item) => JSON.stringify(item), []);
	const [query, setQuery, matches] = useSearch(items, getText);
	const { images } = useContext(EditorContext);
	const sample = items[0];
	const current = items[selected];
	const titleOf = (item, index) => {
		const title = itemTitle ? itemTitle(item, index) : itemLabel(item, index);
		return isPlainObject(item) && item.hidden === true ? `${title} (hidden)` : title;
	};

	useEffect(() => {
		if (selected >= items.length) setSelected(Math.max(0, items.length - 1));
	}, [items.length, selected]);

	const select = (index) => setSelected(index);
	const replace = (index, next) => onChange(items.map((item, i) => (i === index ? next : item)));
	const add = () => {
		onChange([...items, template ? template() : newEntity(sample)]);
		setSelected(items.length);
	};
	// Typed lists (page parts): the new part goes right after the selected one.
	const addTyped = () => {
		const type = itemTypes.find((entry) => entry.value === newType);
		if (!type) return;
		const at = current === undefined ? items.length : selected + 1;
		const next = [...items];
		next.splice(at, 0, type.create());
		onChange(next);
		setSelected(at);
	};
	const duplicate = () => {
		if (!current) return;
		const next = [...items];
		next.splice(selected + 1, 0, newEntity(sample, current));
		onChange(next);
		setSelected(selected + 1);
	};
	const remove = () => {
		if (!current) return;
		const warning = previewFor ? ' Its page will stop existing once you save.' : '';
		if (!window.confirm(`Delete "${titleOf(current, selected)}"?${warning}`)) return;
		onChange(items.filter((_, i) => i !== selected));
	};
	const move = (delta) => {
		const target = selected + delta;
		if (target < 0 || target >= items.length) return;
		onChange(moveItem(items, selected, target));
		setSelected(target);
	};

	const thumbOf = (item) => {
		if (!isPlainObject(item)) return '';
		const candidate = item.image ?? item.heroImage ?? item.cover ?? (Array.isArray(item.gallery) ? item.gallery[0] : undefined);
		return resolveImageUrl(typeof candidate === 'string' ? candidate : candidate?.src, images);
	};

	const preview = current && previewFor ? previewFor(current) : null;

	return (
		<div className="adm-split">
			<aside className="adm-split-list">
				<input className="adm-input" type="search" placeholder={`Search ${items.length} ${label}s...`} value={query} onChange={(event) => setQuery(event.target.value)} />
				<ul>
					{matches.map(({ entry, index }) => {
						const thumb = thumbOf(entry);
						return (
							<li key={index}>
								<button type="button" className={`${index === selected ? 'is-active' : ''} ${entry?.hidden === true ? 'is-hidden' : ''}`} onClick={() => select(index)}>
									{thumb ? <img src={thumb} alt="" loading="lazy" /> : <span className="adm-list-index">{index + 1}</span>}
									<span>{titleOf(entry, index)}</span>
								</button>
							</li>
						);
					})}
				</ul>
				{itemTypes?.length ? (
					<div className="adm-add-typed">
						<select className="adm-input" value={newType} onChange={(event) => setNewType(event.target.value)} aria-label={`Type of new ${label}`}>
							{itemTypes.map((type) => (
								<option key={type.value} value={type.value}>
									{type.label}
								</option>
							))}
						</select>
						<button type="button" className="adm-btn adm-btn-primary adm-btn-block" onClick={addTyped}>
							+ Add {label}
						</button>
					</div>
				) : (
					<button type="button" className="adm-btn adm-btn-primary adm-btn-block" onClick={add}>
						+ New {label}
					</button>
				)}
			</aside>
			<section className="adm-split-main">
				{current === undefined ? (
					<p className="adm-muted">Nothing here yet. Click "{itemTypes?.length ? 'Add' : 'New'} {label}".</p>
				) : (
					<>
						<div className="adm-toolbar adm-toolbar-sub">
							<strong className="adm-ellipsis">{titleOf(current, selected)}</strong>
							<div className="adm-row">
								{preview ? (
									<a className="adm-btn adm-btn-small adm-btn-ghost" href={preview} target="_blank" rel="noreferrer">
										View live page
									</a>
								) : null}
								<button type="button" className="adm-btn adm-btn-small" onClick={() => move(-1)} disabled={selected === 0}>
									{'\u2191'} Up
								</button>
								<button type="button" className="adm-btn adm-btn-small" onClick={() => move(1)} disabled={selected === items.length - 1}>
									{'\u2193'} Down
								</button>
								<button type="button" className="adm-btn adm-btn-small" onClick={duplicate}>
									Duplicate
								</button>
								<button type="button" className="adm-btn adm-btn-small adm-btn-danger" onClick={remove}>
									Delete
								</button>
							</div>
						</div>
						{isPlainObject(current) ? (
							<ObjectFields key={selected} value={current} onChange={(next) => replace(selected, next)} path={`${selected}`} depth={0} forceShow={false} />
						) : (
							<FieldEditor key={selected} name={label} value={current} onChange={(next) => replace(selected, next)} path={`${selected}`} />
						)}
					</>
				)}
			</section>
		</div>
	);
}

/** Objects with many sub-objects (image metadata, big dictionaries). */
function KeyedListEditor({ value, onChange }) {
	const { images } = useContext(EditorContext);
	const keys = useMemo(() => Object.keys(value), [value]);
	const [selected, setSelected] = useState(keys[0]);
	const getText = useCallback((key) => `${key} ${JSON.stringify(value[key])}`, [value]);
	const [query, setQuery, matches] = useSearch(keys, getText);
	const current = selected !== undefined && Object.prototype.hasOwnProperty.call(value, selected) ? selected : keys[0];

	return (
		<div className="adm-split">
			<aside className="adm-split-list">
				<input className="adm-input" type="search" placeholder={`Search ${keys.length} entries...`} value={query} onChange={(event) => setQuery(event.target.value)} />
				<ul>
					{matches.map(({ entry: key }) => (
						<li key={key}>
							<button type="button" className={key === current ? 'is-active' : ''} onClick={() => setSelected(key)}>
								{images[key] ? <img src={images[key]} alt="" loading="lazy" /> : null}
								<span>{humanize(key)}</span>
							</button>
						</li>
					))}
				</ul>
			</aside>
			<section className="adm-split-main">
				{current !== undefined ? (
					<>
						{images[current] ? <img className="adm-preview-image" src={images[current]} alt="" /> : null}
						<FieldEditor key={current} name={current} value={value[current]} path={current} onChange={(next) => onChange({ ...value, [current]: next })} />
					</>
				) : null}
			</section>
		</div>
	);
}

/** Picks the best top-level layout for a whole dataset. */
export function DatasetEditor({ value, onChange, previewFor, entityLabel, newItem, itemTypes, itemTitle }) {
	const [tab, setTab] = useState(null);

	if (Array.isArray(value)) {
		if (value.length === 0 || isPlainObject(value[0])) {
			return (
				<EntityListEditor
					items={value}
					onChange={onChange}
					previewFor={previewFor}
					label={entityLabel}
					template={newItem}
					itemTypes={itemTypes}
					itemTitle={itemTitle}
				/>
			);
		}
		return <FieldEditor name="items" value={value} onChange={onChange} path="" />;
	}
	if (!isPlainObject(value)) return <FieldEditor name="value" value={value} onChange={onChange} path="" />;

	const entries = Object.entries(value);
	const containerKeys = entries.filter(([, item]) => isContainer(item)).map(([key]) => key);
	const primitiveKeys = entries.filter(([, item]) => !isContainer(item)).map(([key]) => key);

	if (containerKeys.length > 10) return <KeyedListEditor value={value} onChange={onChange} />;

	if (containerKeys.length === 0 || entries.length === 1) {
		return (
			<div className="adm-form">
				<ObjectFields value={value} onChange={onChange} path="" depth={0} forceShow={false} />
			</div>
		);
	}

	const tabs = [...(primitiveKeys.length ? ['__general'] : []), ...containerKeys];
	const activeTab = tabs.includes(tab) ? tab : tabs[0];
	const activeValue = value[activeTab];

	return (
		<div>
			<nav className="adm-tabs">
				{tabs.map((key) => (
					<button type="button" key={key} className={key === activeTab ? 'is-active' : ''} onClick={() => setTab(key)}>
						{key === '__general' ? 'General' : humanize(key)}
					</button>
				))}
			</nav>
			<div className="adm-form">
				{activeTab === '__general' ? (
					primitiveKeys.map((key) => (
						<FieldEditor key={key} name={key} value={value[key]} path={key} onChange={(next) => onChange({ ...value, [key]: next })} />
					))
				) : Array.isArray(activeValue) && (activeValue.length === 0 || isPlainObject(activeValue[0])) ? (
					<EntityListEditor key={activeTab} items={activeValue} onChange={(next) => onChange({ ...value, [activeTab]: next })} label={humanize(activeTab).toLowerCase()} />
				) : isPlainObject(activeValue) ? (
					<ObjectFields key={activeTab} value={activeValue} onChange={(next) => onChange({ ...value, [activeTab]: next })} path={activeTab} depth={0} forceShow={false} />
				) : (
					<FieldEditor key={activeTab} name={activeTab} value={activeValue} path={activeTab} onChange={(next) => onChange({ ...value, [activeTab]: next })} />
				)}
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Image picker (site images + uploads)
// ---------------------------------------------------------------------------

export function ImagePicker({ current, onSelect, onClose }) {
	const { images } = useContext(EditorContext);
	const [tab, setTab] = useState(current?.startsWith?.('/uploads/') ? 'uploads' : 'site');
	const [query, setQuery] = useState('');
	const [uploads, setUploads] = useState(null);
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);
	const fileInput = useRef(null);

	const loadUploads = useCallback(() => {
		api
			.listMedia()
			.then((data) => setUploads(data.files))
			.catch((err) => setError(err.message));
	}, []);

	useEffect(() => {
		loadUploads();
	}, [loadUploads]);

	useEffect(() => {
		const onKey = (event) => {
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);

	const upload = async (event) => {
		const files = [...(event.target.files || [])];
		event.target.value = '';
		if (!files.length) return;
		setBusy(true);
		setError('');
		try {
			let last = null;
			for (const file of files) last = await api.uploadMedia(file);
			loadUploads();
			setTab('uploads');
			if (files.length === 1 && last) onSelect(last.url);
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	};

	const q = query.trim().toLowerCase();
	const siteImages = Object.entries(images).filter(([key]) => !q || key.toLowerCase().includes(q));
	const uploadList = (uploads || []).filter((file) => !q || file.name.includes(q));

	return (
		<div className="adm-modal-backdrop" onClick={onClose}>
			<div className="adm-modal" role="dialog" aria-modal="true" aria-label="Choose image" onClick={(event) => event.stopPropagation()}>
				<header className="adm-modal-head">
					<nav className="adm-tabs">
						<button type="button" className={tab === 'site' ? 'is-active' : ''} onClick={() => setTab('site')}>
							Site images ({Object.keys(images).length})
						</button>
						<button type="button" className={tab === 'uploads' ? 'is-active' : ''} onClick={() => setTab('uploads')}>
							Uploaded ({uploads ? uploads.length : '...'})
						</button>
					</nav>
					<div className="adm-row">
						<input className="adm-input" type="search" placeholder="Search..." value={query} onChange={(event) => setQuery(event.target.value)} />
						<button type="button" className="adm-btn adm-btn-primary" disabled={busy} onClick={() => fileInput.current?.click()}>
							{busy ? 'Uploading...' : 'Upload new'}
						</button>
						<input ref={fileInput} type="file" accept="image/jpeg,image/png,image/gif,image/webp,image/avif" multiple hidden onChange={upload} />
						<button type="button" className="adm-btn adm-btn-ghost" onClick={onClose}>
							Close
						</button>
					</div>
				</header>
				{error ? <p className="adm-alert adm-alert-error">{error}</p> : null}
				<div className="adm-image-grid">
					{tab === 'site'
						? siteImages.map(([key, url]) => {
								const token = `${IMAGE_TOKEN}${key}`;
								return (
									<button type="button" key={key} className={current === token ? 'is-active' : ''} onClick={() => onSelect(token)}>
										<img src={url} alt="" loading="lazy" />
										<span>{key}</span>
									</button>
								);
							})
						: uploadList.map((file) => (
								<button type="button" key={file.name} className={current === file.url ? 'is-active' : ''} onClick={() => onSelect(file.url)}>
									<img src={file.url} alt="" loading="lazy" />
									<span>{file.name}</span>
								</button>
							))}
					{tab === 'uploads' && uploads && uploads.length === 0 ? <p className="adm-muted">No uploads yet. Use "Upload new".</p> : null}
				</div>
			</div>
		</div>
	);
}
