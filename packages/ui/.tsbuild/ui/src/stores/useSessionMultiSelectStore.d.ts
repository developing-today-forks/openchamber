import type { SessionRowOrderEntry } from '@/components/session/sidebar/sessions/sessionRowOrder';
interface SessionMultiSelectState {
    enabled: boolean;
    selectedIds: Set<string>;
    scopeKey: string | null;
    anchorId: string | null;
    anchorRowKey: string | null;
}
interface SessionMultiSelectActions {
    enable: () => void;
    disable: () => void;
    toggleMode: () => void;
    toggleSelected: (id: string, scope: string | null, descendants?: string[], rowKey?: string) => void;
    setRange: (fromRowKey: string | null, toRowKey: string, entries: readonly SessionRowOrderEntry[], descendantIds: readonly string[], scope: string | null, descendantsById?: Map<string, string[]>) => void;
    replaceAll: (ids: string[], scope: string | null) => void;
    clear: () => void;
    removeMany: (ids: string[]) => void;
}
type SessionMultiSelectStore = SessionMultiSelectState & SessionMultiSelectActions;
export declare const useSessionMultiSelectStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SessionMultiSelectStore>>;
export {};
