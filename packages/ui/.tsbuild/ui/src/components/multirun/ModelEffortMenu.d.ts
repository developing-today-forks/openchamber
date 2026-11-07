import React from 'react';
/**
 * Thinking effort (model variant) picker for one model; renders nothing for
 * models without variants. `inline` sits inside a model chip, `trigger` stands
 * next to a model picker button.
 */
export declare function ModelEffortMenu({ providerID, modelID, variant, onChange, appearance, disabled }: {
    providerID: string;
    modelID: string;
    variant: string | undefined;
    onChange: (variant: string | undefined) => void;
    appearance?: 'inline' | 'trigger';
    disabled?: boolean;
}): React.ReactNode;
