import React from 'react';
export type { VisibleSetting } from './appearanceVisibleSettings';
import type { VisibleSetting } from './appearanceVisibleSettings';
interface OpenChamberVisualSettingsProps {
    /** Which settings to show. If undefined, shows all. */
    visibleSettings?: VisibleSetting[];
}
export declare const OpenChamberVisualSettings: React.FC<OpenChamberVisualSettingsProps>;
