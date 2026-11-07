import React from 'react';
/** Keep the live controls mounted in one portal while moving its host between
 * the section and the viewport. Only the outgoing animation is a visual copy. */
export declare function CrossfadeZoneHeaders({ suspended, layoutKey, scrollRef, children }: {
    suspended?: boolean;
    layoutKey?: string;
    scrollRef: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
type HeaderProps = React.ComponentPropsWithRef<'div'>;
export declare function CrossfadeZoneHeader(props: HeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
