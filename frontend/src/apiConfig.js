// Centralized API base URL.
// Vite envs are baked at build-time; for Docker deployments where the browser
// cannot resolve internal hostnames (e.g. "backend"), we also derive the URL
// from window.location at runtime.
let apiBase = import.meta.env.VITE_API_URL || '';

// In Codespaces the frontend is served over HTTPS on a hostname like
// xxxx-5173.app.github.dev while the backend is exposed on port 3000
// at xxxx-3000.app.github.dev. To avoid mixed content, rewrite the host
// when we detect the app.github.dev pattern.
if (typeof window !== 'undefined') {
	const { protocol, hostname } = window.location;
	const isGithubDev = hostname.endsWith('.app.github.dev');
	if (protocol === 'https:' && isGithubDev) {
		const rewrittenHost = hostname.replace(/-(5173|4173)\./, '-3000.');
		apiBase = `${protocol}//${rewrittenHost}`;
	} else {
		const needsRuntimeDerivation =
			!apiBase ||
			apiBase.includes('http://backend:3000') ||
			apiBase.includes('https://backend:3000') ||
			apiBase.includes('http://localhost:3000') ||
			apiBase.includes('https://localhost:3000');

		if (needsRuntimeDerivation) {
			const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
			apiBase = isLocal ? 'http://localhost:3000' : `${protocol}//${hostname}:3000`;
		}
	}
}

export const API_BASE = apiBase;