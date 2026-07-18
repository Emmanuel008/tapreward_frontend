export const TOTAL_STAMPS = 5;
export const SHOP_NAME = process.env.REACT_APP_SHOP_NAME || 'XXXX Coffee Hub';

export function cupsUntilFreeCoffee(loyaltyProgress, totalStamps = TOTAL_STAMPS) {
  return Math.max(0, totalStamps - Math.min(totalStamps, loyaltyProgress ?? 0));
}
