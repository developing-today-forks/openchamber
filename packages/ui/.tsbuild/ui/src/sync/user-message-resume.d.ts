import type { Session } from '@/lib/opencode/model';
type ResumeDependencies = {
    runtimeKey: () => string;
    session: (id: string) => Session | undefined;
    restore: (id: string, runtimeKey: string) => Promise<boolean>;
    reportFailure: () => Promise<void>;
};
/** Capture before submission; invoke only once the user message was accepted. */
export declare function prepareUserMessageResume(sessionId: string, runtimeKey: string, deps?: ResumeDependencies): () => Promise<void>;
export {};
