import type { SpaceEntry } from './spaces-api';
/**
 * The running spaces made for the project at `projectPath` that no agent is working in now. The
 * folder comes from the host's record, so it holds whether or not the host still has the project
 * registered by the time the list is read.
 */
export declare const spacesToStopOnClose: (journey: ReadonlyMap<string, SpaceEntry>, projectPath: string, isWorking: (spaceId: string) => boolean) => SpaceEntry[];
/** Stops the spaces of a project the user just closed, and says what happened. */
export declare const stopSpacesOfClosedProject: (projectPath: string, projectLabel: string) => Promise<void>;
