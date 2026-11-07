type FileTreeUploadOptions = {
    /** Normalized workspace root the tree shows; uploads are scoped to it. */
    root: string;
    refreshDirectory: (directory: string) => Promise<void>;
};
/**
 * Uploads external files into a workspace directory for a file tree:
 * drag-and-drop callers pass files directly, picker callers open the
 * system file chooser (gallery/camera/files on mobile). Existing names
 * are never replaced silently; they surface in a replace-confirmation
 * dialog rendered through `uploadElements`.
 */
export declare const useFileTreeUpload: ({ root, refreshDirectory }: FileTreeUploadOptions) => {
    canUpload: boolean;
    uploadingDirectory: string | null;
    uploadFiles: (directory: string, selectedFiles: File[], overwrite?: boolean) => Promise<void>;
    pickFiles: (directory: string) => void;
    uploadElements: import("react/jsx-runtime").JSX.Element;
};
export {};
