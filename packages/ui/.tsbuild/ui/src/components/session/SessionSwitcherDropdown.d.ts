import React from 'react';
type SwitcherVariant = 'default' | 'compact';
type SessionSwitcherDropdownProps = {
    children: React.ReactNode;
    variant?: SwitcherVariant;
    scopeProjectId?: string | null;
    align?: 'start' | 'center' | 'end';
};
export declare function SessionSwitcherDropdown({ children, variant, scopeProjectId, align, }: SessionSwitcherDropdownProps): React.ReactElement;
export {};
