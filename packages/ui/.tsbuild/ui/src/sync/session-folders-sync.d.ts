/**
 * Chat folders are stored by the server and shared by its clients. The server
 * announces each change on the control stream and this client reads the
 * folders again; after a gap in the stream it reads them anyway, since a
 * change may have been missed, and sends what it changed meanwhile.
 */
export declare const subscribeSessionFoldersSync: (runtimeKey: string) => (() => void);
