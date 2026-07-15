import { login, getAuthErrorMessage } from './authApi';

import { DEFAULT_API_BASE_URL } from '../config/api';

const LIVE_API_BASE = DEFAULT_API_BASE_URL;

describe('authApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    delete process.env.REACT_APP_API_URL;
  });

  test('login calls only /api/login once', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        user: { email: 'admin@admin.com', name: 'Admin' },
      }),
    });

    const user = await login('admin@admin.com', 'admin');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${LIVE_API_BASE}/api/login`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'admin@admin.com', password: 'admin' }),
      })
    );
    expect(user).toEqual({ email: 'admin@admin.com', name: 'Admin' });
  });

  test('login throws on invalid credentials', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: 'Invalid email or password.' }),
    });

    await expect(login('admin@admin.com', 'wrong')).rejects.toThrow(
      'Invalid email or password.'
    );
  });

  test('getAuthErrorMessage returns message from error', () => {
    expect(getAuthErrorMessage(new Error('Network error'))).toBe('Network error');
  });
});
