import React from 'react';
interface BusyDotsProps {
    className?: string;
}
/**
 * Dots after a label for as long as the model thinks or a connection is made,
 * one step a second on the shared clock. Hidden dots keep their width, so the
 * label beside them never moves.
 */
export declare const BusyDots: React.FC<BusyDotsProps>;
export {};
