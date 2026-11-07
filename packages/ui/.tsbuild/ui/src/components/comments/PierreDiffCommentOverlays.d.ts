import React from 'react';
import type { SelectedLineRange } from '@pierre/diffs';
import type { InlineCommentDraft } from '@/stores/useInlineCommentDraftStore';
interface PierreDiffCommentOverlaysProps {
    diffRootRef: React.RefObject<HTMLDivElement | null>;
    drafts: InlineCommentDraft[];
    selection: SelectedLineRange | null;
    editingDraftId: string | null;
    commentText: string;
    onTextChange: (text: string) => void;
    fileLabel: string;
    onSave: (text: string, range?: SelectedLineRange) => void;
    onCancel: () => void;
    onEdit: (draft: InlineCommentDraft) => void;
    onDelete: (draft: InlineCommentDraft) => void;
}
export declare function PierreDiffCommentOverlays(props: PierreDiffCommentOverlaysProps): import("react/jsx-runtime").JSX.Element;
export {};
