import React from 'react';
import type { ScheduleList, ScheduleListValue, StoredSchedules } from '@/lib/routing/scheduleSchema';
/**
 * Time-bound weight changes, as a list of entries. `pool` edits one pool's
 * `schedules`; `global` edits `experimental.model_route_schedules` in the file
 * OpenChamber writes, and shows `otherFiles` (lists OpenCode also applies from
 * other config files) read-only. `schedules` is the list as stored; every edit
 * hands the whole list to `onChange`, entries the editor cannot read included.
 */
export declare const RouteScheduleFields: React.FC<{
    scope: 'pool' | 'global';
    schedules: ScheduleList | null | undefined;
    onChange: (schedules: ScheduleListValue) => void;
    otherFiles?: readonly {
        path: string;
        schedules: StoredSchedules;
    }[];
    settingsItem?: string;
}>;
