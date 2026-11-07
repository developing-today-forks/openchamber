/**
 * True only when the server confirms the project folder is gone (an unplugged
 * drive, a deleted checkout). A failed or unsupported probe stays false, so a
 * network hiccup never marks a project missing. Re-checked when the window
 * regains focus, which is when a drive usually comes back.
 */
export declare const useProjectFolderMissing: (directory: string | undefined) => boolean;
