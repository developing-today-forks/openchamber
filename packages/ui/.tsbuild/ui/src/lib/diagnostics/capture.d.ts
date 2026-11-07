import { type DiagnosticEvent } from './timeline';
export type DiagnosticHealthSample = {
    at: number;
    http: number;
    running: boolean | 'unknown';
    ready: boolean | 'unknown';
    secure: boolean | 'unknown';
    port: number | null;
    wsl: boolean | 'unknown';
    binarySource: string;
    wrapper: string;
    lastError: string | null;
};
export declare function classifyStartError(message: string): string;
export declare function isLocalDiagnosticRuntime(): boolean;
/**
 * Console capture wraps `console.*`, so DevTools would attribute every log to
 * this file. Development builds leave the console alone to keep call sites.
 */
export declare function startDiagnosticCapture({ captureConsole }?: {
    captureConsole?: boolean;
}): () => void;
/** Samples the local instance into the shared timeline buffer. */
export declare function sampleServerHealth(): Promise<DiagnosticHealthSample | null>;
/**
 * Reads the active runtime's `/health` and reports what it saw through `emit`.
 * A remote export collects into its own list and wants the server's history
 * every time; the local buffer has seen earlier samples and skips repeats.
 */
export declare function readServerHealth(emit: (event: DiagnosticEvent) => void, { repeatHistory }: {
    repeatHistory: boolean;
}): Promise<DiagnosticHealthSample | null>;
