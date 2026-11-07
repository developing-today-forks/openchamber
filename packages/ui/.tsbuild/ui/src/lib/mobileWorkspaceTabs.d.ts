/**
 * The tabs of the phone's workspace drawer (and the tablet's workspace panel),
 * in their default order. The user's order and hidden set are stored per
 * device in `useUIStore`; both hold plain ids so a tab added in a later
 * release shows up for everyone, at the end of a saved order.
 */
declare const MOBILE_WORKSPACE_TABS: readonly ['changes', 'files', 'terminal', 'notes', 'messages', 'mcp'];
export type MobileWorkspaceTab = (typeof MOBILE_WORKSPACE_TABS)[number];
/** Every tab in the user's order; tabs the saved order does not name follow in default order. */
export declare const orderMobileWorkspaceTabs: (order: readonly string[]) => MobileWorkspaceTab[];
/**
 * The tabs the user keeps, in order. Never empty: a saved set that hides every
 * tab (written by hand or by an older build) shows them all.
 */
export declare const shownMobileWorkspaceTabs: (order: readonly string[], hidden: readonly string[]) => MobileWorkspaceTab[];
/**
 * The tabs the strip offers right now: the ones the user keeps, plus the open
 * tab while something opened it although it is hidden (a changed file tapped
 * in the chat opens Changes either way). It leaves the strip once the user
 * switches away.
 */
export declare const stripMobileWorkspaceTabs: (order: readonly string[], hidden: readonly string[], active: MobileWorkspaceTab) => MobileWorkspaceTab[];
export {};
