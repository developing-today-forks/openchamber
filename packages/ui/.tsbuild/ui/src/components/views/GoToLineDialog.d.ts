import React from 'react';
import { EditorView } from '@codemirror/view';
type GoToLineDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /**
     * The editor arrives as a ref, never as the view itself: React's dev
     * profiling walks changed props deep enough to reach the view's window and
     * its frames, and a cross-origin extension frame there throws mid-commit,
     * which leaves the whole app unable to render (react#34840).
     */
    viewRef: React.RefObject<EditorView | null>;
    variant?: 'overlay' | 'inline';
};
export declare function GoToLineDialog({ open, onOpenChange, viewRef, variant }: GoToLineDialogProps): import("react/jsx-runtime").JSX.Element | null;
export {};
