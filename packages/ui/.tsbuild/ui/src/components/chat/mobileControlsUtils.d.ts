import type { Agent } from '@/lib/opencode/model';
import { type DisplayProvider } from '@/lib/modelDisplay';
export type MobileControlsPanel = 'model' | 'agent' | 'variant' | null;
/** What agent cycling reads from an agent. */
type CyclableAgent = Pick<Agent, 'name' | 'mode'>;
export declare const isPrimaryMode: (mode?: string) => mode is "all" | "primary" | undefined;
/**
 * The agent Tab moves to. While any starred agent is available, the cycle runs
 * through the starred ones only (from a non-starred agent it enters at the
 * first or last of them); otherwise through every primary agent, as before.
 */
export declare const getCycledPrimaryAgentName: (agents: readonly CyclableAgent[], currentAgentName: string | undefined, direction?: 1 | -1, favoriteAgentNames?: readonly string[]) => string | null;
export declare const getAgentDisplayName: (agents: Agent[], agentName?: string) => string;
export declare const getModelDisplayName: (provider: DisplayProvider, modelId: string | undefined, fallbackLabel?: string) => string;
export declare const formatEffortLabel: (variant?: string) => string;
export {};
