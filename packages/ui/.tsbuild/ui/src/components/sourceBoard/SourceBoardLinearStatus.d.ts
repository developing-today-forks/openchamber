import * as React from 'react';
import type { LinearIssueSummary } from '@/lib/api/types';
/**
 * A Linear issue's state pill that moves the issue to another state of its
 * team. Until the states arrive, or where they cannot change, it stays a
 * plain pill. The list reads again afterwards, so the row shows the change.
 */
export declare const SourceBoardLinearStatus: React.FC<{
    issue: LinearIssueSummary;
    onChanged: () => void;
}>;
