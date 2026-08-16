# Harness Ablation Study: Insights

## Overview

This document captures the key findings from comparing two runs of the same task ("Start implementing Step 1 only from README.md"), both executed on 2026-08-14 with Cursor Grok 4.6:

- **Run A (with harness):** Repo-level `AGENTS.md`, `PROGRESS.md`, `verify.sh`, `docs/software-principles.md`
- **Run B (without harness):** Only user-level Cursor rules and skills applied

## Headline Trade-off: Speed vs. Rigor

| Metric | With harness (Run A) | Without harness (Run B) |
|--------|----------------------|------------------------|
| Prompt → last write | ~22 min | ~10 min |
| Tests added | ~23 | 9 |
| Test suites | 10 (test-per-function) | 3 (coarser) |
| Gate used | `verify.sh --lint-only` | ad-hoc `npx jest` / `tsc` / `expo lint` |
| Commit | None | Yes (`3e0febf`) |
| `PROGRESS.md` | Yes | No |
| Component style | Compound components | Custom hooks + simple components |

**Key finding:** The harness run took **~2.2x longer** but produced **~2.5x more tests** and finer-grained suites (one per function/hook/client, as `AGENTS.md` mandates). Both runs shipped equivalent functional scope (balances, 3 recent items, Show More modal, loading/error states), but with different test-coverage density and formality.

---

## Insight 1: The harness's main cost is discovery time, not implementation time

**Observation:** Explore-before-first-code was ~9 min with the harness vs. ~4 min without. That's almost the entire gap in "time to first code."

**Why it matters:** The harness run spent extra time reading `AGENTS.md`, `docs/software-principles.md`, and deciding on compound-component structure before writing anything — a one-time comprehension tax that a leaner run skips entirely.

**Implication:** The harness is a **front-loaded investment**. For a single, well-scoped task, it imposes overhead. For repeated tasks or a long-lived codebase with consistency requirements, that overhead becomes background noise (amortized).

---

## Insight 2: Without the harness, the agent still self-imposed structure via user-level skills/rules

**Observation:** Run B wasn't "no guardrails" — Cursor user rules (Conventional Commits, TS strict, Jest) and user skills (`react-native-patterns`, `commit-after-change`, `tdd`) persisted. That's *why* it still wrote loading/error states, tests, and a commit.

**Why it matters:** The repo harness's distinctive contribution was narrower than "AI produces good code vs. bad code." Its specific additions were:
- Compound components (architectural mandate)
- `PROGRESS.md` (work-tracking artifact)
- Test-per-function granularity (test organization pattern)
- `verify.sh` (a pre-tested, known-working verification gate)

**Implication:** User-level defaults already covered most guardrails (types, tests, linting, conventional commits). The harness amplifies and specializes, not creates from scratch.

---

## Insight 3: Verification path diverged sharply and cost real time in Run B

**Observation:**
- Run A: Clean, known gate (`verify.sh --lint-only`) → 1 failure (SafeArea/`initialMetrics`) → fix → pass
- Run B: No `verify.sh` to lean on → 5 failing Jest runs before reaching a working setup
  - Stale `transformIgnorePatterns` override
  - `msw/node` resolution failure under jest-expo's `react-native` export condition
  - ESM (`until-async`) dead end
  - `getByRole('alert')` vs `accessibilityRole` mismatch
  - Then `npx jest` green, `tsc`, `expo lint` green

**Why it matters:** Run A had 1 test-fix iteration; Run B had infra-fix + 1 assertion iteration. The difference isn't "Run A wrote better code" — both shipped correct, tested features. The difference is that `verify.sh` encoded a **known-working test environment**, sidestepping an entire class of environment-configuration bugs.

**Implication:** Verification gates aren't just correctness checks; they're **institutional memory** about which version of which tool needs which config tweak. Losing them forces rediscovery.

---

## Insight 4: Compound components only appeared because `AGENTS.md` said so

**Observation:** Run B, left to `react-native-patterns` (user skill), defaulted to hooks + plain components — the more common/idiomatic RN pattern.

**Why it matters:** This confirms the compound-component mandate is a repo-specific override, not something the model reaches for by default even with a "patterns" skill loaded.

**Implication:** Architectural choices need to be spelled out explicitly in the harness, not inferred from naming conventions or skills. The model has weak defaults for design patterns and will follow the most mainstream/idiomatic path without explicit guidance.

---

## Insight 5: Tool-call volume and shape converge, but effort distribution differs

**Observation:** Total tool calls were close (106 vs 116), and Read-call counts nearly identical (51 vs 48) — both runs did comparable repo discovery. But the distribution:
- Run A: Skews toward `Write`/`StrReplace`/`TodoWrite` (21 files created, 3 modified, plus `PROGRESS.md` updates)
- Run B: Shows 15 `Shell` calls vs. 4 in Run A, plus `Delete`/`Glob` for infra troubleshooting

**Why it matters:** The fingerprint of effort is different, even though total calls are similar. Run B spent a larger share on live environment debugging.

**Implication:** Tool-call count is not a reliable proxy for "how much work the AI did." Distribution matters. A harness that includes a pre-tested verification gate shifts the balance from environment debugging to feature implementation.

---

## Insight 6: Neither run drifted into scope creep — the harness didn't prevent it, because there was no risk

**Observation:** Neither run paginated or drifted into Step 2, despite the harness having explicit "vertical slices" guidance and despite the absence of `PROGRESS.md` in Run B.

**Why it matters:** This particular guardrail wasn't tested by this task; the prompt itself was scoped tightly enough ("Step 1 only") that both models respected it.

**Limitation:** This study doesn't measure the harness's value for *preventing* scope creep on a fuzzier, larger task. A follow-up would need an open-ended prompt or a more complex scope decision to test that.

---

## Bottom Line

The harness's ROI here is **legibility, coverage density, and verification amortization** at the cost of ~2x wall time for a single task.

- **With harness:** Slower front-end (discovery), but clean verification path; test-per-function leads to 23 tests vs. 9; `PROGRESS.md` provides a work trail; compound-component structure is explicit.
- **Without harness:** Faster immediate start, but the "missing" verification infra forced live Jest/MSW/jest-expo debugging; fewer, coarser tests; no formal work trail; architectural decisions defaulted to hooks instead of compounds.

The no-harness run wasn't reckless — user-level rules did significant guardrail work — but it **paid for the missing `verify.sh` by re-solving a known jest-expo compatibility problem live**, which is exactly the kind of recurring cost a harness is meant to eliminate.

### Key Takeaway

For a single task in isolation, the harness imposes overhead. For repeated tasks or team consistency, that overhead becomes an investment. The real value is not in "better code" but in **reducing rediscovery and amplifying test organization**, plus encoding known-working tool-chain configurations that prevent environment-specific debugging loops.

---

## Caveats

- **No token/cost data:** Both transcripts exclude token and compute cost; this analysis is about wall time, tool-call shape, and artifact quality.
- **Thinking traces:** `thinking_chars = 0` in both runs; no internal reasoning depth was persisted.
- **Wall clock:** Timestamps are file birth/mtime + prompt time, not model inference latency.
- **Not a perfectly clean ablation:** User-level Cursor rules and skills still applied in Run B (e.g., `react-native-patterns` skill, `commit-after-change` skill). Repo harness was the only variable removed.
- **Single task:** This is a narrow N=1 comparison. Patterns may not generalize to all tasks, larger codebases, or team contexts.
