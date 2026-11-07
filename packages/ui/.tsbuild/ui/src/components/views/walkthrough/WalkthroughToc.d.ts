import type { WalkthroughView } from '@/lib/walkthrough/model';
interface WalkthroughTocProps {
    view: WalkthroughView;
    activeStopId: string | null;
    visitedStopIds: ReadonlySet<string>;
    onSelectStop: (stopId: string) => void;
    /** Column beside the stream at this width; omitted, the contents are a page of their own (the phone). */
    width?: number;
}
export declare const WalkthroughToc: import("react").MemoExoticComponent<({ view, activeStopId, visitedStopIds, onSelectStop, width, }: WalkthroughTocProps) => import("react/jsx-runtime").JSX.Element>;
export {};
