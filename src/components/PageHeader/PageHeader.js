import { SearchIcon } from '../icons/Icons';
import './PageHeader.css';

function PageHeader({ title, subtitle, searchQuery, onSearchChange, onAddClick }) {
  return (
    <header className="page-header">
      <div className="page-header__title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="page-header__actions">
        {onAddClick ? (
          <button type="button" className="page-header__add-btn" onClick={onAddClick}>
            Add Contact
          </button>
        ) : null}
        <div className="page-header__search">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search User"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search User"
          />
        </div>
        <div className="page-header__avatar" aria-label="User profile">
          A
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
