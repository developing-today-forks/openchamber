import React from 'react';
import type { TimeFormatPreference } from '@/stores/useUIStore';
import type { UsageProviderGroup } from './usageGroups';
/**
 * One lightly tinted card per provider, each holding a run of quota windows.
 *
 * Built for narrow columns: labels truncate, values stay pinned right, and
 * nothing relies on horizontal room the container may not have. Shared by the
 * mobile session-metadata popover and the work-status panel.
 */
export declare const UsageProviderCards: React.FC<{
    groups: UsageProviderGroup[];
    displayMode: 'usage' | 'remaining';
    timeFormatPreference: TimeFormatPreference;
    className?: string;
}>;
