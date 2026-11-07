/**
 * useMessageTTS Hook
 *
 * Hook for playing TTS on individual messages.
 * Uses the configured voice provider (browser, OpenAI, or macOS Say).
 */
export interface PlayMessageTTSOptions {
    /** False reads the text as-is even when the voice settings ask for a summary. */
    summarize?: boolean;
}
export interface UseMessageTTSReturn {
    /** Whether a reading under this hook's key is playing */
    isPlaying: boolean;
    /** Play the text, replacing any reading in progress */
    play: (text: string, options?: PlayMessageTTSOptions) => Promise<void>;
    /** Stop the reading under this hook's key */
    stop: () => void;
}
/**
 * @param readingKey Hooks passing the same key share one reading; without a
 * key the reading is private to this hook.
 */
export declare function useMessageTTS(readingKey?: string): UseMessageTTSReturn;
