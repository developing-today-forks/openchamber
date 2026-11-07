/**
 * Fixed panel width. The panel is not user-resizable: it is an object inside
 * the chat rather than a docked pane, so it has no resizer and no persisted
 * width.
 */
export declare const WORK_STATUS_PANEL_WIDTH = 300;
/** The card's column in the right slot: the card and its margins. */
export declare const WORK_STATUS_COLUMN_WIDTH: number;
/** Row width below which the panel gives its space back to the transcript. */
export declare const WORK_STATUS_REQUIRED_ROW_WIDTH: number;
type Options = {
    isMobile: boolean;
    isVSCode: boolean;
};
type Result = {
    /** Layout can host the panel inline, regardless of the user's switch. */
    fits: boolean;
    /**
     * The chat area is wide enough for the panel's column, whether or not the
     * context panel is open. The right slot keeps the column for the card on
     * this, so closing the context panel goes straight back to it.
     */
    roomy: boolean;
    /**
     * Attach to the flex row that contains the chat column and the panel.
     *
     * A callback ref, not an object ref: an object ref gives no signal when the
     * node attaches, so a measuring effect that reads `.current` would silently
     * observe nothing whenever the row mounts after the effect first ran, and
     * would only recover on the next unrelated dependency change.
     */
    rowRef: (node: HTMLDivElement | null) => void;
    visible: boolean;
};
/**
 * Decides whether the work-status panel may occupy space inside the chat.
 *
 * The width test measures the ROW (chat column + panel), never the chat column
 * alone. The chat column's width is an output of this decision: hiding the
 * panel widens it, which would re-satisfy a chat-width test and re-show the
 * panel, oscillating forever. The row width is independent of the panel, so it
 * is the only stable input.
 */
export declare const useWorkStatusVisibility: ({ isMobile, isVSCode }: Options) => Result;
export {};
