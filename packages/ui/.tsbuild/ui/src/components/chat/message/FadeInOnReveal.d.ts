import React from 'react';
interface FadeInOnRevealProps {
    children: React.ReactNode;
    className?: string;
    skipAnimation?: boolean;
    forceAnimation?: boolean;
    ignoreContextDisabled?: boolean;
    respectReducedMotion?: boolean;
}
export declare const FadeInDisabledProvider: React.FC<{
    disabled: boolean;
    children: React.ReactNode;
}>;
export declare const FadeInOnReveal: React.FC<FadeInOnRevealProps>;
export {};
