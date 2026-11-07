import type { GuestStatusControl } from '@openchamber/sdk';
import type React from 'react';
type Props = {
    controls: GuestStatusControl[];
    onActivate: (id: string, value?: string) => void;
    layout: 'inline' | 'below';
};
export declare const StatusHeaderControls: React.FC<Props>;
export {};
