import { type RenderedCopyFormat } from './selectionMarkdown';
export type MermaidRender = {
    svg?: string;
    ascii?: string;
};
export type DecorateLabels = {
    copy: string;
    copied: string;
    enableCodeWrap: string;
    disableCodeWrap: string;
    enableTableWrap: string;
    disableTableWrap: string;
    copyTable: string;
    downloadTable: string;
    copyDiagram: string;
    downloadDiagram: string;
    zoomInDiagram: string;
    zoomOutDiagram: string;
    resetDiagramView: string;
    previewLabel: string;
    previewTitle: string;
};
export type MermaidControlOptions = {
    download: boolean;
    copy: boolean;
    showPanZoomControls: boolean;
};
export type DecorateContext = {
    labels: DecorateLabels;
    mermaidControls: MermaidControlOptions;
    codeBlockLineWrap: boolean;
    onToggleCodeBlockLineWrap?: () => void;
    tableCellWrap: boolean;
    onToggleTableCellWrap?: () => void;
    renderMermaid: (source: string) => MermaidRender;
    onPreviewLoopback?: (url: string) => void;
    getCopyFormat?: () => RenderedCopyFormat;
};
export declare const applyMarkdownCodeBlockWrapState: (root: HTMLElement, enabled: boolean, labels: DecorateLabels) => void;
/** Sync table wrap buttons with the current mode; column widths follow in stabilizeMarkdownTableWidths. */
export declare const applyMarkdownTableWrapState: (root: HTMLElement, enabled: boolean, labels: DecorateLabels) => void;
/**
 * Fits the tables' columns to the available width. With `cachedOnly`, it
 * refits only from widths measured before and does nothing, returning false,
 * when any table would need measuring: a caller following a resize on every
 * frame can afford arithmetic, not a measurement.
 */
export declare const stabilizeMarkdownTableWidths: (root: HTMLElement, wrapCells: boolean, options?: {
    cachedOnly?: boolean;
}) => boolean;
/** Run all idempotent DOM decoration passes over freshly-rendered markdown. */
export declare const decorateMarkdown: (root: HTMLElement, ctx: DecorateContext) => void;
/**
 * Attach a single delegated click listener for all in-markdown actions: code
 * copy, table copy/download menus, mermaid copy/download, loopback preview.
 * Returns a cleanup function.
 */
export declare const attachMarkdownInteractions: (container: HTMLElement, ctx: DecorateContext) => (() => void);
