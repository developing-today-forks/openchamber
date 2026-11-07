interface SkillAutocompleteSearchItem {
    name: string;
    scope: string;
}
export declare function rankSkillAutocompleteItems<T extends SkillAutocompleteSearchItem>(skills: readonly T[], query: string): T[];
export {};
