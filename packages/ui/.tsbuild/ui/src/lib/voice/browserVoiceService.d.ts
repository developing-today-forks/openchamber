/**
 * Browser Voice Service - Web Speech API wrapper
 *
 * Provides speech recognition (STT) and speech synthesis (TTS) using
 * browser-native Web Speech API. No external dependencies required.
 *
 * @example
 * ```typescript
 * import { browserVoiceService } from './browserVoiceService';
 *
 * // Check support
 * if (browserVoiceService.isSupported()) {
 *   // Start listening
 *   browserVoiceService.startListening('en-US', (text, isFinal) => {
 *     if (isFinal) {
 *       console.log('Final transcript:', text);
 *     }
 *   });
 *
 *   // Speak text
 *   browserVoiceService.speakText('Hello world', 'en-US', () => {
 *     console.log('Speech finished');
 *   });
 * }
 * ```
 */
declare global {
    interface Window {
        SpeechRecognition: {
            new (): SpeechRecognition;
        };
        webkitSpeechRecognition: {
            new (): SpeechRecognition;
        };
    }
}
type SpeechResultCallback = (text: string, isFinal: boolean) => void;
type SpeechEndCallback = () => void;
type ErrorCallback = (error: string) => void;
/**
 * Browser Voice Service class
 * Wraps Web Speech API with a clean interface
 */
declare class BrowserVoiceService {
    private recognition;
    private isListening;
    private currentLang;
    private onResultCallback;
    private onErrorCallback;
    private restartOnEnd;
    private conversationMode;
    private isSpeaking;
    private audioContext;
    private audioUnlockRequired;
    /**
     * Check if browser supports Web Speech API
     */
    isSupported(): boolean;
    /**
     * Get detailed support information
     */
    getSupportDetails(): {
        recognition: boolean;
        synthesis: boolean;
        prefixed: boolean;
        secureContext: boolean;
    };
    /**
     * Set conversation mode (continuous back-and-forth)
     * @param enabled - Whether to enable continuous conversation mode
     *
     * Note: This only sets the flag - it does NOT auto-start listening.
     * The user must explicitly start voice mode first. Conversation mode
     * only affects whether listening auto-resumes after AI finishes speaking.
     */
    setConversationMode(enabled: boolean): void;
    /**
     * Check if conversation mode is active
     */
    isConversationMode(): boolean;
    /**
     * Pause listening temporarily (e.g., while AI is speaking)
     */
    pauseListening(): void;
    /**
     * Resume listening after being paused
     */
    resumeListening(): void;
    /**
     * Check if microphone permission is already granted
     * @returns Promise<boolean> - true if permission granted
     */
    checkMicrophonePermission(): Promise<boolean>;
    /**
     * Prepare listening by requesting microphone permission
     * This should be called BEFORE user gesture on mobile to pre-request permission
     * @returns Promise<boolean> - true if permission granted
     */
    prepareListening(): Promise<boolean>;
    /**
     * Start speech recognition SYNCHRONOUSLY
     * Must be called within a user gesture handler on mobile (iOS Safari)
     * @param lang - BCP 47 language tag (e.g., 'en-US', 'es-ES')
     * @param onResult - Callback for speech results
     * @param onError - Optional callback for errors
     */
    startListeningSync(lang: string, onResult: SpeechResultCallback, onError?: ErrorCallback): void;
    /**
     * Start speech recognition (async version for desktop/backward compatibility)
     * @param lang - BCP 47 language tag (e.g., 'en-US', 'es-ES')
     * @param onResult - Callback for speech results
     * @param onError - Optional callback for errors
     * @returns Promise that resolves when recognition starts
     */
    startListening(lang: string, onResult: SpeechResultCallback, onError?: ErrorCallback): Promise<void>;
    /**
     * Stop speech recognition
     */
    stopListening(): void;
    /**
     * Check if currently listening
     */
    getIsListening(): boolean;
    /**
     * Get current language
     */
    getCurrentLang(): string;
    /**
     * Resume audio context to unlock audio for playback
     * Must be called within a user gesture handler
     */
    resumeAudioContext(): Promise<void>;
    /**
     * Check if audio unlock is required (autoplay policy blocked audio)
     */
    isAudioUnlockRequired(): boolean;
    /**
     * Manually unlock audio by playing a silent sound
     * Call this from a button click handler for stubborn browsers
     */
    unlockAudio(): Promise<boolean>;
    /**
     * Speak text using speech synthesis
     * @param text - Text to speak
     * @param lang - BCP 47 language tag for voice selection
     * @param onEnd - Optional callback when speech ends
     * @param options - Optional TTS configuration (rate, pitch, volume, voiceName)
     * @returns Promise that resolves when speech starts
     */
    speakText(text: string, lang: string, onEnd?: SpeechEndCallback, options?: {
        rate?: number;
        pitch?: number;
        volume?: number;
        voiceName?: string;
    }): Promise<void>;
    /**
     * Cancel ongoing speech
     */
    cancelSpeech(): void;
    /**
     * Get available voices
     */
    getVoices(): SpeechSynthesisVoice[];
    /**
     * Wait for voices to load (needed for Chrome)
     */
    waitForVoices(): Promise<SpeechSynthesisVoice[]>;
    /**
     * Find the best voice for a given language
     */
    private findBestVoice;
    /**
     * Check if running on mobile device
     */
    private isMobileDevice;
    /**
     * Check if running on iOS Safari
     */
    private isIOSSafari;
    /**
     * Get human-readable error message
     * @param error - Error code from SpeechRecognition
     */
    private getErrorMessage;
}
export declare const browserVoiceService: BrowserVoiceService;
export {};
