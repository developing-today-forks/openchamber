import React from 'react';
interface MobileModelButtonProps {
    onOpenModel: () => void;
    className?: string;
    model?: {
        providerId: string;
        modelId: string;
    } | null;
}
export declare const MobileModelButton: React.FC<MobileModelButtonProps>;
export {};
