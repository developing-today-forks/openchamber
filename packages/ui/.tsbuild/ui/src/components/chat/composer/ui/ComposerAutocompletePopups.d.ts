/**
 * The composer's autocomplete popups.
 *
 * Four pickers, one at a time: the command palette, the inline skill picker,
 * the snippet picker and the file/agent mention picker. Which one is open is
 * decided by the prompt language, not here.
 *
 * They are positioned differently depending on the composer's shape. In the
 * normal composer each picker anchors itself to the composer edge, which its
 * own styles handle. In desktop focus mode the composer fills the surface, so
 * a picker pinned to its edge would sit far from the text — there they are
 * placed at the caret instead, which is what `overlayPosition` carries.
 */
import React from 'react';
import { type CommandAutocompleteHandle, type CommandInfo } from '../../CommandAutocomplete';
import { type FileMentionHandle } from '../../FileMentionAutocomplete';
import { type SkillAutocompleteHandle } from '../../SkillAutocomplete';
import { type SnippetAutocompleteHandle } from '../../SnippetAutocomplete';
import type { AutocompleteKind } from '../language/triggers';
export interface AutocompleteOverlayPosition {
    top: number;
    left: number;
    place: 'above' | 'below';
    maxHeight: number;
}
interface ComposerAutocompletePopupsProps {
    /** Which picker is open, if any. */
    open: AutocompleteKind | null;
    query: string;
    /** Caret placement in focus mode; null when the picker anchors itself. */
    overlayPosition: AutocompleteOverlayPosition | null;
    commandRef: React.RefObject<CommandAutocompleteHandle | null>;
    skillRef: React.RefObject<SkillAutocompleteHandle | null>;
    snippetRef: React.RefObject<SnippetAutocompleteHandle | null>;
    mentionRef: React.RefObject<FileMentionHandle | null>;
    onCommandSelect: (command: CommandInfo) => void;
    onSkillSelect: (skillName: string) => void;
    onSnippetSelect: (snippet: unknown, trigger: string) => void;
    onFileSelect: (file: {
        name: string;
        path: string;
        relativePath?: string;
    }) => void;
    onAgentSelect: (agentName: string) => void;
    onClose: () => void;
}
declare function ComposerAutocompletePopupsView(props: ComposerAutocompletePopupsProps): import("react/jsx-runtime").JSX.Element;
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const ComposerAutocompletePopups: React.MemoExoticComponent<typeof ComposerAutocompletePopupsView>;
export {};
