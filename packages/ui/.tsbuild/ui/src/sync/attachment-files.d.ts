export declare const ATTACHMENT_ACCEPT: string;
export declare const ACCEPTED_ATTACHMENT_EXTENSIONS: string[];
export type AttachmentInputModality = "text" | "image" | "pdf" | "audio" | "video";
export declare const getAttachmentInputModality: (mimeType: string) => AttachmentInputModality | undefined;
export declare const getUnsupportedAttachmentInputs: <T extends {
    mimeType: string;
}>(attachments: T[], supportedInputModalities: string[]) => Array<{
    attachment: T;
    modality: AttachmentInputModality;
}>;
type PreparedAttachmentFile = {
    file: File;
    mimeType: string;
};
/**
 * An `@` mention of these files is read and attached by the client, like a
 * picked file. Anything else reaches OpenCode as a path it reads itself; an
 * image sent that way has no preview in the message. A PDF stays a path, so a
 * model without PDF input can still extract its text with tools.
 */
export declare const isReadOnSendMentionFilename: (name: string) => boolean;
export declare const prepareAttachmentFile: (file: File) => PreparedAttachmentFile | Promise<PreparedAttachmentFile | undefined> | undefined;
export declare const prepareAttachmentFiles: (file: File, reservedFilenames?: Iterable<string>) => PreparedAttachmentFile[] | Promise<PreparedAttachmentFile[] | undefined> | undefined;
export {};
