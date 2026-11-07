import { type WalkthroughResult, type WalkthroughStage, type WalkthroughTarget } from './types';
interface WalkthroughQuery {
    [key: string]: string | undefined;
    directory: string;
    source: string;
    provider?: string;
    instance?: string;
    accountId?: string;
    repositoryId?: string;
    bindingRevision?: string;
    primaryRemote?: string;
    model?: string;
    language?: string;
}
export declare const buildTargetQuery: (directory: string, target: WalkthroughTarget) => WalkthroughQuery;
export declare function fetchWalkthrough(directory: string, target: WalkthroughTarget, options?: {
    model?: string;
    providerID?: string;
    modelID?: string;
    language?: string;
    signal?: AbortSignal;
}): Promise<WalkthroughResult>;
export declare function generateWalkthrough(directory: string, target: WalkthroughTarget, options?: {
    force?: boolean;
    model?: string;
    providerID?: string;
    modelID?: string;
    language?: string;
    signal?: AbortSignal;
}): Promise<WalkthroughResult>;
/**
 * Stop a running generation. Explicit, because merely leaving the page must not
 * throw away work the user is paying for.
 */
export declare function cancelWalkthroughGeneration(directory: string, target: WalkthroughTarget): Promise<void>;
/**
 * Current stage of a running generation. Reads server memory only, so this is
 * safe to poll — unlike the full read, which re-runs the whole git pipeline.
 */
export declare function fetchWalkthroughStage(directory: string, target: WalkthroughTarget, signal?: AbortSignal): Promise<WalkthroughStage | null>;
export {};
