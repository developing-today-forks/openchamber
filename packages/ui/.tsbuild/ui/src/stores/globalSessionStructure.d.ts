import type { Session } from '@/lib/opencode/model';
export type GlobalSessionStructure = {
    activeSessionIds: readonly string[];
    activeRootIds: readonly string[];
    activeChildrenByParentId: ReadonlyMap<string, readonly string[]>;
    activeIdsByDirectory: ReadonlyMap<string, readonly string[]>;
};
export type GlobalSessionStructureMutation = {
    sessionId: string;
    previous: Session | null;
    next: Session | null;
};
export declare const resolveGlobalSessionDirectory: (session: Session) => string | null;
export declare const mergeSessionDirectoryMetadata: (incoming: Session, existing?: Session | null) => Session;
export declare const buildGlobalSessionStructure: (activeSessions: readonly Session[]) => GlobalSessionStructure;
export declare const applyGlobalSessionStructureMutations: (structure: GlobalSessionStructure, mutations: readonly GlobalSessionStructureMutation[]) => GlobalSessionStructure;
