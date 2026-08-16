/**
 * Mock Data Generators and State Management
 */
import type {
  ActivityItem,
  Currency,
  PaginatedActivityResponse,
  PayoutResponse,
  PayoutStatus,
} from '../types/api';

// In-memory store for payout states
const payoutStore = new Map<string, { payout: PayoutResponse; created_at: number }>();

// Available balance constants (in pence)
// 5000.00 GBP = 500000 pence, 5000.00 EUR = 500000 pence
export const AVAILABLE_BALANCE_GBP = 500000; // 5000.00 GBP in pence
export const AVAILABLE_BALANCE_EUR = 500000; // 5000.00 EUR in pence
export const PENDING_BALANCE_GBP = 25000; // 250.00 GBP in pence
export const PENDING_BALANCE_EUR = 25000; // 250.00 EUR in pence

// Current currency (default to GBP, can be toggled)
let currentCurrency: Currency = 'GBP';

export function getCurrentCurrency(): Currency {
  return currentCurrency;
}

export function setCurrency(currency: Currency) {
  currentCurrency = currency;
}

export function getAvailableBalance(): number {
  return currentCurrency === 'GBP' ? AVAILABLE_BALANCE_GBP : AVAILABLE_BALANCE_EUR;
}

export function getPendingBalance(): number {
  return currentCurrency === 'GBP' ? PENDING_BALANCE_GBP : PENDING_BALANCE_EUR;
}

/**
 * Generate a unique payout ID
 */
export function generatePayoutId(): string {
  return `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new payout and store it
 */
export function createPayout(
  amount: number,
  currency: Currency,
  iban: string,
  status: PayoutStatus = 'pending',
): PayoutResponse {
  const id = generatePayoutId();
  const payout: PayoutResponse = {
    id,
    status,
    amount,
    currency,
    iban,
    created_at: new Date().toISOString(),
  };

  payoutStore.set(id, { payout, created_at: Date.now() });
  return payout;
}

/**
 * Get payout by ID with status progression simulation
 * Status progresses: pending -> processing -> completed/failed
 */
export function getPayoutById(id: string): PayoutResponse | null {
  const stored = payoutStore.get(id);
  if (!stored) {
    return null;
  }

  const { payout, created_at } = stored;
  const elapsed = Date.now() - created_at;

  // Simulate status progression over time
  let status: PayoutStatus = payout.status;

  if (payout.status === 'pending' && elapsed > 2000) {
    // After 2 seconds, move to processing
    status = 'processing';
    payout.status = status;
  } else if (payout.status === 'processing' && elapsed > 5000) {
    // After 5 seconds total, complete (or fail based on amount)
    // Fail if amount ends in 99 pence (for testing - e.g., 99999 pence = 999.99)
    status = payout.amount % 100 === 99 ? 'failed' : 'completed';
    payout.status = status;
  }

  return { ...payout, status };
}

// Base activity items (in pence)
const baseActivities: Omit<ActivityItem, 'currency'>[] = [
  {
    id: 'act_001',
    type: 'deposit',
    amount: 150000, // 1500.00 in pence
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payment from Customer ABC',
    status: 'completed',
  },
  {
    id: 'act_002',
    type: 'payout',
    amount: -50000, // -500.00 in pence
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payout to Bank Account ****1234',
    status: 'completed',
  },
  {
    id: 'act_003',
    type: 'deposit',
    amount: 230000, // 2300.00 in pence
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payment from Customer XYZ',
    status: 'completed',
  },
  {
    id: 'act_004',
    type: 'fee',
    amount: -2500, // -25.00 in pence
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Monthly service fee',
    status: 'completed',
  },
  {
    id: 'act_005',
    type: 'payout',
    amount: -120000, // -1200.00 in pence
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payout to Bank Account ****5678',
    status: 'completed',
  },
  {
    id: 'act_006',
    type: 'deposit',
    amount: 80000, // 800.00 in pence
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payment from Customer DEF',
    status: 'completed',
  },
  {
    id: 'act_007',
    type: 'refund',
    amount: -15000, // -150.00 in pence
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Refund to Customer GHI',
    status: 'completed',
  },
  {
    id: 'act_008',
    type: 'deposit',
    amount: 320000, // 3200.00 in pence
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payment from Customer JKL',
    status: 'completed',
  },
  {
    id: 'act_009',
    type: 'payout',
    amount: -75000, // -750.00 in pence
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payout to Bank Account ****9012',
    status: 'completed',
  },
  {
    id: 'act_010',
    type: 'deposit',
    amount: 95000, // 950.00 in pence
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payment from Customer MNO',
    status: 'completed',
  },
  {
    id: 'act_011',
    type: 'fee',
    amount: -1500, // -15.00 in pence
    date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Transaction fee',
    status: 'completed',
  },
  {
    id: 'act_012',
    type: 'payout',
    amount: -30000, // -300.00 in pence
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payout to Bank Account ****3456',
    status: 'completed',
  },
  {
    id: 'act_013',
    type: 'deposit',
    amount: 180000, // 1800.00 in pence
    date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payment from Customer PQR',
    status: 'completed',
  },
  {
    id: 'act_014',
    type: 'deposit',
    amount: 110000, // 1100.00 in pence
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payment from Customer STU',
    status: 'completed',
  },
  {
    id: 'act_015',
    type: 'payout',
    amount: -60000, // -600.00 in pence
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Payout to Bank Account ****7890',
    status: 'completed',
  },
];

let activityCounter = 16; // Start from act_016

// Generate a large pool of activities for pagination
// This simulates having many transactions in the database
function generateAllActivities(): ActivityItem[] {
  const now = new Date();
  const currency = currentCurrency;

  // Start with base activities
  const activities: ActivityItem[] = baseActivities.map((activity) => ({
    ...activity,
    currency,
  }));

  // Generate additional activities (total of ~100 activities for pagination testing)
  const additionalCount = 100;
  for (let i = 0; i < additionalCount; i++) {
    const activityId = `act_${String(activityCounter).padStart(3, '0')}`;
    // Distribute activities over the past 60 days
    const daysAgo = Math.floor(i / (additionalCount / 60));
    const hoursAgo = i % 24;
    const minutesAgo = i % 60;
    const isPositive = Math.random() > 0.4; // 60% chance of positive amount
    const baseAmount = Math.floor(Math.random() * 200000) + 10000; // Random amount between 100.00 and 2000.00 in pence
    const amount = isPositive ? baseAmount : -baseAmount;

    const types: ActivityItem['type'][] = isPositive ? ['deposit'] : ['payout', 'fee', 'refund'];
    const type = types[Math.floor(Math.random() * types.length)];

    const descriptions = {
      deposit: `Payment from Customer ${String.fromCharCode(65 + (activityCounter % 26))}${String.fromCharCode(65 + ((activityCounter * 2) % 26))}${String.fromCharCode(65 + ((activityCounter * 3) % 26))}`,
      payout: `Payout to Bank Account ****${String(activityCounter).padStart(4, '0')}`,
      fee: ['Monthly service fee', 'Transaction fee', 'Processing fee'][
        Math.floor(Math.random() * 3)
      ],
      refund: `Refund to Customer ${String.fromCharCode(65 + (activityCounter % 26))}${String.fromCharCode(65 + ((activityCounter * 2) % 26))}${String.fromCharCode(65 + ((activityCounter * 3) % 26))}`,
    };

    const date = new Date(
      now.getTime() -
        daysAgo * 24 * 60 * 60 * 1000 -
        hoursAgo * 60 * 60 * 1000 -
        minutesAgo * 60 * 1000,
    );

    activities.push({
      id: activityId,
      type,
      amount,
      currency,
      date: date.toISOString(),
      description: descriptions[type],
      status: 'completed',
    });

    activityCounter++;
  }

  // Sort by date descending (most recent first)
  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Cache all activities (regenerate if currency changes)
let cachedActivities: ActivityItem[] | null = null;
let cachedCurrency: Currency | null = null;

function getAllActivities(): ActivityItem[] {
  if (cachedActivities === null || cachedCurrency !== currentCurrency) {
    cachedActivities = generateAllActivities();
    cachedCurrency = currentCurrency;
  }
  return cachedActivities;
}

/**
 * Generate new recent activities (simulates new transactions appearing)
 */
function generateNewActivities(count: number = 2): ActivityItem[] {
  const now = new Date();
  const currency = currentCurrency;
  const newActivities: ActivityItem[] = [];

  for (let i = 0; i < count; i++) {
    const activityId = `act_${String(activityCounter).padStart(3, '0')}`;
    // New activities should be very recent (within the last hour, with slight variation)
    const minutesAgo = i * 2; // First new activity is now, second is 2 minutes ago
    const isPositive = Math.random() > 0.4; // 60% chance of positive amount
    const baseAmount = Math.floor(Math.random() * 200000) + 10000; // Random amount between 100.00 and 2000.00 in pence
    const amount = isPositive ? baseAmount : -baseAmount;

    const types: ActivityItem['type'][] = isPositive ? ['deposit'] : ['payout', 'fee', 'refund'];
    const type = types[Math.floor(Math.random() * types.length)];

    const descriptions = {
      deposit: `Payment from Customer ${String.fromCharCode(65 + (activityCounter % 26))}${String.fromCharCode(65 + ((activityCounter * 2) % 26))}${String.fromCharCode(65 + ((activityCounter * 3) % 26))}`,
      payout: `Payout to Bank Account ****${String(activityCounter).padStart(4, '0')}`,
      fee: ['Monthly service fee', 'Transaction fee', 'Processing fee'][
        Math.floor(Math.random() * 3)
      ],
      refund: `Refund to Customer ${String.fromCharCode(65 + (activityCounter % 26))}${String.fromCharCode(65 + ((activityCounter * 2) % 26))}${String.fromCharCode(65 + ((activityCounter * 3) % 26))}`,
    };

    newActivities.push({
      id: activityId,
      type,
      amount,
      currency,
      date: new Date(now.getTime() - minutesAgo * 60 * 1000).toISOString(),
      description: descriptions[type],
      status: 'completed',
    });

    activityCounter++;
  }

  return newActivities;
}

/**
 * Generate mock activity/transaction data (for backward compatibility)
 * Returns first 15 items
 */
export function generateMockActivity(): ActivityItem[] {
  return getAllActivities().slice(0, 15);
}

/**
 * Get paginated activity items using cursor-based pagination
 * @param cursor - The ID of the last item from previous page (null or "first" for first page)
 * @param limit - Number of items per page (default: 15)
 */
export function getPaginatedActivity(
  cursor: string | null = null,
  limit: number = 15,
): PaginatedActivityResponse {
  let allActivities = getAllActivities();

  // If fetching first page (no cursor or cursor is "first"), add new activities
  if (cursor === null || cursor === 'first') {
    const newActivities = generateNewActivities(2);
    // Prepend new activities to the beginning (they're already sorted by most recent date)
    allActivities = [...newActivities, ...allActivities];
    // Update cache with new activities
    cachedActivities = allActivities;
  }

  // Find starting index
  let startIndex = 0;
  if (cursor && cursor !== 'first') {
    const cursorIndex = allActivities.findIndex((item) => item.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  // Get the page of items
  const items = allActivities.slice(startIndex, startIndex + limit);
  const next_cursor = items.length > 0 ? items[items.length - 1].id : null;
  const has_more = startIndex + limit < allActivities.length;

  return {
    items,
    next_cursor: has_more ? next_cursor : null,
    has_more,
  };
}
