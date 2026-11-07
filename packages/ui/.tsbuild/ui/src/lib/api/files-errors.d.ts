export type FilesystemErrorReason = 'os-permission' | 'already-exists' | 'not-found' | 'not-directory' | 'invalid-response' | 'unknown';
export declare class FilesystemError extends Error {
    readonly reason: FilesystemErrorReason;
    readonly status?: number;
    constructor(message: string, options?: {
        reason?: FilesystemErrorReason;
        status?: number;
    });
}
export declare const isFilesystemError: (error: unknown) => error is FilesystemError;
export declare const parseFilesystemErrorReason: (value: unknown) => FilesystemErrorReason;
export declare const isFileMissingError: (error: unknown) => boolean;
