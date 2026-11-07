import React from 'react';
/**
 * The panel's search, floating over the top of the list the way the chat's
 * search floats over the conversation. It opens from the search button in the
 * panel header and filters every section at once; the section tabs show where
 * the matches are. Escape or the close button closes it and clears the query.
 */
export declare const KnowledgeSearchBar: React.FC<{
    query: string;
    onQueryChange: (query: string) => void;
    placeholder: string;
    /** No section has a match for a non-empty query. */
    nothingFound: boolean;
    /** Bumped every time the search is opened: focus and select the query. */
    focusRequest: number;
    onClose: () => void;
}>;
