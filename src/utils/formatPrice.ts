import { CURRENCY_SUFFIX } from "./constants";

/**
 * Formate un montant en FCFA avec séparateur de milliers (espace insécable).
 * ex: formatPrice(150000) -> "150 000 FCFA"
 */
export function formatPrice(amount: number): string {
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} ${CURRENCY_SUFFIX}`;
}

/** Version courte pour les cartes: 150 000 -> "150k" */
export function formatPriceShort(amount: number): string {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${Math.round(amount / 1000)}k`;
  return `${amount}`;
}
