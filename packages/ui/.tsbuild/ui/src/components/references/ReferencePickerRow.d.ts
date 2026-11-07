import * as React from 'react';
import type { GitHubChecksSummary, GitHubPullStatus } from '@/lib/api/types';
import { type ReferencePickerItem } from './referencePickerItems';
type Label = {
    name: string;
    color: string | null;
};
export declare const ReferenceLabelChips: React.FC<{
    labels: Label[];
    max?: number;
}>;
export declare const ChecksGlyph: React.FC<{
    checks: GitHubChecksSummary | null;
}>;
type RowProps = {
    item: ReferencePickerItem;
    /** An open PR's checks and mergeability, once they have arrived. */
    pullStatus: GitHubPullStatus | null;
    highlighted: boolean;
    /** Null in single-choice mode, where rows have no checkbox. */
    checked: boolean | null;
    diffIncluded: boolean;
    /** Names the repository on every row, as it does on a fork's upstream items: the list spans several. */
    showRepository?: boolean;
    now: number;
    onHighlight: () => void;
    onToggle: () => void;
    onActivate: () => void;
};
export declare const ReferencePickerRow: React.MemoExoticComponent<({ item, pullStatus, highlighted, checked, diffIncluded, showRepository, now, onHighlight, onToggle, onActivate, }: RowProps) => import("react/jsx-runtime").JSX.Element>;
export {};
