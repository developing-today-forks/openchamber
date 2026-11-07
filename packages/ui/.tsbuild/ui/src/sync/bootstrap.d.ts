import type { Project } from "@/lib/opencode/model";
import type { GlobalState, State } from "./types";
import { type DirectoryRecoverySource } from "./directory-recovery-snapshots";
export declare function bootstrapGlobal(set: (patch: Partial<GlobalState>) => void): Promise<void>;
type DirectoryBootstrapInput = {
    directory: string;
    store: DirectoryRecoverySource;
    set: (patch: Partial<State>) => void;
    isStale?: () => boolean;
    global: {
        config: State["config"];
        projects: Project[];
        path: GlobalState["path"];
    };
    loadSessions: (directory: string) => Promise<void> | void;
};
type BootstrapResult = "complete" | "failed" | "stale";
export declare function bootstrapDirectory(input: DirectoryBootstrapInput): {
    sessions: Promise<BootstrapResult>;
    environment: Promise<BootstrapResult>;
};
export {};
