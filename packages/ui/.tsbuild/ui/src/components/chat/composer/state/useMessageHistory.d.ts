/**
 * Walking back through previously sent messages with the arrow keys.
 *
 * History arrives oldest to newest. The cursor spans `0..history.length`, with
 * `history.length` reserved for the live draft endpoint. Moving away from a
 * cursor stores the current value as an overlay for that cursor so edits survive
 * round-trips through history.
 */
export type MessageHistoryValue<TAttachment> = {
    text: string;
    attachments: readonly TAttachment[];
};
export interface HistoryState<TAttachment> {
    cursor: number;
    identity: string;
    history: readonly MessageHistoryValue<TAttachment>[];
    overlays: ReadonlyMap<number, MessageHistoryValue<TAttachment>>;
}
export interface HistoryStep<TAttachment> {
    state: HistoryState<TAttachment>;
    value: MessageHistoryValue<TAttachment> | null;
}
export interface MessageHistory<TAttachment> {
    isBrowsing: boolean;
    older: (currentValue: MessageHistoryValue<TAttachment>) => MessageHistoryValue<TAttachment> | null;
    newer: (currentValue: MessageHistoryValue<TAttachment>) => MessageHistoryValue<TAttachment> | null;
    reset: () => void;
}
export declare function createHistoryState<TAttachment>(history: readonly MessageHistoryValue<TAttachment>[], identity: string): HistoryState<TAttachment>;
export declare function resetHistoryState<TAttachment>(state: HistoryState<TAttachment>, history?: readonly MessageHistoryValue<TAttachment>[]): HistoryState<TAttachment>;
export declare function stepOlder<TAttachment>(state: HistoryState<TAttachment>, history: readonly MessageHistoryValue<TAttachment>[], currentValue: MessageHistoryValue<TAttachment>): HistoryStep<TAttachment>;
export declare function stepNewer<TAttachment>(state: HistoryState<TAttachment>, history: readonly MessageHistoryValue<TAttachment>[], currentValue: MessageHistoryValue<TAttachment>): HistoryStep<TAttachment>;
export declare function syncHistoryState<TAttachment>(state: HistoryState<TAttachment>, history: readonly MessageHistoryValue<TAttachment>[], identity: string): HistoryState<TAttachment>;
export declare function useMessageHistory<TAttachment>(history: readonly MessageHistoryValue<TAttachment>[], identity: string): MessageHistory<TAttachment>;
