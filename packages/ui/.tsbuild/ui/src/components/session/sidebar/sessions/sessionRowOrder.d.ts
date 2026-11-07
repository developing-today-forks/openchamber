import React from 'react';
export type SessionRowOrderEntry = {
    id: string;
    rowKey: string;
    scopeKey: string | null;
    archived: boolean;
    descendantRange?: readonly [start: number, end: number];
};
type SessionRowOrderRegistry = {
    getEntries: () => readonly SessionRowOrderEntry[];
    getDescendantIds: () => readonly string[];
    getSessionsById: () => ReadonlyMap<string, {
        time?: {
            archived?: number | null;
        };
    }>;
};
export declare const SessionRowOrderProvider: React.FC<{
    entries: readonly SessionRowOrderEntry[];
    descendantIds: readonly string[];
    sessionsById: ReadonlyMap<string, {
        time?: {
            archived?: number | null;
        };
    }>;
    children: React.ReactNode;
}>;
export declare const useSessionRowOrderRegistry: () => SessionRowOrderRegistry | null;
export declare const deriveSessionRowBulkSelectAll: (entries: readonly SessionRowOrderEntry[], descendantIds: readonly string[], currentScopeKey: string | null) => {
    ids: string[];
    scopeKey: string | null;
} | null;
export declare const deriveSessionRowSelectionArchived: (selectedIds: ReadonlySet<string>, sessionsById: ReadonlyMap<string, {
    time?: {
        archived?: number | null;
    };
}>) => boolean;
export {};
