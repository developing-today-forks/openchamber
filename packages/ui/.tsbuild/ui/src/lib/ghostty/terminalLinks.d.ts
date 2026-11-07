export interface TerminalLinkMatch {
    readonly text: string;
    readonly start: number;
    readonly end: number;
}
export interface TerminalBufferLineLike {
    readonly isWrapped?: boolean;
    translateToString(trimRight?: boolean): string;
}
export interface WrappedTerminalLinkLineSegment {
    readonly bufferLineNumber: number;
    readonly text: string;
    readonly startIndex: number;
    readonly endIndex: number;
}
export interface WrappedTerminalLinkLine {
    readonly text: string;
    readonly segments: ReadonlyArray<WrappedTerminalLinkLineSegment>;
}
/** http(s) URLs in one logical line, with trailing punctuation and unbalanced brackets trimmed. */
export declare function extractTerminalLinks(line: string): TerminalLinkMatch[];
/**
 * Joins a soft-wrapped line back together so a URL that the terminal broke
 * across rows matches as one string, remembering where each row's text sits.
 */
export declare function collectWrappedTerminalLinkLine(bufferLineNumber: number, getLine: (bufferLineIndex: number) => TerminalBufferLineLike | null | undefined): WrappedTerminalLinkLine | null;
