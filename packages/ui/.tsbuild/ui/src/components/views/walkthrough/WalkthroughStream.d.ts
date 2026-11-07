import type { WalkthroughView } from '@/lib/walkthrough/model';
import type { DiffFindWordRequest, PierreDiffViewerHandle } from '@/components/views/PierreDiffViewer';
interface WalkthroughStreamProps {
    view: WalkthroughView;
    activeStopId: string | null;
    scrollToStopId: string | null;
    onActiveStopChange: (stopId: string) => void;
    onScrollHandled: () => void;
    renderSideBySide: boolean;
    wrapLines: boolean;
    /** What the change is about, shown above the first step when the contents column is hidden. */
    summary?: string;
    /** Find-in-walkthrough: opens the uncovered tail each time it moves past 0. */
    uncoveredOpenRequest?: number;
    /** Find-in-walkthrough: register each stop run's rendered viewer handle. */
    registerFindViewerRef?: (runKey: string, handle: PierreDiffViewerHandle | null) => void;
    /** Find-in-walkthrough: a modifier-click on a word, tagged with its run. */
    onFindWordRequest?: (runKey: string, request: DiffFindWordRequest) => void;
}
/**
 * Everything the walkthrough covers, plus everything it does not, in one
 * continuous scroll: a stop's explanation sits directly above the code it
 * explains.
 */
export declare const WalkthroughStream: import("react").MemoExoticComponent<({ view, activeStopId, scrollToStopId, onActiveStopChange, onScrollHandled, renderSideBySide, wrapLines, summary, uncoveredOpenRequest, registerFindViewerRef, onFindWordRequest, }: WalkthroughStreamProps) => import("react/jsx-runtime").JSX.Element>;
export {};
