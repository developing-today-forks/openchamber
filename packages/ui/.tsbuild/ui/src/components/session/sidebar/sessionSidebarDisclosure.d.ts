import type { SessionSidebarRow } from './sessionSidebarRowModel';
/**
 * Opening and closing a section, project, worktree, folder or multi-run in the
 * sidebar. The rows are a flat virtual list, so there is no container to
 * animate: the rows the header shows or hides are revealed above a moving
 * boundary, and the rows after them slide with that boundary, as one block
 * changing height would.
 */
/** As long as a reasoning block takes to open and close in the chat. */
export declare const SIDEBAR_DISCLOSURE_MS = 200;
export declare const SIDEBAR_DISCLOSURE_EASING = "ease-out";
type SessionSidebarDisclosure = {
    opened: boolean;
    /** The toggled header in the previous and in the next rows. */
    previousHeaderIndex: number;
    nextHeaderIndex: number;
    /**
     * The rows shown or hidden, `[blockStart, blockEnd)`: indexes into the next
     * rows when the header opened, into the previous rows when it closed.
     */
    blockStart: number;
    blockEnd: number;
};
/**
 * The one header the user just opened or closed between two row lists, with
 * the rows that appeared or went under it. Null when no header changed, when
 * several did at once (Collapse all, search), or when the change is not one
 * block of rows right under the header.
 */
export declare const findSessionSidebarDisclosure: (previous: readonly SessionSidebarRow[], next: readonly SessionSidebarRow[]) => SessionSidebarDisclosure | null;
/**
 * Keyframes that show the part of a row, `size` tall at `start`, lying above a
 * boundary that moves evenly from `from` to `to`. Offsets are progress along
 * the eased timing, so the reveal keeps pace with the rows sliding below it.
 */
export declare const boundaryClipKeyframes: (start: number, size: number, from: number, to: number) => Keyframe[];
export {};
