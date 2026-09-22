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
 * This matches the grouped bank list from SendMoneyForm.jsx
 */
const BANKS = {
  // Commercial Banks
  '101': 'GTBank',
  '044': 'Access Bank',
  '401': 'Zenith Bank',
  '501': 'UBA',
  '012': 'Fidelity Bank',
  '103': 'Kuda Bank',
  '050': 'Ecobank',
  '011': 'First Bank of Nigeria',
  '032': 'Union Bank of Nigeria',
  '076': 'Polaris Bank',
  '082': 'Keystone Bank',
  '035': 'Wema Bank',
  '232': 'Sterling Bank',
  '221': 'Stanbic IBTC Bank',
  '215': 'Unity Bank',
  '301': 'Jaiz Bank',
  // Digital Banks
  '201': 'OPay',
  '100': 'Providus Bank',
  '313': 'Titan Trust Bank',
  '503': 'VFD Microfinance Bank',
};

export function getBankName(code) {
  return BANKS[code] || `${code}`;
}
