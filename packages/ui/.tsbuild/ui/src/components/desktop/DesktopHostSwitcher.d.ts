type DesktopHostSwitcherDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    embedded?: boolean;
    onHostSwitched?: () => void;
};
export declare function DesktopHostSwitcherDialog({ open, onOpenChange, embedded, onHostSwitched, }: DesktopHostSwitcherDialogProps): import("react/jsx-runtime").JSX.Element | null;
export declare function DesktopHostSwitcherInline(): import("react/jsx-runtime").JSX.Element | null;
export {};
