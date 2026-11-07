import { type DraftSpaceTarget } from './space-creation-requests';
/** Where the open draft runs commands while it waits for a new space; null for any other view. */
export declare const useDraftSpaceTarget: () => DraftSpaceTarget | null;
