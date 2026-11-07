import React from 'react';
export interface ChatQuoteMarkPopoverProps {
    ref?: React.Ref<HTMLDivElement>;
    /** Viewport rect of the marked fragment. */
    anchorRect: DOMRect;
    comment: string;
    editing: boolean;
    onEditingChange: (editing: boolean) => void;
    onSave: (text: string) => void;
    onRemove: () => void;
    /** Where to render: the open modal dialog for a quote in a full-screen page; the body otherwise. */
    portalTarget?: HTMLElement | null;
}
export declare function ChatQuoteMarkPopover({ ref, anchorRect, comment, editing, onEditingChange, onSave, onRemove, portalTarget, }: ChatQuoteMarkPopoverProps): React.ReactPortal;
