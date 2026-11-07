/**
 * The collapsed mobile composer.
 *
 * With the keyboard down the composer is a pill: attachments, a one-line
 * preview of the draft, and a mic. Tapping anywhere in it expands the real
 * composer and raises the keyboard in the same gesture — which is why the
 * expand handler must run synchronously from the tap rather than from an
 * effect.
 *
 * With content, the inner end slot sends while the session is idle. While it
 * is running, abort keeps that slot and a follow-up action appears just before
 * it, inside the pill: it queues or steers as Enter does under the follow-up
 * setting.
 */
import React from 'react';
import type { SourceControlProvider } from '@/lib/api/types';
export interface MobilePillComposerProps {
    message: string;
    sessionId: string | null;
    newSessionDraftOpen: boolean;
    hasContent: boolean;
    isVSCode: boolean;
    canAbort: boolean;
    footerIconButtonClass: string;
    iconSizeClass: string;
    sendIconSizeClass: string;
    stopIconSizeClass: string;
    /** The composer's top rows (goal, queue, hints, suggested follow-up), inside the pill. */
    topRow?: React.ReactNode;
    /** Attached files, shown inside the pill above the draft line. */
    attachments?: React.ReactNode;
    /** Rendered as the pill's own last row (mobile model/agent controls). */
    bottomRow?: React.ReactNode;
    onExpand: () => void;
    onPrimaryAction: () => void;
    onPickLocalFiles: () => void;
    onOpenGitHubPicker: () => void;
    /** The host the project's issues and change requests come from. */
    repositoryProvider?: SourceControlProvider;
    showLinearPicker?: boolean;
    onOpenLinearPicker?: () => void;
    onOpenAttachSheet: () => void;
    onStartDictation: () => void;
    onAbort: () => void;
}
export declare function MobilePillComposer(props: MobilePillComposerProps): import("react/jsx-runtime").JSX.Element;
