export declare const SESSION_EXPANDED_STORAGE_KEY = "oc.sessions.expandedParents.v3";
export declare const useExpandedParents: () => {
    expandedParents: Set<string>;
    toggleParent: (key: string) => void;
};
