declare global {
    interface Window {
        __openchamberSyncPerformance?: {
            getSnapshot: () => SyncPerformanceCounters | null;
            reset: () => void;
        };
    }
}
export type SyncPerformanceCounters = {
    pipelineRawEvents: number;
    pipelineCoalescedEvents: number;
    pipelineDeliveredEvents: number;
    reducerEvents: number;
    reducerChangedEvents: number;
    directoryStorePublications: number;
    globalSessionPublications: number;
    globalStatusPublications: number;
    orderingPublications: number;
    timingPublications: number;
    liveSessionAggregateRuns: number;
    sessionIndexReads: number;
    sidebarStructureBuilds: number;
    sidebarOrderBuilds: number;
    sidebarOrderMetadataEntries: number;
    recentCandidatesVisited: number;
    streamingFullReconciliations: number;
    streamingIncrementalReconciliations: number;
    streamingStatusEntriesVisited: number;
    streamingSessionCandidatesVisited: number;
    streamingMessagesVisited: number;
    streamingHeartbeatAttempts: number;
    streamingHeartbeatCommits: number;
    permissionChangeCallbacks: number;
    formChangeCallbacks: number;
    sessionMessageChangeCallbacks: number;
    sessionRenderableNotificationSkips: number;
    userMessageHistoryNotificationSkips: number;
    sessionMessageRecordNotificationSkips: number;
    materializationEnqueues: number;
    materializationEmptyAssistantEnqueues: number;
    materializationMissingMessageEnqueues: number;
    materializationMissingPartEnqueues: number;
    materializationLifecycleEnqueues: number;
    materializationPreflightSkips: number;
    materializationRequests: number;
    statusAggregationSessionEntries: number;
    statusAggregationCandidates: number;
    persistenceSerializations: number;
    persistenceStorageWrites: number;
    persistenceUtf8Bytes: number;
};
export declare function setSyncPerformanceDiagnosticsEnabled(enabled: boolean): void;
export declare function resetSyncPerformanceDiagnostics(): void;
export declare function getSyncPerformanceDiagnostics(): SyncPerformanceCounters | null;
export declare function countSyncPerformance(counter: keyof SyncPerformanceCounters, amount?: number): void;
export declare function countSyncPersistenceSerialization(serialized: string): void;
export declare function countSyncPersistenceStorageWrite(): void;
