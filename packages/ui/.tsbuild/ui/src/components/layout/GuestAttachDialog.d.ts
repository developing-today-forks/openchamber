import React from 'react';
import { type AttachIssueRequest, type GuestItem } from '@openchamber/sdk';
type GuestAttachDialogProps = {
    guestId: string | null;
    /** The chip, message, or session the dialog was opened for; `null` (default) when opened from the + menu. */
    item?: GuestItem | null;
    onOpenChange: (open: boolean) => void;
    onAttach?: (issue: AttachIssueRequest) => void;
    onSessionStarted?: () => void;
};
export declare const GuestAttachDialog: React.FC<GuestAttachDialogProps>;
export {};
