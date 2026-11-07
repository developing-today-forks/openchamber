import type { RelayTunnelWebSocket } from './relay/tunnel-client';
interface PersistentPtySize {
    cols: number;
    rows: number;
}
export interface PersistentPtyInputChannel {
    readonly isOpen: boolean;
    send(text: string): boolean;
    close(): void;
}
interface OpenPersistentPtyInputOptions {
    ptyID: string;
    directory: string | null | undefined;
    size: PersistentPtySize;
    onClose?: (code: number) => void;
    openSocket?: (url: string) => RelayTunnelWebSocket;
}
export declare const encodePersistentPtyInputFrame: (text: string, size: PersistentPtySize) => Uint8Array;
export declare const buildPersistentPtyConnectPath: (ptyID: string) => string;
/**
 * A controller attachment to one persistent PTY, used only to type into it.
 * Output the server replays or streams is discarded: the terminal view reads
 * snapshots. Input waits for `replay_complete`, because the server drops input
 * that arrives before the attachment is active.
 */
export declare const openPersistentPtyInput: ({ ptyID, directory, size, onClose, openSocket, }: OpenPersistentPtyInputOptions) => PersistentPtyInputChannel;
export {};
