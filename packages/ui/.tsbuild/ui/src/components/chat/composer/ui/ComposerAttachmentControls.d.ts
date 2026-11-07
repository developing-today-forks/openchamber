/**
 * Attachment and settings controls in the composer footer.
 *
 * Rendered twice on mobile — once in the collapsed pill, once in the expanded
 * footer — so it stays a memoized component with an explicit comparator: a
 * re-render of the whole composer must not tear down the dropdown while it is
 * open.
 */
import type { SourceControlProvider } from '@/lib/api/types';
import React from 'react';
import type { GuestAttachItem } from '@/hooks/useGuestSurfaces';
type ComposerAttachmentControlsProps = {
    isVSCode: boolean;
    footerIconButtonClass: string;
    iconSizeClass: string;
    handlePickLocalFiles: () => void;
    openGitHubPicker: () => void;
    /** The host the project's issues and change requests come from. */
    repositoryProvider?: SourceControlProvider;
    showLinearPicker?: boolean;
    openLinearPicker?: () => void;
    onOpenSettings?: () => void;
    onMenuOpenChange?: (open: boolean) => void;
    /** Mobile: open the attachment bottom sheet instead of the dropdown menu. */
    onOpenMobileSheet?: () => void;
    attachGuests?: readonly GuestAttachItem[];
    onOpenGuestAttach?: (guestId: string) => void;
    /**
     * Only offer local files. The `/btw` composer takes files but none of the
     * linked context (issues, PRs, guests), which stays with the main draft.
     */
    filesOnly?: boolean;
};
export declare const ComposerAttachmentControls: React.MemoExoticComponent<(props: ComposerAttachmentControlsProps) => import("react/jsx-runtime").JSX.Element>;
export {};
