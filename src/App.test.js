import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import * as authApi from './services/authApi';
import * as customersApi from './services/customersApi';
import * as dashboardApi from './services/dashboardApi';
import * as sweetAlert from './utils/sweetAlert';

jest.mock('./services/authApi');
jest.mock('./services/customersApi');
jest.mock('./services/dashboardApi');
jest.mock('./utils/sweetAlert', () => ({
  showSuccess: jest.fn(() => Promise.resolve()),
  showError: jest.fn(() => Promise.resolve()),
  showConfirm: jest.fn(() => Promise.resolve(true)),
}));

const mockCustomer = {
  id: '1',
  name: 'Jane Doe',
  phone: '255 700 123 456',
  gender: 'Female',
  email: 'jane@example.com',
  purchase: 0,
  tillBonas: 0,
  loyaltyProgress: 0,
  loyaltyHistory: 0,
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  sweetAlert.showConfirm.mockResolvedValue(true);
  sweetAlert.showSuccess.mockResolvedValue(undefined);
  sweetAlert.showError.mockResolvedValue(undefined);
  dashboardApi.fetchDashboardStats.mockResolvedValue({
    customers: 4,
    redeemedCards: 2,
    totalPurchases: 24,
    untappedScores: 10,
  });
  authApi.login.mockResolvedValue({
    email: 'admin@admin.com',
    name: 'Admin',
  });
  customersApi.fetchCustomers.mockResolvedValue([mockCustomer]);
  customersApi.createCustomer.mockResolvedValue({
    id: '2',
    name: 'John Smith',
    phone: '255 711 222 333',
    gender: 'Male',
    email: 'john@example.com',
    purchase: 0,
    tillBonas: 0,
    loyaltyProgress: 0,
    loyaltyHistory: 0,
  });
  customersApi.deleteCustomer.mockResolvedValue(undefined);
  customersApi.addPurchase.mockImplementation((id) =>
    Promise.resolve({ ...mockCustomer, id, purchase: 1, loyaltyProgress: 1 })
  );
  customersApi.redeemCustomer.mockImplementation((id) =>
    Promise.resolve({ ...mockCustomer, id, loyaltyProgress: 0, loyaltyHistory: 1 })
  );
});

function renderApp(initialRoute = '/') {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRoutes />
    </MemoryRouter>
  );
}

async function signIn() {
  renderApp('/');
  await userEvent.type(screen.getByLabelText('Password'), 'admin');
  await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
  await waitFor(() => {
    expect(screen.getByText('Overview for customer')).toBeInTheDocument();
  });
}

async function openPurchasersPage() {
  await signIn();
  await userEvent.click(screen.getByRole('link', { name: 'Purchasers' }));
  expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
}

test('shows login page at / even when a session exists', () => {
  localStorage.setItem(
    'tapreward_session',
    JSON.stringify({ email: 'admin@admin.com', name: 'admin' })
  );
  renderApp('/');
  expect(screen.getByText('Sign in to access your dashboard')).toBeInTheDocument();
});

test('opens dashboard after sign in', async () => {
  await signIn();
  expect(await screen.findByText('Customer')).toBeInTheDocument();
  expect(screen.getByText('Redeemed Cards')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
});

test('logs out back to login page', async () => {
  await signIn();
  await userEvent.click(screen.getByRole('button', { name: 'Log out' }));
  await waitFor(() => {
    expect(screen.getByText('Sign in to access your dashboard')).toBeInTheDocument();
  });
});

test('shows empty state when there are no customers', async () => {
  customersApi.fetchCustomers.mockResolvedValue([]);
  await signIn();
  await userEvent.click(screen.getByRole('link', { name: 'Purchasers' }));
  expect(await screen.findByText('No customers yet. Add your first customer.')).toBeInTheDocument();
});

test('opens row actions menu on three dots click', async () => {
  await openPurchasersPage();
  await userEvent.click(screen.getByRole('button', { name: 'Actions for Jane Doe' }));

  expect(screen.getByRole('menu')).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: 'View' })).toBeInTheDocument();
});

test('opens customer progress modal when View is clicked', async () => {
  await openPurchasersPage();
  await userEvent.click(screen.getByRole('button', { name: 'Actions for Jane Doe' }));
  await userEvent.click(screen.getByRole('menuitem', { name: 'View' }));

  expect(screen.getByText('Customer Progress')).toBeInTheDocument();
});

test('opens add customer modal on Purchasers page', async () => {
  await openPurchasersPage();
  await userEvent.click(screen.getByRole('button', { name: 'Add Contact' }));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('adds a customer from the modal', async () => {
  await openPurchasersPage();
  await userEvent.click(screen.getByRole('button', { name: 'Add Contact' }));

  await userEvent.type(screen.getByPlaceholderText('Enter name'), 'John Smith');
  await userEvent.type(screen.getByPlaceholderText('Enter number'), '255 711 222 333');
  await userEvent.type(screen.getByPlaceholderText('Enter email'), 'john@example.com');
  await userEvent.click(screen.getByLabelText('Male'));
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));

  await waitFor(() => {
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });
});

test('renders bulk sms form when Bulk SMS nav is clicked', async () => {
  await signIn();
  await userEvent.click(screen.getByRole('link', { name: 'Bulk SMS' }));

  expect(screen.getByRole('heading', { level: 1, name: 'Bulk SMS' })).toBeInTheDocument();
});

test('loads purchase page from /purchase route', async () => {
  localStorage.setItem(
    'tapreward_session',
    JSON.stringify({ email: 'admin@admin.com', name: 'Admin' })
  );
  renderApp('/purchase');
  expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
});

test('paginates customers with 10 items per page', async () => {
  const customers = Array.from({ length: 12 }, (_, index) => ({
    ...mockCustomer,
    id: String(index + 1),
    name: `Customer ${index + 1}`,
    phone: `255700000${String(index).padStart(2, '0')}`,
    email: `customer${index + 1}@example.com`,
  }));

  customersApi.fetchCustomers.mockResolvedValue(customers);

  await signIn();
  await userEvent.click(screen.getByRole('link', { name: 'Purchasers' }));

  expect(await screen.findByText('Customer 1')).toBeInTheDocument();
  expect(screen.getByText('Customer 10')).toBeInTheDocument();
  expect(screen.queryByText('Customer 11')).not.toBeInTheDocument();
  expect(screen.getByText('Showing 1-10 of 12')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Next page' }));

  expect(await screen.findByText('Customer 11')).toBeInTheDocument();
  expect(screen.getByText('Customer 12')).toBeInTheDocument();
  expect(screen.queryByText('Customer 1')).not.toBeInTheDocument();
  expect(screen.getByText('Showing 11-12 of 12')).toBeInTheDocument();
});
