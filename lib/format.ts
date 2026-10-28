import { CURRENCY } from "./products";

const number = new Intl.NumberFormat(CURRENCY.locale, { maximumFractionDigits: 0 });

/** "14,500" — the amount without currency. */
export function formatAmount(amount: number): string {
  return number.format(amount);
}

/** "BDT 14,500" — plain-text price for labels and screen readers. */
export function formatPrice(amount: number): string {
  return `${CURRENCY.code} ${formatAmount(amount)}`;
}
