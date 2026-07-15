export const DEFAULT_API_BASE_URL = 'http://tap.jitihada.co.tz';

/**
 * API base URL rules:
 * - Development: empty string → CRA proxy (package.json) forwards /api/* to live server
 * - Production + REACT_APP_USE_SAME_ORIGIN=true: empty → /api/* on current host
 * - Production + REACT_APP_API_URL set: use that URL (required when frontend/API differ)
 * - Production fallback: DEFAULT_API_BASE_URL
 */
export function getApiBaseUrl() {
  if (process.env.REACT_APP_USE_SAME_ORIGIN === 'true') {
    return '';
  }

  const envUrl = process.env.REACT_APP_API_URL?.trim();

  if (envUrl) {
    return envUrl.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV === 'development') {
    return '';
  }

  return DEFAULT_API_BASE_URL;
}

export function apiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return normalizedPath;
  }

  return `${baseUrl}${normalizedPath}`;
}
