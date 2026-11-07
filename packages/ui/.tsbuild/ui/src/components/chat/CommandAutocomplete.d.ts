import React from 'react';
type CommandSource = 'openchamber' | 'opencode' | 'extension';
export interface CommandInfo {
    id: string;
    name: string;
    source: CommandSource;
    description?: string;
    searchAliases?: string[];
    agent?: string;
    model?: string;
    isBuiltIn?: boolean;
    isOpenChamber?: boolean;
    scope?: string;
    /** Name of the extension that contributed the command; shown as its badge. */
    extensionName?: string;
}
export interface CommandAutocompleteHandle {
    handleKeyDown: (key: string) => void;
}
interface CommandAutocompleteProps {
    searchQuery: string;
    onCommandSelect: (command: CommandInfo) => void;
    onClose: () => void;
    style?: React.CSSProperties;
}
export declare const CommandAutocomplete: React.ForwardRefExoticComponent<CommandAutocompleteProps & React.RefAttributes<CommandAutocompleteHandle>>;
export {};
