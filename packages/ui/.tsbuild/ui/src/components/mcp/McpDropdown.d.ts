import React from 'react';
interface McpDropdownProps {
    headerIconButtonClass: string;
}
interface McpDropdownContentProps {
    active: boolean;
    className?: string;
    headerAction?: React.ReactNode;
    /** Fill a host that bounds the height: the list takes the room left and scrolls, in place of the dropdown's fixed cap. */
    fillHeight?: boolean;
    hideHeader?: boolean;
    mobileListDensity?: boolean;
}
export declare const McpDropdownContent: React.FC<McpDropdownContentProps>;
export declare const McpDropdown: React.FC<McpDropdownProps>;
export {};
