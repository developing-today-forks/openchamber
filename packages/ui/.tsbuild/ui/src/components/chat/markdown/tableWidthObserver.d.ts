/** Calls onWidthChange whenever the target's width changes; height changes are ignored. */
export declare const observeMarkdownTableWidth: (target: HTMLElement, onWidthChange: () => void) => (() => void);
