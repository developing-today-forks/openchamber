import type { IntegrationInfo, IntegrationOAuthMethod } from '@opencode/client';
/**
 * The integration OpenCode registers for a remote MCP server's OAuth login.
 *
 * Every remote server with OAuth enabled becomes an integration whose id is
 * `mcp_` plus a hash of the server's name and URL, with `metadata.source`
 * set to `mcp` and the server's name as its own. The hash is upstream's to
 * compute, so the match goes by source and name.
 */
export declare const findMcpIntegration: (integrations: readonly IntegrationInfo[], serverName: string) => IntegrationInfo | undefined;
export declare const getMcpOAuthMethods: (integration: IntegrationInfo | undefined) => IntegrationOAuthMethod[];
