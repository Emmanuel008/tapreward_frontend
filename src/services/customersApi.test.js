import {
  addPurchase,
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  redeemCustomer,
} from './customersApi';

import { DEFAULT_API_BASE_URL } from '../config/api';

const LIVE_API_BASE = DEFAULT_API_BASE_URL;

describe('customersApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    delete process.env.REACT_APP_API_URL;
  });

  test('fetchCustomers returns customers from API', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        customers: [{ id: '1', name: 'Jane Doe' }],
      }),
    });

    const customers = await fetchCustomers();

    expect(fetch).toHaveBeenCalledWith(`${LIVE_API_BASE}/api/customers`);
    expect(customers).toHaveLength(1);
    expect(customers[0].name).toBe('Jane Doe');
  });

  test('createCustomer posts customer payload', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        customer: { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
      }),
    });

    const created = await createCustomer({
      name: 'Jane Doe',
      phone: '255 700 123 456',
      gender: 'Female',
      email: 'jane@example.com',
    });

    expect(fetch).toHaveBeenCalledWith(
      `${LIVE_API_BASE}/api/customers`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(created.customer.name).toBe('Jane Doe');
  });

  test('deleteCustomer calls delete endpoint', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    await deleteCustomer('1');

    expect(fetch).toHaveBeenCalledWith(`${LIVE_API_BASE}/api/customers/1`, { method: 'DELETE' });
  });

  test('addPurchase calls purchase endpoint', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        customer: { id: '1', purchase: 2 },
      }),
    });

    const updated = await addPurchase('1', 2);

    expect(fetch).toHaveBeenCalledWith(
      `${LIVE_API_BASE}/api/customers/1/purchase`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ cups: 2 }),
      })
    );
    expect(updated.customer.purchase).toBe(2);
  });

  test('redeemCustomer calls redeem endpoint', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        customer: { id: '1', loyaltyProgress: 0, loyaltyHistory: 1 },
      }),
    });

    const updated = await redeemCustomer('1');

    expect(fetch).toHaveBeenCalledWith(`${LIVE_API_BASE}/api/customers/1/redeem`, { method: 'POST' });
    expect(updated.customer.loyaltyHistory).toBe(1);
  });
});
