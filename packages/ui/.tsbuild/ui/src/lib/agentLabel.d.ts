import type { Agent } from '@/lib/opencode/model';
/**
 * The name to show for an agent. OpenCode sends a display name next to the
 * agent id; the id (`build`) is only a fallback, capitalized as before.
 */
export declare function agentLabel(agent: Pick<Agent, 'name' | 'displayName'>): string;
