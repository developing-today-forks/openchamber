export declare const useIsReading: (key: string) => boolean;
export declare const isCurrentReading: (token: symbol) => boolean;
export declare const stopActiveReading: () => void;
export declare const stopReadingUnderKey: (key: string) => void;
/** Stops the reading in progress and records this one; the token identifies it. */
export declare const startReading: (key: string, stop: () => void) => symbol;
export declare const finishReading: (token: symbol) => void;
