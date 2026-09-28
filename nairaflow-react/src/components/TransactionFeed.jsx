import StatusPill from './StatusPill';
import { formatKobo, formatDate, getBankName, filterTransactions } from '../lib/utils';

/**
 * TransactionRow — A single transaction in the feed.
 *
 * CONNECTION TO PHASE 1:
 * This is the SAME <article class="tx-row"> from Week 1 Day 3.
 * The Phase 1 version used CSS Grid with subgrid for column alignment.
 * Here, Tailwind's grid classes do the same.
 *
 * CONNECTION TO PHASE 2:
 * In Phase 2, renderTransactions() built HTML with template literals
 * and innerHTML (XSS risk!). React's JSX auto-escapes all values — safe!
 */
function TransactionRow({ description, bank, account, amount, status, date }) {
  return (
    <article className="grid grid-cols-[1fr_auto] md:grid-cols-[100px_1fr_auto_auto] items-center gap-2 md:gap-4 py-3 px-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <time
        className="text-xs hidden md:block"
        style={{ color: 'var(--color-text-tertiary)' }}
        dateTime={date}
      >
        {formatDate(date)}
      </time>
      <div className="min-w-0">
        <p className="font-medium text-sm truncate">{description}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
          {getBankName(bank)} · {account}
        </p>
      </div>
      <p className="text-sm font-semibold text-right" style={{ color: 'var(--color-error)' }}>
        -{formatKobo(amount)}
      </p>
      <StatusPill status={status} />
    </article>
  );
}

/**
 * TransactionFeed — The feed card containing all transaction rows.
 *
 * CONNECTION TO PHASE 2:
 * In Phase 2, the filter buttons dispatched SET_FILTER to the Store,
 * and renderTransactions() used Object.groupBy() to filter.
 * Here, useState holds the filter and the list filters declaratively.
 */
export default function TransactionFeed({ transactions, filter, onFilterChange }) {
  const filtered = filterTransactions(transactions, filter);
  const filters = [
    {value: 'all', label: 'All'},
    {value: 'success', label: 'Success'},
    {value: 'pending', label: 'Pending'},
    {value: 'failed', label: 'Failed'},
    {value: 'Transfer', label: 'Transfer'},
    {value: 'TV', label: 'TV'},
    {value: 'Airtime', label: 'Airtime'},
    {value: 'Data', label: 'Data'},
    {value: 'Utility', label: 'Utility'},
    {value: 'Safelock', label: 'Safelock'}
  ];
  return (
    <section
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
    >
      {/* Filter bar */}
      <div
        className="space-y-3 p-4 border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="flex flex-wrap gap-2">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onFilterChange(value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                filter === value
                  ? 'text-white'
                  : 'hover:opacity-80'
              }`}
              style={
                filter === value
                  ? { background: 'var(--color-brand)' }
                  : { background: 'var(--color-surface-alt)', color: 'var(--color-text-secondary)' }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction rows */}
      <div>
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
            {/* No {filter} transactions found. */}
            {/* No transaction found for the selected filters. */}
            No transaction 
          </p>

        ) : (
          <div>
          <p className="px-4 px-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            showing {filtered.length} transaction{filtered.length != 1 ? 's' : ''}
          </p>
          {filtered.map((tx) => <TransactionRow key={tx.id} {...tx} />)}
          </div>
        )}
      </div>
    </section>
  );
}
