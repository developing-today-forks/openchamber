/**
 * useSayTTS Hook
 *
 * React hook for macOS 'say' command text-to-speech playback.
 * Uses the native macOS speech synthesis via server API.
 * Uses Web Audio API for playback (better iOS Safari support).
 *
 * @example
 * ```typescript
 * const { speak, isPlaying, stop, isAvailable } = useSayTTS();
 *
 * // Speak text
 * await speak('Hello, this is a test');
 *
 * // Stop playback
 * stop();
 * ```
 */
interface UseSayTTSOptions {
    enabled?: boolean;
}
export interface UseSayTTSReturn {
    /** Whether TTS is currently playing */
    isPlaying: boolean;
    /** Whether the macOS say command is available */
    isAvailable: boolean;
    /** Available voices */
    voices: Array<{
        name: string;
        locale: string;
    }>;
    /** Current error if any */
    error: string | null;
    /** Speak the given text */
    speak: (text: string, options?: SpeakOptions) => Promise<void>;
    /** Stop current playback */
    stop: () => void;
    /** Check if service is available */
    checkAvailability: () => Promise<boolean>;
    /** Unlock audio for mobile Safari - call this on user gesture */
    unlockAudio: () => Promise<void>;
}
interface SpeakOptions {
    /** Voice to use (defaults to Samantha) */
    voice?: string;
    /** Speech rate in words per minute (defaults to 200) */
    rate?: number;
    /** `'auto'`: the server switches to a voice that speaks the text's language. */
    language?: 'auto';
    /** Callback when playback starts */
    onStart?: () => void;
    /** Callback when playback ends */
    onEnd?: () => void;
    /** Callback on error */
    onError?: (error: string) => void;
}
export declare function useSayTTS(options?: UseSayTTSOptions): UseSayTTSReturn;
export {};
