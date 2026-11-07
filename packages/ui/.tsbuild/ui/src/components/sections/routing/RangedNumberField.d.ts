import React from 'react';
/** A form number that commits on blur or Enter and refuses values outside its range. */
export declare const RangedNumberField: React.FC<{
    label: string;
    value: number | undefined;
    min: number;
    max: number;
    step?: number | 'any';
    placeholder?: string;
    disabled?: boolean;
    onCommit: (value: number | undefined) => void;
}>;
