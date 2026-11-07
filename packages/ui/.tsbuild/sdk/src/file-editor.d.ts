/** Editors one package may declare. */
export declare const GUEST_FILE_EDITORS_MAX = 8;
/** Characters in an editor's `title`. */
export declare const GUEST_FILE_EDITOR_TITLE_MAX = 60;
/** File-name patterns one editor may list. */
export declare const GUEST_FILE_EDITOR_PATTERNS_MAX = 16;
/** Characters in one file-name pattern. */
export declare const GUEST_FILE_EDITOR_PATTERN_MAX = 128;
/**
 * Characters of file text, or bytes of a binary file, the host hands to an
 * editor and accepts back. Larger than `GUEST_FILE_CONTENT_MAX`: drawings with
 * embedded images and office documents run to several megabytes. A larger
 * file stays with the host's own view.
 */
export declare const GUEST_FILE_EDITOR_CONTENT_MAX = 20000000;
/** Characters in the version a snapshot carries. */
export declare const GUEST_FILE_EDITOR_VERSION_MAX = 256;
export type FileEditorContribution = {
    /** Kebab-case, unique within the package. */
    id: string;
    /** Shown where the host names the editor. */
    title: string;
    /** File-name globs, matched case-insensitively against the name only: `*` is any run, `?` one character. */
    match: string[];
    /** Package-local `.html` the Files view loads for a matching file. */
    entry: string;
    /**
     * `text` (the default) hands over the file as a string and only claims text
     * files. `binary` hands over its bytes and claims any matching file, binary
     * or not; the host has no source view for it.
     */
    content?: FileEditorContentKind;
};
export type FileEditorContentKind = 'text' | 'binary';
/**
 * A file-name glob: no path separators or NUL, and at least one character
 * that is not a wildcard, so no editor can claim every file.
 */
export declare const isFileEditorPattern: (value: string) => boolean;
/** Whether `fileName` (a name, not a path) matches one file-editor pattern. */
export declare const matchesFileEditorPattern: (fileName: string, pattern: string) => boolean;
/** What the host hands the editor: the file it opened. */
export type FileEditorDocument = {
    /** Path as the host shows it; for display, never for reading. */
    path: string;
    name: string;
    /** True when the host will not save this file; the editor should not offer edits. */
    readOnly: boolean;
} & (
/** The file's text with `\n` line endings; the host restores the file's own on write. */
{
    encoding: 'text';
    content: string;
}
/** The file's bytes, exactly as on disk. */
 | {
    encoding: 'binary';
    bytes: Uint8Array<ArrayBuffer>;
});
/**
 * The edited file and the version of the editor's state it came from: text
 * for a `text` editor, bytes for a `binary` one.
 */
export type FileEditorSnapshot = {
    /** Opaque to the host; handed back through `onFileSaved` once this snapshot is on disk. */
    version: string;
} & ({
    content: string;
} | {
    bytes: Uint8Array<ArrayBuffer>;
});
/** Characters of text or bytes a snapshot or document carries. */
export declare const fileEditorPayloadSize: (value: {
    content: string;
} | {
    bytes: Uint8Array<ArrayBuffer>;
}) => number;
/** Whether two documents are the same file with the same content, byte for byte. */
export declare const sameFileEditorDocument: (left: FileEditorDocument, right: FileEditorDocument) => boolean;
/**
 * Why the host wants a snapshot: `save` writes it to disk, `handoff` moves it
 * into the host's source view or to the other place the editor is shown.
 */
export type FileSnapshotPurpose = 'save' | 'handoff';
export type FileSnapshotRequest = {
    purpose: FileSnapshotPurpose;
};
export type FileSnapshotResultPayload = {
    snapshot: FileEditorSnapshot;
} | {
    error: string;
};
/** The editor's state after a change: `dirty` against what was saved, `edited` when the document itself changed. */
export type FileEditorChange = {
    dirty: boolean;
    edited: boolean;
};
/**
 * Tracks whether an editor differs from what was last written. The host
 * writes one snapshot and reports that snapshot's version saved, so edits
 * made while the write ran leave the editor dirty instead of being recorded as
 * saved but never written.
 */
export declare const createFileSaveTracker: (initialVersion: string | null) => {
    /** A new live version; `edited` is true when it differs from the previous one. */
    observe: (version: string) => FileEditorChange;
    /** Records a written version; returns whether the live state is still dirty. */
    markSaved: (version: string) => boolean;
};
