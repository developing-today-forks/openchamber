export declare function useOpenCodeReadiness(resource?: 'models' | 'agents', directory?: string): {
    isReady: boolean;
    isLoading: boolean;
    isUnavailable: boolean;
    connectionPhase: "connected" | "connecting" | "reconnecting";
};
