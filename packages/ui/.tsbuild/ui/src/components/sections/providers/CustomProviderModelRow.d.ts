import React from 'react';
import type { ModelFieldErrors, ModelRow } from './custom-provider-form';
export type ModelTextField = 'id' | 'name' | 'variants' | 'contextWindow' | 'maxOutputTokens';
export type ModelCapabilityList = 'inputCapabilities' | 'outputCapabilities';
type Props = {
    model: ModelRow;
    errors?: ModelFieldErrors;
    expanded: boolean;
    onToggle: () => void;
    onChange: (key: ModelTextField, value: string) => void;
    onToggleCapability: (target: ModelCapabilityList, capability: string) => void;
    onToolsChange: (tools: boolean) => void;
    onRemove?: () => void;
};
/**
 * One model of a custom provider. Collapsed, it reads as a single line (name,
 * id, the limits and anything beyond plain text), so a provider with dozens
 * of imported models stays scannable; the editor opens on demand.
 */
export declare const CustomProviderModelRow: React.FC<Props>;
export {};
