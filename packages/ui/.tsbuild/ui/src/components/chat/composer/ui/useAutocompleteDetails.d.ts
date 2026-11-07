import React from 'react';
export declare function useAutocompleteDetails(selectedIndex: number, itemRefs: React.RefObject<(HTMLDivElement | null)[]>): {
    listRef: React.RefObject<HTMLElement | null>;
    detailsVisible: boolean;
    onListScroll: React.UIEventHandler<HTMLElement>;
    onItemMouseMove: () => void;
    onKeyboardNavigate: () => void;
};
