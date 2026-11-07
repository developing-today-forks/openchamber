type SelectionNode = {
    type: 'text';
    value: string;
} | {
    type: 'element';
    tag: string;
    className: string;
    href: string;
    component: string;
    markdownLanguage: string;
    isMarkdownBlock: boolean;
    isCodeLines: boolean;
    children: SelectionNode[];
};
export declare const trimSelectionValue: (value: string) => string;
export declare const formatCodeSelectionMarkdown: (code: string, language?: string) => string;
export declare const selectionNodesToMarkdown: (nodes: SelectionNode[], plainText: string) => string;
export declare const rangeToMarkdown: (range: Range, plainText: string) => string;
export declare const wrapMarkdownSelectionForChat: (markdown: string) => string;
export {};
