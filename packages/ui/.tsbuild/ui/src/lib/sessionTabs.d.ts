/**
 * Close one header session tab. Closing the active tab activates its right
 * neighbour (falling back left), or opens a new-session draft when it was the
 * last tab. Only tabs whose session is present in the loaded session list
 * count as neighbours — the same rule the strip uses for rendering. The
 * session itself is never touched.
 */
/**
 * Activate the nth (0-based) header session tab, counting only tabs whose
 * session is present in the loaded session list — the same rule the strip
 * uses for rendering, so the digit matches what the user sees.
 */
export declare const activateSessionTabByIndex: (index: number) => boolean;
/**
 * Activate the tab one step right (+1) or left (-1) of the current session
 * in the rendered strip order, wrapping around the ends. Returns false when
 * the current session has no tab or there is nothing to move to.
 */
export declare const activateAdjacentSessionTab: (delta: -1 | 1) => boolean;
export declare const closeSessionTabAndActivateNeighbour: (sessionId: string) => void;
