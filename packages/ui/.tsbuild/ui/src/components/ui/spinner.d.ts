import React from 'react';
/**
 * The app's loading spinner: eight bars around a circle, the lit one moving
 * one bar forward four times a second on the shared clock
 * (`hooks/useDurationTicker.ts`). Every spinner on screen steps in the same
 * frame, so any number of them draws four frames a second. A CSS spinner draws
 * sixty and keeps the compositor busy for as long as it shows. Size and color
 * come from `className`, like an `Icon`.
 */
export declare const Spinner: React.FC<{
    className?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
}>;
