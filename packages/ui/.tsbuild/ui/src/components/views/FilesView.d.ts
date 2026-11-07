import React from 'react';
interface FilesViewProps {
    visible?: boolean;
    mode?: 'full' | 'editor-only';
    /**
     * For a host whose tab strip owns the open files (the context panel):
     * closing a file here, by Cmd/Ctrl+W or after the unsaved-changes prompt,
     * closes the host's tab, which picks the next file the way its close
     * button does. Without it the view closes the file in its own state.
     */
    onCloseFile?: (path: string) => void;
}
export declare const FilesView: React.FC<FilesViewProps>;
export {};
