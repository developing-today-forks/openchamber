type FileContentInvalidation = {
    runtimeKey: string;
    paths: readonly string[];
};
type FileContentInvalidationListener = (invalidation: FileContentInvalidation) => void;
export declare const notifyFileContentInvalidated: (invalidation: FileContentInvalidation) => void;
export declare const subscribeToFileContentInvalidation: (listener: FileContentInvalidationListener) => (() => void);
export {};
