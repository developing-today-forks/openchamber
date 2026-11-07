/**
 * Small, non-React state machine for dictation streaming.
 *
 * Responsibilities:
 * - Maintain an ordered buffer of base64 PCM segments
 * - Start/restart a dictation stream (dictationId)
 * - Send missing segments (seq) when connected
 * - Finish/cancel the stream
 *
 * Segments are retained until the dictation completes, which enables replay
 * after a connection drop (`resetStreamForReplay()` + `finish()`).
 */
import type { DictationClient, DictationStartOptions } from './dictation-client';
export interface DictationFinishResult {
    dictationId: string;
    text: string;
}
export declare class DictationStreamSender {
    private readonly client;
    private readonly format;
    private readonly createDictationId;
    private getStartOptions;
    private dictationId;
    private sendSeq;
    private segments;
    private streamReady;
    private flushTimer;
    private drainWaiters;
    private startGeneration;
    private startPromise;
    constructor(params: {
        client: DictationClient;
        getStartOptions: () => DictationStartOptions;
        format?: string;
        createDictationId?: () => string;
    });
    getDictationId(): string | null;
    getFinalSeq(): number;
    hasSegments(): boolean;
    clearAll(): void;
    resetStreamForReplay(): void;
    enqueueSegment(base64Pcm: string): void;
    flush(): number;
    restartStream(): Promise<void>;
    finish(finalSeq: number): Promise<DictationFinishResult>;
    cancel(): void;
    private hasPendingSegments;
    private scheduleFlush;
    private clearScheduledFlush;
    private waitForFlushDrain;
    private resolveDrainWaiters;
}
