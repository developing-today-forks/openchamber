/**
 * The text field of desktop comment surfaces in ordinary page DOM: chat quote
 * comments and editing a pending comment above the composer. Line comments
 * inside the diff viewer and the file editor use `InlineCommentInput`'s
 * textarea instead (see the composer DOCUMENTATION.md).
 *
 * It is the composer's own editor with comment policy on top, so a comment
 * reads like the prompt it ends up in: pasted images show as file chips,
 * `#snippet` references as snippet chips, Markdown is highlighted. Agents,
 * commands and file mentions do not resolve in a comment.
 *
 * Keys: Enter submits (Shift+Enter breaks the line; with `enterSubmits` off,
 * as on touch, only Cmd/Ctrl+Enter submits), Escape cancels. Both wait for an
 * IME composition to finish, since Enter and Escape also confirm or abandon a
 * candidate.
 */
import type { CommentImagePaste } from './useCommentImagePaste';
export interface CommentTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    /** Bare Enter submits. Off on touch, where Enter breaks the line. */
    enterSubmits: boolean;
    /** The host's paste state: it attaches the cited images when the comment is saved. */
    imagePaste: CommentImagePaste;
    placeholder: string;
    onBlur?: () => void;
    /** Lines shown before the field scrolls. */
    maxLines?: number;
    className?: string;
    'aria-label'?: string;
}
export declare function CommentTextEditor({ value, onChange, onSubmit, onCancel, enterSubmits, imagePaste, placeholder, onBlur, maxLines, className, 'aria-label': ariaLabel, }: CommentTextEditorProps): import("react/jsx-runtime").JSX.Element;
