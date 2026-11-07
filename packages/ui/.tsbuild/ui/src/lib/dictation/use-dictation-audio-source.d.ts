/**
 * Microphone capture for dictation.
 *
 * Captures mono audio via getUserMedia, taps it with a ScriptProcessorNode
 * (universally supported, including iOS WKWebView), resamples Float32 to
 * 16 kHz PCM16LE, and emits ~1-second base64 chunks plus a normalized RMS
 * level for the waveform.
 *
 * The level is delivered by subscription rather than React state: it updates
 * on every audio callback (~12 Hz), and routing that through state re-rendered
 * the whole dictation overlay at the same rate.
 */
export interface DictationAudioSourceConfig {
    onPcmSegment: (base64Pcm: string) => void;
    onError?: (error: Error) => void;
}
export type DictationLevelListener = (level: number) => void;
export interface DictationAudioSource {
    start: () => Promise<void>;
    stop: () => Promise<void>;
    /** Subscribe to the normalized (0..1) mic level. Returns an unsubscribe. */
    subscribeLevel: (listener: DictationLevelListener) => () => void;
}
export declare const isDictationCaptureSupported: () => boolean;
export declare function useDictationAudioSource(config: DictationAudioSourceConfig): DictationAudioSource;
