# Progress

## Step 1: Merchant Home Screen — DONE

Fetch and display the merchant financial overview. Complete in code with `./verify.sh --lint-only` green (lint, typecheck, 24 tests). Full `./verify.sh` app-boot checks were not run.

- [x] API client for `GET /api/merchant` (`lib/api`)
- [x] Money formatting from minor units + currency symbol (`lib/money`)
- [x] `useMerchant` hook with loading/error/retry
- [x] Account balance compound UI
- [x] Recent activity compound UI (3 items + Show More)
- [x] Home screen wiring + activity modal using already-fetched items (no pagination)
- [x] Unit tests for happy and unhappy paths
- [x] `./verify.sh --lint-only` green

## Remaining (not started)

- Step 2: Transaction list modal (infinite scroll, cursor pagination, type/date)
- Step 3: Payout initiation form and confirmation
- Step 4: Native device identity
- Step 5: Biometric auth for payouts over £1,000.00
- Step 6: Screenshot/screen-capture security alert
