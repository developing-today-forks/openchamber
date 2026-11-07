import React from 'react';
interface ProviderLogoProps {
    providerId: string;
    alt?: string;
    className?: string;
    onError?: () => void;
    /** Show the provider's own logo even when the user picked an icon for it. */
    ignoreCustomIcon?: boolean;
}
export declare const ProviderLogo: React.FC<ProviderLogoProps>;
export {};
