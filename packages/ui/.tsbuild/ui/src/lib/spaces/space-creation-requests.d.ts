import type { SpaceEntry } from './spaces-api';
export declare const noteSpaceCreationRequest: (requestId: string, spaceId: string) => void;
export declare const forgetSpaceCreationRequest: (requestId: string) => void;
/** Forgets the waiting requests; the runtime their spaces were asked of is gone. */
export declare const resetSpaceCreationRequests: () => void;
export declare const isSpaceCreationRequest: (requestId: string | null | undefined) => boolean;
/** The space a draft waits for, or null when the draft waits for nothing of this kind. */
export declare const spaceOfCreationRequest: (requestId: string | null | undefined) => string | null;
/** Where a draft waiting for a space runs commands: nowhere while the space is made, in the space once it runs. */
export type DraftSpaceTarget = {
    kind: 'preparing';
} | {
    kind: 'ready';
    directory: string;
};
/**
 * Where a draft that waits for a space runs its terminal and project actions, or null when the draft
 * waits for no space. The draft itself stays on the project's folder until its message is sent, but
 * its branch chip names the space, so commands follow the chip: one run on this computer would do
 * what the user means for the container. Running is what the chip reads as ready too.
 */
export declare const draftSpaceTarget: (requestId: string | null | undefined, journey: ReadonlyMap<string, SpaceEntry> | null) => DraftSpaceTarget | null;
/**
 * The folder a panel shows, given the open view's own: that folder, or for a draft waiting for a
 * space, the space once it runs and none while it is made. The panel's tabs stay with the view's
 * own folder either way, as the draft does.
 */
export declare const panelContentDirectory: (draftSpace: DraftSpaceTarget | null, own: string | null | undefined) => string | null;
