export type WorkerHighlightedLinesResult = {
    status: 'loading';
    lines: null;
    carriedLines: readonly (string | undefined)[];
} | {
    status: 'ready';
    lines: string[];
} | {
    status: 'failed';
    lines: null;
};
export declare const useWorkerHighlightedLines: (code: string, language: string) => WorkerHighlightedLinesResult;
