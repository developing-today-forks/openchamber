import type { PairingConnectionPayload } from '@/lib/connectionPayload';
export declare const createMobilePasswordOperationTracker: () => {
    begin: () => number;
    cancel: () => void;
    isCurrent: (operation: number) => boolean;
};
export type MobileRelayConfig = {
    relayUrl: string;
    serverId: string;
    hostEncPubJwk: JsonWebKey;
};
type MobileTransportCandidate = {
    kind: 'direct';
    url: string;
} | {
    kind: 'relay';
    relay: MobileRelayConfig;
};
type MobileSavedConnection = {
    id: string;
    label: string;
    candidates: MobileTransportCandidate[];
    serverId?: string;
    lastUsedAt: number;
    hasToken?: boolean;
    clientToken?: string;
};
type MobilePendingConnection = {
    id: string;
    label: string;
    candidates: MobileTransportCandidate[];
    serverId?: string;
    relay?: MobileRelayConfig;
    relayGrant?: string;
};
type MobileConnectInput = {
    id?: string;
    url?: string;
    candidates?: MobileTransportCandidate[];
    clientToken?: string;
    label?: string;
    relay?: MobileRelayConfig;
    relayGrant?: string;
};
export declare const connectionDisplayUrl: (connection: {
    candidates: MobileTransportCandidate[];
}) => string;
export declare const logMobileConnectEvent: (step: string, detail?: Record<string, unknown>) => void;
export declare const migrateLegacyInlineTokenRecords: (records: unknown[], migrateToken: (url: string, token: string) => Promise<boolean>) => Promise<{
    records: unknown[];
    migrated: number;
    failed: number;
}>;
export declare const loadMobileConnections: () => Promise<MobileSavedConnection[]>;
export declare const upsertMobileConnection: (connection: {
    id?: string;
    label: string;
    candidates: MobileTransportCandidate[];
    serverId?: string;
    clientToken?: string;
}) => Promise<MobileSavedConnection[]>;
export declare const getAutoConnectTargetLabel: () => string | null;
export type AutoConnectOutcome = {
    status: 'connected';
}
/** No saved instance / no saved token — nothing to report to the user. */
 | {
    status: 'no-candidate';
} | {
    status: 'unreachable';
    label: string;
}
/** The relay refused the tunnel over its limits; retrying at once hits them again. */
 | {
    status: 'relay-limit';
    label: string;
}
/** The saved token was rejected (expired/revoked) — the user must sign in again. */
 | {
    status: 'needs-login';
    label: string;
};
export declare const suppressAutoConnectUntilManualConnect: () => void;
export declare const autoConnectLastInstance: (options?: {
    fast?: boolean;
    skipIfConnected?: boolean;
}) => Promise<AutoConnectOutcome>;
export declare const validateMobileConnectionSession: (input: {
    url: string;
    clientToken?: string | null;
}, options?: {
    fast?: boolean;
}) => Promise<boolean>;
export declare const isActiveRuntimeConnection: (connection: MobileSavedConnection) => boolean;
type ReprobeOutcome = 'switched' | 'unchanged' | 'unreachable' | 'relay-limit' | 'needs-login' | 'no-connection';
export declare const reprobeActiveConnection: (options?: {
    fast?: boolean;
}) => Promise<ReprobeOutcome>;
type UseMobileConnection = {
    connections: MobileSavedConnection[];
    isBusy: boolean;
    isPasswordBusy: boolean;
    error: string | null;
    pendingConnection: MobilePendingConnection | null;
    connect: (input: MobileConnectInput) => Promise<void>;
    redeemPairingConnection: (payload: PairingConnectionPayload) => Promise<void>;
    submitPassword: (password: string) => Promise<void>;
    cancelPassword: () => void;
    saveConnection: (input: MobileConnectInput) => Promise<MobileSavedConnection | null>;
    removeConnection: (id: string) => Promise<MobileSavedConnection | null>;
    setError: (message: string | null) => void;
};
export declare const useMobileConnection: (onConnected: () => void) => UseMobileConnection;
export {};
