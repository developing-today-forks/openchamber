import React from 'react';
import { type ContextZone } from '@/lib/workspace/zones';
/**
 * One zone around the chat (`lib/workspace/zones.ts`): its frame, header,
 * size and the surfaces that remount on every switch. The keep-alive
 * surfaces are portalled into its body from `ContextSurfacePanes`.
 */
export declare const ContextPanel: React.FC<{
    zone?: ContextZone;
}>;
