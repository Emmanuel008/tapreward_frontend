import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addPurchase,
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  getCustomersApiErrorMessage,
  getSmsStatusMessage,
  redeemCustomer,
} from '../../services/customersApi';
import { getSmsErrorMessage, sendSms } from '../../services/smsApi';
import { normalizePhone } from '../../utils/phoneNumbers';
import { showConfirm, showError, showSuccess } from '../../utils/sweetAlert';
import PageHeader from '../PageHeader/PageHeader';
import './PurchasersPage.css';
import AddCustomerModal from './AddCustomerModal';
import CustomerProgressModal from './CustomerProgressModal';
import PurchasersTable from './PurchasersTable';

const DEFAULT_SENDER_ID = 'NILETEE';
const DEFAULT_SMS_MESSAGE = 'Hi! Thank you for being a loyal TapReward customer.';
const PAGE_SIZE = 10;

function PurchasersPage({ searchQuery, onSearchChange }) {
  const [purchasers, setPurchasers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewPurchaser, setViewPurchaser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      const customers = await fetchCustomers();
      setPurchasers(Array.isArray(customers) ? customers : []);
    } catch (error) {
      showError('Could not load customers', getCustomersApiErrorMessage(error));
      setPurchasers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredPurchasers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return purchasers;

    return purchasers.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.phone.replace(/\s/g, '').includes(query.replace(/\s/g, '')) ||
        p.gender.toLowerCase().includes(query) ||
        (p.email || '').toLowerCase().includes(query)
    );
  }, [purchasers, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPurchasers.length / PAGE_SIZE));

  const paginatedPurchasers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPurchasers.slice(start, start + PAGE_SIZE);
  }, [filteredPurchasers, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const selectedPurchaser = viewPurchaser
    ? purchasers.find((p) => p.id === viewPurchaser.id) ?? viewPurchaser
    : null;

  const handleAddCustomer = async (contact) => {
    try {
      const { customer: created, sms } = await createCustomer(contact);
      setPurchasers((prev) => [created, ...prev]);
      setShowAddModal(false);
      showSuccess('Customer added', `${created.name} was added successfully.`);

      const smsError = getSmsStatusMessage(sms);
      if (smsError) {
        showError('Welcome SMS not sent', smsError);
      }
    } catch (error) {
      showError('Could not add customer', getCustomersApiErrorMessage(error));
    }
  };

  const handleAddPurchase = async (id, cups = 1) => {
    try {
      const { customer: updated, sms, cupsAdded } = await addPurchase(id, cups);
      setPurchasers((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setViewPurchaser(updated);
      showSuccess(
        'Purchase added',
        `${cupsAdded} cup${cupsAdded === 1 ? '' : 's'} recorded. Loyalty progress updated.`
      );

      const smsError = getSmsStatusMessage(sms);
      if (smsError) {
        showError('Purchase SMS not sent', smsError);
      }
    } catch (error) {
      showError('Could not add purchase', getCustomersApiErrorMessage(error));
    }
  };

  const handleRedeem = async (id) => {
    try {
      const { customer: updated, sms } = await redeemCustomer(id);
      setPurchasers((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setViewPurchaser(updated);
      showSuccess('Reward redeemed', 'Loyalty history updated.');

      const smsError = getSmsStatusMessage(sms);
      if (smsError) {
        showError('Redeem SMS not sent', smsError);
      }
    } catch (error) {
      showError('Could not redeem', getCustomersApiErrorMessage(error));
    }
  };

  const handleDelete = async (id) => {
    const purchaser = purchasers.find((p) => p.id === id);
    const confirmed = await showConfirm({
      title: 'Delete customer?',
      text: purchaser
        ? `Remove ${purchaser.name} from your customer list?`
        : 'This action cannot be undone.',
      confirmText: 'Delete',
      icon: 'warning',
    });

    if (!confirmed) return;

    try {
      await deleteCustomer(id);
      setPurchasers((prev) => prev.filter((p) => p.id !== id));
      if (viewPurchaser?.id === id) setViewPurchaser(null);
      showSuccess('Customer deleted', purchaser ? `${purchaser.name} was removed.` : 'Customer removed.');
    } catch (error) {
      showError('Could not delete customer', getCustomersApiErrorMessage(error));
    }
  };

  const handleSendSms = async (purchaser) => {
    try {
      await sendSms({
        senderId: DEFAULT_SENDER_ID,
        phoneNumbers: [normalizePhone(purchaser.phone)],
        message: DEFAULT_SMS_MESSAGE,
      });
      showSuccess('SMS sent', `Message sent to ${purchaser.name}.`);
    } catch (error) {
      showError('SMS failed', getSmsErrorMessage(error));
    }
  };

  return (
    <div className="purchasers-page">
      <PageHeader
        title="Dashboard"
        subtitle="Overview for customer"
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onAddClick={() => setShowAddModal(true)}
      />
      {isLoading ? (
        <p className="purchasers-page__loading">Loading customers...</p>
      ) : filteredPurchasers.length === 0 ? (
        <p className="purchasers-page__empty">No customers yet. Add your first customer.</p>
      ) : (
        <PurchasersTable
          purchasers={paginatedPurchasers}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
          totalItems={filteredPurchasers.length}
          onPageChange={setCurrentPage}
          onView={setViewPurchaser}
          onSendSms={handleSendSms}
          onDelete={handleDelete}
        />
      )}

      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCustomer}
      />

      <CustomerProgressModal
        purchaser={selectedPurchaser}
        isOpen={!!selectedPurchaser}
        onClose={() => setViewPurchaser(null)}
        onAddPurchase={handleAddPurchase}
        onRedeem={handleRedeem}
      />
    </div>
  );
}

export default PurchasersPage;
