import type { ChangeRequestContext, SourceControlAPI, SourceControlReadContext } from '@/lib/api/types';
export declare const getChangeRequestContextKey: (context: SourceControlReadContext, number: number, project?: {
    owner: string;
    name: string;
}) => string;
type ContextEntry = {
    result: ChangeRequestContext | null;
    hasCIDetails: boolean;
    fetchedAt: number;
    isLoading: boolean;
    error: string | null;
};
type EnsureOptions = {
    includeCIDetails?: boolean;
    project?: {
        owner: string;
        name: string;
    };
    force?: boolean;
};
type ChangeRequestContextStore = {
    entries: Record<string, ContextEntry>;
    ensure: (sourceControl: Pick<SourceControlAPI, 'changeRequestContext'>, context: SourceControlReadContext, number: number, options?: EnsureOptions) => Promise<ChangeRequestContext | null>;
    invalidate: (context: SourceControlReadContext, number?: number) => void;
    resetForRuntimeSwitch: () => void;
};
export declare const useChangeRequestContextStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ChangeRequestContextStore>>;
export {};
