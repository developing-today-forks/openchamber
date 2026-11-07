import React from 'react';
import type { IntegrationInfo } from '@opencode/client';
import type { Model, Provider } from '@/lib/opencode/model';
type GridProvider = Provider & {
    models: Model[];
};
interface ProviderGridProps {
    providers: readonly GridProvider[];
    /** Null while the integration list is loading; cards then show no status. */
    integrations: readonly IntegrationInfo[] | null;
    directory: string | null;
    onSelect: (providerId: string) => void;
    onConnect: () => void;
    onOpenClassification: () => void;
    /** Providers turned off in the user's config; null where the runtime cannot tell. */
    disabledProviders?: readonly string[] | null;
    onEnableProvider?: (providerId: string) => void;
}
/** Browse view of the Providers page: one card per provider OpenCode reports. */
export declare const ProviderGrid: React.FC<ProviderGridProps>;
export {};
