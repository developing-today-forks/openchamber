/** Every mount returns this. `update` merges props and repaints; `dispose` removes the node and every listener. */
export type Handle<P> = {
    update: (next: Partial<P>) => void;
    dispose: () => void;
};
export declare const clearNode: (node: Element) => void;
export declare const ensureStyle: (css: string) => void;
export declare const el: <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string) => HTMLElementTagNameMap[K];
export declare const button: (className: string) => HTMLButtonElement;
/** Writes text only when it changed so a repaint does not disturb selection or layout. */
export declare const setText: (node: Element, text: string | null | undefined) => void;
/** Sets or removes an attribute depending on whether a value is present. */
export declare const setAttr: (node: Element, name: string, value: string | null | undefined) => void;
/** Runs `handler` on a pointer press outside `node`. Returns the disposer. */
export declare const onOutsideClick: (node: Element, handler: () => void) => (() => void);
