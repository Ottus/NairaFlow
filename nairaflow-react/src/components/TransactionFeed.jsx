import { useState } from 'react';
import StatusPill from './StatusPill';
import { formatKobo, formatDate, getBankName, filterTransactions, formatDateForInput, parseDateFromInput } from '../lib/utils';

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
  // Add custom date range state
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Filter transactions using the utility function
  const filtered = filterTransactions(transactions, filter, dateRange);

  // Define all available filters
  const categoryFilters = [
    { value: 'all', label: 'All' },
    { value: 'success', label: 'Success' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'Transfers', label: 'Transfers' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Connectivity', label: 'Connectivity' },
    { value: 'TV', label: 'TV' },
    { value: 'Online Payment', label: 'Online Payment' },
    { value: 'Safebox', label: 'Safebox' },
  ];

  // Handle date range changes
  const handleStartDateChange = (e) => {
    setDateRange(prev => ({
      ...prev,
      startDate: parseDateFromInput(e.target.value)
    }));
  };

  const handleEndDateChange = (e) => {
    setDateRange(prev => ({
      ...prev,
      endDate: parseDateFromInput(e.target.value)
    }));
  };

  const clearDateFilter = () => {
    setDateRange({ startDate: null, endDate: null });
  };

  const hasActiveDateFilter = dateRange.startDate || dateRange.endDate;

  return (
    <section
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
    >
      {/* Filter bar */}
      <div className="space-y-3 p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                filter === f.value
                  ? 'text-white'
                  : 'hover:opacity-80'
              }`}
              style={
                filter === f.value
                  ? { background: 'var(--color-brand)' }
                  : { background: 'var(--color-surface-alt)', color: 'var(--color-text-secondary)' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Date range filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="text-xs font-medium cursor-pointer hover:opacity-80"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            📅 Date Range {hasActiveDateFilter ? '(Active)' : ''}
          </button>

          {showDateFilter && (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <label className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>From:</label>
                <input
                  type="date"
                  value={formatDateForInput(dateRange.startDate)}
                  onChange={handleStartDateChange}
                  className="px-2 py-1 rounded text-xs border"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-alt)', color: 'var(--color-text)' }}
                />
              </div>
              <div className="flex items-center gap-1">
                <label className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>To:</label>
                <input
                  type="date"
                  value={formatDateForInput(dateRange.endDate)}
                  onChange={handleEndDateChange}
                  className="px-2 py-1 rounded text-xs border"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-alt)', color: 'var(--color-text)' }}
                />
              </div>
              {hasActiveDateFilter && (
                <button
                  onClick={clearDateFilter}
                  className="text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80"
                  style={{ background: 'var(--color-error)', color: 'white' }}
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Transaction rows */}
      <div>
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
            No transactions found for the selected filters.
            {hasActiveDateFilter && ` Try adjusting the date range or clear the date filter.`}
          </p>
        ) : (
          <div>
            <p className="px-4 py-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              Showing {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
              {hasActiveDateFilter && ` for selected date range`}
            </p>
            {filtered.map((tx) => <TransactionRow key={tx.id} {...tx} />)}
          </div>
        )}
      </div>
    </section>
  );
}
