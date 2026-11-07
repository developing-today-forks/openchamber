import React from 'react';
interface ModelSelectorProps {
    providerId: string;
    modelId: string;
    onChange: (providerId: string, modelId: string) => void;
    className?: string;
    allowedProviderIds?: string[];
    isModelAllowed?: (providerId: string, modelId: string) => boolean;
    placeholder?: string;
    tooltipsEnabled?: boolean;
    dropdownPortalToBody?: boolean;
    directory?: string;
    /**
     * Drop the model name and the chevron, leaving the provider logo. For
     * headers that run out of room before they run out of controls — the logo
     * still says which provider is answering, which is the part a glance is
     * usually after.
     */
    compact?: boolean;
    /**
     * Offer the Auto routing row on top, as the composer does. Only for
     * selections that are later sent through the routing rewrite (Session
     * Defaults); a routing category or fallback must name a real model.
     */
    offerAuto?: boolean;
}
export declare const ModelSelector: React.FC<ModelSelectorProps>;
export {};
