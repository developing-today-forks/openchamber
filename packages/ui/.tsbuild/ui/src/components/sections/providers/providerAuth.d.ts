/**
 * Provider credential helpers.
 *
 * OpenCode v2 moved provider sign-in behind *integrations*: `GET /api/integration`
 * lists, per integration, the methods it accepts (`oauth`, `key`, `external`,
 * `command`, `env`) and the connections that are already live (a stored credential, or an
 * environment variable the server can see). There is no `auth.json` any more,
 * so "does this provider have credentials" is answered by its integration's
 * connections rather than by a local file.
 */
import type { ConnectionInfo, IntegrationExternalMethod, IntegrationInfo, IntegrationKeyMethod, IntegrationOAuthMethod } from '@opencode/client';
import type { Provider } from '@/lib/opencode/model';
export type CredentialConnection = Extract<ConnectionInfo, {
    type: 'credential';
}>;
export declare const readProviderApiKeySetting: (provider: Pick<Provider, 'settings'> | undefined) => string | null;
export declare const usesMachineCredentials: (provider: Pick<Provider, 'id' | 'package' | 'settings'> | undefined) => boolean;
/** Integrations are keyed by their own id; a provider matches on the same id. */
export declare const findIntegrationForProvider: (integrations: readonly IntegrationInfo[], providerId: string) => IntegrationInfo | undefined;
/**
 * OpenCode Go bills through the OpenCode Console, so it signs in through the
 * Console's `opencode` integration; its own integration only accepts a
 * service-account key. OpenCode's own connect dialog makes the same mapping.
 * Returns the integration whose OAuth methods sign a provider in.
 */
export declare const getSignInIntegrationId: (providerId: string) => string;
/**
 * Connections that give a provider credentials: its own, plus the sign-in
 * integration's when the provider signs in elsewhere.
 */
export declare const getProviderConnections: (integrations: readonly IntegrationInfo[], providerId: string) => ConnectionInfo[] | undefined;
/**
 * Methods that sign in with a button rather than a pasted key: OAuth, and
 * external credentials OpenCode references outside its store (2.0.25+: an
 * Azure CLI login, an AWS profile). Kept in the integration's declared order.
 */
export type SignInMethod = IntegrationOAuthMethod | IntegrationExternalMethod;
export declare const getSignInMethods: (integration: IntegrationInfo | undefined) => SignInMethod[];
export declare const getKeyMethod: (integration: IntegrationInfo | undefined) => IntegrationKeyMethod | undefined;
/**
 * Show the API key form when the integration accepts a key, or when the
 * integration is unknown — a provider OpenCode has no integration for (a custom
 * one from opencode.json) is still keyed by an API key. OAuth-only integrations
 * must not get an API key prompt.
 */
export declare const shouldShowApiKeyAuth: (integration: IntegrationInfo | undefined) => boolean;
/** Stored credentials, which are the only connections the user can remove. */
export declare const getCredentialConnections: (integration: IntegrationInfo | undefined) => CredentialConnection[];
interface ProviderCredentialInput {
    /**
     * Connections the provider's integration reports. A stored credential or a
     * resolved environment variable both count as a usable login.
     */
    connections?: readonly ConnectionInfo[];
    /**
     * Provider.options is shipped to the client for config-defined providers, so
     * a custom provider whose key is written straight into opencode.json has no
     * integration connection but is still logged in.
     */
    optionsApiKey?: string | null;
    /** Signs in through credentials on the server machine (`usesMachineCredentials`). */
    machineCredentials?: boolean;
}
/**
 * Prefer authoritative credential signals: the server either reports a
 * connection for the integration or it does not. An inline `options.apiKey` and
 * credentials on the server machine are the cases the server cannot see as a
 * connection.
 */
export declare const providerHasCredentials: (input: ProviderCredentialInput) => boolean;
/**
 * A problem OpenCode reported for a live connection (2.0.20+): `needs_auth`
 * asks the user to sign in again, at `url` when one is given, otherwise by
 * reconnecting the integration. Runtime-only on OpenCode's side; it clears
 * itself once the connection works again.
 */
export declare const connectionNeedsAuth: (connection: ConnectionInfo) => boolean;
export type ProviderCardStatus = {
    kind: 'reauthNeeded';
} | {
    kind: 'accounts';
    count: number;
} | {
    kind: 'connected';
} | {
    kind: 'environment';
} | {
    kind: 'signInNeeded';
};
/**
 * The one-glance status a provider card shows. A provider with no integration
 * (a custom one from opencode.json) has nothing OpenCode can sign in to, so it
 * gets no status rather than a false "not signed in".
 */
export declare const getProviderCardStatus: (input: {
    integrations: readonly IntegrationInfo[] | null;
    providerId: string;
    optionsApiKey?: string | null;
    machineCredentials?: boolean;
}) => ProviderCardStatus | null;
export declare const shouldShowModelsSection: (input: {
    modelCount: number;
    /** False while the integration list is still loading. */
    integrationsLoaded: boolean;
    hasCredentials: boolean;
    /**
     * Config-defined custom providers (providerSources.custom present and parsed
     * via `isConfigDefinedCustomProvider`) are user-editable in place, so a
     * stale `Credentials missing` signal must not hide their models section.
     */
    isEditableCustomProvider?: boolean;
}) => boolean;
export declare const shouldAutoOpenAuthPanel: (input: {
    integrationsLoaded: boolean;
    hasCredentials: boolean;
    userDismissed: boolean;
    /**
     * Config-defined custom providers do not auto-open the auth panel: the
     * provider is editable directly in the form, and a stale `Credentials
     * missing` summary would be misleading.
     */
    isEditableCustomProvider?: boolean;
}) => boolean;
export {};
