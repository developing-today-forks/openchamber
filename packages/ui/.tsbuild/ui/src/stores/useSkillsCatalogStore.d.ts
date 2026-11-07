import type { SkillsCatalogResponse, SkillsCatalogSource, SkillsCatalogItem, SkillsRepoScanRequest, SkillsRepoScanResponse, SkillsInstallRequest, SkillsInstallResponse, SkillsInstallError } from '@/lib/api/types';
interface SkillsCatalogState {
    sources: SkillsCatalogSource[];
    itemsBySource: Record<string, SkillsCatalogItem[]>;
    selectedSourceId: string | null;
    loadedSourceIds: Record<string, boolean>;
    isLoadingCatalog: boolean;
    isLoadingSource: boolean;
    isScanning: boolean;
    isInstalling: boolean;
    lastCatalogError: SkillsCatalogResponse['error'] | null;
    lastScanError: SkillsRepoScanResponse['error'] | null;
    lastInstallError: SkillsInstallError | null;
    scanResults: SkillsCatalogItem[] | null;
    setSelectedSource: (id: string | null) => void;
    loadCatalog: (options?: {
        refresh?: boolean;
    }) => Promise<boolean>;
    loadSource: (sourceId: string, options?: {
        refresh?: boolean;
    }) => Promise<boolean>;
    scanRepo: (request: SkillsRepoScanRequest) => Promise<SkillsRepoScanResponse>;
    installSkills: (request: SkillsInstallRequest, options?: {
        directory?: string | null;
    }) => Promise<SkillsInstallResponse>;
}
export declare const useSkillsCatalogStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SkillsCatalogState>, "devtools" | "setState"> & {
    setState(partial: Partial<SkillsCatalogState> | SkillsCatalogState | ((state: SkillsCatalogState) => Partial<SkillsCatalogState> | SkillsCatalogState), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: SkillsCatalogState | ((state: SkillsCatalogState) => SkillsCatalogState), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export {};
