import React from 'react';
import type { InstalledGuest } from '@/lib/guests/types';
type GuestApprovalDialogProps = {
    guest: InstalledGuest | null;
    busy: boolean;
    onApprove: (guest: InstalledGuest) => void;
    onDecline: (guest: InstalledGuest) => void;
    onDismiss: () => void;
};
/**
 * One-time approval of everything a package asks for. Shown right after an
 * install that requests any capability, and again from the card whenever a
 * newer package asks for more than the user approved.
 */
export declare const GuestApprovalDialog: React.FC<GuestApprovalDialogProps>;
export {};
