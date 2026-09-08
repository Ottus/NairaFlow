/**
 * NairaFlow Fintech Dashboard — main.js
 * Phase 2: JavaScript (Weeks 4–6)
 * 
 * Entry point. Initializes all components and wires up events.
 * type="module" in the script tag enables ES module imports.
 */

import { Store } from './store.js';

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  user: { name: 'Chinedu Okafor', initials: 'CO' },
  balance: 245000000, // ₦2,450,000.00
  currency: 'NGN',
  trend: 12,
  filter: 'all',
  transactions: [],
  savings: [
    { id: 'sav-001', type: 'fixed', name: 'Fixed Deposit', target: 500000000, current: 235000000, apy: 15.2, locked: true },
    { id: 'sav-002', type: 'flexible', name: 'Flexible Savings', target: 100000000, current: 45000000, apy: 8.5, locked: false },
    { id: 'sav-003', type: 'safelock', name: 'Safelock', target: 200000000, current: 120000000, apy: 12.0, locked: true },
  ],
  rates: null
};

// Initialize the Store
const appStore = new Store(initialState);

// ============================================================
// UTILITY: Format kobo to Naira display string
// ============================================================

function formatKobo(kobo) {
  const naira = kobo / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN', minimumFractionDigits: 2,
  }).format(naira);
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now - date;
  if (diff < 86400000 && date.getDate() === now.getDate()) {
    return `Today, ${date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}`;
  }
  return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ============================================================
// DOM REFERENCES
// ============================================================

const balanceAmountEl = document.querySelector('.balance-amount');
const feedContainer = document.querySelector('.feed-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const savingsCards = document.querySelectorAll('.savings-card');
const transferForm = document.getElementById('transferForm');

// ============================================================
// RENDER FUNCTIONS (UI updates based on state)
// ============================================================

function renderBalance(state) {
  if (!balanceAmountEl) return;
  const formatted = formatKobo(state.balance);
  const [whole, decimal] = formatted.split('.');
  balanceAmountEl.innerHTML = `${whole}<span class="balance-decimal">.${decimal}</span>`;
}

function renderTransactions(state) {
  if (!feedContainer) return;
  if (state.transactions.length === 0) {
    feedContainer.innerHTML = '<p style="padding: 1rem; text-align: center;">No transactions found.</p>';
    return;
  }

  // Use Object.groupBy for filtering (fallback if not supported)
  let txs = state.transactions;
  if (state.filter !== 'all') {
    if (Object.groupBy) {
      const grouped = Object.groupBy(txs, tx => tx.status);
      txs = grouped[state.filter] || [];
    } else {
      txs = txs.filter(tx => tx.status === state.filter);
    }
  }

  feedContainer.innerHTML = txs.map(tx => `
    <article class="tx-row">
      <time class="tx-date" datetime="${tx.date}">${formatDate(tx.date)}</time>
      <div class="tx-info">
        <p class="tx-description">${tx.description}</p>
        <p class="tx-bank">${tx.bank} · ${tx.account}</p>
      </div>
      <p class="tx-amount tx-amount--debit">-${formatKobo(tx.amount)}</p>
      <span class="pill pill--${tx.status}">${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
    </article>
  `).join('');
}

function renderSavings(state) {
  savingsCards.forEach((card, index) => {
    const plan = state.savings[index];
    if (!plan) return;
    if (plan.locked) {
      card.setAttribute('data-locked', 'true');
    } else {
      card.removeAttribute('data-locked');
    }
  });
}

function renderFilters(state) {
  filterBtns.forEach(btn => {
    const filterText = btn.textContent.trim().toLowerCase();
    if ((filterText === 'all' && state.filter === 'all') || filterText === state.filter) {
      btn.classList.add('filter-btn--active');
    } else {
      btn.classList.remove('filter-btn--active');
    }
  });
}

// ============================================================
// ASYNC FETCHING
// ============================================================

async function fetchInitialData() {
  try {
    if (feedContainer) {
      feedContainer.innerHTML = '<p style="padding: 1rem; text-align: center;">Loading transactions...</p>';
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const response = await fetch('./data/transactions.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    appStore.dispatch({ type: 'SET_TRANSACTIONS', payload: data.transactions });
  } catch (error) {
    console.error('Fetch error:', error);
    if (feedContainer) {
      feedContainer.innerHTML = '<p style="padding: 1rem; color: red; text-align: center;">Failed to load transactions.</p>';
    }
  }
}

// ============================================================
// EVENT HANDLERS (Dispatching actions)
// ============================================================

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterText = btn.textContent.trim().toLowerCase();
    const newFilter = filterText === 'all' ? 'all' : filterText;
    appStore.dispatch({ type: 'SET_FILTER', payload: newFilter });
  });
});

// Savings lock toggle via event delegation (or directly if cards are static)
savingsCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const state = appStore.getState();
    const plan = state.savings[index];
    if (plan) {
      appStore.dispatch({ type: 'TOGGLE_SAVINGS_LOCK', payload: plan.id });
    }
  });
});

// Transfer Form Submit
if (transferForm) {
  transferForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Week 5 Day 2: Native form validation and FormData logic will go here
    console.log('Transfer form submitted');
  });
}

// ============================================================
// INIT
// ============================================================

function init() {
  console.log('NairaFlow Dashboard — JS & Store initialized ✅');

  // Subscribe UI to State changes
  appStore.subscribe((state) => {
    renderBalance(state);
    renderTransactions(state);
    renderSavings(state);
    renderFilters(state);
  });

  // Initial render with default state
  const currentState = appStore.getState();
  renderBalance(currentState);
  renderSavings(currentState);
  renderFilters(currentState);

  // Fetch dynamic data
  fetchInitialData();
}

init();
