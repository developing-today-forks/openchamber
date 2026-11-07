import React from 'react';
type SettingsColorFieldLabels = {
    /** What an empty value means for this setting ("Automatic", "No color"). */
    empty: string;
    swatch: (color: string) => string;
    custom: string;
    hex: string;
};
/**
 * A user colour stored as six-digit hex: empty, one of the presets, or a
 * custom colour from the system picker with its hex editable next to it.
 * `legacy` is a stored value the field cannot express as hex (a project
 * colour saved by an older build as a theme key); it shows as a selected
 * swatch painted with `legacyCss` until the user picks something else.
 */
export declare const SettingsColorField: React.FC<{
    value: string;
    onChange: (value: string) => void;
    labels: SettingsColorFieldLabels;
    legacyCss?: string | null;
}>;
export {};
