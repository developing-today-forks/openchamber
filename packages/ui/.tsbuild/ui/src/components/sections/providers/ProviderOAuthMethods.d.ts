import React from 'react';
import type { SignInMethod } from './providerAuth';
interface ProviderOAuthMethodsProps {
    /** The integration that owns these methods; it shares the provider's id. */
    integrationId: string;
    methods: SignInMethod[];
    /** Called once a credential has been stored, so the caller can reload providers. */
    onConnected: () => void | Promise<void>;
    /**
     * Location the integration belongs to. Provider integrations are global;
     * an MCP server's OAuth integration exists only in the Location whose config
     * declares the server, so its requests must resolve that directory.
     */
    directory?: string | null;
    /** Layout only — the caller owns separation from whatever sits above. */
    className?: string;
    /** Start the only sign-in method on mount, for a sign-in the user just asked for elsewhere. */
    autoStart?: boolean;
}
/**
 * Sign-in for a provider's OAuth and external-credential methods.
 *
 * For OAuth, the mode reported by `integration.oauth.connect` drives
 * everything: `auto` polls `integration.oauth.status` until the attempt
 * completes, `code` collects a pasted code and calls
 * `integration.oauth.complete`. See `provider-oauth.ts`. An external method
 * (an Azure CLI login, an AWS profile) only needs its form answered:
 * `integration.connect.external` stores a reference to credentials managed
 * outside OpenCode, so there is no attempt to follow.
 *
 * Only one method can run at a time, and an abandoned attempt is cancelled
 * upstream on unmount so it cannot linger until it expires. Mount this with
 * `key={integrationId}` so switching providers starts from a clean flow.
 */
export declare const ProviderOAuthMethods: React.FC<ProviderOAuthMethodsProps>;
export {};
