# 💳 Merchant Payout App Challenge (Expo)
## Agentic engineering / Harness Engineering study

Welcome to the Merchant Payout Challenge! This is a mobile frontend coding challenge designed to assess your ability to implement a financial payout experience using React Native and Expo.

This version is a study to compare the performance of various AI agents applying AI workflows and harness engineering.

The techniques applied come from the following resources:
1. [Free Online Course - Learn harness engineering](https://walkinglabs.github.io/learn-harness-engineering/en/)
2. [The Discipline Gap. Is Spec-Driven Development the Answer?](https://www.linkedin.com/pulse/discipline-gap-martin-miceli-hmshe/)

Your task is to build a merchant dashboard and payout flow that allows users to:

* Review account balances and recent activity with pagination
* Initiate and validate a payout to a bank account with confirmation
* Integrate native device identity for payout requests
* Require biometric authentication for payouts over £1,000.00
* Protect the payout screen from screenshots
* Handle various edge cases, including network errors and insufficient funds

## 📑 Table of Contents
* [🔬 Harness Ablation](#-harness-ablation)
* [🛠️ Tech Stack](#️-tech-stack)
* [📡 API Documentation](#-api-documentation)
  * [Available Endpoints](#available-endpoints)
  * [Testing Error States](#testing-error-states)
* [📝 Evaluation Criteria](#-evaluation-criteria)
* [📋 Implementation Steps](#-implementation-steps)
  * [Step 1: Merchant Home Screen](#step-1-merchant-home-screen)
  * [Step 2: Transaction List Modal](#step-2-transaction-list-modal)
  * [Step 3: Payout Initiation Form & Confirmation](#step-3-payout-initiation-form--confirmation)
  * [Step 4: Native Device Identity](#step-4-native-device-identity)
  * [Step 5: Native Biometric for Payouts over £1,000.00](#step-5-native-biometric-for-payouts-over-£100000)
  * [Step 6: Native Security Events  (Native Module)](#step-6-native-security-events--native-module)

---

## 🔬 Harness Ablation

Step 1 was implemented twice with the same prompt and model: once **with** the repo harness (`AGENTS.md`, `PROGRESS.md`, `verify.sh`) and once **without**.

* **[Comparison (charts + insights)](docs/step-1-harness-ablation-comparison.html)** — merged view of both runs
* [Run A metrics — with harness](docs/step-1-run-metrics-with-harness.html)
* [Run B metrics — without harness](docs/step-1-run-metrics-no-harness.html)
* [Written insights](docs/HARNESS_ABLATION_INSIGHTS.md)

## 🛠️ Tech Stack

The project comes with the following pre-configured technologies:

* **Expo (SDK 52+)** - Framework for React Native
* **TypeScript** - For type safety
* **Expo Router** - File-based routing
* **Jest & React Native Testing Library** - For testing

## 📡 API Documentation

The project uses MSW (Mock Service Worker) to mock the banking API. The base URL is configured in `constants/index.ts`.

> **Important**: MSW intercepts HTTP requests at the network level, which means intercepted requests **will not appear in browser DevTools Network tab**. Instead, all intercepted requests are logged to the browser console with the `[MSW]` prefix, showing the method, URL, status code, and response data. This is expected behavior and allows you to debug API calls through the console.

### Available Endpoints

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/merchant` | `GET` | Returns `available_balance`, `pending_balance`, `currency`, and `activity` (list of recent transactions). |
| `/api/merchant/activity` | `GET` | Returns paginated activity items using cursor-based pagination. Query parameters: `cursor` (optional, activity ID from previous page) and `limit` (optional, default: 15). Returns `{ items, next_cursor, has_more }`. |
| `/api/payouts` | `POST` | Initiates a payout. Request body: `{ amount, currency, iban, device_id? }` |

> **Note**: The API returns and expects all monetary amounts in the lowest denomination of the currency (e.g., pence for GBP, cents for EUR). For example, `500000` represents `5000.00 GBP` or `5000.00 EUR`. Amounts can include fractional values (e.g., `99999` pence = `999.99 GBP`).

The types for the API responses are configured in `types/api.ts`.

### Testing Error States

The mock API supports specific triggers to test your error handling:

* **Service Unavailable**: `POST /api/payouts` with an amount of `999.99` (99999 pence) returns a `503 Service Unavailable`.
* **Insufficient Funds**: `POST /api/payouts` with an amount of `888.88` (88888 pence) returns a `400 Bad Request`.

## 📝 Evaluation Criteria

Your solution will be evaluated based on:

- 🧹 Clean, maintainable code
- 🔒 Proper TypeScript usage
- 🏗️ Well-structured components
- 🎯 Efficient state management

## 💡 Tips

- **Start with Step 1 and work through each step incrementally**
- Keep accessibility in mind throughout development
- Use TypeScript effectively
- Test with the provided invalid input values to verify error handling
- Don't hesitate to install additional packages if they help you solve the problem more efficiently
- Consider using libraries for state management, form handling, or UI components if they improve your solution

## 📋 Implementation Steps

### Step 1: Merchant Home Screen

**Goal**: Fetch and display the merchant’s financial overview.

**Requirements**:

* Fetch balance data using the provided API client.
* Display an account balance section showing the merchant's available balance and pending balance with the currency symbol from the API response.
* Display a list of the 3 most recent activity items in a single-row layout showing only the description and amount.
* Display a "show more" button that opens a modal with a full list of activity items.
* Handle loading and error states gracefully.

<details>
<summary>📱 Reference Screenshots</summary>

<table>
<thead>
<tr>
<th>iOS</th>
<th>Android</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="docs/ios/ios_home.png" alt="iOS Home Screen" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_home.png" alt="Android Home Screen" style="max-width: 300px;" /></td>
</tr>
</tbody>
</table>

</details>

### Step 2: Transaction List Modal

**Goal**: Display recent activity with enhanced functionality.

**Requirements**:

* Display the list of all activity items with type, description, amount, and date (formatted as `DD MM YYYY`).
* Implement "Infinite Scroll" functionality on the transaction list modal. Load more items automatically as the user scrolls to the bottom.
* Use cursor-based pagination to fetch additional activity items.
* Handle loading and error states gracefully.

<details>
<summary>📱 Reference Screenshots</summary>

<table>
<thead>
<tr>
<th>iOS</th>
<th>Android</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="docs/ios/ios_transaction.png" alt="iOS Transaction List" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_transaction.png" alt="Android Transaction List" style="max-width: 300px;" /></td>
</tr>
<tr>
<td><img src="docs/ios/ios_transaction_loading.png" alt="iOS Transaction Loading" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_transaction_loading.png" alt="Android Transaction Loading" style="max-width: 300px;" /></td>
</tr>
</tbody>
</table>

</details>

### Step 3: Payout Initiation Form & Confirmation

**Goal**: Create a screen for users to send a payout to a bank account with confirmation modal.

**Requirements**:

* Use a numeric input field for the payout amount.
* Use a dropdown to select the currency (`GBP` or `EUR`). The currency can be different from the merchant's account currency.
* Capture the destination IBAN (e.g., `FR1212345123451234567A12310131231231231`).
* Ensure the form remains usable when the keyboard is visible.
* Ensure the "Confirm" button is disabled if the input is empty, zero, or negative.
* Display a confirmation screen summarizing the transaction before execution (as shown in the reference images).
* Handle success response by showing Payout confirmation with amount and currency.
* Handle failures (e.g., `4xx`, `5xx` errors, insufficient funds) and network errors.

<details>
<summary>📱 Reference Screenshots</summary>

<table>
<thead>
<tr>
<th>iOS</th>
<th>Android</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="docs/ios/ios_payout.png" alt="iOS Payout Form" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_payout.png" alt="Android Payout Form" style="max-width: 300px;" /></td>
</tr>
<tr>
<td><img src="docs/ios/ios_payout_confirm.png" alt="iOS Payout Confirm" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_payout_confirm.png" alt="Android Payout Confirm" style="max-width: 300px;" /></td>
</tr>
<tr>
<td><img src="docs/ios/ios_payout_confirmed.png" alt="iOS Payout Confirmed" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_payout_confirmed.png" alt="Android Payout Confirmed" style="max-width: 300px;" /></td>
</tr>
<tr>
<td><img src="docs/ios/ios_payout_failed.png" alt="iOS Payout Failed" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_payout_failed.png" alt="Android Payout Failed" style="max-width: 300px;" /></td>
</tr>
<tr>
<td><img src="docs/ios/ios_payout_insufficient_funds.png" alt="iOS Payout Insufficient Funds" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_payout_insufficient_funds.png" alt="Android Payout Insufficient Funds" style="max-width: 300px;" /></td>
</tr>
</tbody>
</table>

</details>

### Step 4: Native Device Identity (Native Module)

**Goal**: Identify the Merchant's device identifier using a Native Bridge and send as part of the Payout API request.

**Requirements**:
* **Create** a native module named `ScreenSecurity` (this module will be extended in Steps 5 and 6).
* **Function**: Implement a `getDeviceId()` function in the `ScreenSecurity` native module that returns a unique device identifier.
* **Send**: Send this ID with the Payout request as `device_id`.

<details>
<summary>📱 Reference Screenshots</summary>

<table>
<thead>
<tr>
<th>iOS</th>
<th>Android</th>
</tr>
</thead>
<tbody>
<tr>
<td><em>(No visual changes - device ID is sent in the background)</em></td>
<td><em>(No visual changes - device ID is sent in the background)</em></td>
</tr>
</tbody>
</table>

</details>

### Step 5: Biometric Authentication for Payouts over £1,000.00 (Native Module)

**Goal**: Secure payouts over **£1,000.00** (or equivalent in selected currency, e.g., €1,000.00 for EUR) using a custom native bridge (no 3rd party libs).

**Requirements**:

* **Bridge to Native**: Extend the existing `ScreenSecurity` native module created in Step 4.
* **AsyncFunction**: The module should expose a `isBiometricAuthenticated()` AsyncFunction for biometrics.
* Before the `/api/payouts` call, check if the payout amount exceeds the threshold (`1,000.00` in the selected currency). If it does, await the native bridge. If the promise resolves `false`, abort the payout.
* If biometrics are not setup, inform the user to setup biometrics in the settings and abort the payout.

**Simulator testing**:
* iOS: In Simulator menu, go to `Features` > `Face ID` > `Enrolled`. Then trigger your payout and select `Features` > `Face ID` > `Matching Face`.
* Android: Go to Emulated devices `Settings` > `Security` > `Fingerprint` or search `fingerprint` in the search bar for the Settings screen and enable Authentication. Then in the Simuulator you can use the Extended Controls `(...)` > `Fingerprint` to simulate a touch.

<details>
<summary>📱 Reference Screenshots</summary>

<table>
<thead>
<tr>
<th>iOS</th>
<th>Android</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="docs/ios/ios_payout_biometric.png" alt="iOS Biometric" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_payout_biometric.png" alt="Android Biometric" style="max-width: 300px;" /></td>
</tr>
<tr>
<td><img src="docs/ios/ios_payout_biometric_failed.png" alt="iOS Biometric Failed" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_payout_biometric_failed.png" alt="Android Biometric Failed" style="max-width: 300px;" /></td>
</tr>
</tbody>
</table>

</details>

### Step 6: Screenshot/Screen-Capture Security Alert

**Goal**: Make sure the Merchant is aware of the risk of screenshots on the Payout screen.

**Requirements**:

* **Bridge to Native**: Extend the existing `ScreenSecurity` native module created in Step 4.
* **Emit Native Events**: The module should listen for the system's "Screenshot" event and emit an `onScreenshotTaken` event to the JS layer.
* **iOS**: Use `UIApplication.userDidTakeScreenshotNotification`.
* **Android (API 34+)**: Use `Activity.ScreenCaptureCallback`.
* **UI Reaction**: On the **Payout** screen, listen for this event and show a non-intrusive warning (like a Toast or an Alert) reminding the user to keep their financial data private.

**Simulator testing**:
* **iOS**: Use **Device → Trigger Screenshot** from the Simulator menu 

  **Note**: `Cmd + S` does not trigger the notification in the simulator.
* **Android**: The Android `14+` API requires hardware button presses. In an emulator, you can simulate this using the emulator's Power and Volume Down buttons.

  You can use the `adb` command to trigger the screenshot warning on the simulator:

  ```bash
  adb shell input keyevent 120 # Power + Volume Down
  ```

   **Note**: This API only detects hardware button presses (Power + Volume Down), not `adb` screencap or emulator screenshot buttons.

<details>
<summary>📱 Reference Screenshots</summary>

<table>
<thead>
<tr>
<th>iOS</th>
<th>Android</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="docs/ios/ios_payout_screenshot_warning.png" alt="iOS Screenshot Warning" style="max-width: 300px;" /></td>
<td><img src="docs/android/and_payout_screenshot_warning.png" alt="Android Screenshot Warning" style="max-width: 300px;" /></td>
</tr>
</tbody>
</table>

</details>

Good luck! We are excited to see how you build this experience. 🚀
