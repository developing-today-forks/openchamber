import React from 'react';
import type { IconName } from '@/components/icon/icons';
/**
 * Card grid for Settings pages that browse a set of things with a glanceable
 * state (providers, MCP servers, plugins): a grid of cards, each opening a
 * detail screen with a back arrow. Pages that edit long text keep the
 * list-plus-editor layout instead.
 */
export declare const SETTINGS_CARD_GRID_CLASS = "grid grid-cols-1 gap-3 @xl:grid-cols-2 @3xl:grid-cols-3";
export type SettingsCardTone = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export declare const SettingsCardPill: React.FC<{
    tone: SettingsCardTone;
    children: React.ReactNode;
}>;
/** Small outlined chip for the card footer (scope, source). */
export declare const SettingsCardChip: React.FC<{
    children: React.ReactNode;
}>;
export interface SettingsCardAction {
    label: string;
    icon?: IconName;
    destructive?: boolean;
    onSelect: () => void;
}
interface SettingsCardProps {
    icon: React.ReactNode;
    title: string;
    /** Monospace second line: an id, command or URL. */
    subtitle?: string;
    /** Plain text under the title saying what the item is; up to two lines. */
    description?: string;
    /** Top-right pills (status, update available). */
    badges?: React.ReactNode;
    /** Bottom row content: counts and chips. */
    footer?: React.ReactNode;
    /** Dims the card for things that are present but switched off. */
    muted?: boolean;
    /** Omitted for display-only items, which render as a plain card. */
    onOpen?: () => void;
    /** Row actions, offered from the card's ⋯ button and on right-click. */
    actions?: readonly SettingsCardAction[];
    /** Accessible name for the ⋯ button. */
    actionsLabel?: string;
}
export declare const SettingsCard: React.FC<SettingsCardProps>;
/** Dashed leading card that starts adding a new item. */
export declare const SettingsAddCard: React.FC<{
    label: string;
    hint?: string;
    onClick: () => void;
    settingsItem?: string;
}>;
export declare const SettingsCardSearch: React.FC<{
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}>;
/** Back arrow placed before a detail screen's title. */
export declare const SettingsBackButton: React.FC<{
    label: string;
    onClick: () => void;
}>;
/** Icon tile content for cards without a logo of their own. */
export declare const SettingsCardIcon: React.FC<{
    name: IconName;
}>;
export {};
