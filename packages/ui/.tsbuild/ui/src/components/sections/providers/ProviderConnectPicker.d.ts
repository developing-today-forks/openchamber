import React from 'react';
import { type ConnectableProvider } from './connectableProviders';
interface ProviderConnectPickerProps {
    /** Null until the integration list is read. */
    providers: readonly ConnectableProvider[] | null;
    loadFailed: boolean;
    onSelect: (providerId: string) => void;
    onSelectCustom: () => void;
}
/**
 * The connect page before a provider is chosen: popular providers as cards,
 * every other one as a compact row behind "Show all", and a search that
 * covers all of them.
 */
export declare const ProviderConnectPicker: React.FC<ProviderConnectPickerProps>;
export {};
