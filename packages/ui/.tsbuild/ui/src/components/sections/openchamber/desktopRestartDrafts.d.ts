import type { DesktopSettings } from '@/lib/desktop';
/** Desktop settings that only apply on the next launch. */
type DesktopRestartPatch = Partial<Pick<DesktopSettings, 'desktopLanAccessEnabled' | 'desktopUiPassword' | 'desktopMacMenuBarEnabled' | 'desktopLinuxNativeFrame'>>;
type DraftOwner = 'app' | 'network';
type DraftState = {
    /** Each section's unsaved changes, or nothing when it has none. */
    patches: Partial<Record<DraftOwner, DesktopRestartPatch>>;
    /** A section whose changes cannot be saved as they are (LAN on without a password). */
    blocked: Partial<Record<DraftOwner, boolean>>;
    setDraft: (owner: DraftOwner, patch: DesktopRestartPatch | null, blocked: boolean) => void;
};
/**
 * The desktop app and network sections each hold changes that apply after a
 * restart, and each has its own "Save + restart". Either button restarts the
 * app, so it saves every section's pending changes in one write: a restart
 * from one section never drops what the user changed in the other.
 */
export declare const useDesktopRestartDrafts: import("zustand").UseBoundStore<import("zustand").StoreApi<DraftState>>;
/** Saves every pending restart change in one write; resolves whether it was stored. */
export declare const saveDesktopRestartDrafts: () => Promise<boolean>;
export {};
