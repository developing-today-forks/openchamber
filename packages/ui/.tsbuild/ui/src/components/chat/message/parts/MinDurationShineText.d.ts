import React from 'react';
interface MinDurationShineTextProps {
    active: boolean;
    minDurationMs?: number;
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    title?: string;
}
export declare const MinDurationShineText: React.FC<MinDurationShineTextProps>;
export {};
