import type { GuestRunningShellsSnapshot, GuestShellOutputResult, GuestShellsScope } from '@openchamber/sdk';
/**
 * The running shells a scope covers, oldest first, and the ones that ended,
 * oldest end first with the newest kept. Local store only; never a network read.
 */
export declare const readGuestShells: (scope: GuestShellsScope) => GuestRunningShellsSnapshot;
/**
 * One page of a command's output, running or ended. OpenCode keeps an ended
 * command's output until it evicts the command (it retains the latest 25 per
 * directory); a stopped command's output goes with it at once.
 */
export declare const readGuestShellOutput: (shellId: string, cursor?: number, tailBytes?: number) => Promise<GuestShellOutputResult>;
/** One shared observer per runtime and scope, mirroring the workspace observer lifecycle. */
export declare const observeGuestShells: (scope: GuestShellsScope, listener: (snapshot: GuestRunningShellsSnapshot) => void) => (() => void);
