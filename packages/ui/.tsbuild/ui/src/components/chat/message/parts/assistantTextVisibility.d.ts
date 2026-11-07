import type { StreamPhase } from '../types';
export declare const resolveAssistantTextStreaming: (input: {
    streamPhase: StreamPhase;
    isFinalized: boolean;
}) => boolean;
export declare const resolveAssistantDisplayText: (input: {
    textContent: string;
    throttledTextContent: string;
    isStreaming: boolean;
}) => string;
