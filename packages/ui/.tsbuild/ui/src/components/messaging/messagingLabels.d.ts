export declare const MATCH_LABEL_KEYS: {
    readonly hybrid: 'messaging.match.hybrid';
    readonly semantic: 'messaging.match.semantic';
    readonly fuzzy: 'messaging.match.fuzzy';
    readonly exact: 'messaging.match.exact';
    readonly regex: 'messaging.match.regex';
    readonly advanced: 'messaging.match.advanced';
};
/**
 * The name a writer goes by in the panel: "You" for the person, the session's
 * title when this client knows the session, else its ID.
 */
export declare const useWriterName: (writer: string, fallbackTitle?: string) => string;
/**
 * A topic name as people read it: the session IDs standard topic names carry
 * replaced by the titles this client knows (`Design the API/private`). Views
 * keep the raw name in a tooltip, since that is what agents and the CLI use.
 */
export declare const useTopicLabel: (name: string) => string;
/** Short date and time in the user's time format. */
export declare const useMessageTime: () => ((timestamp: number) => string);
