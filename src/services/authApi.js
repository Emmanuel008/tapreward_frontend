const LOGIN_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api/login`
  : '/api/login';

export async function login(email, password) {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

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
