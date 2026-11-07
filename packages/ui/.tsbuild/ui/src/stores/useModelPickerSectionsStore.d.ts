/**
 * Persisted collapsed state for the collapsible sections (accordions) in the
 * model/provider picker (`ModelPickerList`): the `favorites` and `recent`
 * sections plus each `provider:<id>` group. Section keys are stable and shared
 * across every picker surface, so collapsing a provider in one picker is
 * remembered everywhere and survives remounts and full page reloads.
 *
 * Only collapsed keys are stored (presence === collapsed); the default for any
 * unknown key is expanded.
 */
type ModelPickerSectionsStore = {
    collapsedSections: Record<string, boolean>;
    toggleSection: (key: string) => void;
};
export declare const useModelPickerSectionsStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<ModelPickerSectionsStore>, "persist" | "setState"> & {
    setState(partial: ModelPickerSectionsStore | Partial<ModelPickerSectionsStore> | ((state: ModelPickerSectionsStore) => ModelPickerSectionsStore | Partial<ModelPickerSectionsStore>), replace?: false | undefined): unknown;
    setState(state: ModelPickerSectionsStore | ((state: ModelPickerSectionsStore) => ModelPickerSectionsStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ModelPickerSectionsStore, ModelPickerSectionsStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ModelPickerSectionsStore) => void) => () => void;
        onFinishHydration: (fn: (state: ModelPickerSectionsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ModelPickerSectionsStore, ModelPickerSectionsStore, unknown>>;
    };
}>;
export {};
