import { apiUrl } from '../config/api';

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'Request failed.');
  }

  return data;
}

export async function fetchSmsLogs({ status = '', limit = 50 } = {}) {
  const params = new URLSearchParams();

  if (status) params.set('status', status);
  if (limit) params.set('limit', String(limit));

  const query = params.toString();
  const data = await parseResponse(
    await fetch(apiUrl(`/api/sms-logs${query ? `?${query}` : ''}`))
  );

  return data.logs ?? [];
}

export async function retrySmsLog(id) {
  const data = await parseResponse(
    await fetch(apiUrl(`/api/sms-logs/${id}/retry`), {
      method: 'POST',
    })
  );

  return data;
}
