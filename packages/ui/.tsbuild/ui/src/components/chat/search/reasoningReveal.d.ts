export declare const requestReasoningReveal: (messageId: string | null) => void;
/** Read at call time by code that is not rendering. */
export declare const isReasoningRevealTarget: (messageId: string) => boolean;
/** A number that changes each time this message's reasoning is asked to open; 0 when it is not. */
export declare const useReasoningReveal: (messageId: string) => number;
