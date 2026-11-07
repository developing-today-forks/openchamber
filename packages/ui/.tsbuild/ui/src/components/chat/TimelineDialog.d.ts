import React from 'react';
interface TimelineDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onScrollToMessage?: (messageId: string) => void | Promise<boolean>;
    onScrollByTurnOffset?: (offset: number) => void;
    onResumeToLatest?: () => void;
    canLoadEarlier?: boolean;
    isLoadingEarlier?: boolean;
    onLoadEarlier?: () => void;
}
/**
 * The dialog shell stays mounted with the chat. Everything that reads the
 * session's messages lives in `TimelineDialogBody`, which the dialog popup
 * mounts only while open or animating closed, so a closed timeline does no
 * work while a reply streams. The search query lives here so reopening the
 * dialog keeps it.
 */
export declare const TimelineDialog: React.FC<TimelineDialogProps>;
export {};
