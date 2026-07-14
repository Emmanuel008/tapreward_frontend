const CUSTOMERS_URL = `${process.env.REACT_APP_API_URL || ''}/api/customers`;

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'Request failed.');
  }

  return data;
}

export async function fetchCustomers() {
  const data = await parseResponse(await fetch(CUSTOMERS_URL));
  return data.customers ?? [];
}

export async function createCustomer(customer) {
  const data = await parseResponse(
    await fetch(CUSTOMERS_URL, {
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
    await fetch(`${CUSTOMERS_URL}/${id}`, {
      method: 'DELETE',
    })
  );
}

export async function addPurchase(id) {
  const data = await parseResponse(
    await fetch(`${CUSTOMERS_URL}/${id}/purchase`, {
      method: 'POST',
    })
  );

  return data.customer;
}

export async function redeemCustomer(id) {
  const data = await parseResponse(
    await fetch(`${CUSTOMERS_URL}/${id}/redeem`, {
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
