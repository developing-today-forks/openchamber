type ParsedMultiRunTitle = {
    groupSlug: string;
    runGroup?: string;
    providerID: string;
    modelID: string;
    index?: number;
    fusion: boolean;
};
export declare const parseMultiRunSessionTitle: (title?: string | null) => ParsedMultiRunTitle | null;
export declare const getMultiRunSessionTitle: (parts: {
    groupSlug: string;
    runGroup?: string;
    providerID: string;
    modelID: string;
    index?: number;
}) => string;
export declare const getFusionSessionTitle: (groupSlug: string, providerID: string, modelID: string, runGroup?: string) => string;
export {};
