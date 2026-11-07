/**
 * Mounted with the visible sidebar, independently of row count and grouping.
 *
 * The listing loop runs only while a project action is known to be running,
 * because that is the only time the indicator can change on its own. With
 * nothing running the sidebar lists once on mount, to pick up runs another
 * client started, and then stays quiet; the terminal panel and the project
 * action views keep their own loops while open.
 */
export declare const SidebarTerminalActivity: () => null;
