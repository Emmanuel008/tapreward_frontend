import { useEffect, useState } from 'react';
import { CloseIcon, PersonIcon } from '../icons/Icons';
import { TOTAL_STAMPS, cupsUntilFreeCoffee } from '../../constants/loyalty';
import { getSmsErrorMessage, sendSms } from '../../services/smsApi';
import { normalizePhone } from '../../utils/phoneNumbers';
import { showError, showSuccess } from '../../utils/sweetAlert';
import './CustomerProgressModal.css';

const DEFAULT_SENDER_ID = 'NILETEE';
const DEFAULT_SMS_MESSAGE = 'Hi! Thank you for being a loyal TapReward customer.';

function formatPhone(phone) {
  const trimmed = phone.trim();
  return trimmed.startsWith('+') ? trimmed : `+${trimmed.replace(/^\+/, '')}`;
}

function CustomerProgressModal({
  purchaser,
  isOpen,
  onClose,
  onAddPurchase,
  onRedeem,
}) {
  const [isSending, setIsSending] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cupCount, setCupCount] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setCupCount(1);
    }
  }, [isOpen, purchaser?.id]);

  if (!isOpen || !purchaser) return null;

  const progress = Math.min(TOTAL_STAMPS, purchaser.loyaltyProgress ?? 0);
  const history = purchaser.loyaltyHistory ?? 0;
  const purchaseCount = purchaser.purchase ?? 0;
  const canRedeem = progress >= TOTAL_STAMPS;
  const remainingAfterPurchase = cupsUntilFreeCoffee(progress + cupCount);

  const handleCupCountChange = (event) => {
    const nextValue = Number.parseInt(event.target.value, 10);
    if (Number.isNaN(nextValue)) {
      setCupCount(1);
      return;
    }

    setCupCount(Math.max(1, Math.min(99, nextValue)));
  };

  const handleAddPurchase = async () => {
    setIsUpdating(true);
    try {
      await onAddPurchase(purchaser.id, cupCount);
      setCupCount(1);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRedeem = async () => {
    setIsUpdating(true);
    try {
      await onRedeem(purchaser.id);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendSms = async () => {
    setIsSending(true);

    try {
      await sendSms({
        senderId: DEFAULT_SENDER_ID,
        phoneNumbers: [normalizePhone(purchaser.phone)],
        message: DEFAULT_SMS_MESSAGE,
      });
      showSuccess('SMS sent', 'Message sent successfully.');
    } catch (error) {
      showError('SMS failed', getSmsErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="customer-progress-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="customer-progress-title"
        aria-modal="true"
      >
        <div className="customer-progress-modal__header">
          <div className="customer-progress-modal__header-info">
            <span className="customer-progress-modal__header-icon">
              <PersonIcon />
            </span>
            <div>
              <h2 id="customer-progress-title">Customer Progress</h2>
              <p>Track purchase</p>
            </div>
          </div>
          <button
            type="button"
            className="customer-progress-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="customer-progress-modal__body">
          <div className="customer-progress-modal__row">
            <span className="customer-progress-modal__label">Phone Number</span>
            <span className="customer-progress-modal__value">
              {formatPhone(purchaser.phone)}
            </span>
          </div>

          <div className="customer-progress-modal__row">
            <span className="customer-progress-modal__label">Purchase Count</span>
            <span className="customer-progress-modal__value">{purchaseCount}</span>
          </div>

          <div className="customer-progress-modal__row customer-progress-modal__row--cups">
            <label className="customer-progress-modal__label" htmlFor="cup-count-input">
              Cups This Purchase
            </label>
            <div className="customer-progress-modal__cup-input-wrap">
              <input
                id="cup-count-input"
                type="number"
                min="1"
                max="99"
                value={cupCount}
                onChange={handleCupCountChange}
                className="customer-progress-modal__cup-input"
                disabled={isUpdating || isSending}
              />
              <span className="customer-progress-modal__cup-hint">
                {remainingAfterPurchase === 0
                  ? 'Free coffee earned after this purchase'
                  : `${remainingAfterPurchase} more cup${remainingAfterPurchase === 1 ? '' : 's'} until free coffee`}
              </span>
            </div>
          </div>

          <div className="customer-progress-modal__row">
            <span className="customer-progress-modal__label">Loyalty Progress</span>
            <div className="customer-progress-modal__stamps" aria-label={`${progress} of ${TOTAL_STAMPS} stamps`}>
              {Array.from({ length: TOTAL_STAMPS }, (_, i) => (
                <span
                  key={i}
                  className={`customer-progress-modal__stamp${
                    i < progress ? ' customer-progress-modal__stamp--filled' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="customer-progress-modal__row">
            <span className="customer-progress-modal__label">Loyalty History</span>
            <span className="customer-progress-modal__value">{history}</span>
          </div>
        </div>

        <div className="customer-progress-modal__footer">
          <button
            type="button"
            className="customer-progress-modal__btn customer-progress-modal__btn--sms"
            onClick={handleSendSms}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send SMS'}
          </button>
          <div className="customer-progress-modal__footer-right">
            <button
              type="button"
              className="customer-progress-modal__btn customer-progress-modal__btn--redeem"
              onClick={handleRedeem}
              disabled={isSending || isUpdating || !canRedeem}
            >
              Redeem
            </button>
            <button
              type="button"
              className="customer-progress-modal__btn customer-progress-modal__btn--add"
              onClick={handleAddPurchase}
              disabled={isSending || isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Add Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProgressModal;
