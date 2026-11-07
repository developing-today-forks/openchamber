import type { Session } from '@/lib/opencode/model';
import { type SidebarLayout, type SidebarSectionKey } from '@/stores/sidebarLayout';
/** Options the phone sheet needs to decide which sections of the layout are drawn. */
type PhoneSectionsVisibility = {
    showChatsSection: boolean;
    showPinnedSection: boolean;
    /** Pinned to the feature flag: the In work zone only exists while it is on. */
    showWorkSection: boolean;
    /** The timeline's Chats join the projects instead of keeping their section. */
    chatsInListProjects: boolean;
};
/**
 * The layout's sections the phone sheet draws now, in the layout's order:
 * the attention zones the layout can fill, Pinned and In work while their
 * toggles show them, Chats while shown and not among the projects, and the
 * project list always. Mirrors the desktop sidebar's `sectionsInUse` filter.
 */
export declare const phoneSectionsInUse: (layout: SidebarLayout, visibility: PhoneSectionsVisibility) => SidebarSectionKey[];
/**
 * A zone's rows on the phone: the zone's top-level sessions with their whole
 * subtrees, so a collapsed tree row still stands for the requests waiting
 * below it. `sessions` is the sheet's complete active list.
 */
export declare const expandZoneSessions: (sessions: readonly Session[], zoneRootIds: ReadonlySet<string>, childIdsOf: (sessionId: string) => readonly string[]) => Session[];
/** Top-level ids of `roots` that are not in `excludedIds`, keeping their order. */
export declare const excludeRoots: (roots: readonly Session[], excludedIds: ReadonlySet<string>) => Session[];
/**
 * The chats group among the timeline's project groups: the project ids with
 * the chats id at most `index` places in. Clamps to the end of the list.
 */
export declare const insertChatsGroupIndex: (projectIds: readonly string[], chatsId: string, index: number) => string[];
export {};
