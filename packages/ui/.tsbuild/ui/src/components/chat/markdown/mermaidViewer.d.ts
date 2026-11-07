type MermaidViewBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};
type MermaidViewport = {
    width: number;
    height: number;
};
type MermaidPoint = {
    x: number;
    y: number;
};
type MermaidViewerController = {
    zoomIn: () => void;
    zoomOut: () => void;
    fit: () => void;
    cleanup: () => void;
};
type MermaidSvgBoundsSource = {
    viewBox?: string | null;
    width?: string | number | null;
    height?: string | number | null;
};
type MermaidViewerSignatureSource = MermaidSvgBoundsSource & {
    renderMode?: string | null;
    svgMarkup?: string | null;
};
export declare const MERMAID_BLOCK_SELECTOR = "[data-markdown=\"mermaid-block\"]";
export declare const shouldRefreshMermaidViewers: (container: Pick<HTMLElement, 'querySelector'>) => boolean;
export declare const formatMermaidViewBox: (box: MermaidViewBox) => string;
export declare const getMermaidSvgContentBox: (source: MermaidSvgBoundsSource) => MermaidViewBox | null;
export declare const getMermaidViewerSignature: (source: MermaidViewerSignatureSource) => string;
export declare const fitMermaidViewBox: (contentBox: MermaidViewBox, viewport: MermaidViewport) => MermaidViewBox;
export declare const panMermaidViewBox: ({ currentBox, viewport, delta, }: {
    currentBox: MermaidViewBox;
    viewport: MermaidViewport;
    delta: MermaidPoint;
}) => MermaidViewBox;
export declare const hasMermaidPointerDragMoved: (start: MermaidPoint, current: MermaidPoint) => boolean;
export declare const getMermaidPinch: (points: readonly MermaidPoint[]) => {
    distance: number;
    center: MermaidPoint;
} | null;
export declare const zoomMermaidViewBoxAtPoint: ({ currentBox, contentBox, viewport, pointer, zoomFactor, minScale, maxScale, }: {
    currentBox: MermaidViewBox;
    contentBox: MermaidViewBox;
    viewport: MermaidViewport;
    pointer: MermaidPoint;
    zoomFactor: number;
    minScale: number;
    maxScale: number;
}) => MermaidViewBox;
export declare const getMermaidViewerController: (block: Element | null) => MermaidViewerController | null;
export declare const createMermaidViewerRegistry: (container: HTMLElement) => {
    refresh: () => void;
    cleanup: () => void;
};
export {};
