import type { Agent } from '@/lib/opencode/model';
import type { Theme } from '@/types/theme';
/** `color` is a CSS color: a theme variable, or the hex the agent's config sets. */
export type AgentColor = {
    color: string;
};
/** The colour set in the agent's config, when it is one OpenCode v2 accepts (six-digit hex only). */
export declare const configuredAgentColor: (color: string | null | undefined) => string | null;
/** Allocate against the complete visible roster, never a filtered picker list.
 * Build owns success; other agents exhaust distinct syntax colors before reuse.
 * A colour set in an agent's config wins over the allocation, Build included;
 * the others keep the colours they would have had. */
export declare function createAgentColorResolver(theme: Theme, agents: readonly (Pick<Agent, 'name'> & Partial<Pick<Agent, 'mode' | 'color'>>)[]): (name: string | undefined) => AgentColor;
