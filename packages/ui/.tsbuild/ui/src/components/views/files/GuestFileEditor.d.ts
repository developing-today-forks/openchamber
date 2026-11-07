import React from 'react';
import { type FileEditorContentKind } from '@openchamber/sdk';
import { type FileCanvasHandle } from './fileCanvas';
type GuestFileEditorProps = {
    guestId: string;
    editorId: string;
    /** The editor's declared title, for messages about it. */
    title: string;
    /** `contributes.fileEditors[].content`: what the editor is handed and must hand back. */
    contentKind: FileEditorContentKind;
    path: string;
    /** Text editors: the document at mount. The caller remounts (`key`) to hand over content the editor did not author. */
    content: string;
    /** Binary editors: reads the file's bytes at mount. */
    loadBytes: () => Promise<Uint8Array<ArrayBuffer>>;
    readOnly: boolean;
    onDirtyChange: (dirty: boolean) => void;
    /** Called on every change to the document itself. */
    onEdit: () => void;
    /** The user pressed Cmd/Ctrl+S inside the editor frame. */
    onSaveRequest: () => void;
    onUnsupported: () => void;
    /** A binary file over `GUEST_FILE_EDITOR_CONTENT_MAX` bytes; the editor never loads. */
    onTooLarge: () => void;
    /** The bytes could not be read. */
    onLoadFailed: () => void;
};
/**
 * An extension's file editor (`contributes.fileEditors`) in the Files view.
 * The frame is a sandboxed `PluginPane surface="file"`; the host keeps the
 * file, and this component turns the frame's channel into the canvas handle
 * FilesView saves through. A text editor gets the draft it mounted with; a
 * binary editor first reads the file's bytes and loads the frame once they
 * are here.
 */
export declare const GuestFileEditor: React.ForwardRefExoticComponent<GuestFileEditorProps & React.RefAttributes<FileCanvasHandle>>;
export {};
