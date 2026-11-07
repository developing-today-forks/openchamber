import React from 'react';
interface McpOAuthSignInProps {
    serverName: string;
    /** The Location whose config declares the server; its integration lives there. */
    directory: string | null;
    /** Runs after OpenCode has stored the credential, so the caller can reconnect. */
    onConnected: () => void | Promise<void>;
    /** Start the sign-in as soon as the integration shows up. */
    autoStart?: boolean;
}
/**
 * The OAuth sign-in for a remote MCP server. OpenCode registers such a server
 * as an integration with one `oauth` method, so the sign-in is the same
 * connect / status / complete flow the Providers page runs; only the lookup
 * (by server name, in the server's Location) is MCP-specific. Renders nothing
 * while the integration is unknown.
 */
export declare const McpOAuthSignIn: React.FC<McpOAuthSignInProps>;
export {};
