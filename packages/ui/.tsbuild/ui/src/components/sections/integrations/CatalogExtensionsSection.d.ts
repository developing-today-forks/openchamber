import React from 'react';
interface CatalogExtensionsSectionProps {
    divider?: boolean;
}
/**
 * OpenChamber extensions the team publishes (Excalidraw, Resource Monitor), offered with a
 * one-click Git install. The installed extension is an ordinary entry in
 * Settings → Extensions; these cards read the same catalog. Hidden where the
 * runtime loads no extensions (VS Code, mobile).
 */
export declare const CatalogExtensionsSection: React.FC<CatalogExtensionsSectionProps>;
export {};
