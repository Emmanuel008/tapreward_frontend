import { useMemo, useState } from 'react';
import { getSmsSenderId } from '../../config/app';
import { getSmsErrorMessage, sendSms } from '../../services/smsApi';
import { parsePhoneNumbers } from '../../utils/phoneNumbers';
import { showError, showSuccess } from '../../utils/sweetAlert';
import './BulkSmsForm.css';

function estimateSmsParts(length) {
  if (length === 0) return 0;
  if (length <= 160) return 1;
  return Math.ceil(length / 153);
}

function BulkSmsForm() {
  const [senderId, setSenderId] = useState(() => getSmsSenderId());
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const charCount = message.length;
  const smsParts = useMemo(() => estimateSmsParts(charCount), [charCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipients = parsePhoneNumbers(phoneNumbers);
    if (recipients.length === 0) {
      showError('Invalid numbers', 'Enter at least one valid phone number.');
      return;
    }

    if (!message.trim()) {
      showError('Message required', 'Message cannot be empty.');
      return;
    }

    setIsSending(true);

    try {
      await sendSms({
        senderId: senderId.trim(),
        phoneNumbers: recipients,
        message: message.trim(),
      });

      showSuccess('SMS sent', `Message sent to ${recipients.length} recipient(s).`);
    } catch (error) {
      showError('SMS failed', getSmsErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bulk-sms-form-card">
      <div className="bulk-sms-form-card__intro">
        <h2>Bulk SMS</h2>
        <p>Enter phone numbers and your message below.</p>
      </div>

      <form className="bulk-sms-form" onSubmit={handleSubmit}>
        <div className="bulk-sms-form__field">
          <label htmlFor="sender-id">Sender ID</label>
          <input
            id="sender-id"
            type="text"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            disabled={isSending}
            required
          />
          <span className="bulk-sms-form__hint">
            This name appears as the message sender.
          </span>
        </div>

        <div className="bulk-sms-form__field">
          <label htmlFor="phone-numbers">Phone numbers</label>
          <textarea
            id="phone-numbers"
            className="bulk-sms-form__textarea--phones"
            rows={3}
            placeholder="Enter phone numbers separated by commas or new lines"
            value={phoneNumbers}
            onChange={(e) => setPhoneNumbers(e.target.value)}
            disabled={isSending}
            required
          />
          <span className="bulk-sms-form__hint">
            Separate numbers with commas, semicolons, or one per line.
          </span>
        </div>

        <div className="bulk-sms-form__field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending}
            required
          />
          <span className="bulk-sms-form__hint bulk-sms-form__hint--count">
            {charCount} characters · estimated {smsParts} SMS part(s)
          </span>
        </div>

        <div className="bulk-sms-form__actions">
          <button
            type="button"
            className="bulk-sms-form__btn bulk-sms-form__btn--secondary"
            disabled={isSending}
          >
            Save draft
          </button>
          <button
            type="submit"
            className="bulk-sms-form__btn bulk-sms-form__btn--primary"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send SMS'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BulkSmsForm;
