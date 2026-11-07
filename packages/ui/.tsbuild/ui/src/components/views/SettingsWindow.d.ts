import React from 'react';
interface SettingsWindowProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
/**
 * Settings rendered as a centered window with blurred backdrop.
 * Used for desktop and web (non-mobile) environments.
 */
export declare const SettingsWindow: React.FC<SettingsWindowProps>;
export {};
