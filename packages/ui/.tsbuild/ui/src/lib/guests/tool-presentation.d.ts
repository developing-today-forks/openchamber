import { type GuestToolContribution, type JsonValue } from '@openchamber/sdk';
import type { ToolInput } from '@/lib/opencode/model';
import type { InstalledGuest } from './types.ts';
/** One `contributes.tools` entry of an active guest, compiled for matching. */
export type GuestToolRule = GuestToolContribution & {
    guestId: string;
    /** `match` without its trailing `*`; the whole name for an exact rule. */
    prefix: string;
    wildcard: boolean;
};
/**
 * The tool rules of active (enabled and fully approved) guests, in catalog
 * order. Pure: the store hook and the plain resolver below both memoize on
 * the catalog array identity, so this runs once per catalog change, not per
 * rendered tool part.
 */
export declare const compileGuestToolRules: (guests: readonly InstalledGuest[]) => GuestToolRule[];
/**
 * The rule for a tool name as OpenCode reports it, un-normalized. An exact
 * rule beats a wildcard from any extension; among equals, the first
 * extension in the catalog (and its first rule) wins. `null` without a match.
 */
export declare const matchGuestToolRule: (rules: readonly GuestToolRule[], fullToolName: string) => GuestToolRule | null;
/** Store read outside React. Same memo as the hook. */
export declare const resolveGuestToolPresentation: (fullToolName: string | undefined | null) => GuestToolRule | null;
/**
 * The rule for one rendered tool part. Subscribes to the catalog array only,
 * which changes on load, install, pause, approval, and runtime switch, never
 * while a tool streams. VS Code and mobile keep the store empty, so this is
 * `null` there.
 */
export declare const useGuestToolPresentation: (fullToolName: string | undefined | null) => GuestToolRule | null;
/** Template data is JSON: tool input, metadata, and output all arrive as JSON over the OpenCode SDK. */
type TemplateValue = JsonValue | undefined;
/**
 * Reads a dotted path (`items.0.title`) off JSON. An empty path is the value
 * itself. Any missing step, a step into a scalar, or an inherited key is
 * `undefined`.
 */
export declare const readPath: (value: TemplateValue, path: string) => TemplateValue;
/** A placeholder value as text: strings as they are, JSON otherwise, empty for nothing, capped. */
export declare const stringifyTemplateValue: (value: TemplateValue, max?: number) => string;
type TemplateContext = {
    input: TemplateValue;
    output: TemplateValue;
    metadata: TemplateValue;
};
/**
 * Substitutes `{input.path}` / `{output.path}` / `{metadata.path}` in a
 * declared template. Plain text replacement, no evaluation: a missing path
 * is an empty string and anything that is not one of the three roots stays
 * as written.
 */
export declare const renderTemplate: (template: string, context: TemplateContext) => string;
/** Whether the rule's header reads the call's output, which a collapsed row then needs. */
export declare const guestToolHeaderReadsOutput: (rule: GuestToolRule) => boolean;
/**
 * Tool input and metadata as the domain model types them. `ToolInput` and
 * `Metadata` are both `Record<string, JsonValue>`, so a tool part's input and
 * metadata already are template values and need no assertion.
 */
type ToolStateData = ToolInput;
type GuestToolHeader = {
    title: string | null;
    subtitle: string | null;
};
/**
 * The header text a rule asks for. `title` is the rendered template when it
 * has one and it renders non-empty, else `name`, else `null` (the host's own
 * display name). `subtitle` is the rendered template or `null`. The output is
 * only parsed when a template mentions it.
 */
export declare const renderGuestToolHeader: (rule: GuestToolRule, data: {
    input: ToolStateData | undefined;
    output: string | undefined;
    metadata: ToolStateData | undefined;
}) => GuestToolHeader;
/** Rows for `output: "table"`: the parsed output array, or its `items` array. `null` when neither. */
export declare const guestToolTableRows: (output: TemplateValue) => JsonValue[] | null;
export {};
