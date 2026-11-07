import React from 'react';
interface SettingsInfoHintProps {
    children: React.ReactNode;
    className?: string;
    /** Tooltip panel width cap. @default 'max-w-sm' */
    contentClassName?: string;
}
/**
 * Info icon revealing helper text on hover or click (click covers touch
 * devices, where hover tooltips never open). Clicking outside closes it.
 * Settings pages hide secondary descriptions behind this to keep the
 * default view quiet.
 */
export declare const SettingsInfoHint: React.FC<SettingsInfoHintProps>;
export {};
