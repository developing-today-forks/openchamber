type FileContentPollerOptions = {
    readContent: () => Promise<string>;
    getLoadedContent: () => string;
    getLoadedRevision: () => number;
    isDirty: () => boolean;
    applyContent: (content: string) => void;
};
export declare const createFileContentPoller: (options: FileContentPollerOptions) => {
    /** Resolves true only when the poll observed the file's current content. */
    poll: () => Promise<boolean>;
    dispose: () => void;
};
export {};
