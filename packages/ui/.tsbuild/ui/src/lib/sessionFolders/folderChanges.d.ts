import { z } from 'zod';
import type { SessionFolder, SessionFoldersMap } from '@/stores/useSessionFoldersStore';
/**
 * One user action on the shared folders. The client applies it to its own copy
 * at once and sends it to the server, which applies it to the stored folders
 * (`packages/web/server/lib/session-folders/folder-changes.js`); both sides
 * keep the same semantics, so a change still pending is laid over every newer
 * server copy the same way the server will apply it.
 */
export type FolderChange = {
    type: 'create';
    scopeKey: string;
    folder: {
        id: string;
        name: string;
        parentId: string | null;
        createdAt: number;
    };
} | {
    type: 'rename';
    scopeKey: string;
    folderId: string;
    name: string;
} | {
    type: 'delete';
    scopeKey: string;
    folderIds: string[];
} | {
    type: 'assign';
    scopeKey: string;
    folderId: string;
    sessionIds: string[];
} | {
    type: 'unassign';
    scopeKey: string;
    sessionIds: string[];
} | {
    type: 'forget-sessions';
    sessionIds: string[];
} | {
    type: 'forget-scopes';
    scopeKeys: string[];
};
export declare const folderChangeSchema: z.ZodType<FolderChange>;
/** The server's answer to a read or a write of the shared folders. */
export declare const folderSnapshotSchema: z.ZodObject<{
    exists: z.ZodOptional<z.ZodBoolean>;
    foldersMap: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        sessionIds: z.ZodPipe<z.ZodArray<z.ZodString>, z.ZodTransform<string[], string[]>>;
        createdAt: z.ZodCatch<z.ZodNumber>;
        parentId: z.ZodPipe<z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>;
    }, z.core.$strip>>>>;
    updatedAt: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type FolderSnapshot = z.infer<typeof folderSnapshotSchema>;
/** A folder and every folder under it. */
export declare const collectFolderSubtree: (folders: readonly SessionFolder[], rootId: string) => Set<string>;
/**
 * Apply one change. Returns the same map when nothing changes, so a caller can
 * skip the write, and keeps every untouched scope and folder by reference.
 */
export declare const applyFolderChange: (map: SessionFoldersMap, change: FolderChange) => SessionFoldersMap;
export declare const applyFolderChanges: (map: SessionFoldersMap, changes: readonly FolderChange[]) => SessionFoldersMap;
