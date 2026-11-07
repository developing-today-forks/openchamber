import React from 'react';
/** Attaches a note or plan to the current session's context. */
export declare const KnowledgePinToggle: React.FC<{
    pinned: boolean;
    onToggle: () => void;
    /** An opened entry shows its controls without waiting for hover. */
    alwaysVisible?: boolean;
}>;
type KnowledgeMenuItem = {
    id: string;
    label: string;
    /** A longer explanation shown as the item's tooltip. */
    hint?: string;
    destructive?: boolean;
    disabled?: boolean;
    onSelect: () => void;
};
export declare const KnowledgeMenu: React.FC<{
    items: KnowledgeMenuItem[];
    disabled?: boolean;
    /** An opened entry shows its controls without waiting for hover. */
    alwaysVisible?: boolean;
}>;
export {};
