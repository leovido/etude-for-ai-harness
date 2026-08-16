#!/usr/bin/env bash
#
# verify.sh — verifies the app is healthy.
#
# Runs, in order:
#   1. Lint          (pnpm run lint)
#   2. Typecheck     (pnpm run typecheck)
#   3. Tests         (pnpm run test)
#   4. App run checks (delegated to ./run-apps.sh — iOS + Android)
#
# Usage:
#   ./verify.sh                # run everything
#   ./verify.sh --skip-ios     # skip the iOS app check
#   ./verify.sh --skip-android # skip the Android app check
#   ./verify.sh --lint-only    # only lint + typecheck + test
#
# Env overrides (forwarded to run-apps.sh):
#   BOOT_TIMEOUT   seconds to wait for a native build+boot (default 900)
#   OBSERVE_TIME   seconds to watch runtime logs for errors (default 25)

set -uo pipefail

# ----------------------------------------------------------------------------
# Config
# ----------------------------------------------------------------------------
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

# shellcheck source=verify-common.sh
. "$ROOT_DIR/verify-common.sh"

RUN_APPS=1
APP_ARGS=()

for arg in "$@"; do
  case "$arg" in
    --skip-ios)     APP_ARGS+=("$arg") ;;
    --skip-android) APP_ARGS+=("$arg") ;;
    --lint-only)    RUN_APPS=0 ;;
    -h|--help)      sed -n '2,19p' "$0"; exit 0 ;;
    *) echo "Unknown argument: $arg" >&2; exit 2 ;;
  esac
done

# ----------------------------------------------------------------------------
# 1. Lint
# ----------------------------------------------------------------------------
step "1/4  Lint  (pnpm run lint)"
if pnpm run lint; then
  ok "Lint passed"
else
  fail "Lint failed"
  exit 1
fi

# ----------------------------------------------------------------------------
# 2. Typecheck
# ----------------------------------------------------------------------------
step "2/4  Typecheck  (pnpm run typecheck)"
if pnpm run typecheck; then
  ok "Typecheck passed"
else
  fail "Typecheck failed"
  exit 1
fi

# ----------------------------------------------------------------------------
# 3. Test
# ----------------------------------------------------------------------------
step "3/4  Test  (pnpm run test)"
if CI=1 pnpm run test; then
  ok "Tests passed"
else
  fail "Tests failed"
  exit 1
fi

# ----------------------------------------------------------------------------
# 4. App run checks (delegated to run-apps.sh)
# ----------------------------------------------------------------------------
OVERALL=0
if [ "$RUN_APPS" -eq 1 ]; then
  step "4/4  App run checks  (./run-apps.sh)"
  if [ "${#APP_ARGS[@]}" -gt 0 ]; then
    "$ROOT_DIR/run-apps.sh" "${APP_ARGS[@]}" || OVERALL=1
  else
    "$ROOT_DIR/run-apps.sh" || OVERALL=1
  fi
else
  step "4/4  App run checks  (skipped — --lint-only)"
fi

# ----------------------------------------------------------------------------
# Summary
# ----------------------------------------------------------------------------
step "Summary"
if [ "$OVERALL" -eq 0 ]; then
  ok "All checks passed"
else
  fail "One or more app checks failed — see $ROOT_DIR/.verify-logs for details"
fi
exit "$OVERALL"
