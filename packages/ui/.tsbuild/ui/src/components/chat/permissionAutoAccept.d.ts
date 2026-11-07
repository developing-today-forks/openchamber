import { type PermissionMode } from '@/stores/utils/permissionAutoAccept';
type PermissionModeCycleArgs = {
    permissionScopeSessionId: string | null;
    newSessionDraftOpen: boolean;
    /** The mode the button shows now, before `displayedPermissionMode` hides an unavailable safety net. */
    currentMode: PermissionMode;
    safetyAvailable: boolean;
    setDraftPermissionMode: (mode: PermissionMode) => void;
    setSessionMode: (sessionId: string, mode: PermissionMode) => Promise<void>;
    onOpenSessionFirst: () => void;
    onToggleFailed: () => void;
};
/** One press of the composer's shield button: the next mode, on the draft or on the session. */
export declare const cyclePermissionMode: (args: PermissionModeCycleArgs) => void;
export {};
