/**
 * Mock data generator — realistic Nigerian fintech data.
 * Used by MSW handlers to return dynamic data.
 */

const NIGERIAN_NAMES = [
  'Chinedu Okafor', 'Amina Bello', 'Tunde Bakare', 'Fatima Abdullahi',
  'Emeka Nwachukwu', 'Aisha Mohammed', 'Oluwaseun Adeyemi',
  'Ngozi Eze', 'Ibrahim Suleiman', 'Chidinma Obi',
  'Yusuf Abubakar', 'Folake Ogundimu', 'Obinna Uzoma',
  'Halima Usman', 'Adebayo Oladipo', 'Zainab Balogun',
  'Kelechi Nnadi', 'Maryam Danjuma', 'Tobi Ajayi', 'Blessing Edet',
];

const BANKS = [
  'GTBank', 'Access Bank', 'Zenith Bank', 'UBA', 'Fidelity Bank',
  'Kuda Bank', 'OPay', 'Ecobank', 'Wema Bank', 'Stanbic IBTC',
];

const DESCRIPTIONS = [
  'Transfer to', 'Airtime - MTN', 'Airtime - Glo', 'Data Bundle - Airtel',
  'Electricity - EKEDC', 'Netflix Subscription', 'Spotify Premium',
  'Safelock - Monthly', 'USD Top-up', 'Water Bill',

];

// Data Bundle + Airtime = Connectivity
// Netflix Subscription as TV
// Water Bill + USD Top-Up as Online Payment
// Safelock as Safebox

const STATUSES = ['success', 'success', 'success', 'success', 'pending', 'failed'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTransactions(count = 15) {
  return Array.from({ length: count }, (_, i) => {
    const name = NIGERIAN_NAMES[i % NIGERIAN_NAMES.length];
    const desc = i < 10 ? `Transfer to ${name}` : randomItem(DESCRIPTIONS);
    return {
      id: `tx-${String(i + 1).padStart(3, '0')}`,
      description: desc,
      amount: Math.floor(Math.random() * 50000000) + 10000,
      currency: 'NGN',
      status: randomItem(STATUSES),
      bank: randomItem(BANKS),
      account: String(Math.floor(Math.random() * 9000000000) + 1000000000),
      date: new Date(Date.now() - i * 3600000 * (2 + Math.random() * 20)).toISOString(),
      fee: Math.random() > 0.5 ? 15000 : 0,
    };
  });
}

export const SAVINGS_PLANS = [
  { id: 'sav-001', type: 'fixed', name: 'Fixed Deposit', target: 500000000, current: 235000000, apy: 15.2, locked: true },
  { id: 'sav-002', type: 'flexible', name: 'Flexible Savings', target: 100000000, current: 45000000, apy: 8.5, locked: false },
  { id: 'sav-003', type: 'safelock', name: 'Safelock', target: 200000000, current: 120000000, apy: 12.0, locked: true },
];

export const EXCHANGE_RATES = {
  NGN: 1,
  USD: 0.000678,
  GBP: 0.000505,
  EUR: 0.000578,
  CAD: 0.000938,
};
