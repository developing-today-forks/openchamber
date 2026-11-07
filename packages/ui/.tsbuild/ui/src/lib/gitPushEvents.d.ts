type GitPushListener = (scope: string) => void;
export declare const gitPushScopeKey: (directory: string, runtimeKey: string) => string;
export declare function subscribeGitPush(listener: GitPushListener): () => void;
/** Announce only a confirmed push, against the runtime captured before it started. */
export declare function notifyGitPush(directory: string, runtimeKey: string): void;
export {};
