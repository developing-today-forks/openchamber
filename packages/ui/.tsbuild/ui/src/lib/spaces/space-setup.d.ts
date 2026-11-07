import { type SpaceEntry } from './spaces-api';
/** What a space runs once its code arrived, and whether the first message waits for it. */
export type SpaceSetupPlan = {
    commands: string[];
    waitBeforeSending: boolean;
};
/**
 * The setup commands a new space of this project runs, after the trust prompt when the shared
 * ones were not trusted yet, and the project's "wait for setup commands" setting.
 */
export declare const resolveSpaceSetupPlan: (projectDirectory: string) => Promise<SpaceSetupPlan>;
/**
 * Runs the project's setup commands again in a running space, as they are in the project's
 * settings now. Nothing to run refuses with a code of its own, so the group can say why: the
 * project has none, or the user skipped the repository's at the trust prompt and has none of their own.
 */
export declare const runSpaceSetupAgain: (entry: SpaceEntry) => Promise<SpaceEntry>;
