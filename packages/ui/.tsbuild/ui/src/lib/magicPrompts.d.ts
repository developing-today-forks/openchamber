export type MagicPromptId = 'git.commit.generate.visible' | 'git.commit.generate.instructions' | 'git.pr.generate.visible' | 'git.pr.generate.instructions' | 'git.conflict.resolve.visible' | 'git.conflict.resolve.instructions' | 'git.integrate.cherrypick.resolve.visible' | 'git.integrate.cherrypick.resolve.instructions' | 'plan.todo.visible' | 'plan.todo.instructions' | 'plan.improve.visible' | 'plan.improve.instructions' | 'plan.implement.visible' | 'plan.implement.instructions' | 'session.summary.visible' | 'session.summary.instructions' | 'session.review.visible' | 'session.review.instructions' | 'session.reviewHandoff.visible' | 'session.reviewHandoff.instructions' | 'session.reviewSession.visible' | 'session.reviewSessionWithoutHandoff.visible' | 'session.reviewFeedbackToImplementer.visible' | 'session.implementationResponseToReviewer.visible' | 'session.plan.visible' | 'session.plan.instructions' | 'session.craftGoal.visible' | 'session.craftGoal.instructions' | 'session.scheduleTask.visible' | 'session.scheduleTask.instructions' | 'session.catchup.visible' | 'session.catchup.instructions' | 'session.debug.visible' | 'session.debug.instructions' | 'session.weigh.visible' | 'session.weigh.instructions' | 'session.explore.visible' | 'session.explore.instructions' | 'session.fusion.visible' | 'session.fusion.instructions' | 'session.fusion.codeInstructions' | 'memory.tidy.visible' | 'memory.tidy.instructions';
interface MagicPromptDefinition {
    id: MagicPromptId;
    title: string;
    description: string;
    group: 'Git' | 'GitHub' | 'Linear' | 'Planning' | 'Session' | 'Memory';
    template: string;
    placeholders?: Array<{
        key: string;
        description: string;
    }>;
}
interface MagicPromptOverridesPayload {
    version: number;
    overrides: Record<string, string>;
}
export declare const fetchMagicPromptOverrides: () => Promise<Record<string, string>>;
export declare const getMagicPromptDefinition: (id: MagicPromptId) => MagicPromptDefinition;
export declare const getDefaultMagicPromptTemplate: (id: MagicPromptId) => string;
export declare const renderMagicPrompt: (id: MagicPromptId, variables?: Record<string, string>) => Promise<string>;
export declare const saveMagicPromptOverride: (id: MagicPromptId, text: string) => Promise<MagicPromptOverridesPayload>;
export declare const resetMagicPromptOverride: (id: MagicPromptId) => Promise<MagicPromptOverridesPayload>;
export declare const resetAllMagicPromptOverrides: () => Promise<MagicPromptOverridesPayload>;
export {};
