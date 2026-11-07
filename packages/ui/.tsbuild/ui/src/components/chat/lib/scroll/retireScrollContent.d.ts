type ScrollContentContainer = {
    readonly isConnected: boolean;
    replaceChildren(): void;
};
/** Release a retired timeline after React finishes detaching its tree. */
export declare const retireScrollContent: (node: ScrollContentContainer, isCurrent: () => boolean) => void;
export {};
