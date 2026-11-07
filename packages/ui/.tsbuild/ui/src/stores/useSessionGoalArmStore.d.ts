import type { GoalSubmitChoice } from '@/lib/goalWriter';
interface SessionGoalArm {
    armed: boolean;
    objectiveOverride: string | null;
    /**
     * The objective is settled: the goal writer produced it, or the user chose
     * their own text over it. "Rewrite every goal" leaves a settled objective alone.
     */
    settled: boolean;
    /**
     * The sent message is not the objective (a written spec sent with the
     * original message), so the goal reminder carries the objective to the agent.
     */
    briefAgent: boolean;
    /** The user switched the goal length limit off for this goal. */
    ignoreLimit: boolean;
}
interface SessionGoalArmStore extends SessionGoalArm {
    setArmed: (armed: boolean, objectiveOverride?: string | null, options?: {
        settled?: boolean;
        briefAgent?: boolean;
        ignoreLimit?: boolean;
    }) => void;
    /** Read-and-clear in one step at send time. */
    consume: () => SessionGoalArm;
}
export declare const useSessionGoalArmStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SessionGoalArmStore>>;
/**
 * Arms the composer again with a goal that left with a queued message: when the
 * message comes back to the composer to be edited, or when queueing it failed.
 * The flags come back with it, so a retry neither rewrites a settled spec nor
 * drops the briefing or the length choice.
 */
export declare const rearmQueuedGoal: (goal: {
    objective?: string | null;
    settled?: boolean;
    briefAgent?: boolean;
    ignoreLimit?: boolean;
}) => void;
/**
 * The goal writer's choice for a send, as the composer arm. ChatInput applies
 * it right before the message leaves, sent or queued, so an early return that
 * sends nothing never leaves a stale arm behind. A spec choice is settled: the
 * writer produced the objective, so nothing rewrites it. It briefs the agent
 * only when the original message goes with it; sent as the message itself, the
 * spec needs no briefing.
 */
export declare const applyGoalChoice: (choice: GoalSubmitChoice | undefined) => void;
export {};
