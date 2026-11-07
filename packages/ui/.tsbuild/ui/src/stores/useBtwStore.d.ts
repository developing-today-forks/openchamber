import type { PermissionMode } from './utils/permissionAutoAccept';
import { type Agent } from '@/lib/opencode/model';
type BtwModelSelection = {
    providerId: string;
    modelId: string;
};
export type BtwSelection = {
    agent: string | undefined;
    model: BtwModelSelection | null;
    variant: string | null | undefined;
};
/**
 * Whether a saved btw model can still be used, judged against the catalog the
 * model picker renders. Auto is never in that catalog: it is valid exactly
 * while routing can honour it, as `hasProviderModel` in useConfigStore says.
 * An empty catalog has not loaded (or failed to), so it cannot say a model is
 * gone: there is no check then and the saved model wins.
 */
export declare const btwModelAvailability: (providers: readonly {
    id: string;
    models: readonly {
        id: string;
        modelID: string;
    }[];
}[], autoReady: boolean) => ((model: BtwModelSelection) => boolean) | undefined;
export declare const resolveBtwSelection: ({ agents, savedAgent, savedModel, savedVariant, composerModel, composerVariant, isModelAvailable }: {
    agents: readonly Pick<Agent, 'name' | 'hidden' | 'mode'>[];
    savedAgent: string | null;
    savedModel: BtwModelSelection | null;
    savedVariant?: string | null;
    composerModel: BtwModelSelection | null;
    composerVariant: string | null | undefined;
    /** Live-catalog check; when omitted the saved model wins, as before. */
    isModelAvailable?: (model: BtwModelSelection) => boolean;
}) => BtwSelection;
/**
 * UI-only state for the `/btw` peek panel.
 *
 * The panel's identity is NOT stored here: it is derived from session
 * metadata (`openchamber.btwSessionID` on the parent — see
 * `sessionBtwMetadata`), so the panel appears only in the session `/btw` was
 * typed into and survives reloads. This store keeps only transient
 * per-parent presentation state that has no authoritative home:
 *
 * - `collapsed`: the panel is minimized to the composer chip; the composer
 *   talks to the main session again until it is expanded.
 * - `creating`: `/btw` is between submit and the parent-metadata link
 *   landing, so the panel can show its starting state immediately.
 * - `destroying`: close was clicked; hides the panel optimistically while the
 *   unlink/delete round-trip completes.
 * - `pending`: `/btw` has opened an unsent local composer. No fork exists yet.
 */
type BtwPanelUIState = {
    collapsed?: boolean;
    creating?: boolean;
    destroying?: boolean;
    pending?: boolean;
    /** The shield button's choice for the fork; absent means the new session takes the default from Settings. */
    pendingPermissionMode?: PermissionMode;
    pendingSend?: symbol;
};
type BtwStore = {
    byParent: Record<string, BtwPanelUIState>;
    setPanelState: (parentSessionId: string, patch: BtwPanelUIState) => void;
    clearPanelState: (parentSessionId: string) => void;
};
export declare const useBtwStore: import("zustand").UseBoundStore<import("zustand").StoreApi<BtwStore>>;
export {};
