export type InputHistoryScope = 'global' | 'session';
export declare const DEFAULT_INPUT_HISTORY_SCOPE: InputHistoryScope;
export declare const DEFAULT_INPUT_HISTORY_LIMIT = 40;
export declare const MIN_INPUT_HISTORY_LIMIT = 1;
export declare const MAX_INPUT_HISTORY_LIMIT = 100;
export declare const isInputHistoryScope: (value: string | null | undefined) => value is InputHistoryScope;
export declare const isInputHistoryLimit: (value: number | null | undefined) => value is number;
