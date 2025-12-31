import { notifications } from '@mantine/notifications';
import { getAccessToken, refreshTokens, clearTokens, getRefreshToken } from './auth';

// authFetch agrega el Authorization header y, si hay 401 y refresh token, intenta refrescar una vez.
export async function authFetch(url, options = {}) {
  const opts = { ...options, headers: { ...(options.headers || {}) } };
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
      notifications.show({ color: 'red', title: 'Sesión expirada', message: err.message || 'No se pudo refrescar la sesión.' });
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
    notifications.show({ color: 'red', title: 'Error', message });
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return response;
}
