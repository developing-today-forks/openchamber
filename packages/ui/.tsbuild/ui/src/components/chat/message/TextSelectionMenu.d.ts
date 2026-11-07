import React from 'react';
interface TextSelectionMenuProps {
    containerRef: React.RefObject<HTMLElement | null>;
    readingKey: string;
    canReadAloud: boolean;
    frameSelections?: boolean;
}
export declare const TextSelectionMenu: React.NamedExoticComponent<TextSelectionMenuProps>;
export {};
