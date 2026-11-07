import React from 'react';
type Props = {
    sessionId: string | null;
    directory: string | null;
};
/**
 * MCP servers with their connection switches, reusing the dropdown's own
 * connect/disconnect actions.
 */
export declare const WorkStatusMcpSection: React.FC<Props>;
export {};
