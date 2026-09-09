/**
 * Utility functions for the NairaFlow dashboard.
 * These are the SAME formatters from Phase 2's utils.js,
 * now exported as ES modules for React.
 */

/**
 * Format an integer kobo amount into a display string.
 * e.g. 245000000 → "₦2,450,000.00"
 */
export function formatKobo(kobo) {
  const naira = kobo / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(naira);
}

/**
 * Format any amount in any currency.
 * e.g. formatCurrency(1500, 'USD') → "$1,500.00"
 */
export function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format an ISO date string into a human-readable relative date.
 * e.g. "2026-09-07T14:32:00Z" → "Today, 14:32" or "5 Sep 2026"
 */
export function formatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now - date;

  if (diff < 86400000 && date.getDate() === now.getDate()) {
    return `Today, ${date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}`;
  }

  if (diff < 172800000) {
    return `Yesterday, ${date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}`;
  }

  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Get a greeting based on the time of day.
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Nigerian bank code → name mapping.
 */
const BANKS = {
  '101': 'GTBank',
  '044': 'Access Bank',
  '012': 'Fidelity Bank',
  '050': 'Ecobank',
  '103': 'Kuda Bank',
  '302': 'Flutterwave',
  '401': 'Zenith Bank',
  '201': 'OPay',
  '501': 'UBA',
};

export function getBankName(code) {
  return BANKS[code] ?? `Bank ${code}`;
}
