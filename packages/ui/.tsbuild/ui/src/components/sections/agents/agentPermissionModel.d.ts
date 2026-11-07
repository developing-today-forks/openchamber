import type { PermissionEffect, PermissionRule } from '@/stores/useAgentsStore';
/**
 * Editor model for an agent's permissions.
 *
 * OpenCode v2 stores an ORDERED list of `{ action, resource, effect }` rules
 * where the last match wins. The user does not think in ordered rules; they
 * think "what may this agent do with each tool?". So the editor keeps the v1
 * mental model — one row per tool with inherit / allow / ask / deny, plus
 * optional resource patterns under a row — and this module translates that
 * view to and from the rule list.
 *
 * Because the last match wins, the ORDER of the stored list is part of the
 * policy: rebuilding it from the per-tool view would silently change what
 * OpenCode decides for tools the user never touched. So the model keeps the
 * list it was read from and a save edits that list in place: a changed effect
 * replaces the rule where it stands, a removed row drops its rules, rules the
 * view cannot show (an `*` action with a resource pattern) stay untouched, and
 * only rules the user newly created are inserted, at a position that changes
 * nothing but the tool they belong to.
 */
export declare const EFFECTS: PermissionEffect[];
/**
 * Permission actions the built-in v2 tools check, in the order they are
 * listed. Plugins and MCP servers add their own (`<server>_<tool>`), which
 * appear as rows once the agent's rules or the tool catalog mention them.
 */
export declare const BUILTIN_ACTIONS: readonly ['shell', 'edit', 'read', 'glob', 'grep', 'patch', 'webfetch', 'websearch', 'skill', 'subagent', 'question', 'external_directory'];
/** OpenChamber's own agent tools, shown so their rules are discoverable. */
export declare const OPENCHAMBER_ACTIONS: readonly ['openchamber', 'openchamber_schedule', 'openchamber_web', 'openchamber_memory', 'openchamber_knowledge', 'openchamber_notify', 'openchamber_render'];
export interface PatternRule {
    pattern: string;
    effect: PermissionEffect;
}
export interface KeyState {
    /** The tool's own `*` rule; null = not set, so lower layers decide. */
    effect: PermissionEffect | null;
    /** Resource patterns for the tool, in stable order. */
    patterns: PatternRule[];
}
export interface PermissionModel {
    /** The agent's `*` / `*` rule; null = not set. */
    global: PermissionEffect | null;
    keys: Record<string, KeyState>;
    /**
     * The stored rule list this view was read from, in evaluation order.
     * `serializeRules` edits it rather than rebuilding it. Never mutated.
     */
    source: readonly PermissionRule[];
}
export declare const emptyModel: () => PermissionModel;
export declare const cloneModel: (model: PermissionModel) => PermissionModel;
/**
 * Read the agent's stored rule list into the per-tool view. Legacy v1 keys are
 * dropped here on purpose (see `LEGACY_ACTIONS`). When a tool has several
 * rules for the same resource the last one wins, which is also what OpenCode
 * evaluates. Rules the view cannot show stay in `source` and are written back
 * unchanged.
 */
export declare const parseRules: (rules: readonly PermissionRule[]) => PermissionModel;
/**
 * Write the per-tool view back as the stored list with the user's edits
 * applied in place, so decisions for everything the user did not touch stay
 * exactly what they were:
 *
 * - a rule the view still shows is kept where it stands, with its current effect;
 * - a rule whose row or pattern the user removed is dropped;
 * - a rule the view cannot show is kept untouched;
 * - legacy v1 keys are dropped (see `LEGACY_ACTIONS`);
 * - a new agent wildcard goes first, so every existing rule still refines it;
 * - a new tool wildcard goes right before that tool's first existing rule, so
 *   the tool's patterns keep overriding it; with no such rule it goes last;
 * - a new pattern goes last, so it wins for the resources it names.
 */
export declare const serializeRules: (model: PermissionModel) => PermissionRule[];
export declare const modelsEqual: (a: PermissionModel, b: PermissionModel) => boolean;
/**
 * What OpenCode would decide for a tool (any resource) given the layers below
 * the agent's own row: defaults, global config, and the agent's `*` rule.
 * Later rules win; a tool-specific wildcard beats a `*` wildcard only by
 * coming later in that combined list, which mirrors OpenCode's evaluation.
 */
export declare const effectiveEffect: (action: string, layers: {
    global: readonly PermissionRule[];
    agentGlobal: PermissionEffect | null;
}) => PermissionEffect;
