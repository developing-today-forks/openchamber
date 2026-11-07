/**
 * Attaches `popup` next to `trigger` and wires the ways it closes: outside press,
 * viewport resize, or scroll. Returns the disposer; the caller decides what `close` does.
 */
export declare const openPopup: (host: Element, trigger: HTMLElement, popup: HTMLElement, close: () => void) => (() => void);
