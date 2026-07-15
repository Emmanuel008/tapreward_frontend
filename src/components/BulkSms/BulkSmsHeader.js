import { SearchIcon } from '../icons/Icons';
import { getDisplayName, getUserInitial } from '../../utils/userDisplay';
import './BulkSmsHeader.css';

function BulkSmsHeader({ session }) {
  const displayName = getDisplayName(session);
  const userInitial = getUserInitial(session?.name, session?.email);

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
            {userInitial}
          </div>
          <div className="bulk-sms-header__profile-info">
            <span className="bulk-sms-header__profile-name">{displayName}</span>
            {session?.email ? (
              <span className="bulk-sms-header__profile-email">{session.email}</span>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default BulkSmsHeader;
