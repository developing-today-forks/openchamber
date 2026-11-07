import * as React from 'react';
interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    indeterminate?: boolean;
    ariaLabel?: string;
    className?: string;
    iconClassName?: string;
    /** @deprecated size is fixed; prop retained for backwards compatibility */
    size?: 'sm' | 'default';
}
export declare const Checkbox: React.NamedExoticComponent<CheckboxProps>;
export {};
