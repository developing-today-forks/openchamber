import * as React from 'react';
import '@/styles/fireworks.css';
declare const DEFAULT_BURSTS: {
    id: string;
    x: number;
    y: number;
    delay: number;
    radius: number;
    colorVar: string;
}[];
interface FireworksAnimationProps {
    isActive: boolean;
    burstKey?: number;
    className?: string;
    durationMs?: number;
    bursts?: typeof DEFAULT_BURSTS;
    onComplete?: () => void;
}
export declare const FireworksAnimation: React.FC<FireworksAnimationProps>;
export {};
