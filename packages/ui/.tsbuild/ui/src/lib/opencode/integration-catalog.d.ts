/**
 * OpenCode's integration list (`GET /api/integration`), kept for the app
 * session so Settings → Providers opens on it instead of waiting for the read.
 *
 * The list is what a user can connect and how each provider is connected
 * right now. The cached snapshot is a starting point only: Settings reads the
 * list again every time it opens and after every credential write, and each
 * read replaces the snapshot. Nothing refreshes it in the background.
 *
 * The snapshot belongs to the runtime it was read from; after a runtime
 * switch it is ignored until a read from the new runtime lands.
 */
import type { IntegrationInfo } from "@opencode/client";
export interface IntegrationCatalog {
    integrations: IntegrationInfo[];
    /**
     * Web search providers are integrations too, but their keys live in
     * Settings → Web search. `null` when that list could not be read, so the
     * caller keeps them rather than hiding real providers.
     */
    webSearchIds: ReadonlySet<string> | null;
}
/** The last list read from the current runtime, or `null` when there is none. */
export declare function peekIntegrationCatalog(): IntegrationCatalog | null;
export declare function loadIntegrationCatalog(): Promise<IntegrationCatalog>;
/**
 * Reads the list once when the current runtime has none yet. A failure is
 * left for Settings to report when it opens and reads the list itself.
 */
export declare function prefetchIntegrationCatalog(): void;
