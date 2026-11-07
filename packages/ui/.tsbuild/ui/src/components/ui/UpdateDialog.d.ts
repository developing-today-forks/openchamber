import React from 'react';
import type { UpdateInfo, UpdateProgress } from '@/lib/desktop';
interface UpdateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    info: UpdateInfo | null;
    downloading: boolean;
    downloaded: boolean;
    /** Desktop install is being applied — the restart is already in flight */
    installing?: boolean;
    progress: UpdateProgress | null;
    error: string | null;
    onDownload: () => void;
    onRestart: () => void;
    /** Runtime type to show different UI for desktop vs web */
    runtimeType?: 'desktop' | 'web' | 'vscode' | 'mobile' | null;
}
export declare const UpdateDialog: React.FC<UpdateDialogProps>;
export {};
