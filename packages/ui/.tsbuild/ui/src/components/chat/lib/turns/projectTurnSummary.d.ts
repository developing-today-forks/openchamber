import type { ChatMessageEntry, TurnChangedFile, TurnSummaryRecord } from './types';
export declare const projectTurnSummary: (assistantMessages: ChatMessageEntry[]) => TurnSummaryRecord;
/**
 * Files this turn changed, as evidenced by its own edit/write calls.
 *
 * v1 also carried a working-tree snapshot on the user message, which supplied
 * line counts and was the only record of edits a turn delegated to subagents.
 * v2 has no such snapshot, so the turn's own tool calls are the whole story:
 * line counts come from each call's patch, and files a subagent changed in a
 * child session are not listed here.
 */
export declare const projectTurnChangedFiles: (assistantMessages: ChatMessageEntry[]) => TurnChangedFile[] | undefined;
