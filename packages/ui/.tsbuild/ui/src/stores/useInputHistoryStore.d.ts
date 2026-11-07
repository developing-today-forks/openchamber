import { type InputHistoryScope } from '@/lib/inputHistoryScope';
import type { AttachedFile } from '@/stores/types/sessionTypes';
export type InputHistoryIdentity = {
    runtimeKey: string;
    directory: string;
    sessionId: string;
};
export type InputHistoryAttachment = {
    key: string;
    source: 'file-url' | 'vscode-file';
    filename: string;
    mimeType: string;
    size: number;
    reference: string;
};
export type InputHistorySubmission = {
    text: string;
    attachmentKeys: string[];
    restorableAttachments: InputHistoryAttachment[];
};
export type InputHistoryEntry = InputHistorySubmission & {
    submittedAt: number;
};
type InputHistoryNamespace = {
    touchedAt: number;
    entries: InputHistoryEntry[];
};
type InputHistorySnapshot = {
    entryLimit: number;
    scope: InputHistoryScope;
    globalBuckets: Record<string, InputHistoryNamespace>;
    sessionBuckets: Record<string, InputHistoryNamespace>;
};
type InputHistoryStoreState = InputHistorySnapshot & {
    applyEntryLimit: (limit: number) => void;
    applyScope: (scope: InputHistoryScope) => void;
    appendSubmissions: (identity: InputHistoryIdentity, submissions: readonly InputHistorySubmission[]) => void;
    clearSession: (identity: InputHistoryIdentity) => void;
};
export declare const createInputHistoryIdentity: (runtimeKey: string, directory: string, sessionId: string) => InputHistoryIdentity | null;
export declare const createInputHistorySubmission: (text: string, attachments: readonly AttachedFile[]) => InputHistorySubmission;
export declare const useInputHistoryStore: import("zustand").UseBoundStore<import("zustand").StoreApi<InputHistoryStoreState>>;
export declare const selectInputHistoryEntries: (state: Pick<InputHistoryStoreState, 'scope' | 'globalBuckets' | 'sessionBuckets'>, identity: InputHistoryIdentity | null) => readonly InputHistoryEntry[];
export {};
