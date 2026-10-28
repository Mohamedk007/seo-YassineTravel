import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { api } from './api';
import { buildNavigation, findCatalogItem } from './catalog';
import { DatasetEditor, EditorContext, ImagePicker } from './editor';

function formatDate(value) {
	if (!value) return '';
	try {
		return new Date(value).toLocaleString();
	} catch {
		return value;
	}
}

function formatSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

function LoginScreen({ onLoggedIn, disabledMessage }) {
	const [username, setUsername] = useState('admin');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);

	const submit = async (event) => {
		event.preventDefault();
		setBusy(true);
		setError('');
		try {
			const session = await api.login(username, password);
			onLoggedIn(session);
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="adm-login">
			<form className="adm-login-card" onSubmit={submit}>
				<h1>
					Yassine <span>Travel</span>
				</h1>
				<p className="adm-muted">Website administration</p>
				{disabledMessage ? <p className="adm-alert adm-alert-error">{disabledMessage}</p> : null}
				<label className="adm-label" htmlFor="adm-user">
					Username
				</label>
				<input id="adm-user" className="adm-input" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} />
				<label className="adm-label" htmlFor="adm-pass">
					Password
				</label>
				<input
					id="adm-pass"
					className="adm-input"
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					autoFocus
				/>
				{error ? <p className="adm-alert adm-alert-error">{error}</p> : null}
				<button type="submit" className="adm-btn adm-btn-primary adm-btn-block" disabled={busy || !password}>
					{busy ? 'Signing in...' : 'Sign in'}
				</button>
			</form>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Content editor page
// ---------------------------------------------------------------------------

function ContentPage({ contentKey, routes, onSaved, setDirty, notify }) {
	const { item, lang } = findCatalogItem(contentKey);
	const [state, setState] = useState({ loading: true });
	const [draft, setDraft] = useState(null);
	const [original, setOriginal] = useState('');
	const [mode, setMode] = useState('form');
	const [jsonText, setJsonText] = useState('');
	const [jsonError, setJsonError] = useState('');
	const [filter, setFilter] = useState('');
	const [saving, setSaving] = useState(false);
	const [saveError, setSaveError] = useState(null);

	const load = useCallback(async () => {
		setState({ loading: true });
		setSaveError(null);
		try {
			const data = await api.getContent(contentKey);
			setDraft(data.value);
			setOriginal(JSON.stringify(data.value));
			setState({ loading: false, overridden: data.overridden, updatedAt: data.updatedAt });
		} catch (err) {
			setState({ loading: false, error: err.message });
		}
	}, [contentKey]);

	useEffect(() => {
		load();
	}, [load]);

	const dirty = draft !== null && JSON.stringify(draft) !== original;
	useEffect(() => {
		setDirty(dirty);
	}, [dirty, setDirty]);

	const previewLang = lang || 'en';
	const previewFor = useMemo(() => {
		if (!item.preview || !routes?.[previewLang]?.[item.preview]) return null;
		const pattern = routes[previewLang][item.preview];
		return (entity) => (entity?.slug ? `/${previewLang}${pattern.replace(':slug', entity.slug)}` : null);
	}, [item.preview, routes, previewLang]);

	const switchMode = (next) => {
		if (next === 'json') {
			setJsonText(JSON.stringify(draft, null, 2));
			setJsonError('');
		} else if (mode === 'json') {
			try {
				setDraft(JSON.parse(jsonText));
			} catch (err) {
				setJsonError(`Invalid JSON: ${err.message}`);
				return;
			}
		}
		setMode(next);
	};

	const save = async () => {
		let value = draft;
		if (mode === 'json') {
			try {
				value = JSON.parse(jsonText);
				setDraft(value);
			} catch (err) {
				setJsonError(`Invalid JSON: ${err.message}`);
				return;
			}
		}
		setSaving(true);
		setSaveError(null);
		try {
			const result = await api.saveContent(contentKey, value);
			setOriginal(JSON.stringify(value));
			setState((prev) => ({ ...prev, overridden: true, updatedAt: result.updatedAt }));
			notify(`Saved and published. ${result.checkedPages} pages were checked and render correctly.`);
			onSaved();
		} catch (err) {
			setSaveError(err);
		} finally {
			setSaving(false);
		}
	};

	const reset = async () => {
		if (!window.confirm('Restore the original built-in content for this section? Your edits here will be removed (a backup is kept).')) return;
		setSaving(true);
		try {
			await api.resetContent(contentKey);
			notify('Restored to the original content.');
			onSaved();
			await load();
		} catch (err) {
			setSaveError(err);
		} finally {
			setSaving(false);
		}
	};

	const discard = () => {
		if (!window.confirm('Discard your unsaved changes?')) return;
		setDraft(JSON.parse(original));
		setJsonText(JSON.stringify(JSON.parse(original), null, 2));
		setSaveError(null);
	};

	if (state.loading) return <p className="adm-muted adm-pad">Loading...</p>;
	if (state.error) return <p className="adm-alert adm-alert-error">{state.error}</p>;

	const entityLabel = item.entityLabel || item.label.toLowerCase().replace(/s$/, '');

	return (
		<div className="adm-page">
			<header className="adm-toolbar">
				<div>
					<h2>
						{item.label} {lang ? <span className="adm-lang">{lang.toUpperCase()}</span> : null}
					</h2>
					<p className="adm-muted adm-small">
						{state.overridden ? `Edited ${formatDate(state.updatedAt)}` : 'Original content (never edited)'}
						{dirty ? <strong className="adm-unsaved"> - unsaved changes</strong> : null}
					</p>
				</div>
				<div className="adm-row adm-wrap">
					<input className="adm-input adm-filter" type="search" placeholder="Find a field or text..." value={filter} onChange={(event) => setFilter(event.target.value)} disabled={mode === 'json'} />
					<div className="adm-segmented">
						<button type="button" className={mode === 'form' ? 'is-active' : ''} onClick={() => switchMode('form')}>
							Form
						</button>
						<button type="button" className={mode === 'json' ? 'is-active' : ''} onClick={() => switchMode('json')}>
							JSON
						</button>
					</div>
					{lang ? (
						<a className="adm-btn adm-btn-ghost" href={`/${lang}`} target="_blank" rel="noreferrer">
							View site
						</a>
					) : null}
					{state.overridden ? (
						<button type="button" className="adm-btn adm-btn-ghost" onClick={reset} disabled={saving}>
							Reset to original
						</button>
					) : null}
					{dirty ? (
						<button type="button" className="adm-btn" onClick={discard} disabled={saving}>
							Discard
						</button>
					) : null}
					<button type="button" className="adm-btn adm-btn-primary" onClick={save} disabled={saving || (!dirty && mode !== 'json')}>
						{saving ? 'Checking & saving...' : 'Save & publish'}
					</button>
				</div>
			</header>

			{item.help ? <p className="adm-help">{item.help}</p> : null}

			{saveError ? (
				<div className="adm-alert adm-alert-error">
					<strong>{saveError.message}</strong>
					{saveError.details?.length ? (
						<ul>
							{saveError.details.map((detail) => (
								<li key={detail}>{detail}</li>
							))}
						</ul>
					) : null}
				</div>
			) : null}

			{mode === 'json' ? (
				<div className="adm-json">
					{jsonError ? <p className="adm-alert adm-alert-error">{jsonError}</p> : null}
					<textarea className="adm-input adm-code" spellCheck={false} value={jsonText} onChange={(event) => setJsonText(event.target.value)} />
				</div>
			) : (
				<EditorFilter filter={filter} hints={item.fields}>
					<DatasetEditor
						value={draft}
						onChange={setDraft}
						previewFor={previewFor}
						entityLabel={entityLabel}
						newItem={item.newItem}
						itemTypes={item.itemTypes}
						itemTitle={item.itemTitle}
					/>
				</EditorFilter>
			)}
		</div>
	);
}

// Narrows the shared editor context to the page's current search text and the
// dataset's field hints (labels, help, optional fields - see catalog.js).
function EditorFilter({ filter, hints = null, children }) {
	const parent = React.useContext(EditorContext);
	const value = useMemo(() => ({ ...parent, filter: filter.trim().toLowerCase(), hints }), [parent, filter, hints]);
	return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

// ---------------------------------------------------------------------------
// Media library
// ---------------------------------------------------------------------------

function MediaPage({ notify }) {
	const [files, setFiles] = useState(null);
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);
	const input = useRef(null);

	const load = useCallback(() => {
		api
			.listMedia()
			.then((data) => setFiles(data.files))
			.catch((err) => setError(err.message));
	}, []);
	useEffect(load, [load]);

	const upload = async (event) => {
		const selected = [...(event.target.files || [])];
		event.target.value = '';
		setBusy(true);
		setError('');
		try {
			for (const file of selected) await api.uploadMedia(file);
			notify(`${selected.length} image(s) uploaded.`);
			load();
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	};

	const remove = async (name) => {
		if (!window.confirm(`Delete ${name}?`)) return;
		try {
			await api.deleteMedia(name);
			load();
		} catch (err) {
			setError(err.message);
		}
	};

	const copy = async (url) => {
		try {
			await navigator.clipboard.writeText(url);
			notify('Image address copied.');
		} catch {
			window.prompt('Copy this address:', url);
		}
	};

	return (
		<div className="adm-page">
			<header className="adm-toolbar">
				<div>
					<h2>Media library</h2>
					<p className="adm-muted adm-small">Upload photos here, then pick them from any image field (JPEG, PNG, WebP, AVIF or GIF, max 10 MB). Prefer WebP under 300 KB for fast pages.</p>
				</div>
				<div className="adm-row">
					<button type="button" className="adm-btn adm-btn-primary" disabled={busy} onClick={() => input.current?.click()}>
						{busy ? 'Uploading...' : 'Upload images'}
					</button>
					<input ref={input} type="file" accept="image/jpeg,image/png,image/gif,image/webp,image/avif" multiple hidden onChange={upload} />
				</div>
			</header>
			{error ? <p className="adm-alert adm-alert-error">{error}</p> : null}
			{files === null ? <p className="adm-muted">Loading...</p> : null}
			{files && files.length === 0 ? <p className="adm-muted">No uploaded images yet.</p> : null}
			<div className="adm-media-grid">
				{(files || []).map((file) => (
					<figure key={file.name}>
						<img src={file.url} alt="" loading="lazy" />
						<figcaption>
							<span className="adm-ellipsis" title={file.name}>
								{file.name}
							</span>
							<span className="adm-muted adm-small">{formatSize(file.size)}</span>
							<div className="adm-row">
								<button type="button" className="adm-btn adm-btn-small" onClick={() => copy(file.url)}>
									Copy URL
								</button>
								<button type="button" className="adm-btn adm-btn-small adm-btn-danger" onClick={() => remove(file.name)}>
									Delete
								</button>
							</div>
						</figcaption>
					</figure>
				))}
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Backups / import / export
// ---------------------------------------------------------------------------

function BackupsPage({ notify, onChanged }) {
	const [backups, setBackups] = useState(null);
	const [error, setError] = useState(null);
	const [busy, setBusy] = useState(false);
	const input = useRef(null);

	const load = useCallback(() => {
		api
			.listBackups()
			.then((data) => setBackups(data.backups))
			.catch((err) => setError(err));
	}, []);
	useEffect(load, [load]);

	const restore = async (name) => {
		if (!window.confirm(`Restore all website content to the backup "${name}"? The current content is backed up first.`)) return;
		setBusy(true);
		setError(null);
		try {
			await api.restoreBackup(name);
			notify('Backup restored.');
			onChanged();
			load();
		} catch (err) {
			setError(err);
		} finally {
			setBusy(false);
		}
	};

	const importFile = async (event) => {
		const file = event.target.files?.[0];
		event.target.value = '';
		if (!file) return;
		if (!window.confirm('Replace ALL edited website content with this file? The current content is backed up first.')) return;
		setBusy(true);
		setError(null);
		try {
			const data = JSON.parse(await file.text());
			await api.importContent(data);
			notify('Content imported.');
			onChanged();
			load();
		} catch (err) {
			setError(err);
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="adm-page">
			<header className="adm-toolbar">
				<div>
					<h2>Backups & transfer</h2>
					<p className="adm-muted adm-small">A backup is created automatically before every change (the last 30 are kept).</p>
				</div>
				<div className="adm-row">
					<a className="adm-btn" href={api.exportUrl}>
						Download all edits (JSON)
					</a>
					<button type="button" className="adm-btn" disabled={busy} onClick={() => input.current?.click()}>
						Import file...
					</button>
					<input ref={input} type="file" accept="application/json,.json" hidden onChange={importFile} />
				</div>
			</header>
			{error ? (
				<div className="adm-alert adm-alert-error">
					<strong>{error.message}</strong>
					{error.details?.length ? (
						<ul>
							{error.details.map((detail) => (
								<li key={detail}>{detail}</li>
							))}
						</ul>
					) : null}
				</div>
			) : null}
			{backups === null ? <p className="adm-muted">Loading...</p> : null}
			{backups && backups.length === 0 ? <p className="adm-muted">No backups yet - one is created at the first change after the first save.</p> : null}
			{backups && backups.length ? (
				<table className="adm-table">
					<thead>
						<tr>
							<th>Backup</th>
							<th>Date</th>
							<th>Size</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{backups.map((backup) => (
							<tr key={backup.name}>
								<td className="adm-mono">{backup.name}</td>
								<td>{formatDate(backup.createdAt)}</td>
								<td>{formatSize(backup.size)}</td>
								<td>
									<button type="button" className="adm-btn adm-btn-small" disabled={busy} onClick={() => restore(backup.name)}>
										Restore
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

function Dashboard({ sections, onOpen }) {
	const all = sections.flatMap((section) => section.items.flatMap((item) => item.variants.map((variant) => ({ ...variant, label: item.label }))));
	const edited = all.filter((entry) => entry.overridden).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));

	return (
		<div className="adm-page">
			<header className="adm-toolbar">
				<div>
					<h2>Dashboard</h2>
					<p className="adm-muted adm-small">Pick any section on the left to edit it. Every save is checked against all pages of the site in both languages before it goes live.</p>
				</div>
				<a className="adm-btn adm-btn-ghost" href="/en" target="_blank" rel="noreferrer">
					Open website
				</a>
			</header>

			<div className="adm-cards">
				{sections.map((section) => (
					<div className="adm-card" key={section.id}>
						<h3>{section.title}</h3>
						<ul>
							{section.items.map((item) => (
								<li key={item.key}>
									<span>{item.label}</span>
									<span className="adm-row">
										{item.variants.map((variant) => (
											<button type="button" key={variant.key} className={`adm-chip${variant.overridden ? ' is-edited' : ''}`} onClick={() => onOpen(variant.key)}>
												{variant.lang ? variant.lang.toUpperCase() : 'Edit'}
											</button>
										))}
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<h3 className="adm-section-title">Recently edited</h3>
			{edited.length === 0 ? (
				<p className="adm-muted">Nothing has been edited yet - the website shows its original content.</p>
			) : (
				<table className="adm-table">
					<tbody>
						{edited.map((entry) => (
							<tr key={entry.key}>
								<td>
									<button type="button" className="adm-link" onClick={() => onOpen(entry.key)}>
										{entry.label} {entry.lang ? `(${entry.lang.toUpperCase()})` : ''}
									</button>
								</td>
								<td>{formatDate(entry.updatedAt)}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Push to repo
// ---------------------------------------------------------------------------

function plural(count, word) {
	return `${count} ${word}${count === 1 ? '' : 's'}`;
}

function PushToRepo({ notify, refreshKey }) {
	const [status, setStatus] = useState(null);
	const [busy, setBusy] = useState(false);

	const load = useCallback(() => {
		api
			.gitStatus()
			.then(setStatus)
			.catch((err) => setStatus({ available: false, reason: err.message }));
	}, []);
	useEffect(() => {
		load();
	}, [load, refreshKey]);

	const push = async () => {
		const message = window.prompt(
			`Commit the saved website edits and push the "${status.branch}" branch to ${status.remote}?\n\nCommit message (optional):`,
			''
		);
		if (message === null) return;
		setBusy(true);
		try {
			const result = await api.gitPush(message);
			notify(result.nothingToPush ? 'Nothing to push: the repository is already up to date.' : `Pushed to ${result.remote}/${result.branch}${result.commit ? ` (${result.commit})` : ''}.`);
		} catch (err) {
			notify(err.message);
		} finally {
			setBusy(false);
			load();
		}
	};

	let summary = 'Checking git...';
	if (status && !status.available) summary = status.reason;
	else if (status) {
		const parts = [];
		if (status.changes) parts.push(`${plural(status.changes, 'file')} to commit`);
		if (status.ahead) parts.push(`${plural(status.ahead, 'commit')} to push`);
		if (status.ahead === null) parts.push('branch not on remote yet');
		summary = `${status.branch}: ${parts.length ? parts.join(', ') : 'up to date'}`;
	}

	return (
		<div className="adm-push">
			<button type="button" className="adm-btn adm-btn-small adm-btn-primary adm-btn-block" disabled={busy || !status?.available} onClick={push}>
				{busy ? 'Pushing...' : 'Push to repo'}
			</button>
			<span className="adm-muted adm-small">{summary}</span>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

export function AdminApp() {
	const [session, setSession] = useState({ checking: true });
	const [index, setIndex] = useState(null);
	const [view, setView] = useState({ type: 'dashboard' });
	const [toast, setToast] = useState('');
	const [picker, setPicker] = useState(null);
	const dirtyRef = useRef(false);
	const toastTimer = useRef(null);

	const notify = useCallback((message) => {
		setToast(message);
		clearTimeout(toastTimer.current);
		toastTimer.current = setTimeout(() => setToast(''), 5000);
	}, []);

	const setDirty = useCallback((value) => {
		dirtyRef.current = value;
	}, []);

	useEffect(() => {
		api
			.session()
			.then((data) => setSession({ authenticated: data.authenticated, user: data.user }))
			.catch((err) => setSession({ authenticated: false, disabled: err.status === 503 ? err.message : '' }));
	}, []);

	const loadIndex = useCallback(() => {
		api
			.listContent()
			.then(setIndex)
			.catch((err) => {
				if (err.status === 401) setSession({ authenticated: false });
				else notify(err.message);
			});
	}, [notify]);

	useEffect(() => {
		if (session.authenticated) loadIndex();
	}, [session.authenticated, loadIndex]);

	useEffect(() => {
		const beforeUnload = (event) => {
			if (!dirtyRef.current) return;
			event.preventDefault();
			event.returnValue = '';
		};
		window.addEventListener('beforeunload', beforeUnload);
		return () => window.removeEventListener('beforeunload', beforeUnload);
	}, []);

	const navigate = (next) => {
		if (dirtyRef.current && !window.confirm('You have unsaved changes. Leave this page and lose them?')) return;
		dirtyRef.current = false;
		setView(next);
		window.scrollTo(0, 0);
	};

	const logout = async () => {
		if (dirtyRef.current && !window.confirm('You have unsaved changes. Sign out anyway?')) return;
		await api.logout().catch(() => {});
		dirtyRef.current = false;
		setSession({ authenticated: false });
		setIndex(null);
	};

	const editorContext = useMemo(
		() => ({
			images: index?.images || {},
			filter: '',
			openPicker: (current, onSelect) => setPicker({ current, onSelect }),
		}),
		[index?.images]
	);

	const sections = useMemo(() => (index ? buildNavigation(index.keys, index.languages) : []), [index]);

	if (session.checking) return <p className="adm-muted adm-pad">Loading...</p>;
	if (!session.authenticated) {
		return <LoginScreen disabledMessage={session.disabled} onLoggedIn={(data) => setSession({ authenticated: true, user: data.user })} />;
	}

	return (
		<EditorContext.Provider value={editorContext}>
			<div className="adm-shell">
				<aside className="adm-sidebar">
					<div className="adm-brand">
						Yassine <span>Travel</span>
						<small>Admin</small>
					</div>
					<nav>
						<button type="button" className={view.type === 'dashboard' ? 'is-active' : ''} onClick={() => navigate({ type: 'dashboard' })}>
							Dashboard
						</button>
						{sections.map((section) => (
							<div className="adm-nav-section" key={section.id}>
								<h4>{section.title}</h4>
								{section.items.map((item) => (
									<div className="adm-nav-item" key={item.key}>
										<span className="adm-nav-label">{item.label}</span>
										<span className="adm-row">
											{item.variants.map((variant) => (
												<button
													type="button"
													key={variant.key}
													title={variant.key}
													className={`adm-chip${view.key === variant.key ? ' is-active' : ''}${variant.overridden ? ' is-edited' : ''}`}
													onClick={() => navigate({ type: 'content', key: variant.key })}
												>
													{variant.lang ? variant.lang.toUpperCase() : 'Edit'}
												</button>
											))}
										</span>
									</div>
								))}
							</div>
						))}
						<div className="adm-nav-section">
							<h4>Tools</h4>
							<button type="button" className={view.type === 'media' ? 'is-active' : ''} onClick={() => navigate({ type: 'media' })}>
								Media library
							</button>
							<button type="button" className={view.type === 'backups' ? 'is-active' : ''} onClick={() => navigate({ type: 'backups' })}>
								Backups & transfer
							</button>
						</div>
					</nav>
					<PushToRepo notify={notify} refreshKey={index} />
					<div className="adm-sidebar-foot">
						<span className="adm-muted adm-small">Signed in as {session.user}</span>
						<button type="button" className="adm-btn adm-btn-small adm-btn-ghost" onClick={logout}>
							Sign out
						</button>
					</div>
				</aside>

				<main className="adm-main">
					{!index ? <p className="adm-muted adm-pad">Loading...</p> : null}
					{index && view.type === 'dashboard' ? <Dashboard sections={sections} onOpen={(key) => navigate({ type: 'content', key })} /> : null}
					{index && view.type === 'content' ? (
						<ContentPage key={view.key} contentKey={view.key} routes={index.routes} onSaved={loadIndex} setDirty={setDirty} notify={notify} />
					) : null}
					{index && view.type === 'media' ? <MediaPage notify={notify} /> : null}
					{index && view.type === 'backups' ? <BackupsPage notify={notify} onChanged={loadIndex} /> : null}
				</main>
			</div>

			{picker ? (
				<ImagePicker
					current={picker.current}
					onClose={() => setPicker(null)}
					onSelect={(value) => {
						picker.onSelect(value);
						setPicker(null);
					}}
				/>
			) : null}
			{toast ? (
				<div className="adm-toast" role="status">
					{toast}
				</div>
			) : null}
		</EditorContext.Provider>
	);
}
