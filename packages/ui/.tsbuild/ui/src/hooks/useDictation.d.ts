/**
 * Streaming dictation state machine.
 *
 * Status flow: idle -> recording -> uploading -> idle | failed.
 * While recording, mic PCM chunks stream to the server, which transcribes them
 * segment by segment; confirm finalizes and resolves the full text. Nothing is
 * shown while recording — `partialTranscript` holds whatever the server has
 * transcribed so far and exists only so a failed dictation can be salvaged
 * instead of losing minutes of speech. Failed dictations also retain their
 * audio segments so retry can replay them.
 */
import { type DictationLevelListener } from '@/lib/dictation/use-dictation-audio-source';
export type DictationStatus = 'idle' | 'recording' | 'uploading' | 'failed';
export interface UseDictationOptions {
    onTranscript?: (text: string) => void;
    onError?: (error: Error) => void;
    canStart?: () => boolean;
}
export interface UseDictationResult {
    status: DictationStatus;
    isRecording: boolean;
    isProcessing: boolean;
    /** Server-side transcript so far; recovery only, never shown while recording. */
    partialTranscript: string;
    /** Subscribe to the normalized (0..1) mic level for the waveform. */
    subscribeLevel: (listener: DictationLevelListener) => () => void;
    duration: number;
    error: string | null;
    errorReason: string | null;
    startDictation: () => Promise<void>;
    confirmDictation: () => Promise<string | null>;
    cancelDictation: () => Promise<void>;
    retryFailedDictation: () => Promise<string | null>;
    acceptPartialTranscript: () => string | null;
    discardFailedDictation: () => void;
}
export declare function useDictation(options?: UseDictationOptions): UseDictationResult;
