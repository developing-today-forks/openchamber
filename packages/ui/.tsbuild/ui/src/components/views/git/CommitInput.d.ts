import React from 'react';
interface CommitInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
    placeholder?: string;
    disabled?: boolean;
    hasTouchInput?: boolean;
    isMobile?: boolean;
}
export declare const CommitInput: React.FC<CommitInputProps>;
export {};
