import React from 'react';
import type { FormValue, IntegrationKeyMethod } from '@opencode/client';
export interface IntegrationKeyRequest {
    integrationID: string;
    key: string;
    answer?: Record<string, FormValue>;
}
interface ProviderApiKeyFormProps {
    integrationId: string;
    /**
     * The integration's key method. Its `form` (an Azure resource name, a
     * Cloudflare account id) is answered alongside the key. Undefined for a
     * provider OpenCode has no integration for, which takes a bare key.
     */
    keyMethod: IntegrationKeyMethod | undefined;
    /** Stores the credential; injected so the form does not own the SDK call. */
    connectKey: (request: IntegrationKeyRequest) => Promise<void>;
    onSaved: () => void;
}
/**
 * The API key form for one integration. Mount with `key={integrationId}` so a
 * different provider starts from an empty form.
 */
export declare const ProviderApiKeyForm: React.FC<ProviderApiKeyFormProps>;
export {};
