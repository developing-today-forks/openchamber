import { runtimeFetch } from './runtime-fetch';
import type { InitFailure } from '@/stores/useConfigStore';
export type StartupDiagnostics = {
    error: string | null;
    binary: string | null;
};
export declare const fetchStartupDiagnostics: (signal: AbortSignal, request?: typeof runtimeFetch) => Promise<StartupDiagnostics | null>;
type InitRecoveryDescriptionKey = 'startup.initRecovery.openCodeUnavailable' | 'startup.initRecovery.serverUnreachable' | 'startup.initRecovery.loadAgentsFailed' | 'startup.initRecovery.unexpected';
export declare const getInitRecoveryDescriptionKey: (diagnostics: StartupDiagnostics | null, failure: InitFailure | null) => InitRecoveryDescriptionKey;
export {};
