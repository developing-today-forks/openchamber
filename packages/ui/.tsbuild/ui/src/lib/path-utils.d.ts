export declare const normalizeFilePath: (value: string | null | undefined) => string;
export declare const isAbsoluteFilePath: (value: string | null | undefined) => boolean;
/**
 * Expand a leading `~` into the given home directory, the same way a shell
 * would. Without a known home directory the value is returned trimmed but
 * otherwise unchanged, so a caller with no home yet falls back to treating it
 * as a literal (relative) path rather than guessing.
 */
export declare const resolveTildeFilePath: (value: string, homeDirectory?: string | null) => string;
export declare const toAbsoluteFilePath: (basePath: string | null | undefined, targetPath: string | null | undefined) => string;
export declare const isFilePathWithinDirectory: (filePath: string | null | undefined, directory: string | null | undefined) => boolean;
export declare const getRelativeFilePath: (filePath: string | null | undefined, directory: string | null | undefined) => string;
/**
 * Folders that tell apart open files sharing a name, keyed by the given path.
 * Each path gets the shortest run of its closest folders no other same-named
 * path ends with ("docs", "ui/src"). Files with a unique name, and a file that
 * has no folders of its own (the project root), get no entry. Pass paths
 * relative to the project, or the whole absolute path becomes the folder.
 */
export declare const getDisambiguatingFolders: (paths: readonly string[]) => Map<string, string>;
export declare const getDirectoryForFilePath: (currentDirectory: string | null | undefined, filePath: string | null | undefined) => string;
