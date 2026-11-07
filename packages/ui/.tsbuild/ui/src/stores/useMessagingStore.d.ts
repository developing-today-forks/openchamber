/**
 * State for the Messages panel: whether the connected OpenCode serves
 * messaging, the topics and messages the panel shows, the person's inbox, and
 * the current session's chain and log.
 *
 * OpenCode owns all of it. The store reads on demand, and re-reads what is on
 * screen when the event stream announces a new message (`applyCreated`). Each
 * slice remembers which request its data answers (`key`), so a view shows data
 * only for what it asked; only the newest read of a slice may commit; and a
 * failed read keeps the data already shown and records the error instead of
 * replacing it with an empty list.
 *
 * The panel remounts whenever the context panel switches surfaces, so where
 * the user was (tab, open topic, filters) lives here too. A runtime switch
 * resets everything.
 */
import { type MessagingChain, type MessagingCreated, type MessagingDelivery, type MessagingLog, type MessagingLogPart, type MessagingMatchMode, type MessagingMessage, type MessagingModelStatus, type MessagingQueryResult, type MessagingSendResult, type MessagingSessionNode, type MessagingTopic, type MessagingWriteMode, type MessagingWriter } from '@/lib/opencode/messaging';
export type MessagingTab = 'inbox' | 'topics' | 'sessions';
type MessagingTopicScope = 'session' | 'all';
export type MessagingLogOp = 'tail' | 'head' | 'grep' | 'search';
type MessagingSupport = {
    kind: 'unknown';
} | {
    kind: 'checking';
} | {
    kind: 'supported';
} | {
    kind: 'unsupported';
} | {
    kind: 'failed';
    error: string;
};
/** Data for one request. `data` belongs to `key`; it stays while a newer read of the same key runs or fails. */
type MessagingSlice<T> = {
    key: string | null;
    data: T | null;
    loading: boolean;
    error: string | null;
};
type MessagingThread = {
    messages: MessagingMessage[];
    more: boolean;
};
type Slices = {
    topics: MessagingSlice<MessagingTopic[]>;
    topic: MessagingSlice<MessagingTopic>;
    thread: MessagingSlice<MessagingThread>;
    inbox: MessagingSlice<MessagingMessage[]>;
    search: MessagingSlice<MessagingQueryResult>;
    chain: MessagingSlice<MessagingChain>;
    log: MessagingSlice<MessagingLog>;
    sessions: MessagingSlice<MessagingSessionNode[]>;
};
/** Where the user is in the panel; kept across remounts. */
type MessagingView = {
    tab: MessagingTab;
    topicScope: MessagingTopicScope;
    openTopic: string | null;
    /** The message to scroll to and mark when a topic opens from a search hit or a notice. */
    focusSeq: number | null;
    showHidden: boolean;
    searchOpen: boolean;
    searchQuery: string;
    searchMatch: MessagingMatchMode;
    chainDetail: boolean;
    logOp: MessagingLogOp;
    logParts: MessagingLogPart[];
    logQuery: string;
    findQuery: string;
};
/** What a write reports back to the view that started it. */
export type MessagingWriteOutcome = {
    kind: 'sent';
    result: MessagingSendResult;
}
/** A soft write limit refused it; `policy` is OpenCode's explanation. Sending again with `force` writes anyway. */
 | {
    kind: 'refused';
    policy: string;
} | {
    kind: 'failed';
    error: string;
};
type MessagingStore = Slices & MessagingView & {
    support: MessagingSupport;
    model: MessagingModelStatus | null;
    checkSupport: (options?: {
        force?: boolean;
    }) => Promise<MessagingSupport>;
    /** Registers a visible Messages view; releasing the last one suspends background refreshes. */
    mountView: () => () => void;
    setView: (patch: Partial<MessagingView>) => void;
    /** Opens a topic in the Topics tab, optionally at one message. */
    openTopicAt: (topic: string, seq?: number | null) => void;
    reset: () => void;
    loadTopics: (sessionID: string | null) => Promise<void>;
    loadTopic: (topic: string) => Promise<void>;
    loadThread: (topic: string, options?: {
        more?: boolean;
    }) => Promise<void>;
    loadInbox: () => Promise<void>;
    runSearch: () => Promise<void>;
    loadChain: (sessionID: string) => Promise<void>;
    loadLog: (sessionID: string) => Promise<void>;
    findSessions: () => Promise<void>;
    sendToTopic: (topic: string, text: string, options?: {
        force?: boolean;
        reply?: number;
    }) => Promise<MessagingWriteOutcome>;
    sendToSession: (sessionID: string, text: string, deliver: MessagingDelivery, options?: {
        force?: boolean;
    }) => Promise<MessagingWriteOutcome>;
    /** Resolves false when OpenCode refused or failed; the thread is re-read either way. */
    setHidden: (topic: string, seq: number, hidden: boolean, forEveryone: boolean) => Promise<boolean>;
    inspect: (topic: string, seq: number) => Promise<MessagingMessage>;
    saveTopicSettings: (topic: string, settings: {
        mode: MessagingWriteMode;
        writers: MessagingWriter[];
        description: string;
    }) => Promise<boolean>;
    subscribe: (sessionID: string, topic: string, delivery: MessagingDelivery | null) => Promise<boolean>;
    /** Re-reads whatever on screen a new message changes. */
    applyCreated: (event: MessagingCreated) => void;
};
export declare const useMessagingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<MessagingStore>>;
export {};
