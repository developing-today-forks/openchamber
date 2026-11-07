/**
 * The curated external-services catalog: one bundled, typed list of services
 * worth connecting to OpenChamber. Adding or removing entries and changing
 * their URLs is a reviewed change; a URL change reaches users with the next
 * release. What belongs here and how to vet a candidate before adding it:
 * DOCUMENTATION.md next to this file.
 *
 * An entry is one integration and may bundle several components: an MCP
 * server, an OpenCode plugin, and skills can arrive together the way vendors
 * ship them. Field names follow the official MCP Registry `server.json`
 * where they overlap, so importing from it stays possible.
 *
 * Vendor URLs were checked against vendor docs on 2026-10-01 (OPE-282 launch
 * list); the entries added on 2026-10-15 come from integrations.sh and passed
 * the probe with --register. Recheck one when you touch it.
 */
import type { IconName } from '@/components/icon/icons';
import type { I18nKey } from '@/lib/i18n';
/** Card groups behind the category filter chips. */
export type CatalogCategory = 'product' | 'openchamber' | 'code' | 'design' | 'cloud' | 'data' | 'quality' | 'ai' | 'other';
export type CatalogEntryStatus = 'stable' | 'beta';
/** How a service authenticates. `none` covers no-auth remotes and local servers. */
export type CatalogAuthKind = 'oauth' | 'token' | 'none';
/** A region/site/org picker that feeds `{id}` tokens inside a URL or command. */
export type CatalogInput = {
    /** Token name the entry interpolates: `{region}` inside `url` or `command`. */
    id: string;
    /** Label key, translated with t() in the component. */
    labelKey: I18nKey;
    placeholder: string;
    defaultValue?: string;
    /** Blocks install while empty; without it a default value satisfies the input. */
    required?: boolean;
};
/**
 * One installable part of an integration. At most one MCP component per
 * entry: the entry id doubles as the MCP server name.
 */
export type CatalogMcpComponent = {
    kind: 'mcp';
    auth: CatalogAuthKind;
    /**
     * Carries `{inputId}` tokens for entries with `inputs`.
     */
    remote?: {
        url: string;
        /** For `auth: 'token'`: the header that carries the token, e.g. Bearer. */
        tokenHeader?: {
            name: string;
            valuePrefix?: string;
        };
        /** True when the token is optional and install works without it. */
        tokenOptional?: boolean;
    };
    /** Local servers run on the machine OpenCode runs on. */
    local?: {
        /** May carry `{inputId}` tokens for entries with `inputs`. */
        command: string[];
        /** First run downloads a package; OpenCode's default timeout is too tight. */
        timeoutMs?: number;
        /** Prerequisites shown as a note on the card. */
        requires?: Array<'node' | 'python' | 'docker'>;
    };
    /** Where the user creates a token, for `auth: 'token'`. */
    tokenHelpUrl?: string;
};
export type CatalogPluginComponent = {
    kind: 'plugin';
    /** npm spec with a pinned major, installed through the plugins routes. */
    spec: string;
    license?: string;
};
export type CatalogSkillComponent = {
    kind: 'skill';
    /** Git source the Skills catalog page accepts, e.g. `openai/skills`. */
    source: string;
    /** Path inside the repository that holds the skill directory. */
    subpath: string;
    /** The skill's directory name, used for the installed check. */
    skillDir: string;
    /**
     * The name OpenCode reports for the skill (its SKILL.md frontmatter name),
     * when it differs from the folder basename. Drives the installed check and
     * the uninstall lookup.
     */
    skillName?: string;
    /**
     * Vendor terms that govern the skill instead of an open-source license;
     * installing it accepts them, so the detail page links them.
     */
    termsUrl?: string;
};
/** An OpenChamber extension installed from its Git repository. */
type CatalogExtensionComponent = {
    kind: 'extension';
    /** The extension's `panel.id`, which is its id once installed. */
    guestId: string;
    /** The Git URL the one-click install accepts. */
    gitUrl: string;
};
export type CatalogComponent = CatalogMcpComponent | CatalogPluginComponent | CatalogSkillComponent | CatalogExtensionComponent;
export type CatalogEntry = {
    /** Stable identifier, and the MCP server name when the entry ships an MCP component. */
    id: string;
    name: string;
    publisher: string;
    /** True when the endpoint is run by the vendor itself. */
    verified: boolean;
    /** Full i18n key under `integrationsCatalog.entry.<id>.description`, typed against the english dictionary. */
    descriptionKey: I18nKey;
    /** Longer detail-page description under `integrationsCatalog.entry.<id>.details`, typed against the english dictionary. */
    detailsKey: I18nKey;
    categories: CatalogCategory[];
    /** Fallback mark for entries whose brand has no glyph in brand-icons.ts. */
    icon: IconName;
    homepage: string;
    status: CatalogEntryStatus;
    /** The installable parts, at least one. */
    components: [CatalogComponent, ...CatalogComponent[]];
    /** Pickers that feed `{id}` tokens in this entry's component urls or commands. */
    inputs?: CatalogInput[];
};
export declare const CATALOG_ENTRIES: readonly CatalogEntry[];
/** The opening section of the catalog: widely used services that show what an integration does. */
export declare const CATALOG_FEATURED_IDS: readonly string[];
export declare const CATALOG_CATEGORY_ORDER: readonly CatalogCategory[];
export declare const getCatalogEntry: (id: string) => CatalogEntry | undefined;
/** The entry's MCP component, when it ships one. */
export declare const catalogMcpComponent: (entry: CatalogEntry) => CatalogMcpComponent | undefined;
/**
 * Fills a remote URL or local command with the card's picker values. A token
 * without a value leaves the field empty, so a partially filled entry can be
 * rejected at validation rather than installed with a broken URL.
 */
export declare const interpolateCatalogTokens: (template: string, values: Record<string, string>) => string;
export declare const catalogEntryHasAllInputs: (entry: CatalogEntry, values: Record<string, string>) => boolean;
/** The npm package name of a spec like `@scope/pkg@^1` or `pkg@^1`. */
export declare const catalogPluginPackageName: (spec: string) => string;
/** The display name of one component in the Includes list. */
export declare const catalogComponentName: (entry: CatalogEntry, component: CatalogComponent) => string;
export {};
