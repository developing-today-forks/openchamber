import React from 'react';
interface FireworksContextValue {
    triggerFireworks: () => void;
    dismissFireworks: () => void;
}
export declare const FireworksProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useFireworksCelebration: () => FireworksContextValue;
export {};
