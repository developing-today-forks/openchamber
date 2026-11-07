import type { McpDraft, McpOAuthConfig } from '@/stores/useMcpConfigStore';
/**
 * Server names are lowercase letters, digits, `-` and `_`; the config routes
 * reject anything else. Typing keeps a trailing separator so the next
 * character can follow it.
 */
export declare const normalizeMcpServerName: (value: string) => string;
/** A name taken from elsewhere, such as an imported snippet, must also start and end with a letter or digit. */
export declare const normalizeImportedMcpServerName: (value: string) => string;
/**
 * The OAuth credential fields the page has no editor for. A save rebuilds the
 * whole `oauth` object, so whatever the entry already holds is carried in this
 * shape and written back untouched.
 */
export declare const MCP_DRAFT_OAUTH_UNSET: {
    readonly oauthEnabled: true;
    readonly oauthClientId: '';
    readonly oauthClientSecret: '';
    readonly oauthScope: '';
    readonly oauthRedirectUri: '';
    readonly oauthCallbackPort: '';
};
export type McpOAuthCarried = Pick<McpDraft, 'oauthEnabled' | 'oauthClientId' | 'oauthClientSecret' | 'oauthScope' | 'oauthRedirectUri' | 'oauthCallbackPort'>;
/** The stored OAuth block as the form carries it, so a save cannot lose it. */
export declare const readCarriedOAuth: (oauth: McpOAuthConfig | false | undefined) => McpOAuthCarried;
