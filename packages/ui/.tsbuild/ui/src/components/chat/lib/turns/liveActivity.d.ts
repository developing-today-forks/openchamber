import { type ToolPart } from '@/lib/opencode/model';
import type { ChatMessageEntry, TurnRecord } from './types';
/** A queued user message alone does not retire the previous turn. */
export declare function getTurnsWithLaterAssistant(turns: readonly TurnRecord[]): Set<string>;
export declare function getLiveFinalMessage(messages: readonly ChatMessageEntry[]): ChatMessageEntry | undefined;
/**
 * Subagent calls do not count: a turn that only ran subagents gets no fold, so
 * their rows stay in view. Nor do session notices: a turn whose only row is a
 * notice shows it above the answer.
 */
export declare function hasLiveActivity(turn: TurnRecord, showReasoning: boolean): boolean;
/** The pages a turn's `openchamber_render` calls showed, waiting ones included, in the order they ran. */
export declare function getShownPages(messages: readonly ChatMessageEntry[]): ToolPart[];
