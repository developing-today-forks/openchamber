/**
 * Per-session draft persistence for the composer.
 *
 * A draft belongs to a (runtime, directory, session) identity. Switching any
 * of those saves the outgoing draft and restores the incoming one, so moving
 * between sessions never loses typed text and never leaks it into the wrong
 * conversation. The exception is the same draft changing directory: the open
 * new-session draft changing its project or worktree, or a session moved to
 * another directory. Its text and files move to the new directory.
 *
 * Writes are debounced while typing but forced at every edge where the page
 * may stop running — tab hidden, frozen, unloading, unmounting — because a
 * pending timer is not a saved draft.
 */
import React from 'react';
import { type ChatDraftIdentity } from '@/lib/chatDraftPersistence';
export interface ComposerDraftOptions {
    /** Current composer text. */
    message: string;
    /** Latest text without waiting for a render, for flush-on-unload paths. */
    messageRef: React.RefObject<string>;
    setMessage: (text: string) => void;
    /**
     * Mention paths the user confirmed through the picker. Mutated here:
     * mentions no longer present in the text are dropped before saving.
     */
    confirmedMentionsRef: React.RefObject<Set<string>>;
    /** The draft this composer currently belongs to. */
    identity: ChatDraftIdentity | null;
    /**
     * Makes this draft's attachments the app's selected attachment slot when
     * the identity changes. Off for a chat pinned in the side panel: it takes
     * the slot only when the user works in it, so the main composer keeps
     * receiving app-wide attachments meanwhile.
     */
    selectAttachmentsOnIdentityChange?: boolean;
    /** User setting: when off, drafts stay in memory without durable writes. */
    persistEnabled: boolean;
    /** The draft restored on mount, if any. */
    initialDraft: {
        text: string;
        identity: ChatDraftIdentity | null;
    };
    /**
     * Id of the open new-session draft shown in this composer, or null. It
     * stays the same while the user changes the draft's project or worktree
     * and changes when a new draft opens.
     */
    newSessionDraftId?: number | null;
    /** Called when the composer switches to a different draft identity. */
    onIdentityChange?: () => void;
    /** Called after restoring a saved draft or fork replay, to select its text. */
    onDraftRestored?: (source: 'saved' | 'fork') => void;
}
export interface ComposerDraftControls {
    /**
     * Write a draft now, bypassing the debounce. Used on submit, where the
     * cleared composer must be stored before the send resolves.
     */
    persistNow: (identity: ChatDraftIdentity | null, draft: string) => void;
    /** Consume a command in the current draft while opening another draft. */
    handoffDraft: (identity: ChatDraftIdentity | null, draft: string | null) => void;
    /** Restore a draft after a failed send without using persistence as state. */
    restoreDraft: (identity: ChatDraftIdentity | null, draft: string, confirmedMentions: Set<string>) => void;
    /** Move an in-memory draft to an identity materialized during an async flow. */
    migrateDraft: (from: ChatDraftIdentity | null, to: ChatDraftIdentity | null) => void;
}
export declare function useComposerDraft(options: ComposerDraftOptions): ComposerDraftControls;
