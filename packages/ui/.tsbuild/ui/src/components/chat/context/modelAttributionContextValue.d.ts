import React from 'react';
export declare const ModelAttributionContext: React.Context<Readonly<Record<string, {
    providerID: string;
    modelID: string;
    variant: string | null;
    routeID: string | null;
    selection: {
        mode: string;
        reason: string;
    } | null;
    failover: {
        providerID: string;
        modelID: string;
        variant: string | null;
        errorTag: string | null;
        errorMessage: string | null;
    } | null;
}>>>;
