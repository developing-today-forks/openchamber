/**
 * Boundary parsers for settings values. Every value that arrives from the
 * server, the VS Code bridge, or browser storage passes through one of these
 * before it is trusted; `undefined` means "reject", never "default".
 *
 * These are the value-level rules the registry (`./registry.ts`) attaches to
 * each key. They are zod schemas wrapped into one function shape so the
 * registry can hold hand-written and schema-derived parsers alike, and so the
 * registry can be evaluated for its shape (the generated JSON snapshot)
 * without a browser.
 */
import { type ZodType } from 'zod';
import type { ProjectEntry } from '@/lib/api/types';
import { type CustomProviderIcon } from '@/lib/customProviderIcons';
/**
 * `raw` is the whole untrusted document, for the few legacy keys whose value
 * is derived from a sibling (`queueModeEnabled` → `followUpBehavior`).
 */
export type SettingsParser<T> = (value: unknown, raw: SettingsRawDocument) => T | undefined;
/** The untrusted document as received; only ever read through a parser. */
export type SettingsRawDocument = Readonly<Record<string, unknown>>;
export type ModelRef = {
    providerID: string;
    modelID: string;
};
export type NotificationTemplates = {
    completion: {
        title: string;
        message: string;
    };
    error: {
        title: string;
        message: string;
    };
    question: {
        title: string;
        message: string;
    };
    subtask: {
        title: string;
        message: string;
    };
};
export type UsageModelGroups = Record<string, {
    customGroups?: Array<{
        id: string;
        label: string;
        models: string[];
        order: number;
    }>;
    modelAssignments?: Record<string, string>;
    renamedGroups?: Record<string, string>;
}>;
export type ManagedRemoteTunnelPreset = {
    id: string;
    name: string;
    hostname: string;
};
export type SkillCatalogConfig = {
    id: string;
    label: string;
    source: string;
    subpath?: string;
    gitIdentityId?: string;
};
/** Wrap a schema as a parser: success yields the parsed value, failure yields `undefined`. */
export declare const fromSchema: <T>(schema: ZodType<T>) => SettingsParser<T>;
export declare const parseBoolean: SettingsParser<boolean>;
/** A non-empty string, kept verbatim. */
export declare const parseNonEmptyString: SettingsParser<string>;
/** Any string, trimmed; empty stays empty (some keys use '' as "unset"). */
export declare const parseTrimmedString: SettingsParser<string>;
/** A trimmed string that is only accepted when something is left after trimming. */
export declare const parseNonEmptyTrimmedString: SettingsParser<string>;
/** Free text with an upper bound, kept verbatim (whitespace is content here). */
export declare const parseTextUpTo: (maxLength: number) => SettingsParser<string>;
export declare const parseTrimmedStringUpTo: (maxLength: number) => SettingsParser<string>;
export declare const parseOneOf: <const T extends readonly [string, ...string[]]>(options: T) => SettingsParser<T[number]>;
export declare const parseFiniteNumber: SettingsParser<number>;
export declare const parseIntegerInRange: (min: number, max: number) => SettingsParser<number>;
export declare const parseIntegerAtLeast: (min: number) => SettingsParser<number>;
export declare const parsePositiveInteger: SettingsParser<number>;
/** `null` clears the value; a finite number keeps it. */
export declare const parseNullableFiniteNumber: SettingsParser<number | null>;
/** `null` clears the value; a non-empty trimmed string keeps it; '' becomes null. */
export declare const parseNullableTrimmedPath: SettingsParser<string | null>;
export declare const parseNullableTrimmedString: SettingsParser<string | null>;
/** Distinct non-empty strings, order preserved. */
export declare const parseStringSet: SettingsParser<string[]>;
/** Non-empty strings, duplicates kept (order is the user's). */
export declare const parseStringList: SettingsParser<string[]>;
export declare const parseStringRecordOfStringLists: SettingsParser<Record<string, string[]>>;
export declare const parseCustomProviderIcons: SettingsParser<Record<string, CustomProviderIcon>>;
export declare const parseModelRefs: (limit: number) => SettingsParser<ModelRef[]>;
export declare const parseRecentEfforts: SettingsParser<Record<string, string[]>>;
export declare const parseShortcutOverrides: SettingsParser<Record<string, string>>;
export declare const parseNotificationTemplates: SettingsParser<NotificationTemplates>;
export declare const parseUsageModelGroups: SettingsParser<UsageModelGroups>;
export declare const parseManagedRemoteTunnelPresets: SettingsParser<ManagedRemoteTunnelPreset[]>;
export declare const parseManagedRemoteTunnelPresetTokens: SettingsParser<Record<string, string>>;
export declare const parseSkillCatalogs: SettingsParser<SkillCatalogConfig[]>;
export declare const parseProjects: SettingsParser<ProjectEntry[]>;
/** Legacy `queueModeEnabled` → `followUpBehavior`; 'immediate' collapses onto 'steer'. */
export declare const parseFollowUpBehavior: SettingsParser<'steer' | 'queue'>;
/**
 * The removed Sorted chat mode (`chatRenderMode: 'sorted'`) showed only the
 * answers with the work folded away; Collapsed is its closest match, so it
 * wins over a stored mode until the user picks one (which retires the key).
 */
export declare const parseActivityRenderMode: SettingsParser<'collapsed' | 'summary'>;
/** Legacy provider names: 'server' was the OpenAI-compatible endpoint; 'browser'/'wasm' the local one. */
export declare const parseSttProvider: SettingsParser<"local" | "openai-compatible">;
/** Legacy 'auto' never read OS chrome config; it means right. */
export declare const parseDesktopWindowControlsPosition: SettingsParser<"left" | "right">;
export declare const parsePwaAppName: SettingsParser<string>;
/** Lower-cased, deduplicated shells; unknown names are dropped. */
export declare const parseTerminalShells: <T extends string>(isShell: (value: string) => value is T) => SettingsParser<T[]>;
/** A value accepted by a domain type guard (`isTerminalShell`, `isUiFontOption`, …). */
export declare const parseGuarded: <T>(isValid: (value: unknown) => value is T) => SettingsParser<T>;
/** Map a parser's output; `undefined` from the mapper rejects the value. */
export declare const mapParser: <A, B>(parser: SettingsParser<A>, map: (value: A) => B | undefined) => SettingsParser<B>;
