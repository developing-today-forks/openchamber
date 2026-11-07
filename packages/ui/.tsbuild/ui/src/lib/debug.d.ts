interface DebugMessageInfo {
    messageId: string;
    role: string;
    timestamp: number;
    partsCount: number;
    parts: Array<{
        id: string;
        type: string;
        text?: string;
        textLength?: number;
        tool?: string;
        state?: any;
    }>;
    isEmpty: boolean;
    isEmptyResponse: boolean;
    raw: any;
}
export declare const debugUtils: {
    getLastAssistantMessage(): DebugMessageInfo | null;
    truncateString(value: string | undefined, maxLength?: number): string | undefined;
    truncateMessages(messages: any[]): any[];
    /** Cached message count per session in the current directory store; -1 when not cached. */
    getCachedMessageCount(sessionId: string, directory?: string): number;
    getAllMessages(truncate?: boolean): any[];
    getAppStatus(): Promise<{
        runtime: {
            platform: ("desktop" | "vscode" | "web") | null;
            isDesktop: boolean;
            isVSCode: boolean;
            hasRuntimeApis: boolean;
            desktopServerOrigin: null;
        };
        location: {
            href: string;
            origin: string;
        } | null;
        directories: {
            currentDirectory: string | null;
            opencodeDirectory: string | null;
            homeDirectory: string | null;
            isHomeReady: boolean;
            hasPersistedDirectory: boolean;
            isSwitchingDirectory: boolean;
        };
        projects: {
            total: number;
            activeProjectId: string | null;
            samples: {
                id: string;
                path: string;
                label: string | undefined;
            }[];
        };
        sessions: {
            total: number;
            currentSessionId: string | null;
            lastLoadedDirectory: string | null;
            uniqueDirectories: number;
            directorySamples: string[];
            directoryCounts: Record<string, number>;
        };
        worktrees: {
            available: number;
            metadataEntries: number;
        };
        git: {
            isGitRepo: boolean | null;
            error?: string;
        };
        localStorage: {
            error?: undefined;
            available: boolean;
            lastDirectory?: undefined;
            homeDirectory?: undefined;
        } | {
            error?: undefined;
            available: boolean;
            lastDirectory: string | null;
            homeDirectory: string | null;
        } | {
            lastDirectory?: undefined;
            homeDirectory?: undefined;
            available: boolean;
            error: string;
        };
        opencode: {
            pathInfo: unknown;
            projectInfo: unknown;
            health: unknown;
        };
        openchamber: {
            settingsInfo: unknown;
        };
        recentSendFailures: import("@/sync/send-failure-log").SendFailureRecord[];
        recentSessionErrors: import("@/sync/session-error-log").SessionErrorRecord[];
        currentSessionDirectoryResolution: {
            sessionId: string;
            isCurrentSession: boolean;
            routedDirectory: string | null;
            resolvedFrom: import("@/sync/session-directory-resolution").SessionDirectorySource;
            conflict: {
                source: import("@/sync/session-directory-resolution").SessionDirectorySource;
                directory: string;
            } | null;
            sources: {
                source: import("@/sync/session-directory-resolution").SessionDirectorySource;
                directory: string;
            }[];
            details: {
                owningChildStore: string | null;
                sessionRecordDirectory: string | null;
                sessionIndexed: boolean;
                currentSessionDirectory: string | null;
                rememberedForRuntime: string | null;
                persistedAcrossRestarts: string | null;
                activeDirectory: string;
                opencodeClientDirectory: string | null;
            };
        } | null;
    }>;
    /**
     * The same text the status report dialog ("Show OpenCode status") shows, for a
     * console or remote session that cannot press the shortcut.
     */
    statusReport(): Promise<string>;
    /**
     * Prompt sends that were rejected and rolled back in this app session.
     * Newest first; empty means no send was rejected.
     */
    getRecentSendFailures(): import("@/sync/send-failure-log").SendFailureRecord[];
    /**
     * Report how a session's directory is resolved, from every source, in
     * precedence order. A send is routed by the winning value, so a disagreement
     * here explains a prompt that vanishes without an error: it was posted
     * against a directory that does not own the session.
     */
    diagnoseSessionDirectory(sessionId?: string): {
        sessionId: string;
        isCurrentSession: boolean;
        routedDirectory: string | null;
        resolvedFrom: import("@/sync/session-directory-resolution").SessionDirectorySource;
        conflict: {
            source: import("@/sync/session-directory-resolution").SessionDirectorySource;
            directory: string;
        } | null;
        sources: {
            source: import("@/sync/session-directory-resolution").SessionDirectorySource;
            directory: string;
        }[];
        details: {
            owningChildStore: string | null;
            sessionRecordDirectory: string | null;
            sessionIndexed: boolean;
            currentSessionDirectory: string | null;
            rememberedForRuntime: string | null;
            persistedAcrossRestarts: string | null;
            activeDirectory: string;
            opencodeClientDirectory: string | null;
        };
    } | null;
    buildDiagnosticsReport(): Promise<string>;
    copyTextToClipboard(text: string): Promise<import("@/lib/clipboard").ClipboardCopyResult>;
    copyDiagnosticsReport(): Promise<{
        readonly ok: true;
        readonly method: 'clipboard' | 'execCommand';
        readonly report: string;
    } | {
        readonly ok: false;
        readonly error: string;
        readonly report: string;
    }>;
    checkLastMessage(): boolean;
    getStreamingState(): {
        streamingMessageId: string | null;
        streamingMessageIds: Map<string, string | null>;
        streamStates: Map<string, {
            phase: "completed" | "cooldown" | "streaming";
            startedAt: number;
            lastUpdateAt: number;
            completedAt?: number;
        }>;
    };
    findEmptyMessages(): import("./opencode/model").AssistantMessage[];
    showRetryHelp(): void;
    analyzeMessageCompletionConsistency(options?: {
        includeNonAssistant?: boolean;
        verbose?: boolean;
        maxTableRows?: number;
    }): {
        summary: null;
        rows: never[];
    } | {
        summary: {
            totalMessages: number;
            analyzedMessages: number;
            completedMissing: number;
            completedBeforeTool: number;
            completedBeforeReasoning: number;
            runningToolsWhenCompleted: number;
            reasoningOpenWhenCompleted: number;
            withTools: number;
            withReasoning: number;
        };
        rows: {
            index: number;
            messageId: any;
            role: any;
            completedAt: number | null;
            latestToolTimestamp: number | null;
            latestReasoningTimestamp: number | null;
            latestPartTimestamp: number | null;
            completed_missing: boolean;
            completed_before_tool: boolean;
            completed_before_reasoning: boolean;
            running_tools_when_completed: boolean;
            reasoning_open_when_completed: boolean;
            has_tools: boolean;
            has_reasoning: boolean;
        }[];
    };
    checkCompletionStatus(): {
        messageId: string;
        completed: any;
        status: any;
        hasCompletedFlag: boolean;
        hasStopReason: boolean;
        messageIsComplete: boolean;
        stepFinishParts: import("./opencode/model").Part[];
        raw: import("./opencode/model").AssistantMessage;
    } | null;
};
export {};
