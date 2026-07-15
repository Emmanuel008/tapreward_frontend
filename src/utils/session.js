const SESSION_KEY = 'tapreward_session';

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession({ email, name }) {
  const trimmedEmail = (email || '').trim();
  const session = {
    email: trimmedEmail,
    name: (name || '').trim() || (trimmedEmail ? trimmedEmail.split('@')[0] : ''),
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
