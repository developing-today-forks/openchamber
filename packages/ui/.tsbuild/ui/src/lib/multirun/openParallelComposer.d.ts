/**
 * Opens a new-session draft for the active project with the composer in "Run
 * in parallel" mode, optionally prefilled. Every launcher entry point (command
 * palette, "start a run from this answer") goes through here.
 * A run needs a project, so the draft never targets managed Chats.
 */
export declare function openParallelComposer(prompt?: string): void;
