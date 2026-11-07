export type ParsedFileReference = {
    path: string;
    line?: number;
    column?: number;
    endLine?: number;
};
export declare const normalizeReferencePath: (value: string) => string;
export declare const isAbsoluteReferencePath: (value: string) => boolean;
export declare const localPathFromFileUrl: (value: string) => string | null;
export declare const parseFileReference: (value: string) => ParsedFileReference | null;
export declare const BLOCK_PATH_TOKEN_RE: RegExp;
