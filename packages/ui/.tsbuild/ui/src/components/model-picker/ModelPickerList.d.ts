import React from 'react';
type ProviderModel = Record<string, unknown> & {
    id?: string;
    name?: string;
};
export type ModelPickerProvider = {
    id: string;
    name?: string;
    models?: ProviderModel[];
};
export type ModelPickerEntry = {
    model: ProviderModel;
    providerID: string;
    modelID: string;
};
type ModelPickerFavoriteEntry = ModelPickerEntry;
type HiddenModel = {
    providerID: string;
    modelID: string;
};
interface ModelPickerListProps {
    providers: ModelPickerProvider[];
    favoriteModels: ModelPickerFavoriteEntry[];
    recentModels: ModelPickerFavoriteEntry[];
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    onSelect: (entry: ModelPickerEntry) => void;
    labels: {
        searchPlaceholder: string;
        /** Screen reader name of the list of models. */
        list: string;
        noResults: string;
        favorites: string;
        recent: string;
        keyboardHint: string;
        notSelected?: string;
        favorite?: string;
        unfavorite?: string;
        provider?: string;
        capabilities?: string;
        capabilityToolCalling?: string;
        capabilityReasoning?: string;
        input?: string;
        output?: string;
        costPerMillion?: string;
    };
    selectedModel?: {
        providerID: string;
        modelID: string;
    } | null;
    /**
     * A row pinned above favorites and providers: the Auto routing entry. It is
     * not one of `providers`, takes part in keyboard navigation like any row,
     * and is filtered by the search query on its display name.
     */
    leadingEntry?: ModelPickerEntry | null;
    /**
     * An action pinned right after the leading entry (the composer's "Run on
     * several models"). It is not a model, but it looks and navigates like a
     * row: arrows and the pointer highlight it, Enter runs it. It hides while a
     * search query is typed.
     */
    leadingAction?: {
        label: string;
        icon: React.ReactNode;
        onSelect: () => void;
    } | null;
    hiddenModels?: HiddenModel[];
    allowedProviderIds?: string[];
    /**
     * Per-model gate, for callers whose feature needs a capability rather than a
     * provider (e.g. structured output). Applied on top of `allowedProviderIds`.
     */
    isModelAllowed?: (providerID: string, modelID: string) => boolean;
    includeNotSelected?: boolean;
    onSelectNone?: () => void;
    selectionCount?: (entry: ModelPickerEntry) => number;
    disabled?: boolean;
    maxHeightClassName?: string;
    maxHeightStyle?: React.CSSProperties;
    sectionHeaderClassName?: string;
    rowClassName?: string;
    stickyHeaders?: boolean;
    autoFocus?: boolean;
    onEscape?: () => void;
    isFavorite?: (entry: ModelPickerEntry) => boolean;
    onToggleFavorite?: (entry: ModelPickerEntry) => void;
    renderRowEnd?: (entry: ModelPickerEntry, state: {
        isHighlighted: boolean;
        isSelected: boolean;
    }) => React.ReactNode;
    onActiveKeyDown?: (event: React.KeyboardEvent, entry: ModelPickerEntry | undefined) => void;
    onActiveEntryChange?: (entry: ModelPickerEntry | undefined) => void;
    onVariantKey?: (event: React.KeyboardEvent, entry: ModelPickerEntry) => boolean;
    onReorderFavorite?: (active: ModelPickerEntry, over: ModelPickerEntry) => void;
    reorderFavoriteAriaLabel?: string;
    reorderFavoriteTitle?: string;
    providerOrder?: string[];
    onReorderProvider?: (orderedProviderIDs: string[]) => void;
    reorderProviderTitle?: string;
    footerContent?: React.ReactNode | ((activeEntry: ModelPickerEntry | undefined) => React.ReactNode);
    renderVersion?: number;
    tooltipsEnabled?: boolean;
}
export declare const ModelPickerList: React.FC<ModelPickerListProps>;
export {};
