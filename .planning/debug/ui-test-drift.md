---
status: resolved
trigger: "제품 기능·테스트 수정까지 포함"
created: 2026-10-20T02:10:00Z
updated: 2026-10-20T02:10:00Z
---

## Current Focus

bug_class: bohrbug (UI test contract drift); heisenbug-mandelbug candidate (independent boundary timeout).
hypothesis: Three test files retain former labels/headings while the existing product UI deliberately uses new Korean copy.
test: Change only exact test queries/expected headings, retain behavioral assertions, run full suite without concurrent build.
expecting: UI failures disappear without product code changes; boundary test remains unchanged and passes.
next_action: Update the three test files to the current exact UI names, then run all tests.
reasoning_checkpoint:
  hypothesis: Test accessible-name queries and heading expectations are stale after existing UI-copy changes; they fail before the behavior being tested executes.
  confirming_evidence:
    - Parent failure log shows old text selectors, numbered headings and 목록 조회; existing product diff has 대본, 연출 지시, unnumbered headings and 목록 새로고침.
    - generation-order.test.tsx was only partially updated before this task and expects 연출 입력창 while product aria-label is 연출 지시 입력창.
    - Isolated unchanged 32MiB boundary regression passes in 3.95 seconds (whole command 4.27 seconds).
  falsification_test: Any functional assertion still failing after selectors match current UI would refute a selector-only explanation for that failure.
  fix_rationale: Update test contract names to current intentional UI, preserving DOM order, focus, input, request, streaming and result assertions.
  blind_spots: Live VoiceOver and paid provider quality are not tested; full suite may reveal downstream failures previously hidden by early selector failures.
  candidate_causes:
    - code: stale test labels/heading arrays after intentional UI copy changes.
    - environment: simultaneous production build increases latency of large boundary fixture beyond default timeout.
    - data: corrupt/changed audio boundary fixture could cause real output corruption (isolated boundary test contradicts this).
  and_gate: No for deterministic UI failures; stale expected names alone suffice. Timeout is a separate observation, not required for UI failures.

## Symptoms

expected: Full npm test and production build pass while preserving intended current UI and accessibility behavior.
actual: Parent observed 38 failures / 165 passes in 4 failed / 15 passed files during path audit; build passed.
errors: Obsolete accessible labels/headings and one 32MiB route test timeout reported by parent.
reproduction: npm test in /Users/vini/Documents/GitHub/gemini-tts.
started: Detected during path migration; existing page.tsx, VoiceLibrary.tsx, generation-order.test.tsx changes predate this task.

## Eliminated

- hypothesis: Route 32MiB arithmetic or fixture is deterministically broken after path migration.
  evidence: Unchanged isolated test passed both exact-limit acceptance and overflow rejection; no timeout modification needed.

## Evidence

- checked: Project AGENTS.md, STRUCTURE.md, ui-followup.md, package.json, config.json, working tree.
  found: Existing three UI/test files dirty before task; UI order/input preservation and Korean labels are explicit project contracts. No agent_skills configured. Existing unrelated debug sessions must be preserved.
  implication: Preserve current changes and distinguish obsolete test contracts from actual runtime defects. No commits or live paid API calls authorized.
- checked: Phase 0 recall and optional SBFL availability.
  found: MemPalace CLI and .planning/debug/knowledge-base.md absent; no configured per-test coverage. No project-local skills; agent_skills mapping empty.
  implication: No known-pattern match or SBFL ranking used. Existing working-tree diff localizes UI drift without bisecting unrelated history.
- checked: Current VoiceLibrary, generation-order/page/voice-category tests and parent complete failure summary.
  found: 37 UI failures stop on obsolete selectors/headings; the remaining failure was a 5.264-second boundary-test timeout while build ran in parallel.
  implication: Correct test names only first, preserving every behavior assertion; avoid changing timeout on a load-related single observation.
- checked: Unchanged isolated boundary test with OS sandbox denying all network and provider-key environment removed.
  found: 1 selected test passed (43 other route tests filtered out), 3.95-second test time; gemini-boundary-before.log.
  implication: No deterministic route defect confirmed. Full suite will run separately from build.
- checked: Three UI test files reproduced under network-denying sandbox before edits.
  found: 37 failed / 12 passed, exactly matching parent's UI failures; gemini-ui-before.log.
  implication: UI drift is deterministic independently of build load.

## Resolution

root_cause: Three UI test files were not consistently synchronized with intentional existing Korean UI copy changes.
fix: Synchronize exact accessible names/headings with the existing UI; retain all behavior assertions and unchanged 32MiB timeout.
verification: npm test under deny-network sandbox: 19 files, 203 tests passed; npm run build passed.
files_changed: src/app/page.test.tsx, src/app/generation-order.test.tsx, src/app/components/voice-categories.test.tsx

## Final verification
Parent resumed after agent interruption, inspected the changes, and completed the full checks. npm test under deny-network sandbox: 19 files, 203 tests passed; npm run build passed. No product source rollback or weakened assertions.
