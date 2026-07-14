export const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', shortLabel: 'Home' },
  { id: 'purchase', label: 'Purchasers', path: '/purchase', shortLabel: 'Contacts' },
  { id: 'sms', label: 'Bulk SMS', path: '/sms', shortLabel: 'SMS' },
];

export const dashboardStatConfig = [
  {
    id: 'customer',
    label: 'Customer',
    key: 'customers',
    icon: 'customer',
  },
  {
    id: 'redeemed',
    label: 'Redeemed Cards',
    key: 'redeemedCards',
    icon: 'redeemed',
  },
  {
    id: 'purchase',
    label: 'Total Purchase',
    key: 'totalPurchases',
    icon: 'purchase',
  },
  {
    id: 'untapped',
    label: 'Untapped Scroes',
    key: 'untappedScores',
    icon: 'untapped',
  },
];
