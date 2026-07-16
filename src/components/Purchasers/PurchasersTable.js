import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreIcon } from '../icons/Icons';
import './PurchasersTable.css';

const menuItems = [
  { id: 'view', label: 'View' },
  { id: 'sms', label: 'Send SMS' },
  { id: 'offer', label: 'Special Offer' },
  { id: 'delete', label: 'Delete', destructive: true },
];

function PurchasersTable({
  purchasers = [],
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onDelete,
  onView,
  onSendSms,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const menuRef = useRef(null);
  const menuButtonRefs = useRef({});

  const openPurchaser = purchasers.find((purchaser) => purchaser.id === openMenuId);

  const updateMenuPosition = useCallback(() => {
    if (!openMenuId) return;

    const button = menuButtonRefs.current[openMenuId];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 4,
      right: window.innerWidth - rect.right,
    });
  }, [openMenuId]);

  useLayoutEffect(() => {
    if (!openMenuId) {
      setMenuPosition(null);
      return undefined;
    }

    updateMenuPosition();

    window.addEventListener('resize', updateMenuPosition);
    window.addEventListener('scroll', updateMenuPosition, true);

    return () => {
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('scroll', updateMenuPosition, true);
    };
  }, [openMenuId, updateMenuPosition]);

  useEffect(() => {
    if (!openMenuId) return undefined;

    const handleClickOutside = (event) => {
      const button = menuButtonRefs.current[openMenuId];

      if (menuRef.current?.contains(event.target)) return;
      if (button?.contains(event.target)) return;

      setOpenMenuId(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const handleMenuAction = (actionId, purchaser) => {
    if (actionId === 'view' && onView) {
      onView(purchaser);
    }
    if (actionId === 'sms' && onSendSms) {
      onSendSms(purchaser);
    }
    if (actionId === 'delete' && onDelete) {
      onDelete(purchaser.id);
    }
    setOpenMenuId(null);
  };

  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  const menuPortal =
    openMenuId &&
    openPurchaser &&
    menuPosition &&
    createPortal(
      <div
        ref={menuRef}
        className="purchasers-table__dropdown purchasers-table__dropdown--portal"
        role="menu"
        style={{
          top: menuPosition.top,
          right: menuPosition.right,
        }}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className={
              item.destructive
                ? 'purchasers-table__dropdown-item purchasers-table__dropdown-item--delete'
                : 'purchasers-table__dropdown-item'
            }
            onClick={() => handleMenuAction(item.id, openPurchaser)}
          >
            {item.label}
          </button>
        ))}
      </div>,
      document.body
    );

  return (
    <div className="purchasers-table__wrapper">
      <div className="purchasers-table__scroll">
        <table className="purchasers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Purchase</th>
              <th>Till Bonas</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {purchasers.map((purchaser) => (
              <tr key={purchaser.id}>
                <td>
                  <div className="purchasers-table__name-cell">
                    <span className="purchasers-table__avatar" aria-hidden="true" />
                    <span>{purchaser.name}</span>
                  </div>
                </td>
                <td>{purchaser.phone}</td>
                <td>{purchaser.gender}</td>
                <td>{purchaser.purchase}</td>
                <td>{(purchaser.tillBonas ?? 0).toLocaleString()}</td>
                <td>
                  <div className="purchasers-table__actions">
                    <button
                      type="button"
                      ref={(element) => {
                        menuButtonRefs.current[purchaser.id] = element;
                      }}
                      className="purchasers-table__menu-btn"
                      aria-label={`Actions for ${purchaser.name}`}
                      aria-expanded={openMenuId === purchaser.id}
                      aria-haspopup="menu"
                      onClick={() =>
                        setOpenMenuId(openMenuId === purchaser.id ? null : purchaser.id)
                      }
                    >
                      <MoreIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <div className="purchasers-table__pagination">
          <p className="purchasers-table__pagination-info">
            Showing {rangeStart}-{rangeEnd} of {totalItems}
          </p>
          {totalPages > 1 && (
            <div className="purchasers-table__pagination-controls">
              <button
                type="button"
                className="purchasers-table__pagination-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                Previous
              </button>
              <span className="purchasers-table__pagination-pages">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="purchasers-table__pagination-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {menuPortal}
    </div>
  );
}

export default PurchasersTable;
