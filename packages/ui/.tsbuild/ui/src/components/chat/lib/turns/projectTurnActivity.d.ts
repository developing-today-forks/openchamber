import type { ChatMessageEntry, TurnActivityRecord } from './types';
interface ProjectActivityInput {
    turnId: string;
    assistantMessages: ChatMessageEntry[];
}
interface ProjectActivityResult {
    activityParts: TurnActivityRecord[];
    hasTools: boolean;
    hasReasoning: boolean;
}
/** The turn's tool calls and non-empty reasoning, in the order they ran. */
export declare const projectTurnActivity: (input: ProjectActivityInput) => ProjectActivityResult;
export {};
