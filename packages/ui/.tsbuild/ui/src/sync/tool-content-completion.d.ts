type CompletionTarget = {
    directory: string;
    sessionID: string;
};
/**
 * Replaces a message whose finished tool results arrived as shells
 * (`lib/opencode/toolContentShells.ts`) with the whole message, read by id.
 * Rows of one message share the request. It rejects when the message could
 * not be read, so a row can offer a retry instead of presenting a missing
 * result as an empty one. A message the store no longer holds (revert, cache
 * eviction) is not brought back, and a runtime switch discards the answer.
 */
export declare function completeToolContent(target: CompletionTarget, messageID: string): Promise<void>;
export {};
