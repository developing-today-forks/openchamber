import type { ScheduledTask } from '@/lib/scheduledTasksApi';
export declare function ScheduledTaskEditorDialog(props: {
    open: boolean;
    task: ScheduledTask | null;
    projectId: string;
    onOpenChange: (open: boolean) => void;
    onSave: (draft: Partial<ScheduledTask>) => Promise<void>;
}): import("react/jsx-runtime").JSX.Element;
