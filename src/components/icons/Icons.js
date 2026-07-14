export function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M8 4H4a1 1 0 00-1 1v10a1 1 0 001 1h4M12 10H8M12 10l-2-2M12 10l-2 2M12 10h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function PurchasersNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 16c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 6a2.5 2.5 0 010 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SmsNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H9l-3 3v-3H6a2 2 0 01-2-2V5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navIconMap = {
  dashboard: DashboardNavIcon,
  purchase: PurchasersNavIcon,
  sms: SmsNavIcon,
};

export function NavIcon({ name }) {
  const Icon = navIconMap[name];
  return Icon ? <Icon /> : null;
}

export function LogoIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#7C3AED" />
      <path
        d="M16 7l1.8 4 4.2 1.2-3.2 2.8.9 4.3L16 17.5l-3.7 2.8.9-4.3-3.2-2.8 4.2-1.2L16 7z"
        fill="white"
      />
    </svg>
  );
}

export function CustomerStatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="6" r="2.5" stroke="white" strokeWidth="1.2" />
      <path d="M4 15c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13 4a3 3 0 010 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M15 4v1M15 7v1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function RedeemedStatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="10" height="7" rx="1.5" stroke="white" strokeWidth="1.2" />
      <rect x="5" y="3" width="10" height="7" rx="1.5" stroke="white" strokeWidth="1.2" opacity="0.6" />
      <path d="M14 6a2.5 2.5 0 010 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function PurchaseStatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="7" cy="6" r="2.5" stroke="white" strokeWidth="1.2" />
      <path d="M3 14c0-2.2 1.8-4 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 10h5M13.5 8v4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function UntappedStatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="7" cy="6" r="2.5" stroke="white" strokeWidth="1.2" />
      <path d="M3 14c0-2.2 1.8-4 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="13" cy="13" r="2.5" stroke="white" strokeWidth="1.2" />
      <path d="M14.8 14.8l1.7 1.7" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const statIconMap = {
  customer: CustomerStatIcon,
  redeemed: RedeemedStatIcon,
  purchase: PurchaseStatIcon,
  untapped: UntappedStatIcon,
};

export function StatIcon({ name }) {
  const Icon = statIconMap[name];
  return Icon ? <Icon /> : null;
}

export function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="3" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="13" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3" fill="#64748b" />
      <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="#64748b" />
    </svg>
  );
}
