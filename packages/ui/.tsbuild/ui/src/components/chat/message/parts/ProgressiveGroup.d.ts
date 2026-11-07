import React from 'react';
import type { TurnActivityRecord as TurnActivityPart } from '../../lib/turns/types';
export declare const StaticToolRow: React.NamedExoticComponent<{
    toolName: string;
    activities: TurnActivityPart[];
    animateTailText: boolean;
}>;
