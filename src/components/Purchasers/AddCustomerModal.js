import { useState } from 'react';
import { CloseIcon, PersonIcon } from '../icons/Icons';
import './AddCustomerModal.css';

const emptyForm = {
  name: '',
  phone: '',
  gender: '',
  email: '',
};

function AddCustomerModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);

  if (!isOpen) return null;

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.gender || !form.email.trim()) return;

    await onAdd({
      name: form.name.trim(),
      phone: form.phone.trim(),
      gender: form.gender,
      email: form.email.trim(),
    });
    setForm(emptyForm);
  };

  return (
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div
        className="add-customer-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="add-customer-title"
        aria-modal="true"
      >
        <div className="add-customer-modal__header">
          <div className="add-customer-modal__header-info">
            <span className="add-customer-modal__header-icon">
              <PersonIcon />
            </span>
            <div>
              <h2 id="add-customer-title">Add Customer</h2>
              <p>Add new customer to track</p>
            </div>
          </div>
          <button
            type="button"
            className="add-customer-modal__close"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-customer-modal__body">
            <label className="add-customer-modal__field">
              <span>Name</span>
              <input
                type="text"
                placeholder="Enter name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>

            <label className="add-customer-modal__field">
              <span>Phone Number</span>
              <input
                type="text"
                placeholder="Enter number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </label>

            <label className="add-customer-modal__field">
              <span>Email</span>
              <input
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>

            <div className="add-customer-modal__gender">
              {['Male', 'Female'].map((option) => (
                <label
                  key={option}
                  className={`add-customer-modal__gender-option${
                    form.gender === option ? ' add-customer-modal__gender-option--selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={form.gender === option}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    required
                  />
                  <span className="add-customer-modal__radio" />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="add-customer-modal__footer">
            <button type="button" className="add-customer-modal__btn add-customer-modal__btn--cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="add-customer-modal__btn add-customer-modal__btn--add">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerModal;
