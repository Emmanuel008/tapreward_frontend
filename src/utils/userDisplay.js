export function getUserInitial(name, email) {
  const source = name?.trim() || email?.trim() || '';
  return source.charAt(0).toUpperCase() || '?';
}

export function getDisplayName(session) {
  if (session?.name?.trim()) {
    return session.name.trim();
  }

  if (session?.email?.trim()) {
    return session.email.split('@')[0];
  }

  return 'User';
}
