import { type FileEditorChange, type FileEditorDocument, type FileEditorSnapshot, type FileSnapshotPurpose, type GuestFileChangeMessage, type GuestFileSaveMessage, type GuestFileSnapshotResultMessage, type GuestFileUnsupportedMessage, type GuestMessage, type HostMessage } from '@openchamber/sdk';
export type GuestFileMessage = GuestFileSnapshotResultMessage | GuestFileChangeMessage | GuestFileSaveMessage | GuestFileUnsupportedMessage;
export declare const isGuestFileMessage: (message: GuestMessage) => message is GuestFileMessage;
type GuestFileEditorEvents = {
    onChange: (change: FileEditorChange) => void;
    onSave: () => void;
    onUnsupported: () => void;
};
/** Why a snapshot request produced no snapshot. */
export declare class GuestFileSnapshotError extends Error {
    readonly reason: 'disconnected' | 'timeout' | 'refused';
    constructor(reason: 'disconnected' | 'timeout' | 'refused', message: string);
}
/**
 * The host end of one file editor frame: hands it the file when the frame
 * connects, asks it for the edited text, tells it which snapshot reached the
 * disk, and routes its notices. `PluginPane` connects it on `hello` / iframe
 * load and disconnects it when the frame goes away; a disconnect fails every
 * outstanding snapshot request instead of leaving a save waiting.
 */
export declare const createGuestFileChannel: (document: FileEditorDocument, events: GuestFileEditorEvents, timeoutMs?: number) => {
    connect: (next: (message: HostMessage) => void) => void;
    disconnect: () => void;
    receive: (message: GuestFileMessage) => void;
    requestSnapshot: (purpose: FileSnapshotPurpose) => Promise<FileEditorSnapshot>;
    markSaved: (version: string) => void;
};
export type GuestFileChannel = ReturnType<typeof createGuestFileChannel>;
export {};
