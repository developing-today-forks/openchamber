interface WalkthroughViewProps {
    directory: string;
    /**
     * The context panel keeps this view mounted but hidden via CSS, so work
     * that should only run for a visible consumer has to be told. Defaults to
     * true for mounts that have no visibility signal.
     */
    visible?: boolean;
}
export declare const WalkthroughView: ({ directory: rootDirectory, visible }: WalkthroughViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
