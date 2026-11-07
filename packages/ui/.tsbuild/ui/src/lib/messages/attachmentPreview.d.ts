import type { ToolPopupContent } from '@/components/chat/message/types';
export type IssueLinkKind = 'github-issue' | 'gitlab-issue' | 'github-pr' | 'linear-issue' | 'guest-issue' | 'guest-pr';
/** The tracked-item kind of an issue/PR reference part, or null for an ordinary file. */
export declare const getIssueLinkKind: (file: {
    mime?: string;
}) => IssueLinkKind | null;
/** True when a file part's MIME type is text the popup can render as content. */
export declare const isTextLikeFile: (file: {
    mime?: string;
}) => boolean;
/**
 * Decodes the base64 data URL the message pipeline stores for pasted files
 * (`data:<mime>;base64,<data>`) into UTF-8 text. Returns null for any other
 * URL shape.
 */
export declare const decodeDataUrlText: (url: string) => string | null;
/** The fields of a message file part that decide how it opens. */
type AttachmentFile = {
    mime?: string;
    url?: string;
    filename?: string;
};
/**
 * What opening an attachment of a sent message does:
 * - `external`: an issue or PR reference opens its page.
 * - `popup`: an image opens the image viewer with the message's other images,
 *   text sent inline (a pasted text, a picked text file) opens the text dialog.
 * - `file`: a file attached by path (`file://`, VS Code attachments and
 *   `@` mentions) opens in the app's file viewer, or the editor in VS Code.
 */
export type AttachmentOpenTarget = {
    kind: 'external';
    url: string;
} | {
    kind: 'popup';
    popup: ToolPopupContent;
} | {
    kind: 'file';
    path: string;
};
/**
 * Resolves what clicking `file` opens; `files` are the message's attachments,
 * the gallery an image opens in. Null when there is nothing the app can show:
 * a PDF or other binary sent inline, a folder, text that does not decode.
 */
export declare const resolveAttachmentOpenTarget: (file: AttachmentFile | undefined, files: readonly AttachmentFile[]) => AttachmentOpenTarget | null;
/**
 * The message file a `[name]` citation names. Citations match attachments
 * case-insensitively (`findAttachmentCitationRanges`), so the lookup does too.
 */
export declare const findAttachmentPart: <T extends AttachmentFile>(filename: string | null | undefined, files: readonly T[]) => T | undefined;
/** Normalized names of the attachments a citation chip can open, for `isOpenableAttachmentName`. */
export declare const collectOpenableAttachmentNames: (files: readonly AttachmentFile[]) => ReadonlySet<string>;
export declare const isOpenableAttachmentName: (openable: ReadonlySet<string>, filename: string) => boolean;
export {};
