import React from 'react';
import type { DiscoveredModel } from './custom-provider-form';
type Props = {
    models: readonly DiscoveredModel[];
    /** Model ids already in the form; they show as added and cannot be picked again. */
    existingIds: ReadonlySet<string>;
    onAdd: (selected: DiscoveredModel[]) => void;
    onCancel: () => void;
};
/**
 * The one-time review step after asking a provider for its models: pick
 * which ones to add, then the panel closes. Nothing here stays in sync with
 * the provider afterwards.
 */
export declare const CustomProviderModelDiscovery: React.FC<Props>;
export {};
