import React from 'react';
import type { ContextUsageReading } from '@/components/ui/contextUsageReading';
interface ContextUsageDisplayProps {
    reading: ContextUsageReading;
    contextLimit: number;
    outputLimit?: number;
    cost?: number | null;
    size?: 'default' | 'compact';
    isMobile?: boolean;
    hideIcon?: boolean;
    showPercentIcon?: boolean;
    className?: string;
    valueClassName?: string;
    percentIconClassName?: string;
    onClick?: () => void;
    pressed?: boolean;
}
export declare const ContextUsageDisplay: React.FC<ContextUsageDisplayProps>;
export {};
