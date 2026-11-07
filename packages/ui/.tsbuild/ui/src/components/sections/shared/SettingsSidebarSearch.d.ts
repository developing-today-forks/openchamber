import React from 'react';
/**
 * Filter field for Settings list sidebars (agents, commands, skills). The list
 * keeps its own grouping and order; the query only hides rows that don't match.
 */
export declare const SettingsSidebarSearch: React.FC<{
    value: string;
    onChange: (value: string) => void;
}>;
/** Shown in place of the list when a query hides every row. */
export declare const SettingsSidebarNoMatches: React.FC<{
    query: string;
}>;
