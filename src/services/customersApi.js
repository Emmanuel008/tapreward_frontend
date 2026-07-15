import { apiUrl } from '../config/api';

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'Request failed.');
  }

  return data;
}

export async function fetchCustomers() {
  const data = await parseResponse(await fetch(apiUrl('/api/customers')));
  return data.customers ?? [];
}

export async function createCustomer(customer) {
  const data = await parseResponse(
    await fetch(apiUrl('/api/customers'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
  );

  return data.customer;
}

export async function deleteCustomer(id) {
  await parseResponse(
    await fetch(apiUrl(`/api/customers/${id}`), {
      method: 'DELETE',
    })
  );
}

export async function addPurchase(id) {
  const data = await parseResponse(
    await fetch(apiUrl(`/api/customers/${id}/purchase`), {
      method: 'POST',
    })
  );

  return data.customer;
}

export async function redeemCustomer(id) {
  const data = await parseResponse(
    await fetch(apiUrl(`/api/customers/${id}/redeem`), {
      method: 'POST',
    })
  );

  return data.customer;
}

export function getCustomersApiErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}
