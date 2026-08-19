# Project Progress

## Step 1: Merchant Home Screen

Fetch and display the merchant financial overview. Complete in code with `./verify.sh --lint-only` green (lint, typecheck, 24 tests). Full `./verify.sh` app-boot checks were not run.

## Current State
- Latest commit: 2bc55a7 (feat: add graphify initial)
- Test status: 1/1 passing 
- Lint: passing

## Completed

## In Progress
- [ ] API client for `GET /api/merchant` (`lib/api`)
- [ ] Money formatting from minor units + currency symbol (`lib/money`)
- [ ] `useMerchant` hook with loading/error/retry
- [ ] Account balance compound UI
- [ ] Recent activity compound UI (3 items + Show More)
- [ ] Home screen wiring + activity modal using already-fetched items (no pagination)
- [ ] Unit tests for happy and unhappy paths
- [ ] `./verify.sh --lint-only` green

## Known Issues

## Next Steps
- Step 2: Transaction list modal (infinite scroll, cursor pagination, type/date)
- Step 3: Payout initiation form and confirmation
- Step 4: Native device identity
- Step 5: Biometric auth for payouts over £1,000.00
- Step 6: Screenshot/screen-capture security alert
