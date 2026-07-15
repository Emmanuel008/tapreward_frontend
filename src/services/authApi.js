import { apiUrl } from '../config/api';

export async function login(email, password) {
  let response;

  try {
    response = await fetch(apiUrl('/api/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    throw new Error(
      'Could not reach the server. Check your connection or try again shortly.'
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'Invalid email or password.');
  }

  return data.user;
}

export function getAuthErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Login failed. Please try again.';
}
