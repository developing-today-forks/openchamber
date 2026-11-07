/**
 * useLocalTTS Hook
 *
 * React hook for local (Kokoro via sherpa-onnx) text-to-speech playback.
 * Synthesis runs on the OpenChamber server in the dictation worker.
 *
 * Long texts are pipelined by sentence chunks: the first chunk starts playing
 * as soon as it is synthesized while the next chunk synthesizes in the
 * background, so time-to-first-audio stays ~1 chunk regardless of message
 * length.
 */
export interface LocalTTSSpeakOptions {
    /** Catalog id of the local model to use; defaults to the server's default model. */
    model?: string;
    /** Speaker id within the model (Kokoro voices; Piper models have one) */
    speakerId?: number;
    /** Playback speed multiplier (1.0 = normal) */
    speed?: number;
    /**
     * `'auto'`: the server picks a model and voice for the text's language.
     * The language is judged on the whole message, not on each chunk sent for
     * synthesis, so a short chunk cannot flip the voice mid-reply.
     */
    language?: 'auto';
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: string) => void;
}
export interface UseLocalTTSReturn {
    isPlaying: boolean;
    error: string | null;
    speak: (text: string, options?: LocalTTSSpeakOptions) => Promise<void>;
    stop: () => void;
    /** Unlock audio for mobile Safari - call this on user gesture */
    unlockAudio: () => Promise<void>;
}
export declare function useLocalTTS(): UseLocalTTSReturn;
