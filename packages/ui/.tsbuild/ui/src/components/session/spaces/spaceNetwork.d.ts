import { type SpaceFailure, type SpaceJournal } from '@/lib/spaces/spaces-api';
type JournalState = {
    kind: 'loading';
} | {
    kind: 'ready';
    journal: SpaceJournal;
} | {
    kind: 'failed';
    failure: SpaceFailure;
};
/** The gatekeeper's journal, read while `enabled` and again on `refresh`; never polled. */
export declare const useSpaceJournal: (spaceId: string, enabled: boolean) => {
    state: JournalState;
    refresh: () => void;
};
/** Allows a domain in a running space, one at a time, and keeps the failure by the domain it was for. */
export declare const useOpenSpaceDomain: (spaceId: string) => {
    open: (domain: string) => Promise<boolean>;
    opening: string | null;
    error: {
        domain: string;
        text: string;
    } | null;
};
export {};
