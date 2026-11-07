import React from 'react';
/**
 * Turns per-session warming on and off from the Context row. Shown only while
 * Settings chose per-session warming, for a root session the host's OpenCode
 * runs; the tooltip says whether it is warm and for how long.
 */
export declare const WorkStatusWarmingToggle: React.FC<{
    sessionId: string | null;
    directory: string | null;
}>;
