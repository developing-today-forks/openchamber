/**
 * `items` in the order the sidebar shows the projects: its project sort
 * (Manual, A to Z, Z to A, Newest, Recent), or the manual order while the
 * sidebar is in the List view, which always keeps it. Entries that are not
 * registered projects, such as the composer's Chat target, stay ahead in their
 * incoming order.
 *
 * "Recent" ranks by the newest session in each project, resolved the way the
 * sidebar resolves ownership, so only that sort reads sessions. A surface that
 * stays mounted while its list is closed (the composer's project picker)
 * passes `enabled: false`: it then reads no projects, sessions or spaces, and
 * gets back the order it last showed, or the items unchanged.
 */
export declare const useProjectsInSidebarOrder: <T extends {
    id: string;
}>(items: readonly T[], enabled?: boolean) => readonly T[];
