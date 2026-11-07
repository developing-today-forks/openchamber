/**
 * The composer's footer row.
 *
 * Desktop lays it out as attachments and toggles on the left, model controls
 * and send on the right. Mobile keeps everything on one line and swaps the
 * model controls for the compact buttons above the text, because the footer
 * has to stay reachable with one thumb.
 *
 * The dictation component is rendered here on desktop only: on mobile it lives
 * at the composer wrapper level so a recording started from the collapsed pill
 * survives the expand.
 */
import type { SourceControlProvider } from '@/lib/api/types';
import React from 'react';
import type { GuestAttachItem } from '@/hooks/useGuestSurfaces';
import type { PermissionMode } from '@/stores/utils/permissionAutoAccept';
import type { BtwSelection } from '@/stores/useBtwStore';
interface ComposerFooterProps {
    isMobile: boolean;
    isVSCode: boolean;
    sessionId: string | null;
    directory?: string;
    newSessionDraftOpen: boolean;
    messageLength: number;
    radius: string;
    footerPaddingClass: string;
    footerGapClass: string;
    footerIconButtonClass: string;
    iconSizeClass: string;
    sendIconSizeClass: string;
    stopIconSizeClass: string;
    canSend: boolean;
    canAbort: boolean;
    hasContent: boolean;
    isExpandedInput: boolean;
    permissionMode: PermissionMode;
    isPermissionAutoAcceptInteractive: boolean;
    dictationActive: boolean;
    onOpenSettings?: () => void;
    onPickLocalFiles: () => void;
    onOpenGitHubPicker: () => void;
    /** The host the project's issues and change requests come from. */
    repositoryProvider?: SourceControlProvider;
    showLinearPicker?: boolean;
    onOpenLinearPicker?: () => void;
    attachGuests?: readonly GuestAttachItem[];
    onOpenGuestAttach?: (guestId: string) => void;
    onOpenAttachSheet: () => void;
    onToggleExpandedInput: () => void;
    onCyclePermissionMode: () => void;
    onPrimaryAction: () => void;
    onAbort: () => void;
    onStartDictation: () => void;
    onDictationInsert: (text: string) => void;
    onDictationInsertAndSend: (text: string) => void;
    onDictationSendStart: () => void;
    onDictationStart: () => void;
    onDictationContentHeightChange: (height: number | null) => void;
    /** Desktop only: the composer box hides its other contents while the overlay is up. */
    onDictationActiveChange?: (active: boolean) => void;
    isBtw?: boolean;
    modelSessionId?: string | null;
    btwSelection: BtwSelection;
    /** A pinned column's own model, agent and effort (see pinnedComposerSelection.ts). */
    pinnedSelection?: BtwSelection | null;
    /** Offers "Run on several models" in the model picker (desktop). */
    onRunInParallel?: () => void;
    /** Set while the composer is in "Run in parallel" mode: the primary action launches the run. */
    parallelRun?: {
        runCount: number;
        launching: boolean;
        onLaunch: () => void;
    } | null;
    /** A sent message is held until OpenCode's first connection. */
    waitingForOpenCode: boolean;
}
declare function ComposerFooterView(props: ComposerFooterProps): import("react/jsx-runtime").JSX.Element;
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const ComposerFooter: React.MemoExoticComponent<typeof ComposerFooterView>;
export {};
