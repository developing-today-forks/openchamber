import React from 'react';
/**
 * Desktop-surface layout: the chat owns the main area, and every other
 * surface (git, diff, files, terminal, ...) opens via the rail in one of the
 * zones around it (`lib/workspace/zones.ts`): right by default, or left or
 * under the chat where the user moved it. Phone-sized viewports run the separate MobileApp shell — a viewport
 * crossing the threshold reloads into it (see watchHostedSurfaceViewport).
 */
export declare const MainLayout: React.FC;
