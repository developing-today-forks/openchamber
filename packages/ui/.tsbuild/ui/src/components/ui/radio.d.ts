import React from 'react';
interface RadioProps {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    ariaLabel?: string;
    className?: string;
    iconClassName?: string;
}
export declare const Radio: React.NamedExoticComponent<RadioProps>;
export {};
