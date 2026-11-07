import type { Session } from "@/lib/opencode/model";
import type { collectSessionTitleTurns } from '@/lib/sessionTitle';
type TitleTarget = {
    runtimeKey: string;
    directory: string;
    sessionID: string;
};
/** The metadata check belongs to the operation, independently of its menu. */
export declare function generateAndSaveSessionTitle(input: {
    signal: AbortSignal;
    prepare: (signal: AbortSignal) => Promise<{
        session: Session;
        turns: ReturnType<typeof collectSessionTitleTurns>;
    }>;
    generate: (session: Session, turns: ReturnType<typeof collectSessionTitleTurns>, signal: AbortSignal) => Promise<string>;
    readSession: () => Promise<Session>;
    saveTitle: (title: string, signal: AbortSignal) => Promise<void>;
}): Promise<void>;
export declare const useSessionTitleGenerationPending: (target: TitleTarget) => boolean;
/** Manual saves invalidate generation immediately, before their HTTP write settles. */
export declare function cancelSessionTitleGeneration(sessionID: string, runtimeKey?: string): void;
export declare function runSessionTitleGeneration(target: TitleTarget, work: (signal: AbortSignal) => Promise<void>): Promise<void>;
export {};
