import React from 'react';
type SessionSearchInputProps = {
    value: string;
    onSearch: (query: string) => void;
    placeholder: string;
    clearLabel: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    onClose?: () => void;
    active?: boolean;
    mobile?: boolean;
    /** Replaces the Enter hint on the left of the hint row (e.g. a match count). */
    leadingHint?: React.ReactNode;
    /** Right-aligned hint on the same row as the Enter hint. */
    trailingHint?: React.ReactNode;
};
export declare function SessionSearchInput({ value, onSearch, placeholder, clearLabel, inputRef, onClose, active, mobile, leadingHint, trailingHint, }: SessionSearchInputProps): import("react/jsx-runtime").JSX.Element;
export {};
