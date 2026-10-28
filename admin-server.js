// Admin panel backend: authentication, content overrides, media uploads,
// backups and dynamic sitemaps. Mounted by server.js via mountAdmin().
//
// Edits are stored as JSON overrides in CONTENT_DIR (default: ./content),
// outside dist/, so they survive rebuilds/redeploys as long as that folder is
// kept. Every save is validated and then test-rendered (every page, every
// language) through the SSR bundle before it is accepted; a change that
// breaks any page is rolled back and reported instead of going live.
//
// Required env: ADMIN_PASSWORD (12+ chars). Optional: ADMIN_USER (default
// "admin"), ADMIN_SESSION_SECRET, CONTENT_DIR, ADMIN_GIT_PUSH=off (hides the
// "Push to repo" button). The button pushes overrides.json + uploads/ either
// through the GitHub API (when GITHUB_TOKEN + GITHUB_REPO are set, see below)
// or with the git CLI when the app folder is a git clone with credentials.

import express from "express";
import { execFile } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import sanitizeHtml from "sanitize-html";

const SESSION_COOKIE = "yt_admin";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILURES = 8;
const MAX_BACKUPS = 30;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const RELOAD_THROTTLE_MS = 1500;
const UPLOAD_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|png|gif|webp|avif)$/;
const BACKUP_NAME_PATTERN = /^overrides-[A-Za-z0-9-]+\.json$/;
const UNSAFE_URL_PATTERN = /^\s*(?:javascript|vbscript)\s*:|^\s*data\s*:\s*text\/html/i;
const GIT_TIMEOUT_MS = 90 * 1000;
const COMMIT_MESSAGE_MAX = 200;

const execFileAsync = promisify(execFile);

// No shell: arguments are passed as-is, so user text can't inject commands.
async function git(args, cwd) {
  const { stdout } = await execFileAsync("git", args, {
    cwd,
    timeout: GIT_TIMEOUT_MS,
    windowsHide: true,
    maxBuffer: 1024 * 1024,
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  });
  return stdout.trim();
}

// Git output can echo remote URLs; never send embedded credentials to the browser.
function gitErrorMessage(error) {
  const text = String(error?.stderr || error?.message || error)
    .replace(/(\w+:\/\/)[^@/\s]+@/g, "$1***@")
    .trim();
  return text.split("\n").slice(-6).join("\n").slice(0, 800);
}

// Which overridden datasets make a statically generated sitemap stale.
const SITEMAP_DEPENDENCIES = {
  "sitemap-pages.xml": ["airports"],
  "sitemap-tours.xml": ["tours.en", "tours.fr"],
  "sitemap-destinations.xml": ["destinations.en", "destinations.fr"],
  "sitemap-blog.xml": ["blog.en", "blog.fr"],
};

const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest();
}

function safeEqual(a, b) {
  return crypto.timingSafeEqual(sha256(String(a)), sha256(String(b)));
}

function parseCookies(header = "") {
  const cookies = {};
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    const name = part.slice(0, index).trim();
    if (!name) continue;
    try {
      cookies[name] = decodeURIComponent(part.slice(index + 1).trim());
    } catch {
      // ignore malformed cookie values
    }
  }
  return cookies;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// JSON embedded in a JS file: escape characters that could terminate a
// surrounding <script> or are invalid in older JS string literals.
function toScriptJson(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function sanitizeBaseName(name) {
  const base = String(name || "")
    .replace(/\.[^.]*$/, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return base || "image";
}

function detectImageType(buffer) {
  if (!buffer || buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "jpg";
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  const head6 = buffer.subarray(0, 6).toString("ascii");
  if (head6 === "GIF87a" || head6 === "GIF89a") return "gif";
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  if (buffer.subarray(4, 8).toString("ascii") === "ftyp") {
    const brand = buffer.subarray(8, 12).toString("ascii");
    if (brand === "avif" || brand === "avis") return "avif";
  }
  return null;
}

function findUnsafeUrls(value, pathLabel = "", out = []) {
  if (out.length >= 5) return out;
  if (typeof value === "string") {
    if (UNSAFE_URL_PATTERN.test(value)) out.push(`${pathLabel || "value"} contains a disallowed script URL.`);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => findUnsafeUrls(item, `${pathLabel}[${index}]`, out));
  } else if (isPlainObject(value)) {
    for (const [key, item] of Object.entries(value)) findUnsafeUrls(item, pathLabel ? `${pathLabel}.${key}` : key, out);
  }
  return out;
}

// Custom HTML blocks (any field named "html") are rendered raw on the public
// site, so they are reduced to an allowlist: no scripts, event handlers,
// forms or script URLs; iframes only from well-known embed providers.
const HTML_EMBED_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "www.google.com",
  "maps.google.com",
  "www.tripadvisor.com",
  "www.tripadvisor.fr",
  "www.instagram.com",
  "www.facebook.com",
  "open.spotify.com",
];

const HTML_SANITIZE_OPTIONS = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "picture",
    "source",
    "video",
    "audio",
    "iframe",
    "details",
    "summary",
    "mark",
    "small",
    "sub",
    "sup",
    "u",
    "s",
  ],
  allowedAttributes: {
    "*": ["class", "style", "title", "dir", "lang"],
    a: ["href", "target", "rel"],
    img: ["src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding"],
    source: ["src", "srcset", "sizes", "type", "media"],
    video: ["src", "poster", "controls", "width", "height", "preload", "muted", "loop", "playsinline"],
    audio: ["src", "controls", "preload"],
    iframe: ["src", "width", "height", "allow", "allowfullscreen", "loading", "referrerpolicy"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan", "scope"],
    ol: ["start", "type"],
    details: ["open"],
  },
  allowedSchemes: ["https", "http", "mailto", "tel"],
  allowedSchemesAppliedToAttributes: ["href", "src", "srcset", "poster", "cite"],
  allowProtocolRelative: false,
  allowedIframeHostnames: HTML_EMBED_HOSTS,
  allowIframeRelativeUrls: false,
  // Drop iframes whose src was rejected instead of leaving an empty frame.
  exclusiveFilter: (frame) => frame.tag === "iframe" && !frame.attribs.src,
  transformTags: {
    a: (tagName, attribs) => {
      if (attribs.target !== "_blank") return { tagName, attribs };
      const rel = new Set(String(attribs.rel || "").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      return { tagName, attribs: { ...attribs, rel: [...rel].join(" ") } };
    },
    iframe: (tagName, attribs) => ({ tagName, attribs: { loading: "lazy", ...attribs } }),
  },
};

function cleanHtml(html) {
  return sanitizeHtml(html, HTML_SANITIZE_OPTIONS).trim();
}

// Returns a copy of `value` with every string field named "html" sanitized.
function sanitizeHtmlFields(value, state = { changed: false }) {
  if (Array.isArray(value)) return value.map((item) => sanitizeHtmlFields(item, state));
  if (!isPlainObject(value)) return value;
  const out = {};
  for (const [key, item] of Object.entries(value)) {
    if (key === "html" && typeof item === "string") {
      out[key] = cleanHtml(item);
      if (out[key] !== item.trim()) state.changed = true;
    } else {
      out[key] = sanitizeHtmlFields(item, state);
    }
  }
  return out;
}

export function mountAdmin(app, { ssr, distDir, rootDir }) {
  const ADMIN_USER = process.env.ADMIN_USER || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
  const enabled = ADMIN_PASSWORD.length >= 12;
  const sessionKey = crypto
    .createHmac("sha256", "yassinetravel-admin-session")
    .update(process.env.ADMIN_SESSION_SECRET || `${ADMIN_USER}:${ADMIN_PASSWORD}`)
    .digest();

  const contentDir = path.resolve(process.env.CONTENT_DIR || path.join(rootDir, "content"));
  const overridesFile = path.join(contentDir, "overrides.json");
  const backupsDir = path.join(contentDir, "backups");
  const uploadsDir = path.join(contentDir, "uploads");
  fs.mkdirSync(backupsDir, { recursive: true });
  fs.mkdirSync(uploadsDir, { recursive: true });

  if (!enabled) {
    console.warn("[admin] ADMIN_PASSWORD is not set (or shorter than 12 characters) - the /admin panel is disabled.");
  }

  // ---------------------------------------------------------------------------
  // Override store
  // ---------------------------------------------------------------------------

  let store = { version: 1, updatedAt: {}, data: {} };
  let storeMtime = -1;
  let lastReloadCheck = 0;
  let contentScript = "window.__SITE_CONTENT__={};";
  let contentHash = "";

  const knownKeys = () => new Set(ssr.getContentKeys());

  function normalizeStore(raw) {
    const data = isPlainObject(raw?.data) ? sanitizeHtmlFields(raw.data) : {};
    const updatedAt = isPlainObject(raw?.updatedAt) ? raw.updatedAt : {};
    return { version: 1, updatedAt, data };
  }

  function rebuildContentScript() {
    const keys = knownKeys();
    const applicable = Object.fromEntries(Object.entries(store.data).filter(([key]) => keys.has(key)));
    contentScript = `window.__SITE_CONTENT__=${toScriptJson(applicable)};`;
    contentHash = Object.keys(applicable).length
      ? crypto.createHash("sha256").update(contentScript).digest("hex").slice(0, 16)
      : "";
  }

  function activate(nextStore) {
    store = nextStore;
    const keys = knownKeys();
    ssr.applyContentOverrides(Object.fromEntries(Object.entries(store.data).filter(([key]) => keys.has(key))));
    rebuildContentScript();
  }

  // Passenger may run several worker processes; each one notices a save made
  // by another through the file's mtime (checked at most every 1.5s).
  function reloadFromDisk({ force = false } = {}) {
    const now = Date.now();
    if (!force && now - lastReloadCheck < RELOAD_THROTTLE_MS) return;
    lastReloadCheck = now;
    let stat;
    try {
      stat = fs.statSync(overridesFile);
    } catch (error) {
      if (error.code === "ENOENT") {
        if (storeMtime !== 0) {
          storeMtime = 0;
          activate({ version: 1, updatedAt: {}, data: {} });
        }
        return;
      }
      console.error("[admin] Cannot stat overrides file:", error);
      return;
    }
    if (stat.mtimeMs === storeMtime) return;
    try {
      const parsed = JSON.parse(fs.readFileSync(overridesFile, "utf8"));
      storeMtime = stat.mtimeMs;
      activate(normalizeStore(parsed));
    } catch (error) {
      console.error("[admin] Ignoring unreadable overrides file (keeping current content):", error.message);
    }
  }

  async function writeBackupOfCurrent() {
    try {
      await fsp.access(overridesFile);
    } catch {
      return;
    }
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const name = `overrides-${stamp}-${crypto.randomBytes(2).toString("hex")}.json`;
    await fsp.copyFile(overridesFile, path.join(backupsDir, name));
    const backups = await listBackups();
    await Promise.all(backups.slice(MAX_BACKUPS).map((backup) => fsp.unlink(path.join(backupsDir, backup.name)).catch(() => {})));
  }

  async function persist(nextStore) {
    await writeBackupOfCurrent();
    const tempFile = `${overridesFile}.${process.pid}.${crypto.randomBytes(4).toString("hex")}.tmp`;
    await fsp.writeFile(tempFile, JSON.stringify(nextStore, null, 2), "utf8");
    await fsp.rename(tempFile, overridesFile);
    storeMtime = (await fsp.stat(overridesFile)).mtimeMs;
  }

  async function listBackups() {
    const names = (await fsp.readdir(backupsDir)).filter((name) => BACKUP_NAME_PATTERN.test(name));
    const backups = await Promise.all(
      names.map(async (name) => {
        const stat = await fsp.stat(path.join(backupsDir, name));
        return { name, size: stat.size, createdAt: stat.mtime.toISOString() };
      })
    );
    return backups.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.name.localeCompare(a.name));
  }

  // Saves are serialized so two concurrent requests can't interleave
  // apply -> render-check -> write.
  let queue = Promise.resolve();
  function serialized(task) {
    const run = queue.then(task, task);
    queue = run.catch(() => {});
    return run;
  }

  function validateValue(key, value) {
    const errors = [...ssr.validateContentOverride(key, value), ...findUnsafeUrls(value)];
    const categoryLang = key.match(/^tourCategories\.(\w+)$/)?.[1];
    if (categoryLang && Array.isArray(value)) {
      const routes = ssr.getRoutePaths(categoryLang);
      value.forEach((item, index) => {
        if (item && item.routeKey && !has(routes, item.routeKey)) {
          errors.push(`tourCategories[${index}].routeKey "${item.routeKey}" is not a known page route.`);
        }
      });
    }
    return errors;
  }

  function renderCheck() {
    let pages = 0;
    for (const lang of ssr.SUPPORTED_LANGUAGES) {
      for (const routePath of ssr.getAllContentPaths(lang)) {
        const url = routePath === "/" ? `/${lang}` : `/${lang}${routePath}`;
        try {
          ssr.render(url, lang);
          pages += 1;
        } catch (error) {
          return { ok: false, url, error: error?.message || String(error) };
        }
      }
    }
    return { ok: true, pages };
  }

  // Applies a candidate store, test-renders the whole site, then persists it
  // or rolls back. Returns [status, body].
  async function commit(nextStore) {
    const previous = store;
    activate(nextStore);
    const check = renderCheck();
    if (!check.ok) {
      activate(previous);
      return [
        422,
        {
          error: `This change breaks the page ${check.url}: ${check.error}. Nothing was saved.`,
          url: check.url,
        },
      ];
    }
    try {
      await persist(nextStore);
    } catch (error) {
      activate(previous);
      console.error("[admin] Failed to write overrides:", error);
      return [500, { error: "Could not write the content file on the server." }];
    }
    return [200, { ok: true, checkedPages: check.pages }];
  }

  async function replaceAll(candidate) {
    if (!isPlainObject(candidate) || !isPlainObject(candidate.data)) {
      return [400, { error: 'Expected a JSON object with a "data" field.' }];
    }
    const keys = knownKeys();
    const errors = [];
    for (const [key, value] of Object.entries(candidate.data)) {
      if (!keys.has(key)) {
        errors.push(`Unknown content key "${key}".`);
        continue;
      }
      for (const message of validateValue(key, value)) errors.push(`${key}: ${message}`);
    }
    if (errors.length) return [422, { error: "Validation failed.", details: errors.slice(0, 50) }];
    const now = new Date().toISOString();
    const updatedAt = isPlainObject(candidate.updatedAt) ? candidate.updatedAt : {};
    return commit({
      version: 1,
      data: sanitizeHtmlFields(candidate.data),
      updatedAt: Object.fromEntries(Object.keys(candidate.data).map((key) => [key, typeof updatedAt[key] === "string" ? updatedAt[key] : now])),
    });
  }

  reloadFromDisk({ force: true });

  // ---------------------------------------------------------------------------
  // Git: commit the content folder and push the current branch
  // ---------------------------------------------------------------------------

  const gitPushEnabled = process.env.ADMIN_GIT_PUSH !== "off";

  function commitMessage(raw, user) {
    const cleaned = String(raw || "")
      .replace(/[\u0000-\u001f\u007f]+/g, " ")
      .trim()
      .slice(0, COMMIT_MESSAGE_MAX);
    return cleaned || `Update website content from admin (${user})`;
  }

  // GitHub API mode (for hosts where the app folder is not a git clone, e.g.
  // Hostinger): GITHUB_TOKEN = fine-grained token with "Contents: Read and
  // write" on the repo, GITHUB_REPO = owner/name, GITHUB_BRANCH (default
  // main), GITHUB_CONTENT_PATH (folder in the repo, default "content").
  const SAFE_REF_PATTERN = /^(?!.*\.\.)[A-Za-z0-9._/-]+$/;
  const github = (() => {
    const token = process.env.GITHUB_TOKEN || "";
    const repo = process.env.GITHUB_REPO || "";
    const branch = process.env.GITHUB_BRANCH || "main";
    const dir = (process.env.GITHUB_CONTENT_PATH || "content").replace(/^\/+|\/+$/g, "");
    if (!token && !repo) return null;
    if (!token || !/^[\w.-]+\/[\w.-]+$/.test(repo) || !SAFE_REF_PATTERN.test(branch) || !SAFE_REF_PATTERN.test(dir)) {
      return { invalid: true };
    }
    return { token, repo, branch, dir };
  })();

  async function githubApi(method, apiPath, body) {
    let response;
    try {
      response = await fetch(`https://api.github.com/repos/${github.repo}${apiPath}`, {
        method,
        headers: {
          Authorization: `Bearer ${github.token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "yassinetravel-admin",
          ...(body ? { "Content-Type": "application/json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(GIT_TIMEOUT_MS),
      });
    } catch (error) {
      throw new Error(`Cannot reach GitHub (${error.name === "TimeoutError" ? "timeout" : error.message}).`);
    }
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const hints = {
        401: "the GITHUB_TOKEN is invalid or expired",
        403: `the token is not allowed to write to ${github.repo} (it needs "Contents: Read and write")`,
        404: `repository ${github.repo} or branch "${github.branch}" not found, or the token cannot access it`,
      };
      const error = new Error(`GitHub refused the request: ${hints[response.status] || data?.message || response.status}.`);
      error.status = response.status;
      throw error;
    }
    return data;
  }

  function gitBlobSha(buffer) {
    return crypto.createHash("sha1").update(`blob ${buffer.length}\0`).update(buffer).digest("hex");
  }

  // Compares the local content files with the branch on GitHub and returns the
  // tree entries needed to make GitHub match (uploads removed locally are deleted).
  async function githubDiff() {
    const ref = await githubApi("GET", `/git/ref/heads/${github.branch}`);
    const head = await githubApi("GET", `/git/commits/${ref.object.sha}`);
    const tree = await githubApi("GET", `/git/trees/${head.tree.sha}?recursive=1`);
    const prefix = `${github.dir}/`;
    const remote = new Map(
      tree.tree
        .filter((entry) => entry.type === "blob" && (entry.path === `${prefix}overrides.json` || (entry.path.startsWith(`${prefix}uploads/`) && UPLOAD_NAME_PATTERN.test(entry.path.slice(prefix.length + 8)))))
        .map((entry) => [entry.path, entry.sha])
    );

    const local = new Map();
    if (fs.existsSync(overridesFile)) local.set(`${prefix}overrides.json`, overridesFile);
    for (const name of await fsp.readdir(uploadsDir)) {
      if (UPLOAD_NAME_PATTERN.test(name)) local.set(`${prefix}uploads/${name}`, path.join(uploadsDir, name));
    }

    const changes = [];
    for (const [repoPath, file] of local) {
      const buffer = await fsp.readFile(file);
      if (remote.get(repoPath) !== gitBlobSha(buffer)) changes.push({ path: repoPath, buffer });
    }
    for (const repoPath of remote.keys()) {
      if (!local.has(repoPath)) changes.push({ path: repoPath, buffer: null });
    }
    return { headSha: ref.object.sha, treeSha: head.tree.sha, changes };
  }

  async function githubPush(user, rawMessage) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const { headSha, treeSha, changes } = await githubDiff();
      if (!changes.length) return [200, { ok: true, nothingToPush: true, branch: github.branch, remote: github.repo }];
      const entries = [];
      for (const change of changes) {
        let sha = null;
        if (change.buffer) {
          sha = (await githubApi("POST", "/git/blobs", { content: change.buffer.toString("base64"), encoding: "base64" })).sha;
        }
        entries.push({ path: change.path, mode: "100644", type: "blob", sha });
      }
      const tree = await githubApi("POST", "/git/trees", { base_tree: treeSha, tree: entries });
      const commit = await githubApi("POST", "/git/commits", { message: commitMessage(rawMessage, user), tree: tree.sha, parents: [headSha] });
      try {
        await githubApi("PATCH", `/git/refs/heads/${github.branch}`, { sha: commit.sha, force: false });
      } catch (error) {
        // 422 = the branch moved meanwhile (someone else pushed): rebuild on top of it once.
        if (error.status === 422 && attempt === 0) continue;
        throw error;
      }
      return [200, { ok: true, committed: true, commit: commit.sha.slice(0, 7), branch: github.branch, remote: github.repo }];
    }
    return [409, { error: "The branch changed on GitHub during the push. Try again." }];
  }

  async function gitInfo() {
    if (!gitPushEnabled) return { available: false, reason: "Pushing is disabled on this server (ADMIN_GIT_PUSH=off)." };
    if (github?.invalid) return { available: false, reason: "GITHUB_TOKEN / GITHUB_REPO / GITHUB_BRANCH are incomplete or invalid." };
    let repoRoot;
    try {
      repoRoot = path.resolve(await git(["rev-parse", "--show-toplevel"], contentDir));
    } catch {
      return { available: false, reason: "This server's folder is not a git clone. Set GITHUB_TOKEN and GITHUB_REPO to push through the GitHub API." };
    }
    const contentPath = path.relative(repoRoot, contentDir).split(path.sep).join("/");
    if (!contentPath || contentPath.startsWith("..") || path.isAbsolute(contentPath)) {
      return { available: false, reason: "The content folder must be a sub-folder of the git repository." };
    }
    const ignored = await git(["check-ignore", "-q", `${contentPath}/overrides.json`], repoRoot).then(
      () => true,
      () => false
    );
    if (ignored) return { available: false, reason: `${contentPath}/overrides.json is excluded by .gitignore.` };
    const branch = await git(["rev-parse", "--abbrev-ref", "HEAD"], repoRoot).catch(() => "HEAD");
    if (branch === "HEAD") return { available: false, reason: "The repository is not on a branch." };
    const remotes = (await git(["remote"], repoRoot).catch(() => "")).split(/\s+/).filter(Boolean);
    const remote = remotes.includes("origin") ? "origin" : remotes[0];
    if (!remote) return { available: false, reason: "The repository has no remote to push to." };
    const upstream = await git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], repoRoot).catch(() => "");
    return { available: true, repoRoot, contentPath, branch, remote, upstream };
  }

  async function gitPending(info) {
    const changes = await git(["status", "--porcelain", "--untracked-files=all", "--", info.contentPath], info.repoRoot);
    const ahead = info.upstream ? Number(await git(["rev-list", "--count", "@{u}..HEAD"], info.repoRoot)) : null;
    return { changes: changes ? changes.split("\n").length : 0, ahead };
  }

  async function gitIdentityArgs(repoRoot, user) {
    const email = await git(["config", "user.email"], repoRoot).catch(() => "");
    return email ? [] : ["-c", `user.name=${user} (website admin)`, "-c", "user.email=admin@yassinetravel.com"];
  }

  async function pushContent(user, rawMessage) {
    if (gitPushEnabled && github && !github.invalid) {
      try {
        return await githubPush(user, rawMessage);
      } catch (error) {
        return [502, { error: error.message }];
      }
    }
    const info = await gitInfo();
    if (!info.available) return [409, { error: info.reason }];
    const { repoRoot, contentPath, branch, remote } = info;
    const pathspec = ["--", contentPath];

    let committed = false;
    try {
      await git(["add", "-A", ...pathspec], repoRoot);
      if (await git(["diff", "--cached", "--name-only", ...pathspec], repoRoot)) {
        const message = commitMessage(rawMessage, user);
        // Only the content folder is committed, whatever else is staged.
        await git([...(await gitIdentityArgs(repoRoot, user)), "commit", "-m", message, ...pathspec], repoRoot);
        committed = true;
      }
    } catch (error) {
      return [502, { error: `Git commit failed: ${gitErrorMessage(error)}` }];
    }

    const { ahead } = await gitPending(info).catch(() => ({ ahead: null }));
    if (!committed && ahead === 0) return [200, { ok: true, nothingToPush: true, branch, remote }];

    const commit = await git(["rev-parse", "--short", "HEAD"], repoRoot).catch(() => "");
    try {
      await git(["push", ...(info.upstream ? [] : ["-u"]), remote, "HEAD"], repoRoot);
    } catch (error) {
      const prefix = committed ? `Committed ${commit} locally, but the push failed` : "Push failed";
      return [502, { error: `${prefix}: ${gitErrorMessage(error)}` }];
    }
    return [200, { ok: true, committed, commit, branch, remote }];
  }

  // ---------------------------------------------------------------------------
  // Authentication (stateless signed cookie, works across worker processes)
  // ---------------------------------------------------------------------------

  function sign(payload) {
    const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const mac = crypto.createHmac("sha256", sessionKey).update(body).digest("base64url");
    return `${body}.${mac}`;
  }

  function getSession(req) {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
    if (!token) return null;
    const [body, mac] = token.split(".");
    if (!body || !mac) return null;
    const expected = crypto.createHmac("sha256", sessionKey).update(body).digest("base64url");
    if (!safeEqual(mac, expected)) return null;
    try {
      const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
      if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
      return payload;
    } catch {
      return null;
    }
  }

  function cookieHeader(req, value, maxAgeSeconds) {
    const parts = [`${SESSION_COOKIE}=${value}`, "Path=/api/admin", "HttpOnly", "SameSite=Strict", `Max-Age=${maxAgeSeconds}`];
    if (req.secure) parts.push("Secure");
    return parts.join("; ");
  }

  const loginFailures = new Map();
  function loginBlocked(ip) {
    const now = Date.now();
    for (const [key, entry] of loginFailures) if (entry.resetAt <= now) loginFailures.delete(key);
    const entry = loginFailures.get(ip);
    return Boolean(entry && entry.count >= LOGIN_MAX_FAILURES);
  }
  function recordLoginFailure(ip) {
    const entry = loginFailures.get(ip) || { count: 0, resetAt: Date.now() + LOGIN_WINDOW_MS };
    entry.count += 1;
    loginFailures.set(ip, entry);
  }

  // ---------------------------------------------------------------------------
  // Public routes (content script, uploads, sitemaps, admin shell)
  // ---------------------------------------------------------------------------

  app.use((req, res, next) => {
    reloadFromDisk();
    next();
  });

  app.get("/__content.js", (req, res) => {
    res.type("application/javascript; charset=utf-8");
    if (contentHash && req.query.v === contentHash) {
      res.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      res.set("Cache-Control", "no-cache");
    }
    res.send(contentScript);
  });

  app.use(
    "/uploads",
    express.static(uploadsDir, { index: false, immutable: true, maxAge: "1y", dotfiles: "deny", fallthrough: false })
  );

  app.get(Object.keys(SITEMAP_DEPENDENCIES).map((file) => `/${file}`), (req, res, next) => {
    const file = req.path.slice(1);
    const dependencies = SITEMAP_DEPENDENCIES[file] || [];
    const overridden = dependencies.filter((key) => has(store.data, key));
    if (!overridden.length) return next();

    const fallbackLastmod = overridden
      .map((key) => store.updatedAt[key])
      .filter(Boolean)
      .sort()
      .at(-1)
      ?.slice(0, 10);
    const entries = ssr.getSitemapEntries()[file] || [];
    const languages = ssr.SUPPORTED_LANGUAGES;
    const defaultLang = ssr.DEFAULT_LANGUAGE;
    const seen = new Set();
    const blocks = [];
    for (const entry of entries) {
      const dedupeKey = entry.pathByLang[defaultLang];
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      const lastmod = entry.lastmod || fallbackLastmod;
      for (const lang of languages) {
        const alternates = languages
          .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${escapeXml(ssr.toAbsoluteUrl(entry.pathByLang[alt], alt))}" />`)
          .join("\n");
        const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(ssr.toAbsoluteUrl(entry.pathByLang[defaultLang], defaultLang))}" />`;
        const lastmodTag = lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>\n` : "";
        blocks.push(`  <url>\n    <loc>${escapeXml(ssr.toAbsoluteUrl(entry.pathByLang[lang], lang))}</loc>\n${lastmodTag}${alternates}\n${xDefault}\n  </url>`);
      }
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${blocks.join("\n")}\n</urlset>\n`;
    res.type("application/xml; charset=utf-8");
    res.set("Cache-Control", "no-cache");
    res.send(xml);
  });

  const adminHtmlPath = path.join(distDir, "admin.html");
  function sendAdminShell(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    res.set({
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Frame-Options": "DENY",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self'; font-src 'self' data:; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'",
    });
    res.sendFile(adminHtmlPath, (error) => {
      if (error && !res.headersSent) res.status(404).type("text/plain").send("Admin UI not built. Run npm run build.");
    });
  }
  app.get("/admin.html", sendAdminShell);
  app.use("/admin", sendAdminShell);

  // ---------------------------------------------------------------------------
  // Admin API
  // ---------------------------------------------------------------------------

  const api = express.Router();

  api.use((req, res, next) => {
    res.set({ "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" });
    if (!enabled) {
      res.status(503).json({ error: "The admin panel is disabled. Set the ADMIN_PASSWORD environment variable (12+ characters) on the server and restart." });
      return;
    }
    // CSRF: browsers can't send a custom header cross-site without a CORS
    // preflight (which this API never approves); SameSite=Strict covers the rest.
    if (req.method !== "GET" && req.method !== "HEAD" && req.get("x-admin-request") !== "1") {
      res.status(403).json({ error: "Missing X-Admin-Request header." });
      return;
    }
    next();
  });

  api.get("/session", (req, res) => {
    const session = getSession(req);
    res.json({ authenticated: Boolean(session), user: session?.u || null });
  });

  api.post("/login", express.json({ limit: "10kb" }), (req, res) => {
    const ip = req.ip || "unknown";
    if (loginBlocked(ip)) {
      res.status(429).json({ error: "Too many failed attempts. Try again in 15 minutes." });
      return;
    }
    const { username, password } = req.body || {};
    const userOk = safeEqual(typeof username === "string" ? username : "", ADMIN_USER);
    const passOk = safeEqual(typeof password === "string" ? password : "", ADMIN_PASSWORD);
    if (!userOk || !passOk) {
      recordLoginFailure(ip);
      res.status(401).json({ error: "Invalid username or password." });
      return;
    }
    loginFailures.delete(ip);
    const token = sign({ u: ADMIN_USER, exp: Date.now() + SESSION_TTL_MS });
    res.set("Set-Cookie", cookieHeader(req, token, Math.floor(SESSION_TTL_MS / 1000)));
    res.json({ authenticated: true, user: ADMIN_USER });
  });

  api.post("/logout", (req, res) => {
    res.set("Set-Cookie", cookieHeader(req, "", 0));
    res.json({ authenticated: false });
  });

  api.use((req, res, next) => {
    const session = getSession(req);
    if (!session) {
      res.status(401).json({ error: "Not signed in." });
      return;
    }
    req.adminUser = session.u;
    next();
  });

  api.get("/content", (req, res) => {
    reloadFromDisk({ force: true });
    res.json({
      keys: ssr.getContentKeys().map((key) => ({
        key,
        overridden: has(store.data, key),
        updatedAt: store.updatedAt[key] || null,
      })),
      images: ssr.getImageLibrary(),
      languages: ssr.SUPPORTED_LANGUAGES,
      routes: Object.fromEntries(ssr.SUPPORTED_LANGUAGES.map((lang) => [lang, ssr.getRoutePaths(lang)])),
    });
  });

  api.get("/content/:key", (req, res) => {
    reloadFromDisk({ force: true });
    const { key } = req.params;
    if (!knownKeys().has(key)) {
      res.status(404).json({ error: `Unknown content key "${key}".` });
      return;
    }
    const overridden = has(store.data, key);
    res.json({
      key,
      overridden,
      updatedAt: store.updatedAt[key] || null,
      value: overridden ? store.data[key] : ssr.getContentDefaults(key),
    });
  });

  api.put("/content/:key", express.json({ limit: "15mb" }), async (req, res) => {
    const { key } = req.params;
    if (!knownKeys().has(key)) {
      res.status(404).json({ error: `Unknown content key "${key}".` });
      return;
    }
    if (!req.body || !has(req.body, "value")) {
      res.status(400).json({ error: 'Expected a JSON body with a "value" field.' });
      return;
    }
    const sanitized = { changed: false };
    const value = sanitizeHtmlFields(req.body.value, sanitized);
    const errors = validateValue(key, value);
    if (errors.length) {
      res.status(422).json({ error: "Validation failed.", details: errors.slice(0, 50) });
      return;
    }
    const [status, body] = await serialized(async () => {
      reloadFromDisk({ force: true });
      const now = new Date().toISOString();
      return commit({
        version: 1,
        data: { ...store.data, [key]: value },
        updatedAt: { ...store.updatedAt, [key]: now },
      });
    });
    res
      .status(status)
      .json(status === 200 ? { ...body, updatedAt: store.updatedAt[key], ...(sanitized.changed ? { sanitized: true, value } : {}) } : body);
  });

  api.delete("/content/:key", async (req, res) => {
    const { key } = req.params;
    const [status, body] = await serialized(async () => {
      reloadFromDisk({ force: true });
      if (!has(store.data, key)) return [200, { ok: true, checkedPages: 0 }];
      const data = { ...store.data };
      const updatedAt = { ...store.updatedAt };
      delete data[key];
      delete updatedAt[key];
      return commit({ version: 1, data, updatedAt });
    });
    res.status(status).json(body);
  });

  api.get("/media", async (req, res) => {
    const names = (await fsp.readdir(uploadsDir)).filter((name) => UPLOAD_NAME_PATTERN.test(name));
    const files = await Promise.all(
      names.map(async (name) => {
        const stat = await fsp.stat(path.join(uploadsDir, name));
        return { name, url: `/uploads/${name}`, size: stat.size, createdAt: stat.mtime.toISOString() };
      })
    );
    files.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    res.json({ files });
  });

  api.post("/media", express.raw({ type: () => true, limit: MAX_UPLOAD_BYTES }), async (req, res) => {
    const buffer = req.body;
    const type = Buffer.isBuffer(buffer) ? detectImageType(buffer) : null;
    if (!type) {
      res.status(415).json({ error: "Only JPEG, PNG, GIF, WebP and AVIF images can be uploaded." });
      return;
    }
    const name = `${sanitizeBaseName(req.query.name)}-${crypto.randomBytes(3).toString("hex")}.${type}`;
    await fsp.writeFile(path.join(uploadsDir, name), buffer, { flag: "wx" });
    res.status(201).json({ name, url: `/uploads/${name}`, size: buffer.length });
  });

  api.delete("/media/:name", async (req, res) => {
    const { name } = req.params;
    if (!UPLOAD_NAME_PATTERN.test(name)) {
      res.status(400).json({ error: "Invalid file name." });
      return;
    }
    reloadFromDisk({ force: true });
    if (JSON.stringify(store.data).includes(`/uploads/${name}`)) {
      res.status(409).json({ error: "This image is still used by the website content. Remove it from the content first." });
      return;
    }
    try {
      await fsp.unlink(path.join(uploadsDir, name));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    res.json({ ok: true });
  });

  api.get("/backups", async (req, res) => {
    res.json({ backups: await listBackups() });
  });

  api.post("/backups/:name/restore", async (req, res) => {
    const { name } = req.params;
    if (!BACKUP_NAME_PATTERN.test(name)) {
      res.status(400).json({ error: "Invalid backup name." });
      return;
    }
    let candidate;
    try {
      candidate = JSON.parse(await fsp.readFile(path.join(backupsDir, name), "utf8"));
    } catch {
      res.status(404).json({ error: "Backup not found or unreadable." });
      return;
    }
    const [status, body] = await serialized(() => replaceAll(candidate));
    res.status(status).json(body);
  });

  api.get("/export", (req, res) => {
    reloadFromDisk({ force: true });
    const date = new Date().toISOString().slice(0, 10);
    res.set("Content-Disposition", `attachment; filename="yassinetravel-content-${date}.json"`);
    res.type("application/json").send(JSON.stringify(store, null, 2));
  });

  api.post("/import", express.json({ limit: "30mb" }), async (req, res) => {
    const [status, body] = await serialized(() => replaceAll(req.body));
    res.status(status).json(body);
  });

  api.get("/git/status", async (req, res) => {
    if (gitPushEnabled && github && !github.invalid) {
      try {
        const { changes } = await githubDiff();
        res.json({ available: true, branch: github.branch, remote: github.repo, changes: changes.length, ahead: 0 });
      } catch (error) {
        res.json({ available: false, reason: error.message });
      }
      return;
    }
    const info = await gitInfo();
    if (!info.available) {
      res.json({ available: false, reason: info.reason });
      return;
    }
    const pending = await gitPending(info).catch(() => ({ changes: 0, ahead: null }));
    res.json({ available: true, branch: info.branch, remote: info.remote, ...pending });
  });

  api.post("/git/push", express.json({ limit: "10kb" }), async (req, res) => {
    // Serialized with saves so a half-written overrides file is never committed.
    const [status, body] = await serialized(() => pushContent(req.adminUser, req.body?.message));
    res.status(status).json(body);
  });

  api.use((req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  // eslint-disable-next-line no-unused-vars
  api.use((error, req, res, next) => {
    const status = error.status || error.statusCode || 500;
    if (status >= 500) console.error("[admin] API error:", error);
    res.status(status).json({ error: status === 413 ? "Request is too large." : status >= 500 ? "Server error." : error.message });
  });

  app.use("/api/admin", api);

  return {
    contentScriptTag() {
      return contentHash ? `<script src="/__content.js?v=${contentHash}"></script>` : "";
    },
  };
}
