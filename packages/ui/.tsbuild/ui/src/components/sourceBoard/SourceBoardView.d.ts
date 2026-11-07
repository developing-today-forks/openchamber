/**
 * The issues and pull requests board: a full page over the chat area that
 * lists a project's repository items (GitHub or GitLab, whichever hosts it)
 * or Linear issues, previews the highlighted one and acts on it.
 *
 * The board keeps its own project. It opens on the one it was left on and
 * switching it never changes the project the rest of the app shows; only an
 * action that opens something in a project (a session, its changes) moves the
 * app there.
 *
 * A project whose folder is not a repository but holds some is read through
 * one of them, chosen beside the project picker; the board's choice is its
 * own and leaves the Git screen's selection alone.
 */
import * as React from 'react';
/**
 * Once opened, the board stays mounted and is only hidden while closed, so it
 * reopens exactly where it was left however it was opened: the item, the
 * search, the list and preview scrolled where they were, a reply half typed.
 */
export declare const SourceBoardView: React.FC;
/**
 * The board as the phone shell's page: one column, the preview in place of
 * the list, and `onLeave` once a session starts so the chat comes back. It
 * draws its own header, so the project picker and the way back from an item
 * share the close button's row.
 */
export declare const MobileSourceBoard: React.FC<{
    onLeave: () => void;
    onClose: () => void;
}>;
