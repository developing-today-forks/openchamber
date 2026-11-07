export declare const fileReferenceExists: (resolvedPath: string, effectiveDirectory: string) => Promise<boolean>;
/**
 * The one workspace file called `name`, for a reference an agent wrote
 * without its folder (`Renderer.tsx:42`). Answered from git's index in one
 * call per name; null when no file or several files carry the name, so an
 * ambiguous reference stays plain text instead of opening a guess.
 */
export declare const findUniqueFileByName: (name: string, effectiveDirectory: string) => Promise<string | null>;
