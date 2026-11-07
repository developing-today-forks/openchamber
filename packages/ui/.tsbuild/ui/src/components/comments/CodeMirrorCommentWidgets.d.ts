import type { InlineCommentDraft } from '@/stores/useInlineCommentDraftStore';
import type { BlockWidgetDef } from '@/components/ui/CodeMirrorEditor';
type LineRange = {
    start: number;
    end: number;
    side?: 'additions' | 'deletions';
};
interface CodeMirrorCommentWidgetsOptions {
    drafts: InlineCommentDraft[];
    editingDraftId: string | null;
    commentText: string;
    onTextChange: (text: string) => void;
    selection: LineRange | null;
    isDragging: boolean;
    fileLabel: string;
    newWidgetId: string;
    mapDraftToRange: (draft: InlineCommentDraft) => LineRange;
    onSave: (text: string, range?: LineRange) => void;
    onCancel: () => void;
    onEdit: (draft: InlineCommentDraft) => void;
    onDelete: (draft: InlineCommentDraft) => void;
}
export declare function buildCodeMirrorCommentWidgets(options: CodeMirrorCommentWidgetsOptions): BlockWidgetDef[];
export {};
