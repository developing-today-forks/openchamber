import React from 'react';
import type { IconName } from '@/components/icon/icons';
export declare const WorkStatusSection: React.FC<{
    title: string;
    /** Names what the section is about, right after the title (the project). */
    subject?: React.ReactNode;
    /** Aggregate for the whole section; belongs on the heading, not on a row. */
    summary?: React.ReactNode;
    children: React.ReactNode;
}>;
/**
 * Section whose body folds away. The chevron swaps on expand exactly as the
 * transcript's tool blocks do, so the two collapsibles read as the same
 * control rather than two conventions in one window.
 *
 * Expanded state lives in the persisted UI store, not in component state: the
 * panel unmounts whenever the context panel opens, and local state would
 * silently discard the user's arrangement every time.
 */
export declare const WorkStatusCollapsibleSection: React.FC<{
    /** Stable key for persisting expanded state. */
    id: string;
    title: string;
    icon?: IconName;
    /** For glyphs that live outside the sprite, such as the MCP mark. */
    iconNode?: React.ReactNode;
    iconColor?: string;
    /** Shown on the header while collapsed and expanded alike. */
    summary?: React.ReactNode;
    /** An independent header action, such as refreshing this section's data. */
    action?: React.ReactNode;
    /** Keeps compact actions beside the title; wider action groups sit below it. */
    actionLayout?: 'inline' | 'below';
    defaultExpanded?: boolean;
    /** Optional preview that stays below the heading while the section is folded. */
    collapsedContent?: React.ReactNode;
    children: React.ReactNode;
}>;
type RowProps = {
    icon?: IconName;
    iconColor?: string;
    leading?: React.ReactNode;
    label: React.ReactNode;
    value?: React.ReactNode;
    muted?: boolean;
    /** Turns the row into a button; the caller decides what it opens. */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    ariaLabel?: string;
    tooltip?: React.ReactNode;
    className?: string;
};
/**
 * A single readout. `value` sits hard right; `label` truncates before it, so a
 * long branch name never pushes its own ahead/behind counts out of view.
 */
export declare const WorkStatusRow: React.FC<RowProps>;
type WorkStatusTone = 'default' | 'muted' | 'success' | 'error' | 'warning' | 'info';
export declare const WorkStatusValue: React.FC<{
    children: React.ReactNode;
    tone?: WorkStatusTone;
}>;
/**
 * Trailing control shaped like the PR badge: a status that is also the thing
 * you press. Used where the state itself is the affordance — an MCP server
 * asking for sign-in, a goal waiting to be resumed.
 */
export declare const WorkStatusRowAction: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
    tone?: 'default' | 'warning' | 'error' | 'info';
    disabled?: boolean;
    ariaLabel?: string;
}>;
export declare const WorkStatusPill: React.FC<{
    children: React.ReactNode;
    color?: string;
    background?: string;
}>;
/** Full-width callout for states that block the branch (merge, rebase, …). */
export declare const WorkStatusCallout: React.FC<{
    children: React.ReactNode;
}>;
/** Context-window fill, drawn under its row rather than inside it. */
export declare const WorkStatusMeter: React.FC<{
    percent: number;
    color: string;
}>;
export {};
