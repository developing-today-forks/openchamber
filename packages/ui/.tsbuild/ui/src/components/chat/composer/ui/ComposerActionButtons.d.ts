/**
 * The composer's send / queue / stop control.
 *
 * Which one is shown depends on whether a turn is running: idle sends, a busy
 * session with content offers both a follow-up action (above) and stop, a busy
 * session without content offers only stop. The follow-up action does what
 * Enter does under the follow-up setting: it queues, or it steers and then
 * looks like the plain send button.
 */
import React from 'react';
type ComposerActionButtonsProps = {
    isMobile: boolean;
    footerIconButtonClass: string;
    sendIconSizeClass: string;
    stopIconSizeClass: string;
    canSend: boolean;
    canAbort: boolean;
    hasContent: boolean;
    currentSessionId: string | null;
    newSessionDraftOpen: boolean;
    onPrimaryAction: () => void;
    onAbort: () => void;
    /** Replaces "Send message" as the accessible name and tooltip (parallel mode says how many runs start). */
    sendLabel?: string;
};
export declare const ComposerActionButtons: React.MemoExoticComponent<(props: ComposerActionButtonsProps) => import("react/jsx-runtime").JSX.Element>;
export {};
