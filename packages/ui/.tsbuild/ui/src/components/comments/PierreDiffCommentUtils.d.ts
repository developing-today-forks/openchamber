import type { DiffLineAnnotation, SelectedLineRange } from '@pierre/diffs';
import type { InlineCommentDraft } from '@/stores/useInlineCommentDraftStore';
export type PierreAnnotationData = {
    type: 'saved' | 'edit';
    draft: InlineCommentDraft;
} | {
    type: 'new';
    selection: SelectedLineRange;
};
export declare const toPierreAnnotationId: (meta: PierreAnnotationData) => string;
interface BuildPierreLineAnnotationsOptions {
    drafts: InlineCommentDraft[];
    editingDraftId: string | null;
    selection: SelectedLineRange | null;
}
export declare const buildPierreLineAnnotations: (options: BuildPierreLineAnnotationsOptions) => DiffLineAnnotation<PierreAnnotationData>[];
export {};
