type SpaceModelRefusal = {
    spaceId: string;
    providerId: string;
    reason: 'not_granted' | 'needs_again' | 'opencode';
};
/** The space a draft or session targets: by the request it still waits on, or by its directory. */
type SpaceTarget = {
    requestId: string | null;
    directory: string | null;
};
/**
 * The space a message targets when the journey list says it cannot take one: stopped, or its
 * container gone. Checked before any model is looked at: nothing inside can answer, and the
 * composer may not even have a model for the space, whose catalog does not load meanwhile. The
 * same rule as `isSpaceDirectoryStopped`, which pauses the polls. `start` says whether "Start" is
 * the way on, as the group's menu decides it: a stopped space whose gatekeeper is gone never starts
 * again, and a space whose container is gone can only be deleted.
 */
type StoppedSpace = {
    spaceId: string;
    reason: 'stopped' | 'gone' | 'unreachable';
    start: boolean;
};
export declare const stoppedSpaceOfTarget: (target: SpaceTarget) => StoppedSpace | null;
export declare const noteSpaceModelAccess: (target: {
    requestId: string;
    directory: string;
}, providers: readonly string[]) => void;
/** Forgets what creations in this window chose; the runtime they were made on is gone. */
export declare const resetSpaceModelAccess: () => void;
/**
 * Why a message on this provider must not go to the space the target names, or null when it may
 * or the target is not a space. A draft names its target by the request it still waits on, or by
 * its directory; a session by its directory.
 */
export declare const spaceModelRefusal: (target: SpaceTarget, providerId: string) => SpaceModelRefusal | null;
/**
 * The model the composer moves to when a new space is given access to `providers` and the
 * composer's model is on none of them: otherwise the first message on it would only come back
 * with a refusal. The model last used of the first such provider the catalog has, else its first
 * model the user did not hide; null when the composer's provider is among them or none is known.
 */
export declare const composerModelForSpaceAccess: (providers: readonly string[]) => {
    providerId: string;
    modelId: string;
} | null;
export {};
