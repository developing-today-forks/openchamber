import React from 'react';
interface SettingsSidebarLayoutProps {
    /** Header content (typically SettingsSidebarHeader) */
    header?: React.ReactNode;
    /** Footer content (e.g., AboutSettings on mobile) */
    footer?: React.ReactNode;
    /** Main scrollable content */
    children: React.ReactNode;
    /** Additional className for the outer container */
    className?: string;
    /** Background style for the sidebar container */
    variant?: 'sidebar' | 'background';
}
/**
 * Standard layout wrapper for settings sidebars.
 * Provides consistent background, scrolling, and header/footer slots.
 *
 * @example
 * <SettingsSidebarLayout
 *   header={<SettingsSidebarHeader count={items.length} onAdd={handleAdd} />}
 * >
 *   {items.map(item => (
 *     <SettingsSidebarItem key={item.id} ... />
 *   ))}
 * </SettingsSidebarLayout>
 */
export declare const SettingsSidebarLayout: React.FC<SettingsSidebarLayoutProps>;
export {};
