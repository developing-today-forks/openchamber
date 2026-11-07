interface UseStreamingTextThrottleInput {
    text: string;
    isStreaming: boolean;
    throttleMs?: number;
    identityKey?: string;
    allowTextReplacement?: boolean;
}
export declare const getStreamingThrottleText: (current: string, next: string, isStreaming: boolean, allowTextReplacement: boolean) => string;
export declare const useStreamingTextThrottle: ({ text, isStreaming, throttleMs, identityKey, allowTextReplacement, }: UseStreamingTextThrottleInput) => string;
export {};
