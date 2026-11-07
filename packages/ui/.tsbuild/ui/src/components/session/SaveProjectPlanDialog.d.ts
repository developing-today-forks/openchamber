type SaveProjectPlanDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialTitle: string;
    sourceText: string;
    saving?: boolean;
    onSave: (title: string) => Promise<void> | void;
};
export declare function SaveProjectPlanDialog(props: SaveProjectPlanDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
