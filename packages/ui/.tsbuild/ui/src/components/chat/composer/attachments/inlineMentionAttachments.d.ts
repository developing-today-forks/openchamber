import type { AttachedFile } from '@/stores/types/sessionTypes';
/** Minimal surface of the directory listing used for existence checks. */
export interface DirectoryLister {
    listLocalDirectory(directory: string): Promise<Array<{
        path: string;
    }>>;
}
/**
 * ID prefix for attachments synthesized from inline `@`-mentions at send
 * time (see `extractInlineFileMentions` in ChatInput). The prefix is the only
 * marker distinguishing a guessed mention path from a file the user picked
 * deliberately, so keep both sites on this constant.
 */
export declare const INLINE_SERVER_ATTACHMENT_ID_PREFIX = "inline-server-";
export interface FilteredInlineAttachments {
    sendable: AttachedFile[];
    skippedNames: string[];
}
export declare function filterMissingInlineAttachments(attachments: readonly AttachedFile[], lister: DirectoryLister): Promise<FilteredInlineAttachments>;
