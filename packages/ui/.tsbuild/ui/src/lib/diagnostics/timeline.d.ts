export type DiagnosticEvent = {
    at: number;
    source: string;
    action: string;
    detail?: string;
};
export declare function rendererRejectionDetail(reason: Error | null): string;
/** Only local built asset names and numeric positions may leave the renderer. */
export declare function rendererErrorDetail(event: Pick<ErrorEvent, 'filename' | 'lineno' | 'colno' | 'error'> & Partial<Pick<ErrorEvent, 'message'>>, pageUrl: string): string | undefined;
/** Free-form console arguments can contain secrets. Inspect only a short prefix. */
export declare function recordRendererConsole(level: 'debug' | 'info' | 'log' | 'warn' | 'error', first: string, error?: Error | null): void;
/** Correlate local events without putting the original identifier in the log. */
export declare function diagnosticIdentity(kind: 'session' | 'directory' | 'message', value: string): string;
/** Only call this with fields chosen for the export. Never pass raw API bodies or console arguments. */
export declare function recordDiagnosticEvent(event: DiagnosticEvent): void;
export declare function getDiagnosticEvents(): DiagnosticEvent[];
export declare function getDiagnosticOmittedCount(): number;
export declare function clearDiagnosticEvents(): void;
export declare function getDiagnosticScopeStartedAt(): number;
export declare function mergeDiagnosticEvents(...sources: DiagnosticEvent[][]): DiagnosticEvent[];
export declare function formatDiagnosticEvents(eventsToFormat: DiagnosticEvent[]): string;
