type TitledSession = {
    id: string;
    title?: string | null;
    time?: {
        updated?: number;
    } | null;
};
type SessionSlice = {
    session: readonly TitledSession[];
};
export declare const EMPTY_SESSION_TITLE_MAP: ReadonlyMap<string, string>;
export declare const areTitleMapsEqual: (a: ReadonlyMap<string, string>, b: ReadonlyMap<string, string>) => boolean;
export declare const buildSessionTitleMap: (states: Iterable<SessionSlice>, sessionIDs: readonly string[]) => ReadonlyMap<string, string>;
/** The session a chat tab shows, from its `session:<id>` dedupe key. */
export declare const getSessionIDFromDedupeKey: (dedupeKey: string | undefined) => string | null;
export {};
