import React from 'react';
export declare const TURN_ROW_WINDOW_THRESHOLD = 60;
export declare const TURN_ROW_WINDOW_SIZE = 40;
export declare const TURN_ROW_REVEAL_CHUNK = 40;
/**
 * Which rows of a turn are mounted: all but the first `hiddenHead` and the
 * last `hiddenTail`. A hidden head stands in for older steps above the
 * reader; a hidden tail for later steps below. Only a settled turn ever has
 * a hidden tail, so rows appended by a running turn are always mounted.
 */
export interface TurnMessageWindowRange {
    readonly hiddenHead: number;
    readonly hiddenTail: number;
}
export declare const FULL_MESSAGE_WINDOW: TurnMessageWindowRange;
export declare const initialMessageWindow: (rowCount: number) => TurnMessageWindowRange;
/**
 * The window of a settled activity fold the reader just opened. Its header
 * stays where the reader clicked it, also on the timeline's end (opening a
 * row lets go of the end, see useChatTimelineScroll), so the fold opens
 * downward and its first steps are what they see.
 */
export declare const openedFoldMessageWindow: (rowCount: number) => TurnMessageWindowRange;
/** How a row range falls on the turn's messages. */
interface MountedMessages {
    readonly headMessages: number;
    readonly headSkipRows: number;
    readonly tailMessages: number;
    readonly hiddenHeadRows: number;
    readonly hiddenTailRows: number;
}
/**
 * Lays a row range onto messages of `rowsPerMessage` rows each. The head can
 * end inside a message, whose first rows MessageBody then skips; the tail
 * hides whole messages only, so it may mount a few of its rows early, and it
 * never reaches the message the head cuts into.
 */
export declare const resolveMountedMessages: (rowsPerMessage: readonly number[], range: TurnMessageWindowRange) => MountedMessages;
/**
 * Whether mounting a batch in place of the head spacer must hold the first
 * mounted message still. The batch moves everything below the spacer's top
 * by its real height minus the estimate. A spacer starting above the
 * viewport would carry what the reader sees along with it (scrolling up, by
 * several screens once the spacer peeks in and everything left mounts at
 * once), so the first mounted message is held while it is on screen or
 * above. A spacer starting inside the viewport fills in place, and one
 * covering the whole viewport leaves nothing under the reader to hold. A
 * tail spacer needs no hold: it grows below what the reader sees.
 */
export declare const shouldHoldRevealAnchor: (input: {
    spacerTop: number;
    firstMountedTop: number;
    viewTop: number;
    viewBottom: number;
}) => boolean;
/**
 * The mounted window of each turn, per open timeline.
 *
 * Lives above the rows because a turn row remounts while the timeline stays
 * (the streaming tail hands over to a static row when the turn finishes); the
 * remounted row must keep what the reader already revealed, or the content
 * above the viewport would collapse back into the estimate. Opening a settled
 * fold writes here to pick the end it opens at, and navigation to mount a
 * message it is about to scroll to.
 */
export interface TurnMessageWindowStore {
    range: (turnId: string) => TurnMessageWindowRange | undefined;
    setRange: (turnId: string, range: TurnMessageWindowRange) => void;
    subscribe: (listener: () => void) => () => void;
}
export declare const createTurnMessageWindowStore: () => TurnMessageWindowStore;
export declare const TurnMessageWindowContext: React.Context<TurnMessageWindowStore | null>;
export {};
