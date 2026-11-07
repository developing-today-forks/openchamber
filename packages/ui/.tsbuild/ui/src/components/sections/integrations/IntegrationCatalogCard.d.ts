import React from 'react';
export type IntegrationCatalogStatusTone = 'success' | 'warning' | 'neutral';
type IntegrationCatalogCardProps = {
    settingsItem?: string;
    logo: React.ReactNode;
    name: string;
    description: string;
    /** Pills shown before the status pill (bundled, update available). */
    badges?: React.ReactNode;
    status: string;
    statusTone: IntegrationCatalogStatusTone;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** The expanded body: actions and notes. */
    children: React.ReactNode;
};
/**
 * One collapsible card on the Integrations page: logo, name,
 * one-line description, status pill. Every integration, built-in or from an
 * extension, renders through it, so the cards stay identical.
 */
export declare const IntegrationCatalogCard: React.FC<IntegrationCatalogCardProps>;
export {};
