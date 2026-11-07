export declare const renderTerminalOutput: (output: string) => string;
export declare const getToolOutput: (tool: string, stateOutput: unknown, metadataOutput: unknown, status?: string) => string | undefined;
export declare const getStreamingOutputAppend: (previous: string, next: string) => string | undefined;
