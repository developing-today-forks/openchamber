interface UseProviderLogoReturn {
    src: string | null;
    onError: () => void;
    hasLogo: boolean;
}
export declare const preloadProviderLogos: (providerIds: readonly (string | null | undefined)[]) => void;
export declare function useProviderLogo(providerId: string | null | undefined): UseProviderLogoReturn;
export {};
