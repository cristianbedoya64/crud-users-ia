// Centralized API base URL, overridable via VITE_API_URL
let apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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
	}
}

export const API_BASE = apiBase;