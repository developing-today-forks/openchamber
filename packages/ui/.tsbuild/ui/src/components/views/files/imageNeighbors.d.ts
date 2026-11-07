type FolderEntry = {
    name: string;
    path: string;
    type: 'file' | 'directory';
};
/**
 * The images before and after `path` among a folder's entries, in the order
 * given (the file tree's), wrapping around at the ends. Null when `path` is
 * not among them or is the folder's only image.
 */
export declare const imageNeighborsOf: <T extends FolderEntry>(entries: readonly T[], path: string) => {
    previous: T;
    next: T;
} | null;
export {};
