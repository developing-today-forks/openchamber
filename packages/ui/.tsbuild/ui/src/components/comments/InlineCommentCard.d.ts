import type { InlineCommentDraft } from '@/stores/useInlineCommentDraftStore';
interface InlineCommentCardProps {
    draft: InlineCommentDraft;
    onEdit: () => void;
    onDelete: () => void;
    className?: string;
    maxWidth?: number;
}
/**
 * A saved inline comment shown under its lines in the diff/editor. Styled to
 * match the composer's context preview entries: a muted header band naming
 * the file and range with direct edit/remove actions, and the comment text
 * below.
 */
export declare function InlineCommentCard({ draft, onEdit, onDelete, className, maxWidth, }: InlineCommentCardProps): import("react/jsx-runtime").JSX.Element;
export {};
