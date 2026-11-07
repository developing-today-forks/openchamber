/**
 * OpenCode client wrapper.
 *
 * Every official OpenCode call the shared UI makes goes through here, on top
 * of `@opencode/client`. The wrapper owns three things the generated client
 * does not: runtime-aware transport (`runtimeFetch`, read timeouts, directory
 * scoping through `x-opencode-directory`), error normalisation (v2 throws
 * tagged error bodies without an HTTP status), and projection of wire shapes
 * into the OpenChamber domain model (`./model`, `./projection`).
 * Routing-response validation shared with SDK-gap adapters lives in `./runtime-response`.
 *
 * OpenChamber-owned server routes (`/api/fs/*`, `/api/opencode/*`) also live
 * here when they are part of the same directory/session workflows.
 */
import { type OpenCodeClient, type PersistentPtyInfo, type PersistentPtySnapshot } from "@opencode/client";
import type { FileDiffInfo, FormAnswer, FormInfo, LocationGetOutput, SessionInboxDelivery, SessionRevert } from "@opencode/client";
import { z } from "zod";
import type { ContextPartMetadata } from "@/lib/messages/contextParts";
import { type SpaceMark } from "@/lib/spaces/spaces-store";
import { type HostSessionStatusSnapshot, type SessionActivityV1Entry } from "./session-status";
import { type Agent, type Command, type Config, type McpServerStatus, type Message, type Metadata, type Model, type ModelRef, type ModelSelection, type Part, type PermissionReply, type PermissionRequest, type Project, type Provider, type Session, type SessionStatus, type Skill, type SubagentPolicy, type SyntheticMessage, type UserMessage, type Vcs } from "./model";
import { type RunningShell, type ShellToStop } from "./background-shell";
import { type IntegrationPolicy } from "./projection";
export type { OpenCodeClient };
export type OpencodeHealthProbe = "healthy" | "unhealthy" | "unreachable";
export declare class OpencodeApiError extends Error {
    readonly operation: string;
    readonly status: number | undefined;
    /** The error class OpenCode named in a tagged body (`SessionNotFoundError`, `UnknownError`, ...). */
    readonly tag: string | undefined;
    /** What the body said, without the operation prefix `message` carries. */
    readonly detail: string;
    /** The id OpenCode prints next to the stack in its own log for a 500, so a
        surface can quote something that can be searched for. */
    readonly ref: string | undefined;
    constructor(operation: string, message: string, options: {
        status?: number;
        tag?: string;
        ref?: string;
        cause?: unknown;
    });
}
/**
 * Turns whatever the generated client threw into an `OpencodeApiError` with a
 * status the rest of the app can branch on. A transport failure is marked
 * "outcome unknown" so a lost response is not mistaken for a request that never
 * left; a routing failure proves the opposite and stays definite.
 */
export declare function normalizeOpencodeError(operation: string, error: unknown): OpencodeApiError;
/**
 * Skills the user named with `$name`, in order of appearance. They are
 * attached to the prompt by id so OpenCode loads each one with the message,
 * whatever the session is doing; a name that cannot be attached falls back to
 * the instruction the caller builds for it.
 */
export type SkillMentions = {
    names: readonly string[];
    instructionFor: (names: readonly string[]) => string | null;
};
export declare const isOpencodeNotFound: (error: unknown) => boolean;
type RuntimeOpencodeClientConfig = {
    baseUrl: string;
    directory?: string;
    /** Read-request timeout in ms. Overridable so tests can use short value. */
    requestTimeoutMs?: number;
};
export declare const createRuntimeOpencodeClient: (config: RuntimeOpencodeClientConfig) => OpenCodeClient;
type FilesystemEntry = {
    name: string;
    path: string;
    isDirectory: boolean;
    isFile: boolean;
    isSymbolicLink?: boolean;
};
export type ProjectFileSearchHit = {
    name: string;
    path: string;
    relativePath: string;
    extension?: string;
};
type FileInputLite = {
    id?: string;
    type: "file";
    mime: string;
    filename?: string;
    url: string;
};
type DirectorySwitchResult = {
    success: boolean;
    restarted: boolean;
    path: string;
};
export type MessagePage = {
    items: Array<{
        info: Message;
        parts: Part[];
    }>;
    cursor: {
        previous?: string;
        next?: string;
    };
};
/**
 * A message a session's pending OpenCode inbox item stands for, projected the
 * way `session.inbox.enqueued` paints it live. Control items (compaction,
 * move) paint nothing and are left out.
 */
export type PendingInboxMessage = {
    info: UserMessage | SyntheticMessage;
    parts: Part[] | null;
};
export type SessionPage = {
    sessions: Session[];
    cursor: {
        previous?: string;
        next?: string;
    };
    /**
     * The isolated spaces the host merged into a global page, one mark per space, when the
     * feature is on. Absent on a per-directory page and while the feature is off.
     */
    spaces?: SpaceMark[];
};
export type SessionListOptions = {
    directory?: string | null;
    /** No directory filter at all: every session the server knows. */
    global?: boolean;
    limit?: number;
    order?: "asc" | "desc";
    search?: string;
    cursor?: string;
    parentID?: string | null;
};
export type ProviderCatalog = {
    providers: Provider[];
    models: Model[];
    default?: ModelRef;
};
/**
 * Tagged result of `OpencodeService.fetchPermission()`. The caller can
 * distinguish a server-confirmed "no longer pending" permission (HTTP
 * 404) from a fetch failure (network error, malformed response).
 */
type FetchPermissionResult = {
    state: "ok";
    permission: PermissionRequest;
} | {
    state: "resolved";
} | {
    state: "unknown";
};
type DirectoryAvailability = "available" | "missing" | "unknown";
/**
 * Pending requests live in the location that raised them, so a list is asked
 * per directory. There is no global list on v2: a request without a directory
 * answers for OpenCode's own working directory and makes OpenCode start it,
 * MCP servers included.
 */
type PendingRequestListOptions = {
    directories?: Array<string | null | undefined>;
};
declare const fsHomeResponseSchema: z.ZodObject<{
    home: z.ZodString;
    chatsRoot: z.ZodOptional<z.ZodString>;
    canonicalChatsRoot: z.ZodOptional<z.ZodString>;
    canonicalLegacyChatsRoot: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** One context item admitted as a synthetic message; `id` is client-minted when given. */
export type SyntheticContextInput = {
    id?: string;
    text: string;
    metadata?: ContextPartMetadata;
    description?: string;
};
declare class OpencodeService {
    private client;
    private baseUrl;
    private scopedClients;
    /** Whether each runtime's server shells message pages; absent until known. */
    private partShellsSupport;
    private partShellsChecks;
    private currentDirectory;
    private directoryContextQueue;
    private listDirectoryInFlight;
    private providerCatalogInFlight;
    private listAgentsInFlight;
    private configInFlight;
    private configCache;
    private configCacheGeneration;
    private listDirectoryCache;
    constructor(baseUrl?: string);
    /**
     * A send is several awaited mutations (model switch, agent switch, context,
     * prompt). A runtime switch between any two of them would route the rest to
     * the other server, so the caller's captured runtime key is re-checked
     * before every mutation, not only at entry.
     */
    private assertRuntimeUnchanged;
    getBaseUrl(): string;
    reconnectToRuntimeBaseUrl(): void;
    /** Raw client without a directory scope (global routes, event stream). */
    getSdkClient(): OpenCodeClient;
    /** Raw client whose every request resolves the given directory's Location. */
    getScopedSdkClient(directory: string): OpenCodeClient;
    /** The host's client in the project a space was made from, unscoped while that is unknown. */
    private hostClientOfSpace;
    /** Client for an explicit directory, else the current one, else unscoped. */
    private clientFor;
    /**
     * One raw session request carrying a `subagentPolicy`. The generated
     * client builds the create and update bodies field by field from the
     * fields it knows, so a policy handed to it never reaches the wire; until
     * the regenerated client ships the field, a create or update that carries
     * one goes through `runtimeFetch` like the other SDK gaps (see
     * `./messaging`), with the same directory scoping the generated client
     * gets from its client-level header.
     */
    private sessionPolicyRequest;
    private resolveDirectory;
    private normalizeCandidatePath;
    private deriveHomeDirectory;
    setDirectory(directory: string | undefined): void;
    getDirectory(): string | undefined;
    withDirectory<T>(directory: string | undefined | null, fn: () => Promise<T>): Promise<T>;
    /** The Location OpenCode resolves for a directory: canonical project root and id. */
    getLocation(directory?: string | null): Promise<LocationGetOutput>;
    /**
     * Drops the location OpenCode keeps for a directory, which stops that
     * directory's MCP servers; the next read of it starts them again. OpenCode
     * serves this among its debug routes. Asked without a directory it would
     * drop its own working directory, so one is required.
     */
    releaseLocation(directory: string): Promise<void>;
    /**
     * The list is global, but v2 serves it through a location: asked without a
     * directory, OpenCode starts its own working directory (MCP servers
     * included) to answer. The current directory is already running.
     */
    listProjects(): Promise<Project[]>;
    /**
     * Identity of the project a directory belongs to. OpenCode 2.0.8 removed
     * `project.current`; the Location a directory resolves to carries the same
     * project record.
     */
    getCurrentProject(directory?: string | null): Promise<LocationGetOutput["project"]>;
    getVcs(directory?: string | null): Promise<Vcs>;
    /**
     * Runs `git init` in a directory that has no repository yet (OpenCode
     * 2.0.23). OpenCode refreshes its own view of the directory; the caller
     * refreshes the app's Git state.
     */
    initializeGit(directory: string): Promise<void>;
    getSystemInfo(): Promise<{
        homeDirectory: string;
        username?: string;
    }>;
    /**
     * Best-effort probe whether a directory is accessible to OpenCode.
     * This is intentionally NOT the same as local filesystem access in the UI runtime.
     */
    probeDirectory(directory: string): Promise<boolean>;
    /**
     * Distinguishes a confirmed-missing directory from an unavailable probe.
     * Offline, permission, and other transport failures stay `unknown` so callers
     * do not treat a temporary outage as proof the path was deleted.
     *
     * The probe is OpenChamber's own `/api/fs/directory-stats`, which asks the
     * server to stat the paths without listing their contents; probes admitted in
     * the same short window share one request. A runtime without that route
     * (VS Code) answers `unknown`.
     */
    getDirectoryAvailability(directory: string): Promise<DirectoryAvailability>;
    /** One page of sessions. Without `global`, scoped to the given or current directory. */
    listSessionsPage(options?: SessionListOptions): Promise<SessionPage>;
    /** First page of sessions for the current directory. */
    listSessions(directory?: string | null): Promise<Session[]>;
    createSession(params?: {
        id?: string;
        title?: string;
        agent?: string;
        model?: ModelSelection;
        metadata?: Metadata;
        subagentPolicy?: SubagentPolicy;
    }, directory?: string | null): Promise<Session>;
    getSession(id: string, directory?: string | null): Promise<Session>;
    deleteSession(id: string, directory?: string | null): Promise<boolean>;
    /**
     * Renames the session. OpenCode 2.0.8 folded `session.rename` into
     * `session.update`, where an empty title asks the server to regenerate one.
     */
    renameSession(id: string, title: string, directory?: string | null): Promise<void>;
    /**
     * Replaces the session's subsession model policy. The whole policy is
     * sent, and the change applies to subsessions started after it. The
     * generated client's update body holds only the fields it knows (title,
     * metadata, permissions) and would drop `subagentPolicy`, so the update
     * takes the raw path, like a create that carries a policy.
     */
    updateSessionSubagentPolicy(id: string, subagentPolicy: SubagentPolicy, directory?: string | null): Promise<void>;
    moveSession(id: string, toDirectory: string, options?: {
        delivery?: SessionInboxDelivery;
    }): Promise<void>;
    switchSessionModel(id: string, model: ModelSelection, directory?: string | null): Promise<void>;
    switchSessionAgent(id: string, agent: string, directory?: string | null): Promise<void>;
    /**
     * One page of a session's messages, newest first by default. `cursor` comes
     * from a previous page; the server rejects combining it with `order`.
     *
     * The server attaches `next` to every non-empty page, including the oldest
     * one, so a caller walking history would always need one more empty request
     * to learn it is done. A page shorter than the requested limit is the last
     * page, and its `next` is dropped here so `next` means "more" to callers.
     *
     * `partShells` asks the server for finished tool results left out of the
     * page (`toolContentShells.ts`).
     */
    getSessionMessages(id: string, options?: {
        limit?: number;
        cursor?: string;
        order?: "asc" | "desc";
        partShells?: boolean;
    }, directory?: string | null): Promise<MessagePage>;
    /**
     * Pending items of one session's OpenCode inbox.
     *
     * A prompt steered into a running turn is not part of the message history
     * until OpenCode admits it, so a client that starts (or restarts) while the
     * session is busy has to read the inbox to paint those messages again.
     */
    getSessionInbox(id: string, directory?: string | null): Promise<readonly PendingInboxMessage[]>;
    /**
     * Whether the connected server honours `PART_SHELLS_HEADER`. An older server
     * on another origin would refuse the unknown header at CORS preflight and
     * fail the whole page, so the header is sent only to a server that lists the
     * capability. The answer is learned once per runtime, off the page's path:
     * pages fetched before it arrives are whole.
     */
    /** Starts learning whether this runtime's server shells message pages, so the first session opened can use it. */
    learnMessagePageShellsSupport(): void;
    private serverShellsMessagePages;
    getSessionMessage(id: string, messageID: string, directory?: string | null): Promise<{
        info: Message;
        parts: Part[];
    }>;
    /**
     * Check if MIME type needs normalization to text/plain.
     * Some text MIME types (like text/markdown) aren't supported by AI providers.
     */
    private shouldNormalizeToTextPlain;
    /**
     * Check if MIME type is HEIC/HEIF (iPhone photo format).
     */
    private isHeicMime;
    /**
     * Convert HEIC image to JPEG.
     * Returns the original file if conversion fails.
     */
    private convertHeicToJpeg;
    /**
     * Normalize file part for sending to AI providers.
     * - Converts unsupported text MIME types to text/plain
     * - Converts HEIC/HEIF images to JPEG
     */
    private normalizeFilePart;
    private toPromptFile;
    /**
     * Puts a session on the requested model/agent before a prompt. v2 selects
     * both per session, not per prompt; the choice persists until switched.
     */
    private applySendSelection;
    /**
     * Sends one user turn. Context the user attached (inline comments, terminal
     * output, PR checks) travels as synthetic messages admitted right before the
     * prompt with the same delivery, so the model reads them first and the
     * timeline can render them as context blocks from their metadata.
     *
     * Returns the user message id (client-generated so the optimistic message
     * reconciles in place when the server echoes it).
     */
    sendMessage(params: {
        runtimeKey?: string;
        id: string;
        /** Switch the session to this model before sending; omit when unchanged. */
        model?: ModelSelection;
        /** Switch the session to this agent before sending; omit when unchanged. */
        agent?: string;
        /** Provider the prompt will run on, for the provider circuit breaker. */
        providerID: string;
        text: string;
        files?: Array<FileInputLite>;
        /**
         * Context items sent ahead of the prompt as synthetic messages. A caller
         * that supplies `messageId` also supplies the item ids, minted before it.
         */
        context?: SyntheticContextInput[];
        messageId?: string;
        agentMentions?: Array<{
            name: string;
            source?: {
                value: string;
                start: number;
                end: number;
            };
        }>;
        metadata?: Metadata;
        delivery?: SessionInboxDelivery;
        directory?: string | null;
        /** Skills named inline; attached to the prompt so OpenCode loads them with it. */
        skills?: SkillMentions;
    }): Promise<string>;
    /**
     * Runs a slash command in the session. The server assigns the message id.
     * Attached context (quoted selections, pinned knowledge) goes in first as
     * synthetic messages that do not start execution, so the command template
     * still expands on the server with the context already in the transcript.
     */
    sendCommand(params: {
        runtimeKey?: string;
        id: string;
        model?: ModelSelection;
        agent?: string;
        command: string;
        arguments?: string;
        files?: Array<FileInputLite>;
        context?: SyntheticContextInput[];
        delivery?: SessionInboxDelivery;
        directory?: string | null;
    }): Promise<void>;
    /** Interrupts the running turn. Resolves false when nothing was running. */
    abortSession(id: string, directory?: string | null): Promise<boolean>;
    /**
     * Moves the work the turn is blocked on (a running shell command, a
     * subagent it waits for) to the background. The work keeps running, the
     * agent is told to move on, and the result is handed back when it settles.
     * A no-op when nothing blocks.
     */
    backgroundSessionWork(id: string, directory?: string | null): Promise<void>;
    /** Runs a shell command inside the session transcript. Returns the shell message id. */
    shellSession(params: {
        runtimeKey?: string;
        sessionId: string;
        command: string;
        messageId?: string;
        directory?: string | null;
    }): Promise<string>;
    /**
     * Stages a revert to before `messageId`: the later messages hide and their
     * file changes roll back. The next prompt commits it on the server;
     * {@link clearRevert} puts everything back.
     */
    stageRevert(sessionId: string, messageId: string, options?: {
        files?: boolean;
        directory?: string | null;
    }): Promise<SessionRevert>;
    clearRevert(sessionId: string, directory?: string | null): Promise<void>;
    /** Compacts the transcript; the result arrives as a compaction message through events. */
    compactSession(sessionId: string, directory?: string | null): Promise<void>;
    /**
     * Forks the session. `before` copies the transcript up to but excluding that
     * message; omitting it copies the whole transcript (OpenCode 2.0.8 replaced
     * the `boundary` object with this single optional message id).
     */
    forkSession(sessionId: string, options?: {
        before?: string;
        directory?: string | null;
    }): Promise<Session>;
    /**
     * Sessions with a running agent loop, or `null` when the fetch failed.
     *
     * `null` vs `{}` matters for reconnect resync: an empty map means every
     * session is idle, so a candidate missing from it is authoritatively idle.
     * A failure must not be conflated with that.
     *
     * The host's snapshot is global: one read for every directory of the host.
     * A directory inside an isolated space is asked of that space instead,
     * because the host's snapshot never covers a space's sessions, and an empty
     * answer from the host would settle a turn that is running inside.
     */
    getActiveSessionStatuses(directory?: string | null): Promise<Record<string, SessionStatus> | null>;
    /**
     * Cross-project busy/retry/idle map kept by the OpenChamber host from the
     * single upstream event stream. One request that creates no OpenCode
     * instance, unlike `/session/status?directory=`. `null` means the fetch
     * failed; callers must preserve their current state.
     */
    getHostSessionStatusSnapshot(): Promise<HostSessionStatusSnapshot | null>;
    /**
     * Get session activity from web server's in-memory tracking.
     * This is more reliable than the OpenCode active list on visibility restore
     * because the web server tracks activity even when UI is not listening to SSE.
     * `null` means the fetch failed or the payload was not a valid v1
     * envelope; callers must preserve their current state.
     */
    getWebServerSessionActivity(): Promise<Record<string, SessionActivityV1Entry> | null>;
    /** Transient text generated from the session's context; never enters history. */
    generateSessionText(sessionId: string, prompt: string, directory?: string | null): Promise<string>;
    /**
     * Per-file diffs of what a turn changed, computed by OpenCode from the
     * turn's snapshots: `from` names the user message whose turn to diff
     * (default: the newest), `to` extends the range through a later turn.
     * Covers edits the tool calls alone cannot describe (a `write`, a subagent).
     */
    getSessionTurnDiff(sessionId: string, options?: {
        from?: string;
        to?: string;
        context?: number;
        directory?: string | null;
    }): Promise<FileDiffInfo[]>;
    /** One stateless generation with the server's default model unless `model` is given. */
    generateText(prompt: string, options?: {
        model?: ModelSelection;
        directory?: string | null;
    }): Promise<string>;
    replyToPermission(sessionID: string, requestID: string, reply: PermissionReply, options?: {
        message?: string;
        directory?: string | null;
    }): Promise<boolean>;
    /**
     * Fetch a pending permission request owned by a session. A 404 is the
     * server confirming the request has settled; every other failure stays
     * distinct so auto-accept fails closed while the request stays visible.
     */
    fetchPermission(sessionID: string, requestID: string, directory?: string | null): Promise<FetchPermissionResult>;
    /**
     * Throws on fetch failure. Callers that drive authoritative state from the
     * result (e.g. reconnect resync) must let the throw propagate so they can
     * preserve existing state instead of conflating "fetch failed" with "server
     * returned no pending permissions".
     */
    listPendingPermissions(options?: PendingRequestListOptions): Promise<PermissionRequest[]>;
    replyToForm(sessionID: string, formID: string, answer: FormAnswer, directory?: string | null): Promise<boolean>;
    cancelForm(sessionID: string, formID: string, directory?: string | null): Promise<boolean>;
    /** Throws on fetch failure; see {@link listPendingPermissions}. */
    listPendingForms(options?: PendingRequestListOptions): Promise<FormInfo[]>;
    /**
     * Commands still running in the directory on behalf of a session, keyed by
     * the directory OpenCode resolved it to (symlinks resolved), which is the
     * directory its shell events carry. Throws on fetch failure.
     */
    listRunningShells(directory: string): Promise<{
        directory: string;
        shells: RunningShell[];
    }>;
    /**
     * The newest part of a command's captured output, and the cursor to read
     * on from. Without a cursor the read starts `tailBytes` before the end.
     */
    readShellOutput(shellID: string, directory: string, cursor?: number, tailBytes?: number): Promise<{
        output: string;
        cursor: number;
        skipped: boolean;
    }>;
    /** Persistent terminals a session's agent started. Throws on fetch failure. */
    listSessionTerminals(sessionID: string, directory: string): Promise<PersistentPtyInfo[]>;
    /** A terminal's screen as text, for a read-only view. */
    readTerminalSnapshot(ptyID: string, directory: string): Promise<PersistentPtySnapshot>;
    /** Ends a terminal's process and removes it. */
    removeTerminal(ptyID: string, directory: string): Promise<void>;
    /**
     * Stops background commands one session started. The agent is told first,
     * in one note that does not wake it, that the errors OpenCode is about to
     * report are the user's stop (see `shellCancellationNote`); the commands
     * are killed together only once the note is in, so their completions reach
     * the agent at about the same time. Throws when the note or any kill
     * fails; nothing is killed when the note could not be delivered, and a
     * failed kill leaves the other commands stopped.
     */
    stopBackgroundShells(params: {
        sessionID: string;
        sessionDirectory?: string | null;
        shells: readonly [ShellToStop, ...ShellToStop[]];
    }): Promise<void>;
    /**
     * Stops a subagent the agent started, in the foreground or the background.
     * The agent is told first, in a note that does not wake it, that the
     * cancellation OpenCode is about to report is the user's stop (see
     * `subagentCancellationNote`); the child session is interrupted only once
     * the note is in. Throws when either step fails, and nothing is stopped
     * when the note could not be delivered.
     */
    stopSubagent(params: {
        sessionID: string;
        directory?: string | null;
        childSessionID: string;
        description: string | undefined;
    }): Promise<void>;
    /** Global pending items when requested, then each distinct directory. */
    private uniqueDirectories;
    clearConfigCache(): void;
    /** Whether OpenCode's config for a directory restricts providers with a `provider.use` deny policy. */
    configDeniesAnyProvider(directory?: string | null): Promise<boolean>;
    /** The `integration.use` statements OpenCode's config applies to MCP servers and skills in a directory. */
    getIntegrationPolicies(directory?: string | null): Promise<IntegrationPolicy[]>;
    /** Effective configuration for a directory: every discovered document folded, highest priority last. */
    getConfig(directory?: string | null): Promise<Config>;
    getProviders(): Promise<ProviderCatalog>;
    /**
     * Providers, models, and the default model OpenCode resolves for a directory.
     *
     * The providers of a directory inside an isolated space are the host's: a space offers the
     * host's catalog, and the host refuses its provider routes across the boundary, so they are
     * asked of the host, in the project the space was made from. A provider that project's own
     * opencode.json defines exists on the host there and nowhere else, and a space can be granted
     * it; asked with no directory, its models had no provider to be picked under. While the space's
     * project is unknown they are asked with no directory. Models and the default come from the
     * space as usual.
     *
     * Models are read before providers. Since OpenCode 2.0.27 the model routes wait for the
     * directory's plugins to activate, and the provider route does not: asked together in a
     * directory OpenCode has not started, providers answer empty beside a full model list. For a
     * space the providers come from another location than the models, the host project, which may
     * have stopped; its own model route is read beside the space's for the same wait.
     *
     * `fresh`: a request already in flight started before the caller's reason to re-read (a
     * catalog event), so it may carry the old catalog. Wait it out and read again.
     */
    getProvidersForConfig(directory?: string | null, options?: {
        fresh?: boolean;
    }): Promise<ProviderCatalog>;
    /**
     * Throws on fetch failure so caller-side retry loops (see useAgentsStore)
     * can observe failure and retry; silently returning an empty list would
     * defeat retries and clear the cached agent list.
     */
    listAgents(directory?: string | null): Promise<Agent[]>;
    /** Retire a pre-change list so the next caller starts a fresh request. */
    invalidateAgentList(directory?: string | null): void;
    clearAgentListRequests(): void;
    listCommands(directory?: string | null, signal?: AbortSignal): Promise<Command[]>;
    listSkills(directory?: string | null): Promise<Skill[]>;
    /**
     * Maps the names the composer knows to OpenCode skill ids. The composer's
     * registry is keyed by name, while a prompt attaches skills by id (the
     * skill's folder, which a frontmatter `name` can differ from). A name
     * OpenCode does not list, or a failed list, leaves the name unresolved so
     * the caller can fall back instead of losing the mention.
     */
    private resolveSkillMentions;
    listMcpServers(directory?: string | null): Promise<McpServerStatus[]>;
    connectMcpServer(server: string, directory?: string | null): Promise<void>;
    disconnectMcpServer(server: string, directory?: string | null): Promise<void>;
    checkHealth(): Promise<boolean>;
    /**
     * Classifies the OpenCode health probe. "unreachable" means the OpenChamber
     * server did not answer (network error or timeout); "unhealthy" means it
     * answered but OpenCode is not ready.
     */
    probeHealth(options?: {
        waitMs?: number;
    }): Promise<OpencodeHealthProbe>;
    /**
     * Writes files into a new folder under OpenCode's own temp folder
     * (`GET /api/info` names it; its agents read there without asking) and
     * answers each file's absolute path as OpenCode wrote it, or its error. The
     * bytes reach OpenCode through the OpenChamber server, so the files land
     * where OpenCode runs, also when that is another machine. A fresh folder per
     * call keeps a repeated name from overwriting; names must be unique within
     * a call. The write route is experimental in OpenCode 2.x.
     */
    writeOpenCodeTempFiles(directory: string | null | undefined, files: Array<{
        filename: string;
        bytes: Uint8Array;
    }>): Promise<Array<{
        filename: string;
        path: string;
    } | {
        filename: string;
        error: Error;
    }>>;
    createDirectory(dirPath: string, options?: {
        allowOutsideWorkspace?: boolean;
        asProject?: boolean;
    }): Promise<{
        success: boolean;
        path: string;
    }>;
    cloneRepository(input: {
        remoteUrl: string;
        destinationPath: string;
        gitIdentityId?: string | null;
    }): Promise<{
        success: boolean;
        path: string;
        output?: string;
    }>;
    listLocalDirectory(directoryPath: string | null | undefined, options?: {
        respectGitignore?: boolean;
    }): Promise<FilesystemEntry[]>;
    /** Fuzzy file search inside a directory through OpenCode's file index. */
    searchFiles(query: string, options?: {
        directory?: string | null;
        limit?: number;
        type?: "file" | "directory";
    }): Promise<ProjectFileSearchHit[]>;
    getFilesystemHome(): Promise<string | null>;
    getFilesystemHomeInfo(): Promise<z.infer<typeof fsHomeResponseSchema>>;
    setOpenCodeWorkingDirectory(directoryPath: string | null | undefined): Promise<DirectorySwitchResult | null>;
}
export declare const opencodeClient: OpencodeService;
