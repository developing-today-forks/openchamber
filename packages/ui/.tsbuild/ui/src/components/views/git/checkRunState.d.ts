export declare const formatElapsedDuration: (startISO?: string, endISO?: string, now?: number) => string | null;
export declare const isFailedConclusion: (conclusion?: string | null) => boolean;
/** Which runs and failed steps are open; kept by whoever shows the list, so it outlives the list itself. */
export declare const useCheckRunExpansion: () => {
    runs: Set<string>;
    steps: Set<string>;
    toggleRun: (key: string) => void;
    toggleStep: (key: string) => void;
};
export type CheckRunExpansion = ReturnType<typeof useCheckRunExpansion>;
