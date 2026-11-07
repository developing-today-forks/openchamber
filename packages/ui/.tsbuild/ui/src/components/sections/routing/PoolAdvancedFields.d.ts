import React from 'react';
import type { ModelRoute } from '@/lib/routing/modelRoutesApi';
/** Expert-level pool settings, grouped by what they change: selection, failover, health, budgets and schedules. */
export declare const PoolAdvancedFields: React.FC<{
    route: ModelRoute;
    onChange: (route: ModelRoute) => void;
}>;
