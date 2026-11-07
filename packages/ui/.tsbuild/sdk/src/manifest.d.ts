import type { OpenChamberManifestApiVersion } from './api-version.ts';
import type { FileEditorContribution } from './file-editor.ts';
export declare const PANEL_ID: RegExp;
/**
 * The extension's identity on the rail, the Extensions card, and the approval
 * dialog. `entry` is the optional visible panel page. Code can instead run
 * from `background.entry` without adding a rail icon.
 */
export type PanelContribution = {
    id: string;
    name: string;
    icon: string;
    entry?: string;
    /**
     * Beside a shared surface (`service.surface`), the panel page is docked to
     * one edge of the host-drawn picture: a toolbar above it, an inspector
     * below, a tool column beside it. `dock` is the edge (default
     * `GUEST_SURFACE_DOCK_DEFAULT`) and `size` the page's thickness in CSS
     * pixels across that edge (default `GUEST_SURFACE_DOCK_SIZE_DEFAULT`).
     * Both only make sense with `entry` and `service.surface` together.
     */
    dock?: GuestSurfaceDock;
    size?: number;
};
export declare const GUEST_SURFACE_DOCKS: readonly ['top', 'bottom', 'left', 'right'];
export type GuestSurfaceDock = (typeof GUEST_SURFACE_DOCKS)[number];
export declare const GUEST_SURFACE_DOCK_DEFAULT: GuestSurfaceDock;
/** Thickness in CSS px of a docked `panel.entry` when the manifest names none. */
export declare const GUEST_SURFACE_DOCK_SIZE_DEFAULT = 40;
export declare const GUEST_SURFACE_DOCK_SIZE_MIN = 24;
export declare const GUEST_SURFACE_DOCK_SIZE_MAX = 480;
/** Sandboxed HTML loaded on demand for background actions and slash commands. */
export type BackgroundContribution = {
    entry: string;
};
export type AttachMode = 'panel' | 'dialog';
/**
 * Object form of `contributes.attach`. `entry` is an HTML page inside the
 * package that the attach dialog loads instead of `panel.entry`; it is only
 * meaningful with `mode: "dialog"`.
 */
export type AttachContributionObject = {
    mode: AttachMode;
    entry?: string;
};
export type AttachContribution = boolean | AttachMode | AttachContributionObject;
/** A user-opened full-screen page, optionally with its own HTML and title. */
export type PageContribution = true | {
    entry: string;
    title?: string;
};
/**
 * A section inside the chat's Work Status panel. `true` reuses `panel.entry`;
 * the object form names its own package HTML, so an extension can ship only
 * this section and no rail panel. `title` replaces `panel.name` on the section
 * header; `height` is the starting frame height in CSS px before the guest
 * reports its own through `setHeight`.
 */
export type StatusSectionContribution = true | {
    entry: string;
    title?: string;
    height?: number;
    defaultExpanded?: boolean;
    requiresProject?: boolean;
};
/** Characters in a status section title. */
export declare const GUEST_STATUS_SECTION_TITLE_MAX = 60;
/** Smallest frame height the host gives a status section, in CSS px. */
export declare const GUEST_STATUS_SECTION_HEIGHT_MIN = 24;
/** Tallest frame height the host gives a status section; taller content scrolls inside the frame. */
export declare const GUEST_STATUS_SECTION_HEIGHT_MAX = 320;
/** Frame height before the manifest or the guest says otherwise. */
export declare const GUEST_STATUS_SECTION_HEIGHT_DEFAULT = 120;
export type GuestActionWhere = 'message' | 'session';
export type GuestActionRole = 'user' | 'assistant';
/** What a session action wants alongside the session id and title. */
export type GuestActionPayload = 'messages';
/** How many `contributes.actions` entries a package may declare. */
export declare const GUEST_ACTIONS_MAX = 8;
/** Characters in an action label. */
export declare const GUEST_ACTION_LABEL_MAX = 40;
/** How many `contributes.commands` entries a package may declare. */
export declare const GUEST_COMMANDS_MAX = 8;
/** Characters in a command description. */
export declare const GUEST_COMMAND_DESCRIPTION_MAX = 80;
/** A slash command name: lower-case, digits and dashes, up to 24 characters. */
export declare const GUEST_COMMAND_NAME: RegExp;
/**
 * A menu entry on a message or a session. By default it opens the guest with
 * the message or session as `ready.item`. `roles` narrows a message action
 * to user or assistant messages (default both); `payload: ["messages"]` on
 * a session action asks for the conversation and needs the `conversation`
 * capability.
 */
export type GuestActionContribution = {
    id: string;
    label: string;
    /** Remixicon name or package `.svg` path, same as `panel.icon`. Falls back to the panel icon. */
    icon?: string;
    where: GuestActionWhere;
    /** `background` calls `host.onAction` in a temporary hidden frame. Default: `open`. */
    mode?: 'open' | 'background';
    roles?: GuestActionRole[];
    payload?: GuestActionPayload[];
};
/** A composer slash command the guest resolves into a chip through `host.onResolve`. */
export type GuestCommandContribution = {
    name: string;
    description?: string;
};
/** How many `contributes.tools` entries a package may declare. */
export declare const GUEST_TOOLS_MAX = 16;
/** Characters in a `contributes.tools` `match`. */
export declare const GUEST_TOOL_MATCH_MAX = 128;
/**
 * A tool name as OpenCode reports it (`mcp.jira.search`, `jira_search`),
 * with `*` allowed once, at the end, as a suffix wildcard (`mcp.jira.*`).
 */
export declare const GUEST_TOOL_MATCH: RegExp;
/** Characters in a tool `name`. */
export declare const GUEST_TOOL_NAME_MAX = 40;
/** Characters in a `title` or `subtitle` template. */
export declare const GUEST_TOOL_TEMPLATE_MAX = 200;
/** Characters a substituted `{input.path}` value may take in a rendered template. */
export declare const GUEST_TOOL_TEMPLATE_VALUE_MAX = 200;
/** Characters in a `code` language id. */
export declare const GUEST_TOOL_LANGUAGE_MAX = 32;
/** How many `columns` a `table` presentation may name. */
export declare const GUEST_TOOL_COLUMNS_MAX = 16;
/** Characters in one column path. */
export declare const GUEST_TOOL_COLUMN_MAX = 64;
export declare const GUEST_TOOL_OUTPUTS: readonly ['auto', 'text', 'json', 'markdown', 'code', 'table'];
/** How the expanded body of a matched tool call renders. `auto` keeps the host's own detection. */
export type GuestToolOutput = (typeof GUEST_TOOL_OUTPUTS)[number];
/**
 * How a tool call looks in the chat, declared without code. `match` is the
 * full tool name OpenCode reports, or a prefix ending in `*`. `title` and
 * `subtitle` are templates with `{input.path}`, `{output.path}`, and
 * `{metadata.path}` placeholders; a missing path renders as an empty string.
 * `language` only means something for `output: "code"` and `columns` only
 * for `output: "table"` (rows are the output array or `output.items`).
 */
export type GuestToolContribution = {
    match: string;
    /** Header title when `title` is absent or renders empty. */
    name?: string;
    /** Remixicon name or package `.svg` path, same rules as `panel.icon`. */
    icon?: string;
    title?: string;
    subtitle?: string;
    output?: GuestToolOutput;
    language?: string;
    columns?: string[];
};
export type IntegrationSettingField = {
    id: string;
    label: string;
};
export type IntegrationOAuthAccount = {
    path: string;
    name: string;
};
export type IntegrationOAuth = {
    authorizeUrl: string;
    tokenUrl: string;
    apiOrigin: string;
    scopes?: string[];
    account?: IntegrationOAuthAccount;
};
export type IntegrationTokenScheme = 'raw' | 'bearer' | 'basic';
export type IntegrationToken = {
    apiOrigin: string;
    account?: IntegrationOAuthAccount;
    /**
     * How the pasted token travels: `raw` puts it in `Authorization` as is (default),
     * `bearer` prefixes `Bearer `, `basic` asks for a username too and sends
     * `Basic base64(username:token)` (Jira Cloud, Bitbucket, most Atlassian APIs).
     */
    scheme?: IntegrationTokenScheme;
    /** Label of the username field on the Integrations card for `basic`. Defaults to "Username". */
    usernameLabel?: string;
};
export type IntegrationHostProvider = 'linear';
export type IntegrationHost = {
    provider: IntegrationHostProvider;
};
export type IntegrationAuth = 'oauth' | 'token' | 'host';
export type GuestAuthorization = 'bearer' | 'basic' | 'header';
export type ResolvedGuestApi = {
    apiOrigin: string;
    account?: IntegrationOAuthAccount;
    authorization: GuestAuthorization;
};
export declare const HOST_LINEAR_API_ORIGIN = "https://api.linear.app";
export type IntegrationContribution = {
    name: string;
    description: string;
    oauth?: IntegrationOAuth;
    token?: IntegrationToken;
    host?: IntegrationHost;
    settings?: IntegrationSettingField[];
};
/** Catalog card. Drops oauth URLs and token apiOrigin. */
export type PublicIntegrationToken = {
    scheme: IntegrationTokenScheme;
    usernameLabel?: string;
};
export type PublicIntegration = {
    name: string;
    description: string;
    auth: IntegrationAuth;
    /** Present for `auth: 'token'`. Tells the Integrations card which fields to draw. */
    token?: PublicIntegrationToken;
    /** The one origin `request` may call. Shown in the approval dialog; not a secret. */
    apiOrigin?: string;
    settings?: IntegrationSettingField[];
};
export declare const resolveIntegrationAuth: (integration: Pick<IntegrationContribution, 'oauth' | 'token' | 'host'>) => IntegrationAuth | null;
export declare const resolveIntegrationApi: (integration: IntegrationContribution) => ResolvedGuestApi | null;
export type SocketPlatform = 'linux' | 'darwin' | 'win32';
/** Declared socket the service may dial. Candidates are per host platform. */
export type SocketBinding = {
    id: string;
    candidatesByPlatform: Partial<Record<SocketPlatform, string[]>>;
};
export type ServicePermissions = {
    sockets?: SocketBinding[];
    exec?: string[];
};
/** Catalog grant chip: ids only. Paths live on `socketBindings`. */
export type PublicServicePermissions = {
    sockets?: string[];
    exec?: string[];
};
/** Resolved socket for this host after override + candidate scan. */
export type PublicSocketBinding = {
    id: string;
    candidates: string[];
    resolved: string | null;
    override: string | null;
};
/**
 * Host roles a service can stand in for. `browser` answers the agent's
 * `browser.*` actions in place of the in-app browser view; the contract is in
 * `service-providers.ts`. A service that provides a role needs no panel or
 * background entry: the host starts it on the first action.
 */
export declare const GUEST_SERVICE_PROVIDES: readonly ['browser'];
export type GuestServiceProvides = (typeof GUEST_SERVICE_PROVIDES)[number];
export type ServiceContribution = {
    entry: string;
    runtime: 'host';
    permissions?: ServicePermissions;
    provides?: GuestServiceProvides[];
    /**
     * The service shows a live surface (frames out, input in) that the host
     * draws in this extension's rail panel; see `service-surface.ts`. With
     * `panel.entry` too, that page is docked to one edge of the picture (see
     * `PanelContribution.dock`); without it, the panel is the surface alone.
     */
    surface?: true;
};
/** Catalog card for a local service. Drops nothing secret; grant is host state. */
export type PublicService = {
    runtime: 'host';
    permissions?: PublicServicePermissions;
    socketBindings?: PublicSocketBinding[];
    provides?: GuestServiceProvides[];
    surface?: true;
    granted: boolean;
};
export declare const serviceProvides: (service: Pick<ServiceContribution, 'provides'> | undefined, role: GuestServiceProvides) => boolean;
/**
 * What a guest may do beyond drawing its own panel. The user approves the
 * full list once, when the package is installed; a later package that asks
 * for more is re-approved. `prompt`, `sessions`, `files`, `model`, and
 * `shells` are declared under `contributes.capabilities`; `service`, `network`,
 * `filesystem` and `origins` follow from `contributes.service`,
 * `contributes.integration`, `contributes.filesystem` and `contributes.origins`. `model` is one-off text generation with the
 * user's Small Model (`host.generate`), outside any session.
 */
export declare const GUEST_CAPABILITIES: readonly ['prompt', 'sessions', 'files', 'model', 'shells', 'conversation', 'service', 'network', 'filesystem', 'origins'];
export type GuestCapability = (typeof GUEST_CAPABILITIES)[number];
export declare const DECLARED_GUEST_CAPABILITIES: readonly ['prompt', 'sessions', 'files', 'model', 'shells'];
/** The capabilities a manifest may ask for directly. */
export type DeclaredGuestCapability = (typeof DECLARED_GUEST_CAPABILITIES)[number];
/** How many `contributes.origins` a package may declare. */
export declare const GUEST_ORIGINS_MAX = 8;
/** How many `contributes.filesystem` patterns a package may declare. */
export declare const GUEST_FILESYSTEM_PATTERNS_MAX = 16;
/** Characters in one `contributes.filesystem` pattern. */
export declare const GUEST_FILESYSTEM_PATTERN_MAX = 256;
/**
 * A `contributes.filesystem` entry: an absolute glob (`/…`) or one under the
 * user's home (`~/…`). `**` spans directories, `*` and `?` stay inside one
 * segment. No `..`, no empty segment, no NUL, no backslash.
 */
export declare const isGuestFilesystemPattern: (value: string) => boolean;
export type OpenChamberContributes = {
    panel: PanelContribution;
    background?: BackgroundContribution;
    attach?: AttachContribution;
    page?: PageContribution;
    /** A section in the chat's Work Status panel. */
    statusSection?: StatusSectionContribution;
    capabilities?: DeclaredGuestCapability[];
    integration?: IntegrationContribution;
    service?: ServiceContribution;
    /** Paths outside the project the panel may read and write. Grants `filesystem`. */
    filesystem?: string[];
    /**
     * https origins the frame may exchange data with directly: fetch, images,
     * fonts, styles and media, never scripts. Grants `origins`, approved per list.
     */
    origins?: string[];
    /** Menu entries on messages and sessions. */
    actions?: GuestActionContribution[];
    /** Composer slash commands that attach a chip. */
    commands?: GuestCommandContribution[];
    /** How the extension's tool calls look in the chat. */
    tools?: GuestToolContribution[];
    /** Editors the Files view opens matching files in. */
    fileEditors?: FileEditorContribution[];
};
/** Whether any declared action asks for a session's messages, which needs `conversation`. */
export declare const guestActionsNeedConversation: (actions: readonly GuestActionContribution[] | undefined) => boolean;
/** Catalog view of the approval: what the package asks for and what the user allowed. */
export type PublicGuestCapabilities = {
    requested: GuestCapability[];
    granted: GuestCapability[];
};
export declare const requestedGuestCapabilities: (contributes: Pick<OpenChamberContributes, 'capabilities' | 'integration' | 'service' | 'filesystem' | 'actions' | 'origins'>) => GuestCapability[];
/**
 * Whether the package ships a visible panel. Background-only extensions can
 * execute code but have no rail surface, attach picker, or full-screen page.
 */
export declare const hasGuestPage: (contributes: Pick<OpenChamberContributes, 'panel'>) => boolean;
export declare const isGuestApproved: (capabilities: PublicGuestCapabilities) => boolean;
export declare const hasGuestCapability: (capabilities: PublicGuestCapabilities, capability: GuestCapability) => boolean;
export declare const resolveAttachMode: (attach: AttachContribution | undefined) => AttachMode | null;
/**
 * The page the attach dialog loads, or `null` when the dialog reuses
 * `panel.entry`. Only the object form with `mode: "dialog"` can name one.
 */
export declare const resolveAttachEntry: (contributes: Pick<OpenChamberContributes, 'attach'>) => string | null;
export declare const resolvePageEntry: (contributes: Pick<OpenChamberContributes, 'panel' | 'page'>) => string | null;
/**
 * The HTML the Work Status section loads: `panel.entry` for `true`, the
 * object's own `entry` otherwise, `null` when nothing is declared or `true`
 * has no panel page to reuse.
 */
export declare const resolveStatusSectionEntry: (contributes: Pick<OpenChamberContributes, 'panel' | 'statusSection'>) => string | null;
/** Clamp a requested status section height to what the host allows. */
export declare const clampStatusSectionHeight: (height: number) => number;
export type OpenChamberEngines = {
    openchamber: string;
};
export type OpenChamberManifest = {
    apiVersion: OpenChamberManifestApiVersion;
    engines?: OpenChamberEngines;
    contributes: OpenChamberContributes;
};
export type ParseManifestErrorCode = 'not-object' | 'missing-openchamber' | 'unsupported-api-version' | 'invalid-engines' | 'invalid-version' | 'missing-panel' | 'invalid-panel' | 'invalid-panel-id' | 'invalid-panel-name' | 'invalid-panel-icon' | 'invalid-panel-entry' | 'invalid-background' | 'invalid-attach' | 'invalid-page' | 'invalid-status-section' | 'invalid-capabilities' | 'invalid-integration' | 'invalid-service' | 'invalid-filesystem' | 'invalid-origins' | 'invalid-actions' | 'invalid-commands' | 'invalid-tools' | 'invalid-file-editors';
export type ParseManifestFailure = {
    ok: false;
    code: ParseManifestErrorCode;
    message: string;
};
export type ParseManifestSuccess = {
    ok: true;
    manifest: OpenChamberManifest;
    /** npm `package.json` version when parsing a package envelope. */
    version?: string;
};
export type ParseManifestResult = ParseManifestSuccess | ParseManifestFailure;
export declare const isSafeAssetPath: (value: string) => boolean;
/** Package SVG path for the rail, e.g. `icon.svg`. Remixicon names use `PANEL_ID`. */
export declare const isGuestPackageSvgIcon: (value: string) => boolean;
export declare const toPublicIntegration: (integration: IntegrationContribution) => PublicIntegration;
export declare const toPublicService: (service: ServiceContribution | undefined, granted: boolean, socketBindings?: PublicSocketBinding[]) => PublicService | undefined;
/** Guest package version: `1.2.3`, optional prerelease / build. */
