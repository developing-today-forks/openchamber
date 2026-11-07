import React from 'react';
type Props = {
    /** The committed sidebar query that matched nothing. */
    query: string;
    /** Whether the Archive page exists here; VS Code keeps its archive inline. */
    showArchive: boolean;
    resetSessionSearch: () => void;
};
/** The sidebar's no-match state, with a way to continue the same search in the Archive. */
export declare function SidebarSearchEmptyState({ query, showArchive, resetSessionSearch }: Props): React.ReactNode;
export {};
