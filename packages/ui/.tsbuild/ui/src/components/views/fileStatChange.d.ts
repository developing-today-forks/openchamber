type FileStatChangeInput = {
    size: number;
    mtimeMs?: number;
};
type OpenFilePollInput = {
    stat: 'found' | 'missing' | 'failed';
    /** The editor shows a failed read for this file. */
    showsFailure: boolean;
    /** This poll already saw the file missing. */
    sawMissing: boolean;
    hasUnsavedChanges: boolean;
    /** A move or rename of this file is in flight or not yet adopted by the editor. */
    moving: boolean;
};
/**
 * What the open-file poll does with one metadata result. A file deleted while
 * open turns into a failed read unless it has unsaved edits or is being
 * moved (its old path is gone because it moved); a failed file reloads only
 * after this poll saw it missing and then found it, so a file that keeps
 * failing to read is never reloaded in a loop.
 */
export declare const openFilePollStep: ({ stat, showsFailure, sawMissing, hasUnsavedChanges, moving, }: OpenFilePollInput) => 'check-changes' | 'show-missing' | 'reload' | 'none';
export declare const hasFileStatChanged: (previous: FileStatChangeInput, latest: FileStatChangeInput) => boolean;
export {};
