import { type McpCodemodeChoice, type McpDraft, type McpProtocol } from '@/stores/useMcpConfigStore';
export interface ImportedMcpResult {
    readonly ok: true;
    readonly name?: string;
    readonly type: 'local' | 'remote';
    readonly command: string[];
    readonly url: string;
    readonly environment: Array<{
        key: string;
        value: string;
    }>;
    readonly headers: Array<{
        key: string;
        value: string;
    }>;
    readonly oauthEnabled: boolean;
    readonly oauthClientId: string;
    readonly oauthClientSecret: string;
    readonly oauthScope: string;
    readonly oauthRedirectUri: string;
    readonly oauthCallbackPort: string;
    readonly oauthAuthServerMetadataUrl: string;
    readonly timeoutStartup: string;
    readonly timeoutCatalog: string;
    readonly timeoutExecution: string;
    readonly codemode: McpCodemodeChoice;
    readonly disabled: boolean;
    /** Absent in the paste means legacy, as OpenCode reads it. */
    readonly protocol: McpProtocol;
}
type ImportedMcpError = {
    readonly ok: false;
    readonly error: string;
} | {
    readonly ok: false;
    readonly error: string;
    readonly parsed: unknown;
};
export type ImportedMcpOutcome = ImportedMcpResult | ImportedMcpError;
/**
 * Parse a raw JSON string as an MCP server snippet and return a normalized
 * result or a structured error. Does not mutate the current draft — the caller
 * applies the result to form state. Both OpenCode versions are accepted; the
 * result is always in the v2 vocabulary.
 *
 * Supported shapes:
 *   { "mcpServers": { "name": { ... } } }   (Claude Desktop / generic)
 *   { "mcp": { "servers": { "name": { ... } } } }   (OpenCode 2)
 *   { "mcp": { "name": { ... } } }          (OpenCode 1)
 *   { "name": { ... } }
 *   { ...serverConfig }
 */
export declare function parseImportedMcpSnippet(raw: string, options?: {
    fallbackName?: string;
}): ImportedMcpOutcome;
/**
 * Apply an imported result to a new or existing McpDraft.
 * All fields from the result override the draft, but fields only
 * relevant to the opposite transport type are cleared.
 */
export declare function applyImportedMcpToDraft(result: ImportedMcpResult, currentDraft: Partial<McpDraft> & {
    name?: string;
}, options?: {
    isNewServer?: boolean;
}): Partial<McpDraft> & {
    name: string;
};
export {};
