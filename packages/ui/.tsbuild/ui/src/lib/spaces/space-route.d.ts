/** The space that owns a directory, or null for a host directory. */
export declare const spaceIdOfDirectory: (directory: string | null | undefined) => string | null;
/** Whether a directory lies inside an isolated space. */
export declare const isSpaceDirectory: (directory: string | null | undefined) => boolean;
/**
 * The headers that send a request to the space owning `directory`: its directory header,
 * URI-encoded and marked so, which every reader on the server decodes the same way. Null for a
 * host directory, and in VS Code.
 */
export declare const spaceDirectoryHeaders: (directory: string | null | undefined) => Record<string, string> | null;
/** The root of a space, `/spaces/<id>`: the directory a socket of that space names. */
export declare const spaceRootDirectory: (spaceId: string) => string;
