/**
 * WebSocket client for the OpenChamber dictation endpoint (/api/dictation/ws).
 *
 * One shared client per app. The socket is opened lazily when a dictation
 * starts and closed after an idle delay. URLs are resolved at connect time via
 * the runtime URL resolver so runtime switches never leak a stale endpoint.
 */
export interface DictationStartOptions {
    provider?: 'local' | 'openai-compatible';
    language?: string;
    localModel?: string;
    openaiCompatible?: {
        baseUrl?: string;
        model?: string;
        apiKey?: string;
    };
}
type ConnectionStatusListener = (connected: boolean) => void;
type PartialListener = (dictationId: string, text: string) => void;
export declare class DictationClient {
    private socket;
    private connectPromise;
    private idleCloseTimer;
    private readonly pendingStarts;
    private readonly pendingFinishes;
    private readonly connectionListeners;
    private readonly partialListeners;
    private activeDictations;
    get isConnected(): boolean;
    subscribeConnectionStatus(listener: ConnectionStatusListener): () => void;
    onPartial(listener: PartialListener): () => void;
    ensureConnected(): Promise<void>;
    /**
     * Start a dictation stream. Resolves once the server acks the stream.
     */
    startDictationStream(dictationId: string, format: string, options: DictationStartOptions): Promise<void>;
    sendDictationStreamChunk(dictationId: string, seq: number, audioBase64: string): boolean;
    /**
     * Finish a dictation stream. Resolves with the final transcript.
     */
    finishDictationStream(dictationId: string, finalSeq: number): Promise<{
        text: string;
    }>;
    cancelDictationStream(dictationId: string): void;
    private handleMessage;
    private send;
    private notifyConnection;
    private rejectAllPending;
    private releaseDictation;
    private scheduleIdleCloseIfReady;
    /**
     * Runtime switch: close the socket and fail all in-flight dictations so
     * nothing keeps streaming to the previous runtime.
     */
    cancelAllForRuntimeSwitch(): void;
    private clearIdleCloseTimer;
}
export declare const dictationClient: DictationClient;
export {};
