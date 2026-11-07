export type MarkdownTokenRun = [length: number, color: string, fontStyle: number];
export type MarkdownWorkerRequest = {
    type: 'init';
} | {
    type: 'highlight';
    id: number;
    code: string;
    lang: string;
    fullPass?: boolean;
} | {
    type: 'highlightFrom';
    id: number;
    code: string;
    lang: string;
    fromLine: number;
} | {
    type: 'highlightLines';
    id: number;
    code: string;
    lang: string;
} | {
    type: 'highlightTokens';
    id: number;
    code: string;
    lang: string;
    themeName: string;
    theme?: unknown;
};
export type MarkdownWorkerResponse = {
    type: 'highlight';
    id: number;
    html: string;
} | {
    type: 'highlightFrom';
    id: number;
    fromLine: number;
    open: string;
    close: string;
    lines: string[];
} | {
    type: 'highlightLines';
    id: number;
    lines: string[];
} | {
    type: 'highlightTokens';
    id: number;
    lines: MarkdownTokenRun[][];
} | {
    type: 'error';
    id: number;
    message: string;
};
