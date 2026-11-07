export type ThemeImportErrorCode = 'invalid' | 'include' | 'size' | 'background' | 'save' | 'connection' | 'unsupported' | 'conflict';
export declare class ThemeImportError extends Error {
    readonly code: ThemeImportErrorCode;
    constructor(code: ThemeImportErrorCode);
}
export declare const MAX_THEME_IMPORT_BYTES: number;
