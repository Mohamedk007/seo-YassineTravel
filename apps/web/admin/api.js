// Thin client for the /api/admin endpoints served by admin-server.js.

export class ApiError extends Error {
	constructor(message, { status, details, url } = {}) {
		super(message);
		this.status = status;
		this.details = details || [];
		this.url = url || null;
	}
}

async function request(method, url, body, { raw = false } = {}) {
	// The custom header is the API's CSRF guard for every non-GET request.
	const headers = { 'X-Admin-Request': '1' };
	let payload;
	if (raw) {
		payload = body;
		headers['Content-Type'] = body?.type || 'application/octet-stream';
	} else if (body !== undefined) {
		headers['Content-Type'] = 'application/json';
		payload = JSON.stringify(body);
	}

	const response = await fetch(`/api/admin${url}`, { method, headers, body: payload, credentials: 'same-origin' });
	let data = null;
	try {
		data = await response.json();
	} catch {
		data = null;
	}
	if (!response.ok) {
		throw new ApiError(data?.error || `Request failed (${response.status})`, {
			status: response.status,
			details: data?.details,
			url: data?.url,
		});
	}
	return data;
}

export const api = {
	session: () => request('GET', '/session'),
	login: (username, password) => request('POST', '/login', { username, password }),
	logout: () => request('POST', '/logout', {}),
	listContent: () => request('GET', '/content'),
	getContent: (key) => request('GET', `/content/${encodeURIComponent(key)}`),
	saveContent: (key, value) => request('PUT', `/content/${encodeURIComponent(key)}`, { value }),
	resetContent: (key) => request('DELETE', `/content/${encodeURIComponent(key)}`),
	listMedia: () => request('GET', '/media'),
	uploadMedia: (file) => request('POST', `/media?name=${encodeURIComponent(file.name)}`, file, { raw: true }),
	deleteMedia: (name) => request('DELETE', `/media/${encodeURIComponent(name)}`),
	listBackups: () => request('GET', '/backups'),
	restoreBackup: (name) => request('POST', `/backups/${encodeURIComponent(name)}/restore`, {}),
	importContent: (data) => request('POST', '/import', data),
	gitStatus: () => request('GET', '/git/status'),
	gitPush: (message) => request('POST', '/git/push', { message }),
	exportUrl: '/api/admin/export',
};
