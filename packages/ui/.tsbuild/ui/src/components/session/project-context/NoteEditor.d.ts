import React from 'react';
export declare const NoteEditor: React.FC<{
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    ariaLabel: string;
    maxLength: number;
}>;
