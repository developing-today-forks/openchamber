import { type SmallModelAvailability } from '@/stores/useSmallModelStore';
/**
 * Whether the background model can run for `directory`. Fetches on mount and
 * whenever `active` flips to true (a menu opening, a dialog showing), so a
 * closed menu never polls.
 */
export declare function useSmallModelAvailability(directory: string | null | undefined, active?: boolean): SmallModelAvailability;
