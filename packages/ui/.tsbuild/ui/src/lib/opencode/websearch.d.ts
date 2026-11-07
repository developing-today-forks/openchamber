/**
 * OpenCode's web search, translated into the shapes chat and Settings read.
 *
 * Four OpenCode contracts meet here:
 * - `websearch.providers` (`GET /api/websearch/provider`): the providers the
 *   Location offers. Each one is also an integration of the same id that takes
 *   an optional API key (every built-in provider has a keyless tier). A
 *   plugin provider may join the list only once connected; its integration
 *   carries `metadata.websearch` so the page can offer it before that.
 * - The `websearch` config key: `false` turns search off, `{ provider }` names
 *   a provider or `"random"`. Unset means OpenCode falls back to the answer
 *   the user gave its chat consent form (kept in its own store as
 *   `websearch:provider`, which no route reads or clears), and asks only when
 *   there is no answer yet.
 * - The `websearch` tool's text result: one `## [title](url)` block per hit,
 *   an optional `Published: <ISO>` line, then the snippet
 *   (`packages/core/src/tool/plugin/websearch.ts`).
 * - The consent form the tool raises on first use, tagged
 *   `metadata.kind === "websearch.provider"`.
 *
 * Every read throws on failure; a failed read is never an empty list.
 */
import type { IntegrationInfo } from "@opencode/client";
import type { Config, FormRequest, Metadata } from "./model";
export interface WebSearchProvider {
    id: string;
    name: string;
}
/** What the `websearch` config key says, as the user picks it in Settings. */
export type WebSearchSelection = 
/**
 * No config entry: OpenCode uses the answer given in chat, or asks on the
 * first search when there is none. Not "will ask": the stored answer wins.
 */
{
    kind: "default";
} | {
    kind: "off";
}
/** Any available provider, moving on when one is rate limited. */
 | {
    kind: "random";
} | {
    kind: "provider";
    id: string;
};
/** How a provider's optional API key is supplied. */
export type WebSearchKeyStatus = 
/** The integration takes no key (a provider signed in elsewhere). */
{
    kind: "unsupported";
} | {
    kind: "none";
}
/** A stored credential; `ids` are what removal needs. */
 | {
    kind: "stored";
    ids: string[];
}
/** An environment variable the server can see. */
 | {
    kind: "env";
    name: string;
};
/** One text field a provider asks for when it connects, such as a server URL. */
export interface WebSearchConnectField {
    key: string;
    /** The provider's own label; plugins write it in English. */
    label: string;
    /** The provider's own explanation of the field, in its language. */
    description: string | null;
    /** An example value. */
    placeholder: string | null;
    required: boolean;
    url: boolean;
}
/** How the page connects a provider. */
export type WebSearchConnectMethod = 
/** An API key, plus any fields the key method's form asks for. */
{
    kind: "key";
    fields: WebSearchConnectField[];
}
/** Only form fields, saved as a reference (a server the user runs). */
 | {
    kind: "form";
    methodID: string;
    fields: WebSearchConnectField[];
};
export interface WebSearchProviderAccess {
    key: WebSearchKeyStatus;
    /** Environment variables OpenCode reads a key from, for the hint. */
    envNames: string[];
    /** `null` exactly when `key` is `unsupported`. */
    connect: WebSearchConnectMethod | null;
}
/** The values a connect method's form fields were given, by field key. */
export type WebSearchConnectAnswer = Record<string, string>;
/** Providers OpenCode offers for the directory's Location, sorted by name. */
export declare function listWebSearchProviders(directory: string | null): Promise<WebSearchProvider[]>;
export declare function readWebSearchSelection(config: Config): WebSearchSelection;
/** The body `PUT /api/config/websearch` takes; `null` removes the entry. */
export declare function webSearchSelectionToConfig(selection: WebSearchSelection): false | string | null;
/**
 * A plugin marks an integration that is the account of a web search provider
 * with `metadata.websearch === true`. Such a provider joins OpenCode's
 * `websearch` list only once it is connected, so the marker is how the page
 * offers it before that, and how model provider lists leave it out.
 */
export declare function isWebSearchIntegration(integration: IntegrationInfo): boolean;
export interface WebSearchAccounts {
    /** How each provider's key is supplied, keyed by provider id. */
    access: Record<string, WebSearchProviderAccess>;
    /**
     * Marked providers OpenCode does not list for search yet, because they are
     * not connected. Sorted by name; `access` covers them too.
     */
    connectable: WebSearchProvider[];
}
/** The accounts behind the listed providers, and the marked providers not listed yet. */
export declare function projectWebSearchAccounts(integrations: readonly IntegrationInfo[], providerIds: readonly string[]): WebSearchAccounts;
export declare function readWebSearchAccounts(directory: string | null, providerIds: readonly string[]): Promise<WebSearchAccounts>;
/**
 * Connects a provider. Scoped to the current directory like the reads: a
 * plugin's provider exists in the locations that loaded the plugin, which the
 * home location may not have done yet.
 */
export declare function saveWebSearchCredential(directory: string | null, providerId: string, connect: WebSearchConnectMethod, input: {
    key: string;
    answer: WebSearchConnectAnswer;
}): Promise<void>;
export declare function removeWebSearchKey(credentialIds: readonly string[]): Promise<void>;
export interface WebSearchResult {
    url: string;
    host: string;
    /** `null` when OpenCode had no title and repeated the URL instead. */
    title: string | null;
    /** ISO timestamp. */
    published: string | null;
    snippet: string | null;
}
export type WebSearchOutput = {
    kind: "results";
    results: WebSearchResult[];
} | {
    kind: "empty";
};
/**
 * Reads the tool's text result. Returns `null` for anything that does not
 * follow OpenCode's format, so the caller can show the raw text instead.
 */
export declare function parseWebSearchOutput(content: string): WebSearchOutput | null;
export declare function webSearchProviderOf(metadata: Metadata | undefined): string | null;
export interface WebSearchConsentOption {
    value: string;
    /** OpenCode's English label; the card localizes the values it knows. */
    label: string;
}
/**
 * The first-use consent form. `choice` answers allow / choose / disable;
 * `provider` is the follow-up list when the user picked "choose".
 */
export type WebSearchConsent = {
    step: "choice";
    fieldKey: string;
    options: WebSearchConsentOption[];
} | {
    step: "provider";
    fieldKey: string;
    options: WebSearchConsentOption[];
};
/** `null` for any other form, or one whose shape this card does not know. */
export declare function readWebSearchConsent(form: FormRequest): WebSearchConsent | null;
