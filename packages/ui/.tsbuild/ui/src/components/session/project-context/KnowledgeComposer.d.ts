import React from 'react';
/**
 * The one way every section adds an entry: a single line that grows with its
 * text. Enter adds. A multiline field follows the chat composer: Shift+Enter
 * starts a new line on desktop, and on a phone, whose keyboard has no
 * Shift+Enter, Return starts a new line and the add button adds. A one-line
 * field turns pasted line breaks into spaces.
 *
 * The draft lives here, so dictation can continue it and a failed add can
 * put it back.
 */
export declare const KnowledgeComposer: React.FC<{
    placeholder: string;
    addLabel: string;
    maxLength: number;
    multiline?: boolean;
    dictation?: boolean;
    disabled?: boolean;
    /** Resolves false when the entry was not added; the text then stays. */
    onSubmit: (text: string) => Promise<boolean> | boolean;
    /** Extra controls before the add button, such as an import action. */
    extraActions?: React.ReactNode;
}>;
