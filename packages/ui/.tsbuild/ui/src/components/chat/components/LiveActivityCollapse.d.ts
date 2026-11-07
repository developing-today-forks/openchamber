import React from 'react';
interface LiveActivityCollapseProps {
    expanded: boolean;
    children: React.ReactNode;
    id?: string;
    animateOnMount?: boolean;
}
export declare function LiveActivityCollapse({ expanded, children, id, animateOnMount }: LiveActivityCollapseProps): import("react/jsx-runtime").JSX.Element;
export {};
