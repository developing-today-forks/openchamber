import * as React from 'react';
import type { ToolPopupContent } from '@/components/chat/message/types';
type ImageGallery = NonNullable<ToolPopupContent['image']>;
/** The viewer's pictures when `target` is a picture it opens: every one in `scope`, starting at `target`. */
export declare const imageGalleryAt: (target: EventTarget | null, scope: HTMLElement) => ImageGallery | null;
/**
 * Clicking a picture in an item's description or comments opens the chat's
 * image viewer with every loaded picture of the item, in page order. The
 * viewer's chunk loads on the first click; nothing runs before one.
 */
export declare const useReferenceImagePreview: () => {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    viewer: import("react/jsx-runtime").JSX.Element | null;
};
export {};
