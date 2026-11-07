import { type SpaceEntry, type SpaceJournalRecord } from './spaces-api';
/** Whether a lower-case value is a name the allowlist takes. */
export declare const isDomainName: (value: string) => boolean;
type ProviderAccess = 'granted' | 'needs_again' | 'none';
/** Whether the space holds a key or the host's login for a provider now, per the gatekeeper, or needs it again. */
export declare const providerAccessOf: (entry: SpaceEntry, providerId: string) => ProviderAccess;
/**
 * What the group and the header warn about for a running space: keys the gatekeeper lost at a
 * restart, no model key at all, or a gatekeeper that could not be asked. Nothing for a space that
 * is not running: there is no gatekeeper to ask.
 */
type SpaceAccessNotice = {
    kind: 'needs_again';
    providers: string[];
} | {
    kind: 'no_model';
} | {
    kind: 'unknown';
};
export declare const spaceAccessNoticeOf: (entry: SpaceEntry | undefined) => SpaceAccessNotice | null;
/** Why the gatekeeper refused, in the words the dialog uses; only `not_on_list` can be opened. */
export type BlockReason = 'not_on_list' | 'private_address' | 'unresolved' | 'address_not_name' | 'port' | 'always_refused' | 'too_many' | 'other';
type BlockedAttempt = {
    host: string;
    port: number;
    reason: BlockReason;
    count: number;
    last: string;
};
/**
 * The refused attempts of a journal, one per destination and reason, the latest first. What was
 * allowed, and what was allowed and could not be reached, is left out: the dialog is about what
 * the user can open. `host` is what the agent asked for, shown as it is.
 */
export declare const blockedAttemptsOf: (records: readonly SpaceJournalRecord[]) => BlockedAttempt[];
/**
 * The domains a failed setup run could not reach: those the journal shows refused as not on the
 * list between the run's start and its failure, each once, in the order first tried. The journal
 * does not say which process asked, so an attempt of the agent's within the span is listed too.
 * Nothing when the run's span is unknown, from a host before it was kept.
 */
export declare const setupBlockedDomainsOf: (records: readonly SpaceJournalRecord[], span: {
    startedAt: string | null;
    finishedAt: string | null;
}) => string[];
export {};
