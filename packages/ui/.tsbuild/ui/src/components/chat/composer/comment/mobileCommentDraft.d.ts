/**
 * State machine for the mobile composer's comment mode. On mobile a text
 * selection's "Comment" hands its quote to this controller and the chat
 * column's composer swaps its input for a comment shell
 * (`MobileCommentComposer.tsx`); attaching writes a `chat-quote` draft into
 * the inline comment draft store, joining the next message as context.
 *
 * Invariants (the risky part; unit-tested here):
 * - The (runtime, directory, session) scope captured at `open` is the only
 *   scope the quote may land in. Attach never re-resolves the current
 *   session, and a scope change closes the comment instead of re-targeting.
 * - Every mutation carries the generation of its open it belongs to, so a
 *   stale dictation transcript, a second attach, or a cancel arriving after a
 *   newer comment opened is rejected — `insertAndAttach` is atomic for the
 *   same reason: a stale insert-and-attach neither writes text nor attaches.
 */
import { type InlineCommentDraftTarget } from '@/stores/useInlineCommentDraftStore';
import type { ChatQuoteAnchor } from '@/lib/chatQuoteAnchor';
export interface MobileCommentScope {
    runtimeKey: string;
    directory: string;
    sessionKey: string;
}
export interface MobileCommentQuote {
    /** Plain text, used only for the single-line preview row. */
    plainText: string;
    /** Full markdown of the selection; attached verbatim as quote context. */
    markdownText: string;
    /** `data-message-id` the selection came from, when known. */
    messageId: string | null;
    /** Where the quote sits in that message, when it could be captured. */
    anchor?: ChatQuoteAnchor | null;
}
export type MobileCommentDraft = {
    status: 'closed';
} | {
    status: 'open';
    scope: MobileCommentScope;
    quote: MobileCommentQuote;
    text: string;
    generation: number;
};
/** What attach produced: everything needed to write one chat-quote draft. */
export interface MobileCommentAttachPlan {
    scope: MobileCommentScope;
    target: InlineCommentDraftTarget;
    draft: {
        source: 'chat-quote';
        fileLabel: string;
        startLine: number;
        endLine: number;
        code: string;
        language: string;
        text: string;
        anchor?: ChatQuoteAnchor;
    };
}
export declare const CLOSED_MOBILE_COMMENT_DRAFT: MobileCommentDraft;
/** Keep the full quote text; the shell clips and fades it at the row's edge. */
export declare const mobileCommentQuotePreview: (plainText: string) => string;
export declare const isSameMobileCommentScope: (a: MobileCommentScope, b: MobileCommentScope) => boolean;
export interface MobileCommentDraftController {
    getState(): MobileCommentDraft;
    subscribe(listener: () => void): () => void;
    /** The mounted composer publishes its target, including pending BTW drafts. */
    setScope(scope: MobileCommentScope | null): void;
    /** Capture the composer's target and open a comment for the selection. */
    open(quote: MobileCommentQuote): boolean;
    /**
     * Discard the comment. The only exit that writes nothing. With a
     * generation, only that open is cancelled; returns whether a comment
     * closed, so a stale caller can skip its follow-up (focus restore etc.).
     */
    cancel(generation?: number): boolean;
    /** Comment text typed in the comment editor. */
    setText(text: string, generation: number): void;
    /** Append a dictation transcript to the comment text. */
    insertText(text: string, generation: number): void;
    /**
     * Store the open comment exactly once and close only after acceptance.
     * Rejection returns null and preserves the comment for editing or retry.
     */
    attach(generation: number): MobileCommentAttachPlan | null;
    /**
     * Dictation's insert-and-attach, atomic under one generation check: a
     * stale completion neither appends its text nor attaches the newer
     * comment that replaced the caller's.
     */
    insertAndAttach(text: string, generation: number): MobileCommentAttachPlan | null;
}
export declare function createMobileCommentDraftController(): MobileCommentDraftController;
/**
 * Write an attach plan into the inline comment draft store. The runtime is
 * verified against the scope captured at open: `addDraft` keys by the CURRENT
 * runtime, so a plan from before a runtime switch must be dropped, not filed
 * under the new runtime's namespace. Directory and session are written exactly
 * as captured from the visible composer.
 */
export declare function applyMobileCommentAttach(plan: MobileCommentAttachPlan): boolean;
