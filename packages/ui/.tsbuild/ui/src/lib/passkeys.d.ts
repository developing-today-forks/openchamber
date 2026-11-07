export type PasskeyStatus = {
    enabled: boolean;
    hasPasskeys: boolean;
    passkeyCount: number;
    rpID: string | null;
};
export type StoredPasskey = {
    id: string;
    label: string;
    customLabel: string | null;
    createdAt: number;
    lastUsedAt: number | null;
    deviceType: string;
    backedUp: boolean;
};
type PasskeyAuthenticationOptions = {
    issueClientToken?: boolean;
    clientLabel?: string;
    clientKind?: string;
    dedupeKey?: string;
};
export declare const defaultPasskeyStatus: PasskeyStatus;
export declare const isPasskeyCeremonyAbort: (error: unknown) => boolean;
export declare const cancelPasskeyCeremony: () => void;
export declare const getPasskeySupportState: () => {
    supported: boolean;
    reason: string;
};
export declare const registerCurrentDevicePasskey: () => Promise<any>;
export declare const authenticateWithPasskey: (trustDevice: boolean, options?: PasskeyAuthenticationOptions) => Promise<any>;
export declare const fetchPasskeyStatus: () => Promise<PasskeyStatus>;
export declare const fetchStoredPasskeys: () => Promise<StoredPasskey[]>;
export declare const revokeStoredPasskey: (id: string) => Promise<any>;
export declare const renameStoredPasskey: (id: string, label: string) => Promise<StoredPasskey | null>;
export declare const resetAllAuth: () => Promise<any>;
export {};
