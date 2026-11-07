export declare const LARGE_FILE_CHAR_THRESHOLD = 200000;
export type FileLineEnding = '\n' | '\r\n';
/** A draft is always complete, even when its initial presentation is a preview. */
export declare const prepareFileEditorContent: (content: string) => {
    content: string;
    lineEnding: FileLineEnding;
};
export declare const serializeEditorContent: (content: string, lineEnding: FileLineEnding) => string;
export declare const initialFileTextMode: (content: string, preferred?: 'view' | 'edit') => 'view' | 'edit';
/** Include the whole text so same-length edits in the middle invalidate previews. */
export declare const makeFileContentCacheKey: (content: string) => string;
