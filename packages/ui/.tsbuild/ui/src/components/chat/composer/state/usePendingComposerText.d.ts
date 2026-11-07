/**
 * Takes the text other parts of the app leave for a composer through
 * `input-store.pendingInputText` (git conflict prompts, plugins, file
 * selections, reverts) and puts it into this composer.
 *
 * The main chat's composer lives in a column that shows the deferred
 * selection (see chatColumnSession.ts): right after a switch it still shows
 * the outgoing session for a render. Text left at that moment belongs to the
 * session the user is going to, so the composer waits until its column
 * shows the live selection. Taking it earlier would save it into the
 * outgoing session's draft and leave the incoming one empty.
 */
import React from 'react';
export interface PendingComposerTextOptions {
    /** Off while the composer is talking to a `/btw` fork. */
    enabled: boolean;
    /** Who this composer takes text for; see input-store `pendingInputTarget`. */
    target: string | null;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    focus: () => void;
}
export declare function usePendingComposerText({ enabled, target, setMessage, focus }: PendingComposerTextOptions): void;
