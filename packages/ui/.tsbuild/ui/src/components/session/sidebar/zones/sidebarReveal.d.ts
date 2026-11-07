/**
 * A request to scroll the sidebar to a session's row: after Done with "move
 * and show where it went", the row has left its zone for its project.
 */
type SidebarRevealRequest = {
    sessionId: string;
    projectId: string | null;
    nonce: number;
};
export declare const requestSidebarReveal: (sessionId: string, projectId: string | null) => void;
export declare const useSidebarRevealRequest: () => SidebarRevealRequest | null;
/** Drops the request once it was served, unless a newer one replaced it. */
export declare const settleSidebarReveal: (request: SidebarRevealRequest) => void;
export {};
