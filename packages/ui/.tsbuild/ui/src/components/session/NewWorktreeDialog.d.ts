import { type ReferencePickerSelection } from '@/components/references/referencePickerItems';
interface NewWorktreeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** The project to create in; the sidebar's active project when absent. A draft passes its own. */
    project?: {
        id: string;
        path: string;
    };
    /** The dialog is closed by then; a chosen issue or PR follows as a composer chip. */
    onWorktreeCreated?: (worktreePath: string) => void;
    /** Opens on "PR or issue" with this item already chosen. */
    initialSelection?: ReferencePickerSelection;
}
export declare function NewWorktreeDialog({ open, onOpenChange, project, onWorktreeCreated, initialSelection, }: NewWorktreeDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
