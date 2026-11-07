import { WalkthroughError, type WalkthroughModel, type WalkthroughReadiness, type WalkthroughResult, type WalkthroughSource, type WalkthroughStage, type WalkthroughTarget } from '@/lib/walkthrough/types';
type WalkthroughEntryStatus = 'idle' | 'loading' | 'generating' | 'ready' | 'error';
export interface WalkthroughEntry {
    status: WalkthroughEntryStatus;
    stage: WalkthroughStage | null;
    result: WalkthroughResult | null;
    readiness: WalkthroughReadiness | null;
    error: {
        message: string;
        code?: WalkthroughError['code'];
        model?: WalkthroughModel;
        requiredChars?: number;
        availableChars?: number;
    } | null;
}
export declare const walkthroughSourceKey: (source: WalkthroughSource) => string;
interface WalkthroughState {
    entries: Record<string, WalkthroughEntry>;
    requestedTargets: Record<string, WalkthroughTarget>;
    selectedModel: Record<string, string>;
    selectedLanguage: Record<string, string>;
}
interface WalkthroughActions {
    getEntry: (directory: string, target: WalkthroughTarget) => WalkthroughEntry;
    /**
     * `providerID` / `modelID` are the composer's: without a model of its own
     * the walkthrough stays on that provider, and on that model when the
     * provider has no small one.
     */
    load: (directory: string, target: WalkthroughTarget, options?: {
        language?: string;
        providerID?: string;
        modelID?: string;
    }) => Promise<void>;
    generate: (directory: string, target: WalkthroughTarget, options?: {
        force?: boolean;
        language?: string;
        providerID?: string;
        modelID?: string;
    }) => Promise<void>;
    cancel: (directory: string, target: WalkthroughTarget) => void;
    requestTarget: (directory: string, target: WalkthroughTarget) => void;
    getRequestedTarget: (directory: string) => WalkthroughTarget | undefined;
    clearRequestedTarget: (directory: string) => void;
    selectModel: (directory: string, target: WalkthroughTarget, model: string | null) => void;
    getSelectedModel: (directory: string, target: WalkthroughTarget) => string | undefined;
    selectLanguage: (directory: string, target: WalkthroughTarget, language: string | null) => void;
    getSelectedLanguage: (directory: string, target: WalkthroughTarget) => string | undefined;
    reset: () => void;
}
export declare const useWalkthroughStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<WalkthroughState & WalkthroughActions>, "devtools" | "setState"> & {
    setState(partial: Partial<WalkthroughState & WalkthroughActions> | ((state: WalkthroughState & WalkthroughActions) => Partial<WalkthroughState & WalkthroughActions> | (WalkthroughState & WalkthroughActions)) | (WalkthroughState & WalkthroughActions), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ((state: WalkthroughState & WalkthroughActions) => WalkthroughState & WalkthroughActions) | (WalkthroughState & WalkthroughActions), replace: true, action?: (string | {
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
