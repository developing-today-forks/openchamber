type DesktopSshRemoteMode = 'managed' | 'external';
type DesktopSshInstallMethod = 'auto' | 'npm' | 'bun';
type DesktopSshSecretStore = 'never' | 'settings';
type DesktopSshStoredSecret = {
    enabled: boolean;
    value?: string;
    store: DesktopSshSecretStore;
};
export type DesktopSshPortForwardType = 'local' | 'remote' | 'dynamic';
export type DesktopSshPortForward = {
    id: string;
    enabled: boolean;
    type: DesktopSshPortForwardType;
    localHost?: string;
    localPort?: number;
    remoteHost?: string;
    remotePort?: number;
};
export type DesktopSshInstance = {
    id: string;
    nickname?: string;
    sshCommand: string;
    sshParsed?: {
        destination: string;
        args: string[];
    };
    connectionTimeoutSec: number;
    remoteOpenchamber: {
        mode: DesktopSshRemoteMode;
        keepRunning: boolean;
        preferredPort?: number;
        /** Interface the managed remote server listens on. '0.0.0.0' also exposes it to the remote machine's network. */
        bindHost: '127.0.0.1' | '0.0.0.0';
        installMethod: DesktopSshInstallMethod;
        uploadBundleOverSsh: boolean;
    };
    localForward: {
        preferredLocalPort?: number;
        bindHost: '127.0.0.1' | 'localhost' | '0.0.0.0';
    };
    auth: {
        sshPassword?: DesktopSshStoredSecret;
        openchamberPassword?: DesktopSshStoredSecret;
    };
    portForwards: DesktopSshPortForward[];
};
type DesktopSshInstancesConfig = {
    instances: DesktopSshInstance[];
};
type DesktopSshPhase = 'idle' | 'config_resolved' | 'auth_check' | 'master_connecting' | 'remote_probe' | 'installing' | 'updating' | 'server_detecting' | 'server_starting' | 'forwarding' | 'ready' | 'degraded' | 'error';
export type DesktopSshInstanceStatus = {
    id: string;
    phase: DesktopSshPhase;
    detail?: string;
    localUrl?: string;
    localPort?: number;
    remotePort?: number;
    startedByUs: boolean;
    retryAttempt: number;
    requiresUserAction: boolean;
    updatedAtMs: number;
};
export type DesktopSshImportCandidate = {
    host: string;
    pattern: boolean;
    source: string;
    sshCommand: string;
};
export declare const createDesktopSshInstance: (id: string, sshCommand: string) => DesktopSshInstance;
export declare const desktopSshInstancesGet: () => Promise<DesktopSshInstancesConfig>;
export declare const desktopSshInstancesSet: (config: DesktopSshInstancesConfig) => Promise<void>;
export declare const desktopSshImportHosts: () => Promise<DesktopSshImportCandidate[]>;
export declare const desktopSshConnect: (id: string) => Promise<void>;
export declare const desktopSshDisconnect: (id: string) => Promise<void>;
export declare const desktopSshStatus: (id?: string) => Promise<DesktopSshInstanceStatus[]>;
export declare const desktopSshLogs: (id: string, limit?: number) => Promise<string[]>;
export declare const desktopSshLogsClear: (id: string) => Promise<void>;
export declare const listenDesktopSshStatus: (listener: (status: DesktopSshInstanceStatus) => void) => Promise<() => Promise<void>>;
export {};
