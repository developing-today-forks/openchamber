## What and why

Fixes #1831.

The goal spec dialog counter showed only spec.length/charLimit, so users could not judge the spec size against a model context while editing. This adds a labelled estimated token count beside the character counter: ~N tokens (est.), computed with a cheap chars/4 heuristic (estimateGoalSpecTokens, Math.ceil(length/4)) — no tokenizer runs per keystroke, and the label says it is an estimate. The new chat-dual.counter.tokens string (rendered via chat-dual.counter.tokens key) is translated in all 15 locales in session-goal-writer.i18n.ts. The character counter and char-limit behaviour are untouched.

## Validation

- bun test packages/ui/src/components/chat/GoalSpecDialog.test.tsx packages/ui/src/lib/i18n/messages/session-goal-writer.i18n.test.ts — 8 pass, 0 fail. New test pins the labelled estimate on a known spec (22 chars -> ~6 tokens) beside the 22/ character counter; the i18n parity test covers the new key in all 15 locales.

---
agent-note:v1 - repo-worker-openchamber - lane openchamber-a - queue task 13406
