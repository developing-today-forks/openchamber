import { type FileListResult, type FileReadResult, type FileStatResult, type FileWriteResult, type HostRequestErrorCode } from '@openchamber/sdk';
/** Body of `POST /api/guests/:id/files`. One request per host message type. */
export type GuestFileRequest = {
    op: 'read';
    path: string;
} | {
    op: 'write';
    path: string;
    content: string;
} | {
    op: 'list';
    path: string;
} | {
    op: 'stat';
    path: string;
};
export type GuestFileResult = FileReadResult | FileWriteResult | FileListResult | FileStatResult;
export type GuestFileProxyResult = {
    ok: true;
    result: GuestFileResult;
} | {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
};
/**
 * Runs one guest file operation on the server. `directory` is the open
 * project; relative paths resolve against it, so it travels as the usual
 * `x-opencode-directory` header.
 */
export declare const guestFileOperation: (guestId: string, request: GuestFileRequest, directory: string | null) => Promise<GuestFileProxyResult>;
