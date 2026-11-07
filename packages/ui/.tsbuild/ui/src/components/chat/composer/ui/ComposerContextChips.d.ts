/**
 * Context chips in the composer's attachment row.
 *
 * Each chip stands for context that will be attached to the next message but
 * is not part of its text: review comments left in a diff, preview
 * annotations, terminal selections, PR context, chat quotes. The chips sit
 * beside attached files and linked references and share their look. Hovering
 * (or tapping) a chip opens a stacked preview of its items above the composer,
 * where a comment the user wrote can be edited in place and any item removed
 * before sending.
 *
 * The preview is portaled into `previewHost`, a positioned wrapper outside the
 * composer box, which clips its contents (see "Floating composer" in
 * composer/DOCUMENTATION.md).
 */
import React from 'react';
import { type InlineCommentDraftTarget } from '@/stores/useInlineCommentDraftStore';
import type { Theme } from '@/types/theme';
interface ComposerContextChipsProps {
    draftTarget: InlineCommentDraftTarget | null;
    colors: Theme['colors'];
    /** Positioned wrapper above which the preview opens; the preview waits for it. */
    previewHost: HTMLElement | null;
}
declare function ComposerContextChipsView({ draftTarget, colors, previewHost }: ComposerContextChipsProps): import("react/jsx-runtime").JSX.Element | null;
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const ComposerContextChips: React.MemoExoticComponent<typeof ComposerContextChipsView>;
export {};
