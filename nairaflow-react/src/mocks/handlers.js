/**
 * MSW Handlers — mock API endpoints for the NairaFlow fintech dashboard.
 * These intercept fetch() at the network level.
 */
import { http, HttpResponse, delay } from 'msw';
import { generateTransactions, SAVINGS_PLANS, EXCHANGE_RATES } from './data';

// Generate a stable set of transactions (refreshed per session)
let cachedTransactions = generateTransactions(15);

export const handlers = [
  // ─── GET /api/balance ───
  http.get('/api/balance', async () => {
    await delay(600);
    if (Math.random() < 0.05) return new HttpResponse(null, { status: 500 });
    return HttpResponse.json({
      amount: 245000000,
      currency: 'NGN',
      trend: 12,
    });
  }),

  // ─── GET /api/transactions ───
  http.get('/api/transactions', async () => {
    await delay(800);
    if (Math.random() < 0.08) return new HttpResponse(null, { status: 500 });
    return HttpResponse.json({ transactions: cachedTransactions });
  }),

  // ─── POST /api/transfers ───
  http.post('/api/transfers', async ({ request }) => {
    await delay(1500);
    if (Math.random() < 0.1) {
      return HttpResponse.json(
        { error: 'Transfer failed. Please try again.' },
        { status: 500 }
      );
    }
    const body = await request.json();
    const newTx = {
      id: `tx-${Date.now()}`,
      description: body.narration || `Transfer to ${body.accountNumber}`,
      amount: Number(body.amount) * 100,
      currency: body.currency || 'NGN',
      status: 'success',
      bank: body.bankCode || 'GTBank',
      account: body.accountNumber,
      date: new Date().toISOString(),
      fee: 15000,
    };
    cachedTransactions = [newTx, ...cachedTransactions];
    return HttpResponse.json({
      success: true,
      reference: `NF-${Date.now()}`,
      amount: newTx.amount,
      recipient: body.accountNumber,
    });
  }),

  // ─── GET /api/savings ───
  http.get('/api/savings', async () => {
    await delay(600);
    return HttpResponse.json({ plans: SAVINGS_PLANS });
  }),

  // ─── GET /api/rates ───
  http.get('/api/rates', async () => {
    await delay(400);
    return HttpResponse.json({
      rates: EXCHANGE_RATES,
      lastUpdated: new Date().toISOString(),
    });
  }),

  // ─── GET /api/insights ───
  http.get('/api/insights', async () => {
    await delay(700);
    return HttpResponse.json({
      insights: [
        { id: 1, icon: '📊', headline: 'Spending up 12%', detail: 'Your spending is up 12% this month, mostly on data subscriptions.', confidence: 0.87 },
        { id: 2, icon: '🎯', headline: 'Savings on track', detail: 'Your Fixed Deposit is on track to hit ₦5,000,000 by December.', confidence: 0.92 },
        { id: 3, icon: '💡', headline: 'Airtime tip', detail: 'You spent ₦45,000 on airtime this month — 20% above average.', confidence: 0.78 },
      ],
    });
  }),
];
