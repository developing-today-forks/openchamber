type ScrollSpyInput = {
    onActive: (id: string) => void;
    raf?: (cb: FrameRequestCallback) => number;
    caf?: (id: number) => void;
    ResizeObserver?: typeof globalThis.ResizeObserver;
    MutationObserver?: typeof globalThis.MutationObserver;
};
export declare const createScrollSpy: (input: ScrollSpyInput) => {
    setContainer: (element?: HTMLDivElement) => void;
    register: (element: HTMLElement, key: string) => void;
    unregister: (key: string) => void;
    onScroll: () => void;
    markDirty: () => void;
    clear: () => void;
    destroy: () => void;
    getActiveId: () => string | undefined;
};
export {};
