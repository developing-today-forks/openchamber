import { type CreateSpaceRequest, type GrantRequest, type SpaceEntry } from './spaces-api';
import type { SpaceSetupPlan } from './space-setup';
export type SpaceModelAccess = Extract<GrantRequest, {
    kind: 'model' | 'login' | 'custom';
}>;
type StartSpaceCreationOptions = {
    projectId: string;
    request: Omit<CreateSpaceRequest, 'setupCommands' | 'grants'>;
    setup: SpaceSetupPlan;
    access: readonly SpaceModelAccess[];
    /** The text a waiting message is refused with when the space cannot take it, already translated. */
    refusalMessage: string;
};
/**
 * Asks the host for the space and answers once it has an id, so the dialog can close; a refusal of
 * the request itself (Docker gone since the dialog checked, a project the host lost) throws here,
 * for the dialog to show. Everything after that runs on its own and ends in the space's group.
 */
export declare const startSpaceCreation: ({ projectId, request, setup, access, refusalMessage }: StartSpaceCreationOptions) => Promise<SpaceEntry>;
export {};
