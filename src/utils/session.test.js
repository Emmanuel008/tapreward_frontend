import { clearSession, getSession, saveSession } from './session';

describe('session', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saves session from email and name', () => {
    const session = saveSession({ email: 'admin@admin.com', name: 'Admin' });
    expect(session.email).toBe('admin@admin.com');
    expect(session.name).toBe('Admin');
    expect(getSession()).toEqual(session);
  });

  test('clears session on logout', () => {
    saveSession({ email: 'user@example.com' });
    clearSession();
    expect(getSession()).toBeNull();
  });
});
