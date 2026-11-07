import React from 'react';
export interface SkillAutocompleteHandle {
    handleKeyDown: (key: string) => void;
}
interface SkillAutocompleteProps {
    searchQuery: string;
    onSkillSelect: (skillName: string) => void;
    onClose: () => void;
    style?: React.CSSProperties;
}
export declare const SkillAutocomplete: React.ForwardRefExoticComponent<SkillAutocompleteProps & React.RefAttributes<SkillAutocompleteHandle>>;
export {};
