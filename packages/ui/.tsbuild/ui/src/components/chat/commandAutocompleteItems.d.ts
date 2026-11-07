export interface CommandAutocompleteSearchItem {
    name: string;
    description?: string;
    searchAliases?: string[];
    isBuiltIn?: boolean;
}
/**
 * Precedence is built-in command, then custom/plugin command. Identity matches
 * session.command's case-sensitive lookup.
 */
export declare function mergeCommandAutocompleteItems<T extends CommandAutocompleteSearchItem>(builtIns: T[], commands: T[]): T[];
export declare function commandMatchesSearch(command: CommandAutocompleteSearchItem, query: string): boolean;
export declare function rankCommandAutocompleteItems<T extends CommandAutocompleteSearchItem>(commands: T[], query: string): T[];
