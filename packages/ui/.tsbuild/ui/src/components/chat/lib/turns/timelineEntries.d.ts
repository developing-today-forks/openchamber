import type { ChatMessageEntry, TurnRecord } from './types';
/** One row of the transcript list: a turn, or a message that belongs to no turn. */
export type TimelineEntry = {
    kind: 'ungrouped';
    key: string;
    message: ChatMessageEntry;
    nextMessage?: ChatMessageEntry;
} | {
    kind: 'turn';
    key: string;
    turn: TurnRecord;
    isLastTurn: boolean;
    hasLaterAssistant?: boolean;
    /** The first message of the row after this turn, for the last assistant message's footer. */
    nextEntryFirstMessage?: ChatMessageEntry;
    /** The real model (`provider/model#variant`) the previous turn with one ran on, for the model-changed marker. */
    previousAssistantModel?: string;
};
type HistoryEntriesInput = {
    staticTurns: readonly TurnRecord[];
    lastTurnId: string | null;
    turnsWithLaterAssistant: ReadonlySet<string>;
    /** Every displayed message, in order; read only when some are ungrouped. */
    messages: readonly ChatMessageEntry[];
    ungroupedMessageIds: ReadonlySet<string>;
    hasStreamingTurn: boolean;
    /** First message of the live tail row, which follows the history. */
    trailingEntryFirstMessage: ChatMessageEntry | undefined;
};
/**
 * The transcript's history rows (everything before the live tail).
 *
 * Rows are memoized on the entry object, so an entry whose content did not
 * change keeps the object it had in `previous`: a new turn arriving or the
 * tail re-projecting re-renders the rows that changed, not every mounted one.
 * Returns `previous` itself when no row changed.
 */
export declare const buildHistoryEntries: (input: HistoryEntriesInput, previous: TimelineEntry[]) => TimelineEntry[];
export {};
