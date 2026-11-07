import React from 'react';
import { type AttachIssueRequest, type GuestHostSurface, type GuestItem, type GuestPopoverClosedEvent, type GuestPopoverContext } from '@openchamber/sdk';
import type { GuestBackgroundAction } from '@/lib/guests/run-action';
import { type GuestFileChannel } from '@/lib/guests/file-editor-channel';
import { type GuestPopoverActivation } from '@/lib/guests/popovers';
import { type GuestStatusControlBinding } from '@/lib/guests/status-controls';
import { type PluginContextPanelMode } from '@/lib/surfaces/modes';
type PluginPaneProps = {
    mode: PluginContextPanelMode;
    surface?: GuestHostSurface;
    /**
     * The item this surface was opened for (`ready.item`). The dialog passes
     * it explicitly; the rail pane takes it from `useGuestItemStore` when this
     * prop is left undefined.
     */
    item?: GuestItem | null;
    /**
     * Mounted off-screen to answer a command or action: never takes a parked
     * item and never clears the badge, because the user did not open it.
     */
    headless?: boolean;
    backgroundAction?: GuestBackgroundAction;
    onDismiss?: () => void;
    onAttach?: (issue: AttachIssueRequest) => void;
    onSessionStarted?: () => void;
    /** The guest asked for this content height (`setHeight`). The Work Status section sizes its frame from it. */
    onResize?: (height: number) => void;
    onStatusControls?: (binding: GuestStatusControlBinding | null) => void;
    /** The Work Status panel's own directory; null deliberately means no project. */
    statusDirectory?: string | null;
    /**
     * `surface="file"` only: the editor (`contributes.fileEditors[].id`) to load
     * and the channel that hands it the file. Required together.
     */
    fileEditor?: {
        editorId: string;
        channel: GuestFileChannel;
    };
    /** An overlay child inherits its owner's actual directory, never the current selection. */
    pinnedDirectory?: string;
    /** Host-only context for a sandboxed popover child. */
    popover?: GuestPopoverContext;
    /** Captured by the owner; guest code cannot select an overlay entry or directory. */
    popoverHost?: {
        entry: string;
        directory: string;
        context: GuestPopoverContext;
        activation: GuestPopoverActivation;
        focus: boolean;
    };
    /** Synchronous owner lifecycle authority for popover children. */
    isActive?: () => boolean;
    onPopoverClosed?: (event: GuestPopoverClosedEvent) => void;
    onPopoverActivity?: (active: boolean) => void;
};
export declare const PluginPane: React.FC<PluginPaneProps>;
export {};
