/**
 * The composer's text editor.
 *
 * This replaces the transparent-textarea-over-mirror-div arrangement the
 * composer used before. That arrangement could only paint styles which do not
 * change glyph advance width — colour, background, underline — because any
 * metric change made the mirror drift out from under the caret. Bold, italic
 * and any width-affecting affordance were therefore impossible, and the
 * overlay had to be disabled outright on mobile, where wrapped text drifted
 * anyway.
 *
 * CodeMirror owns the text and the caret together, so there is no second layer
 * to keep aligned. The document remains a plain string — `getValue()` is
 * exactly what gets sent — so nothing downstream has to serialize a rich
 * document model back into a prompt.
 *
 * The component is a controlled primitive: it renders `value`, reports edits,
 * and exposes an imperative handle for the caret-level operations the composer
 * performs (insert a mention, restore a draft, replace a token). Every policy
 * decision — what a key means, which picker opens, when to send — stays with
 * the caller.
 */
import React from 'react';
import type { ComposerLanguageContext } from '../language/tokenize';
import type { ComposerAutoCorrect } from './autocorrect';
import type { ComposerEditorViewStore } from './viewStore';
export interface ComposerSelection {
    start: number;
    end: number;
}
export interface ComposerChange {
    value: string;
    selection: ComposerSelection;
    /** True when the edit came from a paste rather than typing. */
    fromPaste: boolean;
    /** The text this edit inserted, empty for deletions. */
    insertedText: string;
    /**
     * True when the edit only applied a new `value` prop: text the app put
     * there (a restored draft, a prepared prompt), not anything the user typed
     * or pasted. Callers must not open pickers for it.
     */
    fromValueProp: boolean;
}
export interface ComposerEditorHandle {
    focus(options?: {
        preventScroll?: boolean;
    }): void;
    blur(): void;
    isFocused(): boolean;
    getValue(): string;
    getSelection(): ComposerSelection;
    setSelection(start: number, end?: number): void;
    selectAll(): void;
    /** Replace the current selection, leaving the caret after the insertion. */
    insertText(text: string): void;
    /** Replace a range; selection defaults to a caret after the inserted text. */
    replaceRange(from: number, to: number, text: string, selectionStart?: number, selectionEnd?: number): void;
    /** Viewport coordinates of the caret, for positioning popups. */
    caretCoords(position?: number): {
        top: number;
        bottom: number;
        left: number;
    } | null;
    /** The scrollable element, for measuring and scroll compensation. */
    getScrollDOM(): HTMLElement | null;
}
export interface ComposerEditorProps {
    value: string;
    onChange: (change: ComposerChange) => void;
    /** Caret or selection moved without the document changing. */
    onSelectionChange?: (selection: ComposerSelection) => void;
    /**
     * Key press before CodeMirror handles it. Return true to consume the
     * event — this is where the composer routes autocomplete navigation,
     * message history and send.
     */
    onKeyDown?: (event: KeyboardEvent) => boolean;
    onKeyUp?: (event: KeyboardEvent) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onPaste?: (event: ClipboardEvent) => void;
    languageContext: ComposerLanguageContext;
    placeholder?: string;
    editable?: boolean;
    spellCheck?: boolean;
    /**
     * The content element's autocorrect keyword. See `autocorrect.ts` for the
     * case-sensitive CodeMirror workaround.
     */
    autoCorrect?: ComposerAutoCorrect;
    autoCapitalize?: 'none' | 'sentences';
    /** Retain the untouched key policy before a mobile user opts in. */
    preserveDeferredEnterShift?: boolean;
    /** Fill the available height instead of growing with the content. */
    fillContainer?: boolean;
    /** Lines of text shown before the editor starts scrolling. */
    maxLines?: number;
    /**
     * Selector of the ancestor the composer must never outgrow. The cap is
     * measured — the ancestor's height minus the chrome around the editor,
     * both read from the DOM — and the smaller of it and `maxLines` wins.
     */
    boundSelector?: string;
    /** Breathing room kept between the grown composer and the bound's edge. */
    boundGapPx?: number;
    className?: string;
    contentClassName?: string;
    /**
     * Value of the host's `data-chat-input` attribute. The default `"true"`
     * marks the composer's prompt editor for global helpers (`focusChatInput`,
     * shortcut guards); a second editor in the same column — the mobile
     * comment editor — passes its own marker so those helpers skip it.
     */
    dataChatInput?: string;
    /**
     * Keeps the underlying view alive across unmounts. Supply one from a parent
     * that outlives the swap; without it the view is built and destroyed with
     * the component, which is correct but expensive on an interaction path.
     */
    viewStore?: ComposerEditorViewStore;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare const ComposerEditor: React.NamedExoticComponent<ComposerEditorProps & React.RefAttributes<ComposerEditorHandle>>;
