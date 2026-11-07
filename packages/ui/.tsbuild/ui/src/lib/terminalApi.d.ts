import type { CreateTerminalOptions, TerminalHandlers, TerminalServerSession, TerminalSession, TerminalSessionPurpose, TerminalShellOption, TerminalStreamEvent } from './api/types';
import type { TerminalChunkSize } from '@/stores/useTerminalStore';
import type { RelayTunnelWebSocket } from './relay/tunnel-client';
type TerminalSessionPurposeInput = TerminalSessionPurpose | {
    type: 'project-action';
    actionId: string;
    executionId?: string;
} | null | undefined;
type TerminalSessionInput = {
    sessionId?: string;
    cols?: number;
    rows?: number;
    status?: 'running' | 'exited' | 'error';
    mode?: 'interactive' | 'command';
    purpose?: TerminalSessionPurposeInput;
} | null | undefined;
export declare class TerminalRequestError extends Error {
    readonly code: string | null;
    constructor(message: string, code: string | null);
}
/** The PTY size a snapshot's history was drawn for, when the server reported one. */
export declare const terminalSnapshotSize: (event: Pick<TerminalStreamEvent, 'cols' | 'rows'>) => TerminalChunkSize | undefined;
export declare const isTerminalCwdMissingError: (error: unknown) => boolean;
export declare const parseTerminalSessionPurpose: (value: TerminalSessionPurposeInput) => TerminalSessionPurpose | undefined;
export declare const parseTerminalSession: (value: TerminalSessionInput) => TerminalSession | null;
type TerminalTransportDependencies = {
    refreshAuth: () => Promise<unknown>;
    openSocket: () => RelayTunnelWebSocket;
    clearUrlAuthToken?: () => void;
};
export declare class TerminalTransport {
    private readonly dependencies;
    private socket;
    private opening;
    private subscribers;
    private projections;
    private reconnectTimer;
    private keepaliveTimer;
    private idleCloseTimer;
    private failures;
    private wakeCleanup;
    private generation;
    private disposed;
    constructor(dependencies?: TerminalTransportDependencies);
    subscribe(sessionId: string, handlers: TerminalHandlers): () => void;
    write(sessionId: string, data: string): Promise<void>;
    dispose(): void;
    forget(sessionId: string): void;
    /**
     * Records a resize the server accepted, so a projection snapshot replayed to
     * a later subscriber (tab switch, remount) still names the size the
     * terminal's current screen is drawn for.
     */
    noteResize(sessionId: string, cols: number, rows: number): void;
    private ensureConnected;
    private handleMessage;
    private send;
    private scheduleReconnect;
    private scheduleIdleClose;
    private cancelIdleClose;
    private startKeepalive;
    private stopKeepalive;
    private cancelReconnect;
    private closeSocket;
}
export declare function createTerminalSession(options: CreateTerminalOptions): Promise<TerminalSession>;
export declare function listTerminalSessions(cwd: string): Promise<TerminalServerSession[]>;
export declare function touchTerminalSessions(sessionIds: string[], directory?: string | null): Promise<void>;
export declare function listTerminalShells(): Promise<TerminalShellOption[]>;
export declare function connectTerminalStream(sessionId: string, onEvent: TerminalHandlers['onEvent'], onError?: TerminalHandlers['onError'], directory?: string | null): () => void;
export declare function sendTerminalInput(sessionId: string, data: string, directory?: string | null): Promise<void>;
export declare function resizeTerminal(sessionId: string, cols: number, rows: number, directory?: string | null): Promise<void>;
export declare function updateTerminalAppearance(sessionId: string, appearance: Pick<CreateTerminalOptions, 'themeMode' | 'terminalBackground' | 'terminalForeground'>, directory?: string | null): Promise<void>;
export declare function closeTerminal(sessionId: string, directory?: string | null): Promise<void>;
export declare function restartTerminalSession(currentSessionId: string, options: CreateTerminalOptions): Promise<TerminalSession>;
export declare function forceKillTerminal(options: {
    sessionId?: string;
    cwd?: string;
}): Promise<void>;
export declare function disposeTerminalInputTransport(): void;
export {};
