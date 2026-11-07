import React from 'react';
import type { ModelRouteTuning } from '@/lib/routing/modelRoutesApi';
/** Scheduled review of routing history: whether it runs, how often, and how much history it reads. */
export declare const RouteTuningFields: React.FC<{
    tuning: ModelRouteTuning | null;
    onSave: (tuning: ModelRouteTuning | null) => void;
}>;
