import { type SpaceMark } from '@/lib/spaces/spaces-store';
/** The spaces whose project is named now and was not, or was another, in the previous list. */
export declare const spacesWithNewProject: (next: ReadonlyMap<string, SpaceMark>, previous: ReadonlyMap<string, SpaceMark>) => Set<string>;
/** The loaded space folders that lie inside one of the given spaces. */
export declare const foldersOfSpaces: (spaceIds: ReadonlySet<string>, folders: readonly string[]) => string[];
/**
 * The loaded space folders whose space was made from `projectDirectory`. Their models are grouped
 * under that host project's providers, so a catalog event there concerns them too.
 */
export declare const spaceFoldersOfProject: (projectDirectory: string) => string[];
/**
 * The models of a folder inside an isolated space are grouped under the host's providers of the
 * project the space was made from, see `getProvidersForConfig`. A space made while the page is
 * open is chatted in before the list names its project, so its catalog was read without the
 * project's own providers. When a space's project becomes known, the catalogs this page already
 * loaded for that space's folders are read again; no other folder is read.
 */
export declare const subscribeSpaceCatalogs: (runtimeKey: string) => (() => void);
