export type TerminalModifier = 'ctrl' | 'alt';
export type TerminalQuickKey = 'esc' | 'tab' | 'enter' | 'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right';
export declare const terminalSequenceForKey: (key: TerminalQuickKey, modifier: TerminalModifier | null) => string;
export declare const terminalControlCharacter: (value: string) => string | null;
export declare const applyTerminalModifier: (value: string, modifier: TerminalModifier) => string;
