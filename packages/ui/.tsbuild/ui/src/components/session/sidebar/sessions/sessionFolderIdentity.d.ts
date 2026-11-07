import type { SessionGroup, SessionGroupFolderScope } from '../types';
export declare const getSessionFolderIdentityKey: (scopeKey: string, folderId: string) => string;
export declare const getSessionFolderOwnerKey: (projectId: string | null | undefined, directory: string | null | undefined) => string | null;
export declare const getSessionFolderScopes: (group: Pick<SessionGroup, 'folderScopes' | 'folderScopeKey' | 'directory'>) => SessionGroupFolderScope[];
export declare const isArchivedFolderScope: (scopeKey: string) => boolean;
