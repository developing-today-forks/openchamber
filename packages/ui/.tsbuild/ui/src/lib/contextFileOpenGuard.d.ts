import type { FilesAPI } from '@/lib/api/types';
type ContextFileOpenFailureReason = 'too-large' | 'missing' | 'unreadable' | 'binary';
type ContextFileOpenValidationResult = {
    ok: true;
} | {
    ok: false;
    reason: ContextFileOpenFailureReason;
};
type ContextFileOpenOptions = {
    directory?: string;
};
/**
 * Validate whether a context-panel click may open a path in the shared file editor.
 * Previewable/non-text binaries are allowed through so FilesView can show image/PDF
 * preview or the cannot-preview empty state — never by decoding them as editable text here.
 */
export declare const validateContextFileOpen: (files: FilesAPI, path: string, options?: ContextFileOpenOptions) => Promise<ContextFileOpenValidationResult>;
export declare const getContextFileOpenFailureMessage: (reason: ContextFileOpenFailureReason) => string;
export {};
