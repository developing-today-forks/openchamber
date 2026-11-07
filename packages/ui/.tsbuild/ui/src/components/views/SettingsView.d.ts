import React from 'react';
import { type SettingsPageSlug } from '@/lib/settings/metadata';
type MobileStage = 'nav' | 'page-sidebar' | 'page-content';
interface SettingsViewProps {
    onClose?: () => void;
    /** Force mobile layout regardless of device detection */
    forceMobile?: boolean;
    /** Rendered inside a window/dialog (skip traffic light padding) */
    isWindowed?: boolean;
    /** Restrict top-level settings navigation to a specific product surface. */
    visiblePageSlugs?: SettingsPageSlug[];
    /** Lets a native shell hand its hardware back button to the mobile stages:
        the handler steps one level up and reports whether it consumed the press. */
    registerBackHandler?: (handler: (() => boolean) | null) => void;
    initialMobileStage?: MobileStage;
}
export declare const SettingsView: React.FC<SettingsViewProps>;
export {};
