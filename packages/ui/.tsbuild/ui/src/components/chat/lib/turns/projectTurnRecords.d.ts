import type { ChatMessageEntry, TurnProjectionResult } from './types';
interface ProjectTurnRecordsOptions {
    previousProjection?: TurnProjectionResult | null;
    showTurnChangedFiles: boolean;
    /**
     * When true, a turn whose user message is hidden (no visible display parts,
     * e.g. a prompt OpenChamber sent on the user's behalf) is merged into the
     * previous turn instead of starting a new one.
     */
    mergeHiddenUserTurns?: boolean;
    /**
     * The messages are one turn's own records, so the first one opens the
     * turn whatever its role: a notice that split a turn has no answer ahead
     * of it once the turn is re-projected alone.
     */
    firstMessageOpensTurn?: boolean;
}
export declare const projectTurnRecords: (messages: ChatMessageEntry[], options?: Partial<ProjectTurnRecordsOptions>) => TurnProjectionResult;
export {};
