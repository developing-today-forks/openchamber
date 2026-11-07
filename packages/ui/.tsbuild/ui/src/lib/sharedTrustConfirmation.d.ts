/**
 * The trust prompt for a team's shared project setup.
 *
 * Commands in `<repo>/.openchamber/project.json` run on this machine, and a
 * `git pull` can change them. So the first time a shared setup command or a
 * shared action is about to run, the app shows exactly what would run and
 * asks. The answer is recorded on the instance against a hash of those
 * commands (`trust.hash`); a pull that changes them brings the prompt back.
 *
 * One request is active at a time; a newer one settles the pending one the way
 * that request is dismissed. The dialog (`SharedTrustConfirmDialog`) renders
 * the pending request on every surface.
 */
import { type ProjectRef, type ProjectSetup } from './openchamberConfig';
export type SharedTrustChoice = 'trust' | 'skip' | 'cancel';
/**
 * What closing the prompt without choosing means. Worktree creation treats it
 * as `cancel`: the user closed the question, so nothing is created. Requests
 * that cannot be undone (a project action, a space) treat it as `skip`.
 */
type SharedTrustDismissChoice = Exclude<SharedTrustChoice, 'trust'>;
/** Where the commands would run: on this machine, or inside an isolated space. The prompt says which. */
type SharedTrustRunsIn = 'machine' | 'space';
type PendingSharedTrustRequest = {
    project: ProjectRef;
    sharedPath: string;
    runsIn: SharedTrustRunsIn;
    dismissChoice: SharedTrustDismissChoice;
    setupCommands: string[];
    actions: Array<{
        id: string;
        name: string;
        command: string;
    }>;
    resolve: (choice: SharedTrustChoice) => void;
};
export declare const getSharedTrustConfirmationSnapshot: () => PendingSharedTrustRequest | null;
export declare const subscribeSharedTrustConfirmation: (listener: () => void) => (() => void);
export declare const settleSharedTrustConfirmation: (choice: SharedTrustChoice) => void;
/**
 * Make sure the shared commands of `setup` may run. Resolves `true` at once
 * when there is nothing to trust or the current commands were trusted before;
 * otherwise asks, records a "trust" answer on the instance, and resolves
 * `false` when the user chose to run without the shared commands this time.
 * Closing the prompt skips the shared commands: the caller has already begun
 * work that dismissing cannot undo.
 */
export declare const ensureSharedSetupTrusted: (project: ProjectRef, setup: ProjectSetup, runsIn?: SharedTrustRunsIn) => Promise<boolean>;
/**
 * The setup commands a new worktree should run for `project`, after the trust
 * prompt when the shared ones have not been trusted yet. A "skip" answer
 * leaves only the user's own commands. An isolated space asks the same, saying that they run
 * inside the space; the answer is remembered the same way.
 */
export declare const resolveWorktreeSetupCommands: (project: ProjectRef, runsIn?: SharedTrustRunsIn) => Promise<string[]>;
/**
 * The setup commands for a worktree the user is about to create. Closing the
 * trust prompt cancels the creation rather than skipping the shared commands,
 * so this resolves `null` and the caller must not create anything.
 */
export declare const resolveWorktreeSetupCommandsOrCancel: (project: ProjectRef, runsIn?: SharedTrustRunsIn) => Promise<string[] | null>;
/** Forget the recorded trust answer, so the next shared command asks again. */
export declare const resetSharedSetupTrust: (project: ProjectRef) => Promise<boolean>;
export {};
