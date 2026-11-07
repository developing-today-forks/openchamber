/**
 * Owns ChatInput's comment subscription, scope checks, and attach/cancel focus
 * handoff. Callbacks capture the rendered generation; ChatInput keys the shell
 * by it. A quote stays in its captured scope or is dropped, never re-targeted.
 */
import type { MobileComposerShell } from '../state/useMobileComposerShell';
import { useMobileCommentDraft } from './MobileCommentComposerContext';
import type { MobileCommentComposerHandlers } from './MobileCommentComposer';
export interface MobileCommentModeOptions {
    isMobile: boolean;
    runtimeKey: string;
    /** Session the composer's inline drafts target ('' when there is none). */
    directory: string | null;
    sessionKey: string | null;
    mobileShell: MobileComposerShell;
}
export interface MobileCommentMode {
    active: boolean;
    draft: ReturnType<typeof useMobileCommentDraft>;
    /** Wiring for the comment shell; callbacks are bound to the rendered open. */
    handlers: MobileCommentComposerHandlers;
    /** Attach whatever comment is open right now (form submit path). */
    submit(): void;
}
export declare function useMobileCommentComposerMode(options: MobileCommentModeOptions): MobileCommentMode;
