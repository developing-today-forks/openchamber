/**
 * Whether OpenCode's config blocks an MCP server (`mcp:<name>`) or a skill
 * (`skill:<id>`) in a directory through an `integration.use` policy. OpenCode
 * drops a blocked entry from its own lists, while these pages list what the
 * config files hold, so the row would otherwise sit there and never load.
 * Nothing reads as blocked until the config has been read; a failed read
 * leaves every row unmarked.
 */
export declare const useIntegrationPolicyBlock: (directory: string | null) => ((resource: string) => boolean);
