# Graph Report - etude-for-ai-harness  (2026-08-16)

## Corpus Check
- 94 files · ~229,187 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 395 nodes · 591 edges · 45 communities (19 shown, 26 thin omitted)
- Extraction: 91% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Home Screen UI Components
- Mock Activity Data & API Types
- Project Docs & Harness Notes
- Expo App Configuration
- Merchant API Client & Tests
- Root Layout & MSW Mocks
- App Screenshot Flows
- Dev Tooling Dependencies
- Account Balance & Money Formatting
- Package Scripts
- Shell Automation Scripts
- TypeScript Configuration
- Core React Native Deps
- App Icon Assets
- React Logo Assets
- ESLint Flat Config
- Expo Package Dependency
- expo-constants Dependency
- expo-font Dependency
- expo-haptics Dependency
- expo-image Dependency
- expo-router Dependency
- expo-splash-screen Dependency
- expo-status-bar Dependency
- expo-symbols Dependency
- expo-system-ui Dependency
- expo-vector-icons Dependency
- fast-text-encoding Dependency
- react-dom Dependency
- async-storage Dependency
- gesture-handler Dependency
- reanimated Dependency
- safe-area-context Dependency
- react-native-screens Dependency
- url-polyfill Dependency
- react-native-web Dependency
- react-native-worklets Dependency
- bottom-tabs Navigation Dependency
- navigation-elements Dependency
- navigation-native Dependency
- tslib Dependency

## God Nodes (most connected - your core abstractions)
1. `expo` - 14 edges
2. `useThemeColor()` - 14 edges
3. `ThemedView()` - 11 edges
4. `scripts` - 10 edges
5. `AGENTS.md (repo harness instructions)` - 10 edges
6. `Merchant Payout App Challenge (Expo)` - 10 edges
7. `Harness Ablation Study: Insights (document)` - 10 edges
8. `ThemedText()` - 9 edges
9. `PROGRESS.md (task trail)` - 9 edges
10. `run_platform()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Harness Ablation study section` --references--> `Harness ablation — Step 1 comparison (merged view)`  [AMBIGUOUS]
  README.md → docs/index.html
- `TabLayout()` --indirect_call--> `HapticTab()`  [INFERRED]
  app/(tabs)/_layout.tsx → components/haptic-tab.tsx
- `BalanceColumn()` --calls--> `useThemeColor()`  [EXTRACTED]
  components/account-balance.tsx → hooks/use-theme-color.ts
- `renderModal()` --calls--> `renderWithProviders()`  [EXTRACTED]
  components/activity-list-modal.test.tsx → test-utils/render-with-providers.tsx
- `renderHome()` --calls--> `renderWithProviders()`  [EXTRACTED]
  components/merchant-home.test.tsx → test-utils/render-with-providers.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Harness ablation study cross-document comparison** — docs_harness_ablation_insights_document, docs_index_document, docs_step_1_run_metrics_with_harness_document, docs_step_1_run_metrics_no_harness_document, agents_document [EXTRACTED 1.00]
- **ScreenSecurity native module spans Steps 4-6** — readme_screensecurity_native_module, readme_step_4_native_device_identity, readme_step_5_biometric_authentication, readme_step_6_screenshot_security_alert [EXTRACTED 1.00]
- **Android Payout Flow: Form to Confirmation, Biometric Auth, and Completion** — docs_android_and_payout_payoutform, docs_android_and_payout_confirm_confirmmodal, docs_android_and_payout_biometric_biometricprompt, docs_android_and_payout_confirmed_payoutsuccess [INFERRED 0.85]
- **Android Payout Error/Failure States (Biometric, Service, Insufficient Funds)** — docs_android_and_payout_biometric_failed_biometricfailed, docs_android_and_payout_failed_payoutservicefailure, docs_android_and_payout_insufficient_funds_insufficientfunds [INFERRED 0.85]
- **Android Home and Transaction Activity Overview** — docs_android_and_home_homescreen, docs_android_and_transaction_recentactivitylist, docs_android_and_transaction_loading_transactionloadingmore [INFERRED 0.75]
- **iOS Payout Flow (Form to Success via Biometric)** — docs_ios_ios_payout_sendpayoutform, docs_ios_ios_payout_confirm_confirmationmodal, docs_ios_ios_payout_biometric_faceidprompt, docs_ios_ios_payout_confirmed_successscreen [INFERRED 0.85]
- **iOS Payout Failure/Error States** — docs_ios_ios_payout_biometric_failed_authcancelled, docs_ios_ios_payout_failed_serviceunavailableerror, docs_ios_ios_payout_insufficient_funds_errorscreen [INFERRED 0.75]
- **iOS Transaction History Browsing (Home + List + Pagination)** — docs_ios_ios_home_homescreen, docs_ios_ios_transaction_recentactivitylist, docs_ios_ios_transaction_loading_infinitescrollloadingstate [INFERRED 0.85]

## Communities (45 total, 26 thin omitted)

### Community 0 - "Home Screen UI Components"
Cohesion: 0.06
Nodes (36): styles, styles, TabLayout(), styles, ActivityListModal, ActivityListModalContext, ActivityListModalContextValue, ActivityListModalProps (+28 more)

### Community 1 - "Mock Activity Data & API Types"
Cohesion: 0.09
Nodes (30): RecentActivity, deposit, refund, items, AVAILABLE_BALANCE_EUR, AVAILABLE_BALANCE_GBP, baseActivities, createPayout() (+22 more)

### Community 2 - "Project Docs & Harness Notes"
Cohesion: 0.08
Nodes (37): React Compound Components mandate, AGENTS.md (repo harness instructions), PROGRESS.md work-tracking workflow, Tech Stack (Node 24, RN 0.81.5/Expo 54, pnpm, TS/Swift/Kotlin), Test-per-function testing policy, verify.sh verification gate, Harness Ablation Study: Insights (document), Insight 1: Harness cost is discovery time, not implementation time (+29 more)

### Community 3 - "Expo App Configuration"
Cohesion: 0.07
Nodes (27): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, edgeToEdgeEnabled, package, predictiveBackGestureEnabled (+19 more)

### Community 4 - "Merchant API Client & Tests"
Cohesion: 0.16
Nodes (14): renderModal(), merchantResponse, renderHome(), API_BASE_URL, merchantResponse, UseMerchantResult, ApiError, apiGet() (+6 more)

### Community 5 - "Root Layout & MSW Mocks"
Cohesion: 0.10
Nodes (9): plugins, RootLayout(), Props, handlers, dispatchEvent(), postMessage(), server, useMSW() (+1 more)

### Community 6 - "App Screenshot Flows"
Cohesion: 0.12
Nodes (22): Android Home Screen (Business Account Balance & Recent Activity), Android Payout Biometric Authentication Prompt, Android Payout Biometric Authentication Failed/Cancelled Screen, Android Payout Confirmation Modal, Android Payout Completed Success Screen, Android Payout Failed - Service Temporarily Unavailable Screen, Android Payout Failed - Insufficient Funds Screen, Android Send Payout Form (Amount, Currency, IBAN) (+14 more)

### Community 7 - "Dev Tooling Dependencies"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-expo, jest, jest-expo, msw, devDependencies, eslint, eslint-config-expo (+13 more)

### Community 8 - "Account Balance & Money Formatting"
Cohesion: 0.16
Nodes (11): AccountBalance, AccountBalanceContext, AccountBalanceContextValue, AccountBalanceProps, BalanceColumn(), styles, useAccountBalanceContext(), CURRENCY_SYMBOLS (+3 more)

### Community 9 - "Package Scripts"
Cohesion: 0.13
Nodes (14): main, name, private, scripts, android, ios, lint, reset-project (+6 more)

### Community 10 - "Shell Automation Scripts"
Cohesion: 0.29
Nodes (12): kill_tree(), run_platform(), scan_log_for_errors(), run-apps.sh script, wait_for_boot(), fail(), info(), ok() (+4 more)

### Community 11 - "TypeScript Configuration"
Cohesion: 0.18
Nodes (10): expo-env.d.ts, expo/tsconfig.base, .expo/types/**/*.ts, **/*.ts, **/*.tsx, compilerOptions, paths, strict (+2 more)

### Community 12 - "Core React Native Deps"
Cohesion: 0.22
Nodes (9): expo-linking, expo-web-browser, dependencies, expo-linking, expo-web-browser, react, react-native, react (+1 more)

### Community 13 - "App Icon Assets"
Cohesion: 0.33
Nodes (6): Android Adaptive Icon Background Layer, Android Adaptive Icon Foreground Layer, Android Adaptive Icon Monochrome Layer, Web Favicon, App Icon, Splash Screen Icon

### Community 14 - "React Logo Assets"
Cohesion: 0.50
Nodes (4): Partial React Logo Crop, Default React Logo (2x), Default React Logo (3x), Default React Logo (1x)

## Ambiguous Edges - Review These
- `Harness Ablation study section` → `Harness ablation — Step 1 comparison (merged view)`  [AMBIGUOUS]
  README.md · relation: references

## Knowledge Gaps
- **153 isolated node(s):** `name`, `slug`, `version`, `orientation`, `icon` (+148 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Harness Ablation study section` and `Harness ablation — Step 1 comparison (merged view)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `expo-router` connect `Root Layout & MSW Mocks` to `Home Screen UI Components`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `expo` connect `Expo App Configuration` to `Root Layout & MSW Mocks`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `plugins` connect `Root Layout & MSW Mocks` to `Expo App Configuration`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _153 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Home Screen UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.06229508196721312 - nodes in this community are weakly interconnected._
- **Should `Mock Activity Data & API Types` be split into smaller, more focused modules?**
  _Cohesion score 0.08534850640113797 - nodes in this community are weakly interconnected._