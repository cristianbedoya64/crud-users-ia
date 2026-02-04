import { notifyOnce } from './utils/notify';
import { getAccessToken, refreshTokens, clearTokens, getRefreshToken } from './auth';

const AUTH_ERROR_COOLDOWN_MS = 5000;
let lastAuthErrorAt = 0;

// authFetch agrega el Authorization header y, si hay 401 y refresh token, intenta refrescar una vez.
export async function authFetch(url, options = {}) {
  const { silent, ...fetchOptions } = options || {};
  const opts = { ...fetchOptions, headers: { ...(fetchOptions.headers || {}) } };
  const accessToken = getAccessToken();
  if (accessToken) {
    opts.headers.Authorization = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, opts);

  if (response.status === 401 && getRefreshToken()) {
    try {
      const refreshed = await refreshTokens();
      const retryOpts = { ...opts, headers: { ...(opts.headers || {}) } };
      retryOpts.headers.Authorization = `Bearer ${refreshed.accessToken}`;
      response = await fetch(url, retryOpts);
    } catch (err) {
      clearTokens();
      if (!silent) {
        notifyOnce({ color: 'red', title: 'Sesión expirada', message: err.message || 'No se pudo refrescar la sesión.' });
      }
      throw err;
    }
  }

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    let data;
    try {
      data = await response.clone().json();
      if (data?.error || data?.message) message = data.error || data.message;
    } catch (err) {
      // cuerpo no JSON: mantenemos message por defecto
    }
    if (!silent) {
      if (response.status === 401) {
        const now = Date.now();
        if (now - lastAuthErrorAt > AUTH_ERROR_COOLDOWN_MS) {
          lastAuthErrorAt = now;
          notifyOnce({ id: 'auth-error', color: 'red', title: 'Error', message });
        }
      } else {
      notifyOnce({ color: 'red', title: 'Error', message });
      }
    }
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return response;
}
