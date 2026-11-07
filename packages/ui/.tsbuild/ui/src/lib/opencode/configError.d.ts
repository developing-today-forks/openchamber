/**
 * A project's OpenCode config that OpenCode refused to load. OpenCode answers
 * every directory-scoped request for that project with the same error until
 * the file is fixed, so retrying cannot help; the user has to edit the file.
 */
export type ProjectConfigError = {
    /** OpenCode's error name, e.g. `ConfigInvalidError` or `ConfigJsonError`. */
    name: string;
    /** The config file OpenCode rejected, when it named one. */
    path: string | undefined;
    /** What OpenCode said is wrong, with schema issues joined one per line. */
    message: string;
};
/**
 * Finds OpenCode's named config error anywhere in a thrown error's cause
 * chain. The generated client throws the 400 body merged into an `Error`
 * (`name` + `data`), and `OpencodeApiError` keeps that as its `cause`.
 */
export declare function readProjectConfigError(cause: unknown): ProjectConfigError | null;
export declare const isSameProjectConfigError: (a: ProjectConfigError | undefined, b: ProjectConfigError | undefined) => boolean;
