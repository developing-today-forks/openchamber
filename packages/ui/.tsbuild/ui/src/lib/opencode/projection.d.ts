/**
 * Projection of OpenCode v2 wire shapes into the OpenChamber domain model.
 *
 * Two consumers share this module: the client wrapper (projected pages of
 * sessions and messages) and the event reducer (one event at a time). Both
 * must produce identical parts for the same message, which is why every part
 * id and every tool-state conversion lives here and nowhere else.
 */
import type { ConfigEntry, Project as ProjectWire, VcsInfo, SessionInboxSyntheticPayload, SessionInboxUserPayload, SessionInfo, SessionMessageAssistant, SessionMessageInfo, SessionStructuredError, ToolContent, AgentInfo } from "@opencode/client";
import { type Agent, type Config, type FilePart, type Message, type Part, type Project, type Session, type SubagentPolicy, type ToolPart, type SyntheticMessage, type UserMessage, type Vcs } from "./model";
/** One item of an assistant message's ordered content. */
export type AssistantContentItem = SessionMessageAssistant["content"][number];
export type AssistantToolItem = Extract<AssistantContentItem, {
    type: "tool";
}>;
/**
 * A wire session as OpenCode sends it once subsession governance lands. The
 * generated client types do not know `subagentPolicy` yet, so the field is
 * intersected in here at the boundary; drop the intersection once the
 * regenerated client ships the field on `SessionInfo`.
 */
export type SessionInfoWithSubagentPolicy = SessionInfo & {
    subagentPolicy?: SubagentPolicy;
};
export declare function projectSession(info: SessionInfoWithSubagentPolicy): Session;
export declare function projectProject(info: ProjectWire): Project;
export declare function projectVcs(info: VcsInfo): Vcs;
export declare function toolOutputText(content: readonly ToolContent[] | undefined): string;
export declare function toolAttachments(content: readonly ToolContent[] | undefined, owner: {
    sessionID: string;
    messageID: string;
    callID: string;
}): FilePart[] | undefined;
export declare function structuredErrorText(error: SessionStructuredError): string;
/**
 * Converts one wire tool item into a domain tool part. `time.ran` marks the
 * start of execution; before that the call is still being streamed by the
 * model and has no start time worth showing.
 */
export declare function projectToolPart(tool: AssistantToolItem, owner: {
    sessionID: string;
    messageID: string;
}): ToolPart;
/**
 * Assistant content is an ordered list of text / reasoning / tool items. Text
 * and reasoning ordinals count per kind in content order, matching the
 * `ordinal` the live stream sends with `session.text.*` and
 * `session.reasoning.*`.
 */
export declare function projectAssistantContent(content: readonly AssistantContentItem[], owner: {
    sessionID: string;
    messageID: string;
    created: number;
    completed?: number;
}): Part[];
/** The inbox items that stand for a message; control items carry no payload we read. */
export type InboxMessageItem = {
    type: "user";
    payload: SessionInboxUserPayload;
} | {
    type: "synthetic";
    payload: SessionInboxSyntheticPayload;
} | {
    type: "compaction" | "move";
};
/**
 * The message an inbox item stands for, as `session.inbox.enqueued` paints it
 * live and a cold load repaints it from the pending inbox. Null for control
 * items (compaction, move), which paint nothing.
 */
export declare function projectInboxMessage(item: InboxMessageItem, owner: {
    sessionID: string;
    messageID: string;
    created: number;
}): {
    info: UserMessage | SyntheticMessage;
    parts: Part[] | null;
} | null;
/**
 * A user message on the wire is one text plus attachments. The timeline still
 * renders it as parts (text, files, agent mentions) so the chat components
 * treat both roles alike.
 */
export declare function projectUserParts(payload: SessionInboxUserPayload, owner: {
    sessionID: string;
    messageID: string;
    created: number;
}): Part[];
export type ProjectedMessage = {
    message: Message;
    parts: Part[];
};
export declare function projectMessage(info: SessionMessageInfo, sessionID: string): ProjectedMessage;
export declare function projectMessages(items: readonly SessionMessageInfo[], sessionID: string): ProjectedMessage[];
/**
 * `/api/config` returns every discovered source from lowest to highest
 * priority. The UI wants one effective document: later entries win per key,
 * and record-valued keys (agents, commands, providers, mcp) merge by name so a
 * project file adding one agent does not hide the global ones.
 */
export declare function mergeConfigDocuments(entries: readonly ConfigEntry[]): Config;
/**
 * Whether any config document denies a provider through a `provider.use`
 * policy. Read per document: the folded config keeps only the last
 * document's policies, and policies from every layer apply. Statements
 * from a connected OpenCode Console workspace are not part of `/api/config`.
 */
export declare function deniesAnyProvider(entries: readonly ConfigEntry[]): boolean;
/** One `integration.use` statement: `resource` is `mcp:<server>` or `skill:<id>`, with `*` and `?` wildcards. */
export type IntegrationPolicy = {
    resource: string;
    effect: "allow" | "deny";
};
/**
 * The `integration.use` statements of every config document, in the order
 * OpenCode decides by (`ManagedPolicy.statements` upstream): documents
 * reversed, so the last matching statement wins. Statements from a connected
 * OpenCode Console workspace are not part of `/api/config`.
 */
export declare function readIntegrationPolicies(entries: readonly ConfigEntry[]): IntegrationPolicy[];
/** Whether OpenCode drops this MCP server (`mcp:<name>`) or skill (`skill:<id>`) by policy. */
export declare function isIntegrationDenied(policies: readonly IntegrationPolicy[], resource: string): boolean;
/**
 * Config `model` arrives as `provider/model[#variant]` or the explicit
 * `{ providerID, model, variant }` form OpenCode 2 decodes it into. Fold both
 * to the identifier spelling the stores parse.
 */
export declare function configModelIdentifier(value: Config["model"]): string | undefined;
/** See `Agent` in `./model`: the wire `name` is display-only; `id` is the key the server expects back. */
export declare const projectAgent: (info: AgentInfo) => Agent;
