/**
 * Per-chat-column owner of the mobile comment-mode controller.
 *
 * The controller is intentionally not a global: multiple embedded chat columns
 * can be mounted at once, and each column's selection menu must hand its quote
 * to its own composer. `ChatContainer` creates one controller per column (same
 * pattern as `chatColumnSession.ts`) and provides it here; the selection menu
 * opens through it and `ChatInput` renders from it.
 */
import React from 'react';
import { type MobileCommentDraft, type MobileCommentDraftController } from './mobileCommentDraft';
export declare const MobileCommentComposerContext: React.Context<MobileCommentDraftController | null>;
/**
 * Create (once per column) the comment controller this column provides.
 * The column going away ends its comment; nothing outlives the owner.
 */
export declare function useMobileCommentComposerOwner(): MobileCommentDraftController;
/** The column's controller, or null outside a chat column. */
export declare const useMobileCommentComposerController: () => MobileCommentDraftController | null;
/** Live comment draft state; always closed when there is no controller. */
export declare const useMobileCommentDraft: (controller: MobileCommentDraftController | null) => MobileCommentDraft;
