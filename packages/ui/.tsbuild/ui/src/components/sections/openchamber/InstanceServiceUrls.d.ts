import React from 'react';
/**
 * Shows the active instance's service URLs (local server port + tunnel URL,
 * when a tunnel is active) as labeled buttons that open the URL in the
 * browser. The data comes from `/api/system/info`, which the server derives
 * from its own runtime state — this is what makes each Git-worktree instance
 * distinguishable in the UI without reading terminal output.
 *
 * The section stays hidden when the endpoint is unavailable or reports no
 * port/tunnel (e.g. VS Code runtime), so a failed fetch never renders stale
 * or wrong URLs.
 */
export declare const InstanceServiceUrls: React.FC;
