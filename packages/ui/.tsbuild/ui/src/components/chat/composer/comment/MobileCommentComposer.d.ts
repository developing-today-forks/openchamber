/**
 * The mobile composer's comment mode: one rounded shell replacing the normal
 * composer while a comment on a quoted selection is written. The quote row
 * shows a single-line quote preview; the comment editor, a comment-scoped mic and
 * the attach button sit below. Attach is the only primary action. The parent
 * remounts this shell per comment (keyed by generation), so a replaced open
 * gets fresh dictation callbacks and cannot target the previous quote.
 */
import type { Theme } from '@/types/theme';
import { type MobileCommentDraft } from './mobileCommentDraft';
export interface MobileCommentComposerHandlers {
    onTextChange(text: string): void;
    onCancel(): void;
    onAttach(): void;
    onDictationInsert(text: string): void;
    /** Insert-and-send in comment mode attaches the comment; it never sends. */
    onDictationInsertAndSend(text: string): void;
    onEditorFocus(): void;
    onEditorBlur(): void;
    onDictationActiveChange(active: boolean): void;
}
export interface MobileCommentComposerProps {
    draft: Extract<MobileCommentDraft, {
        status: 'open';
    }>;
    theme: Theme;
    handlers: MobileCommentComposerHandlers;
}
export declare function MobileCommentComposer({ draft, theme: currentTheme, handlers }: MobileCommentComposerProps): import("react/jsx-runtime").JSX.Element;
