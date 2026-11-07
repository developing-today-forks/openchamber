import React from 'react';
import type { InstalledGuest } from '@/lib/guests/types';
/**
 * An extension's own section (`contributes.statusSection`): the host draws the
 * header from the extension's title and icon, the body is its sandboxed page.
 *
 * The frame exists only while the section is expanded — the collapsible drops
 * its children when folded, and the panel drops the section when it is hidden
 * or the panel itself is — so a folded section costs nothing. Its height is
 * what the guest last asked for through `setHeight`, clamped by the SDK range
 * and remembered for the session; taller content scrolls inside the frame.
 */
export declare const WorkStatusExtensionSection: React.FC<{
    guest: InstalledGuest;
    directory: string | null;
}>;
