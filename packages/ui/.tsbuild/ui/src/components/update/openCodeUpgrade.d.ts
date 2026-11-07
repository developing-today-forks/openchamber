export type OpenCodeUpgradeStatus = {
    /** Installed OpenCode version, or null when the server could not read it. */
    currentVersion: string | null;
    /** Newer version to announce, or null when there is nothing to announce. */
    availableVersion: string | null;
    /** True only when the server can run the upgrade itself. */
    supported: boolean;
};
/** Throws on failure so a failed check never reads as "no update". */
export declare function fetchOpenCodeUpgradeStatus(): Promise<OpenCodeUpgradeStatus>;
/**
 * Installs the latest OpenCode on the server. Resolves with the installed
 * version when the server reports one; throws with the server's reason, or
 * with `fallbackError` when it gives none.
 */
export declare function runOpenCodeUpgrade(fallbackError: string): Promise<string | null>;
