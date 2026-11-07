import type { SessionMessageRecord } from '@/lib/exportSession';
import { type GuestActionEntry } from './actions.ts';
import { runGuestAction } from './run-action.ts';
type SessionActionTarget = {
    id: string;
    title: string | null | undefined;
    directory: string | null | undefined;
};
/**
 * Run a session action from a menu: load the conversation when the action
 * asked for it and the grant covers it, then dispatch the declared mode.
 * `loadRecords` answers `null` for a failed load; the caller reports that
 * and nothing opens, so the guest never sees an empty conversation that is
 * really a fetch failure.
 */
export declare const runGuestSessionAction: (input: {
    entry: GuestActionEntry;
    session: SessionActionTarget;
    loadRecords: () => Promise<readonly SessionMessageRecord[] | null>;
    onLoadFailed: () => void;
    t: Parameters<typeof runGuestAction>[2];
}) => Promise<void>;
export {};
