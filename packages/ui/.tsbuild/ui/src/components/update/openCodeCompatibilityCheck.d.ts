import { type OpenCodeCompatibility } from '@/lib/opencode/compatibility';
/** `null` when the desktop shell already knows its managed OpenCode is compatible. */
export type CompatibilityCheck = Promise<OpenCodeCompatibility | null>;
export declare const runCompatibilityCheck: () => CompatibilityCheck;
/**
 * Starts the compatibility check at page load, alongside authentication, so
 * the gate has its answer when it mounts. On a server that still wants a
 * sign-in the early read fails, and the gate asks again once it mounts.
 */
export declare const prefetchOpenCodeCompatibility: () => void;
export declare const takeCompatibilityCheck: () => CompatibilityCheck;
