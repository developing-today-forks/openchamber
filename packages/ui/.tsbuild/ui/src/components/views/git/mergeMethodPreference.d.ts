export type MergeMethod = 'merge' | 'squash' | 'rebase';
export declare const readMergeMethod: () => MergeMethod;
export declare const rememberMergeMethod: (method: MergeMethod) => void;
