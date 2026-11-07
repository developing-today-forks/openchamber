import React from 'react';
/** UI-only type with instanceId for React keys and duplicate tracking */
export interface ModelSelectionWithId {
    providerID: string;
    modelID: string;
    displayName?: string;
    variant?: string;
    instanceId: string;
}
export declare const generateInstanceId: () => string;
interface ModelMultiSelectProps {
    selectedModels: ModelSelectionWithId[];
    onAdd: (model: ModelSelectionWithId) => void;
    onRemove: (index: number) => void;
    onUpdate?: (index: number, model: ModelSelectionWithId) => void;
    /** Minimum models required (shows validation hint) */
    minModels?: number;
    /** Label for the add button */
    addButtonLabel?: string;
    /** Whether to show the selected chips */
    showChips?: boolean;
    /** Maximum models allowed */
    maxModels?: number;
    /** Optional className for add model trigger button */
    addButtonClassName?: string;
    /** Direction for the model picker popup. Multi-run launcher opens upward near the footer. */
    dropdownSide?: 'top' | 'bottom';
    /** Optional className for the picker popup. */
    dropdownClassName?: string;
    /** Optional className for the trigger/dropdown positioning container. */
    containerClassName?: string;
    /** Optional trigger icon override. */
    triggerIcon?: React.ReactNode;
    /**
     * Render the picker over the page instead of inside the trigger's container.
     * Needed inside the composer box, which clips its content.
     */
    portal?: boolean;
    /** Accessible name when the trigger shows only an icon. */
    addButtonAriaLabel?: string;
}
/**
 * Model selector for multi-run (allows selecting same model multiple times).
 */
export declare const ModelMultiSelect: React.FC<ModelMultiSelectProps>;
export {};
