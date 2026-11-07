import React from 'react';
/**
 * The icon of the project a session belongs to, drawn the way the sidebar
 * draws it: the project's image, its chosen icon in its colour, or a folder.
 * A managed chat has no project and gets the chat icon. Nothing renders when
 * the directory matches no known project.
 */
export declare function SessionProjectIcon({ directory, className }: {
    directory: string | null;
    className?: string;
}): React.ReactNode;
