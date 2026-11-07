import { type File } from '@pierre/diffs';
export declare function useFilePreviewScrollPosition(positionKey: string | null): {
    setScroller: import("react").Dispatch<import("react").SetStateAction<HTMLElement | null>>;
    restore: (node?: HTMLElement, instance?: File) => void;
};
