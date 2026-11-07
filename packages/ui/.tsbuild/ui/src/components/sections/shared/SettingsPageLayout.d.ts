import React from 'react';
interface SettingsPageLayoutProps {
    /** Page content */
    children: React.ReactNode;
    /** Optional page title shown above settings content. */
    title?: React.ReactNode;
    /** Optional content rendered before a string/number page title. */
    titleLeading?: React.ReactNode;
    /** Optional content rendered after a string/number page title. */
    titleAccessory?: React.ReactNode;
    /** Optional supporting description under the page title. */
    description?: React.ReactNode;
    /** Optional content rendered at the end of the header row (before save status). */
    headerEnd?: React.ReactNode;
    /** Show persistence feedback for instant-save settings. */
    showSaveStatus?: boolean;
    /**
     * Commit-on-blur for autosaving pages: fires for every focus leaving the
     * page content, so a text field does not need its own handler.
     */
    onBlurCapture?: React.FocusEventHandler;
    /** Additional className for the content container */
    className?: string;
    /** Additional className for the outer ScrollableOverlay */
    outerClassName?: string;
}
/**
 * Standard layout wrapper for settings page content.
 * UI Kit: max-width 840px, padding 32px vertical / 48px horizontal.
 */
export declare const SettingsPageLayout: React.FC<SettingsPageLayoutProps>;
export {};
