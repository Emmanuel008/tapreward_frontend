export function getApiBaseUrl() {
  const envUrl = process.env.REACT_APP_API_URL;

  if (envUrl !== undefined && envUrl !== '') {
    return envUrl.replace(/\/$/, '');
  }

  // Development uses package.json proxy; production uses same-origin /api.
  return '';
}

export function apiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
