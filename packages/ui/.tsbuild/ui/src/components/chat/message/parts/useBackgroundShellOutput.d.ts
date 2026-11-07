/**
 * The output of a running background command, read while `enabled`.
 *
 * OpenCode streams the output to a file and serves it by byte cursor; there is
 * no output event, so the view reads on from its cursor once a second. Each
 * read that brings nothing doubles the wait, up to 4 s, and new output brings
 * it back to 1 s, so a command that has gone quiet is not read every second
 * for hours. It starts from the tail of a long output and drops the first,
 * partial line. A failed read keeps what was shown and tries again on the
 * next tick.
 */
export declare const useBackgroundShellOutput: (shellID: string, directory: string | undefined, enabled: boolean) => string;
