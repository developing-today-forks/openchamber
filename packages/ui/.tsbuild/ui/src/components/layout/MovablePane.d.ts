import React from 'react';
import type { ContextZone } from '@/lib/workspace/zones';
/**
 * Renders a keep-alive surface into the body of a zone. The content lives in
 * one detached element for the pane's whole life; changing `zone` moves that
 * element, so React keeps the component and the DOM keeps its state: the
 * editor its text and undo, the terminal its session. `moveBefore` keeps
 * focus, scroll and iframes through the move where the engine has it. An
 * Electron webview reloads on any move; it moves only when the user moves its
 * surface.
 *
 * The element is `display: contents`, so the pane's own wrapper is laid out
 * by the zone body as if it were a direct child.
 */
export declare const MovablePane: React.FC<{
    zone: ContextZone;
    children: React.ReactNode;
}>;
