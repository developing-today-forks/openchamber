import type { Session } from '@/lib/opencode/model';
import type { CreateMultiRunParams, CreateMultiRunResult } from '@/types/multirun';
export declare const toGitSafeSlug: (value: string) => string;
export declare const toModelSlug: (providerID: string, modelID: string) => string;
export declare const registerMultiRunSession: (session: Session, directory: string) => Session;
/**
 * Sends a lane its prompt. Each lane is a fresh session, so it is owed the
 * project's standing context exactly as a composer send would be.
 */
export declare function dispatchRunPrompt(input: {
    runtimeKey: string;
    assertCurrent: () => void;
    sessionId: string;
    directory: string;
    prompt: string;
    providerID: string;
    modelID: string;
    variant?: string;
    agent?: string;
    files?: Array<{
        type: 'file';
        mime: string;
        filename: string;
        url: string;
    }>;
}): Promise<void>;
interface MultiRunState {
    isLoading: boolean;
    error: string | null;
}
interface MultiRunActions {
    createMultiRun: (params: CreateMultiRunParams) => Promise<CreateMultiRunResult | null>;
    clearError: () => void;
    resetForRuntimeSwitch: () => void;
}
type MultiRunStore = MultiRunState & MultiRunActions;
export declare const useMultiRunStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<MultiRunStore>, "devtools" | "setState"> & {
    setState(partial: Partial<MultiRunStore> | ((state: MultiRunStore) => Partial<MultiRunStore> | MultiRunStore) | MultiRunStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ((state: MultiRunStore) => MultiRunStore) | MultiRunStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export {};
