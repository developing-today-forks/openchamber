import type { Part } from '@/lib/opencode/model';
type PromptNavigatorRailProps = {
    turnIds: string[];
    previewsByTurnId: Map<string, Part[]>;
    activeTurnId: string | null;
    onSelectTurn: (turnId: string) => void;
    canLoadEarlier: boolean;
    isLoadingOlder: boolean;
    onLoadEarlier: () => void;
};
export declare function PromptNavigatorRail({ turnIds, previewsByTurnId, activeTurnId, onSelectTurn, canLoadEarlier, isLoadingOlder, onLoadEarlier, }: PromptNavigatorRailProps): import("react/jsx-runtime").JSX.Element | null;
export {};
