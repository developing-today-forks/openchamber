/**
 * Settings → Messaging: the `messaging` section of OpenCode's config, the
 * live state of OpenCode's embedding model, and the topic presets and
 * variables with their current values.
 *
 * The section is read and written through the OpenChamber server, which owns
 * the file; OpenCode applies a change without a restart. A write shows at
 * once and rolls back when it fails, unless a newer change was made since.
 * A failed read never replaces a good snapshot of the same scope.
 */
import { type MessagingConfig, type MessagingConfigSnapshot } from '@/lib/messagingConfigApi';
import { type MessagingModelStatus, type MessagingVars } from '@/lib/opencode/messaging';
type ConfigState = {
    kind: 'idle';
} | {
    kind: 'loading';
    scope: string;
} | {
    kind: 'ready';
    scope: string;
    snapshot: MessagingConfigSnapshot;
} | {
    kind: 'failed';
    scope: string;
    error: string;
};
type ModelState = {
    status: MessagingModelStatus | null;
    error: string | null;
    starting: boolean;
};
type VarsState = {
    key: string | null;
    data: MessagingVars | null;
    error: string | null;
};
type MessagingSettingsStore = {
    config: ConfigState;
    model: ModelState;
    vars: VarsState;
    load: (directory: string | null) => Promise<void>;
    /** Applies a change to the section; resolves false when the write failed and the change was rolled back. */
    update: (change: (config: MessagingConfig) => MessagingConfig) => Promise<boolean>;
    loadModel: () => Promise<void>;
    /** Downloads and starts the configured model now. */
    startModel: () => Promise<void>;
    /** Applies a tier to the running OpenCode right away; the config write makes it last. */
    applyTier: (tier: string) => Promise<void>;
    loadVars: (sessionID: string | null) => Promise<void>;
    /** Sets a global custom variable, or removes it when `value` is undefined. */
    setGlobalVar: (name: string, value: string | undefined, sessionID: string | null) => Promise<boolean>;
};
export declare const getMessagingSettingsScope: (directory: string | null) => string;
export declare const useMessagingSettingsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<MessagingSettingsStore>>;
/** Re-read after a config change, but only once the page asked for the data. */
export declare const refreshMessagingSettingsIfLoaded: () => Promise<void>;
export {};
