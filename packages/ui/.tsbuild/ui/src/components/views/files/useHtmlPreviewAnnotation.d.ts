import React from 'react';
/** Annotation for the Files view's HTML preview, run through the server-injected bridge. */
export declare const useHtmlPreviewAnnotation: ({ frameRef, directory, pageKey, }: {
    frameRef: React.RefObject<HTMLIFrameElement | null>;
    directory: string;
    /** Changes when the frame shows another page; a running session ends with it. */
    pageKey: string;
}) => {
    isAnnotating: boolean;
    toggle: () => void;
};
