import type { I18nKey } from '@/lib/i18n';
import type { IntegrationCatalog } from '@/lib/opencode/integration-catalog';
export interface ConnectableProvider {
    id: string;
    name: string;
}
interface PopularProvider {
    id: string;
    /** One line saying what the provider gives you. */
    noteKey: I18nKey;
    recommended: boolean;
}
/**
 * Leads the connect page, in this order. Recommended providers come first; a
 * provider that is already listed (connected, or found in the environment)
 * drops out, because it connects from its own page.
 */
export declare const POPULAR_PROVIDERS: readonly PopularProvider[];
/**
 * What can still be connected. v2's provider list holds only what is
 * configured or connected right now, so the candidates are the integrations,
 * minus those with any connection, MCP OAuth registrations (`mcp_*`), web
 * search providers (their keys live in Settings → Web search; a plugin's are
 * marked on the integration, since OpenCode lists them for search only once
 * connected) and providers OpenCode already lists. Sorted by name.
 */
export declare const listConnectableProviders: (catalog: IntegrationCatalog, listedProviderIds: ReadonlySet<string>) => ConnectableProvider[];
interface ConnectableProviderGroups {
    /** Popular providers that can still be connected, in `POPULAR_PROVIDERS` order. */
    popular: Array<ConnectableProvider & PopularProvider>;
    others: ConnectableProvider[];
}
export declare const splitConnectableProviders: (providers: readonly ConnectableProvider[]) => ConnectableProviderGroups;
export {};
