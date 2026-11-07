export declare const FILE_REFERENCE_LINK_SELECTOR = "[data-openchamber-file-link=\"true\"]";
type FileReferenceClickGuardOptions = {
    /** File-reference candidate carried by an anchor href, or null when the href is not file-like. */
    hrefCandidate: (anchor: HTMLAnchorElement) => string | null;
    /** True when the candidate is a resolvable file reference. */
    isResolvable: (raw: string) => boolean;
    /**
     * Open the file reference carried by the element. `external` is set for a
     * Cmd-click (macOS) or Ctrl-click: open it in the system's default app.
     */
    openFileReference: (element: HTMLElement, options: {
        external: boolean;
    }) => void;
};
type FileReferenceClickContainer = {
    addEventListener: (type: string, listener: (event: MouseEvent) => void) => void;
    removeEventListener: (type: string, listener: (event: MouseEvent) => void) => void;
    contains: (node: Node | null) => boolean;
};
export declare const attachFileRefClickGuard: (container: FileReferenceClickContainer, options: FileReferenceClickGuardOptions) => (() => void);
export {};
