/**
 * useServerTTS Hook
 *
 * React hook for server-side text-to-speech playback.
 * Fetches audio from the server and plays it, bypassing mobile Safari restrictions.
 *
 * @example
 * ```typescript
 * const { speak, isPlaying, stop, isAvailable } = useServerTTS();
 *
 * // Speak text
 * await speak('Hello, this is a test');
 *
 * // Stop playback
 * stop();
 * ```
 */
interface UseServerTTSOptions {
    enabled?: boolean;
    availabilityMode?: 'auto' | 'openai' | 'openai-compatible';
}
export interface UseServerTTSReturn {
    /** Whether TTS is currently playing */
    isPlaying: boolean;
    /** Whether the server TTS service is available */
    isAvailable: boolean;
    /** Current error if any */
    error: string | null;
    /** Speak the given text */
    speak: (text: string, options?: SpeakOptions) => Promise<void>;
    /** Stop current playback */
    stop: () => void;
    /** Check if service is available */
    checkAvailability: () => Promise<boolean>;
    /** Unlock audio for mobile Safari - call this on user gesture before speaking */
    unlockAudio: () => Promise<void>;
}
interface SpeakOptions {
    /** Voice to use (defaults to coral) */
    voice?: string;
    /** Model to use (defaults to gpt-4o-mini-tts) */
    model?: string;
    /** Speech speed (0.25 to 4.0, defaults to 1.0) */
    speed?: number;
    /** Speech pitch shift (0.5 to 2.0, mapped to cents; 1.0 = no shift) */
    pitch?: number;
    /** Playback volume (0 to 1, defaults to 1.0) */
    volume?: number;
    /** Optional instructions for the voice */
    instructions?: string;
    /** Summarize long text before speaking (defaults to true) */
    summarize?: boolean;
    /** Provider ID for summarization model */
    providerId?: string;
    /** Model ID for summarization */
    modelId?: string;
    /** Character threshold for summarization (defaults to 200) */
    threshold?: number;
    /** Custom base URL for OpenAI-compatible server */
    baseURL?: string;
    /** Callback when playback starts */
    onStart?: () => void;
    /** Callback when playback ends */
    onEnd?: () => void;
    /** Callback on error */
    onError?: (error: string) => void;
}
/**
 * Split text into sentence-level TTS chunks. Short fragments left over after
 * abbreviation splits (т.д., т.е., initials) are merged with adjacent chunks so
 * every request carries a meaningful piece of speech. Line breaks are hard
 * boundaries: formatted replies keep headings and list items on their own
 * lines, and a heading without terminal punctuation must never merge with the
 * line below it.
 */
export declare function splitSentencesForTTS(text: string): string[];
/** Outcome of the chunked synthesis loop. */
export type ChunkedPlaybackResult = {
    status: 'completed';
    scheduled: number;
} | {
    status: 'aborted';
    scheduled: number;
} | {
    status: 'all-failed';
};
/**
 * Synthesize and schedule sentence chunks in order: each chunk is fetched,
 * scheduled for playback as soon as it is decoded, and the next chunk is
 * fetched while the current one plays. Completion is reported through
 * onAllEnded once every scheduled chunk has ended (or earlier chunks ended
 * and every remaining fetch failed). Test hooks are injected as deps so the
 * scheduling and failure behavior is unit-testable without Web Audio.
 */
export declare function runChunkedTTSPlayback<TBuffer, TSource>(chunks: readonly string[], deps: {
    signal: AbortSignal;
    fetchChunk: (chunk: string) => Promise<TBuffer>;
    scheduleChunk: (audioBuffer: TBuffer, startAt: number) => {
        source: TSource;
        endsAt: number;
    };
    currentTime: () => number;
    attachOnEnded: (source: TSource, handler: () => void) => void;
    onScheduled: (source: TSource) => void;
    onFirstScheduled: () => void;
    onAllEnded: () => void;
}): Promise<ChunkedPlaybackResult>;
export declare function useServerTTS(options?: UseServerTTSOptions): UseServerTTSReturn;
export {};
