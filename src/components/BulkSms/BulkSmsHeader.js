import { SearchIcon } from '../icons/Icons';
import './BulkSmsHeader.css';

function BulkSmsHeader() {
  return (
    <header className="bulk-sms-header">
      <div className="bulk-sms-header__title">
        <h1>Bulk SMS</h1>
        <p>Overview and recent activity</p>
      </div>

      <div className="bulk-sms-header__actions">
        <button type="button" className="bulk-sms-header__search-btn" aria-label="Search">
          <SearchIcon />
        </button>

        <div className="bulk-sms-header__profile">
          <div className="bulk-sms-header__avatar" aria-hidden="true">
            A
          </div>
          <div className="bulk-sms-header__profile-info">
            <span className="bulk-sms-header__profile-name">Admin</span>
            <span className="bulk-sms-header__profile-email">admin@admin.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default BulkSmsHeader;
