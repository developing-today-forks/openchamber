import React from 'react';
import { type InlineCommentDraft, type InlineCommentSource } from '@/stores/useInlineCommentDraftStore';
type LineRangeBase = {
    start: number;
    end: number;
};
type StoreRange = {
    startLine: number;
    endLine: number;
    side?: 'original' | 'modified';
};
interface UseInlineCommentControllerOptions<TRange extends LineRangeBase> {
    source: InlineCommentSource;
    fileLabel: string | null;
    language: string;
    getCodeForRange: (range: TRange) => string;
    toStoreRange: (range: TRange) => StoreRange;
    fromDraftRange: (draft: InlineCommentDraft) => TRange;
}
export declare const normalizeLineRange: <TRange extends LineRangeBase>(range: TRange) => TRange;
export declare function useInlineCommentController<TRange extends LineRangeBase>(options: UseInlineCommentControllerOptions<TRange>): {
    sessionKey: string | null;
    drafts: InlineCommentDraft[];
    selection: TRange | null;
    setSelection: React.Dispatch<React.SetStateAction<TRange | null>>;
    commentText: string;
    setCommentText: React.Dispatch<React.SetStateAction<string>>;
    editingDraftId: string | null;
    setEditingDraftId: React.Dispatch<React.SetStateAction<string | null>>;
    reset: () => void;
    cancel: () => void;
    startEdit: (draft: InlineCommentDraft) => void;
    deleteDraft: (draft: InlineCommentDraft) => void;
    saveComment: (textToSave: string, rangeOverride?: TRange) => void;
    fromDraftRange: (draft: InlineCommentDraft) => TRange;
};
export {};
