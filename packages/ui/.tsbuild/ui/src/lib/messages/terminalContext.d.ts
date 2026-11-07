type TerminalContext = {
    terminalId: string;
    terminalLabel: string;
    startLine: number;
    endLine: number;
    text: string;
};
type ParsedTerminalContext = Omit<TerminalContext, 'terminalId'>;
export declare const normalizeTerminalContext: (context: TerminalContext) => TerminalContext | null;
export declare const terminalContextKey: (context: TerminalContext) => string;
export declare const appendTerminalContexts: (prompt: string, contexts: readonly TerminalContext[]) => string;
export declare const extractTerminalContexts: (prompt: string) => {
    visibleText: string;
    contexts: ParsedTerminalContext[];
};
export {};
