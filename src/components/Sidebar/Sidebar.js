import { NavLink } from 'react-router-dom';
import { navItems } from '../../data/navItems';
import { LogoIcon, LogoutIcon, NavIcon } from '../icons/Icons';
import './Sidebar.css';

function Sidebar({ session, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <LogoIcon size={28} />
        <span className="sidebar__brand-name">TapReward</span>
      </div>

      <div className="sidebar__divider sidebar__divider--brand" />

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navItems.map((item, index) => (
          <div key={item.id} className="sidebar__nav-item">
            <NavLink
              to={item.path}
              aria-label={item.label}
              className={({ isActive }) =>
                `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
              }
            >
              <span className="sidebar__link-icon" aria-hidden="true">
                <NavIcon name={item.id} />
              </span>
              <span className="sidebar__link-label" aria-hidden="true">
                {item.label}
              </span>
              <span className="sidebar__link-label-short" aria-hidden="true">
                {item.shortLabel}
              </span>
            </NavLink>
            {index < navItems.length - 1 && (
              <div className="sidebar__divider sidebar__divider--nav" />
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <span className="sidebar__user-avatar">
            {session?.name?.charAt(0)?.toUpperCase() || 'A'}
          </span>
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">{session?.name || 'Admin'}</span>
            <span className="sidebar__user-email">{session?.email}</span>
          </div>
        </div>
        <button
          type="button"
          className="sidebar__logout"
          onClick={onLogout}
          aria-label="Log out"
        >
          <span className="sidebar__logout-icon" aria-hidden="true">
            <LogoutIcon />
          </span>
          <span className="sidebar__logout-label">Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
