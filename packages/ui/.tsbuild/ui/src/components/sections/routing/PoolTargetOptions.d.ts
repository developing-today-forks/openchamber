import React from 'react';
import type { ModelRouteTarget } from '@/lib/routing/modelRoutesApi';
export declare const CommitInput: React.FC<{
    label: string;
    value: string;
    placeholder?: string;
    onCommit: (value: string) => void;
}>;
/** Per-target options: when the target leaves the pool, its default variant, and variant remaps. */
export declare const PoolTargetOptions: React.FC<{
    target: ModelRouteTarget;
    onChange: (target: ModelRouteTarget) => void;
}>;
