/**
 * A linked issue or change request (GitHub, GitLab) or Linear issue, shown as a chip
 * inside the composer next to the attached files.
 *
 * Linking one attaches its body — and for a PR its diff — as context on the
 * next send. The row exists so that context is visible and dismissible rather
 * than silently riding along, and clicking it reopens the picker to swap the
 * reference.
 */
import React from 'react';
export interface LinkedReferenceRowProps {
    /** Shown before the title: `#12` for an issue, `PR #12` for a pull request. */
    numberLabel: React.ReactNode;
    title: string;
    url: string;
    author?: {
        login: string;
        avatarUrl?: string;
    };
    /** A PR also shows its branches. */
    branches?: {
        head: string;
        base: string;
    };
    openInBrowserLabel: string;
    removeLabel: string;
    onReopenPicker: () => void;
    onRemove: () => void;
}
export declare function LinkedReferenceRow(props: LinkedReferenceRowProps): import("react/jsx-runtime").JSX.Element;
