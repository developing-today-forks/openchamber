import React from 'react';
import { type PluginContextPanelMode } from '@/lib/surfaces/modes';
/**
 * The rail panel of an extension whose service shows a shared surface: a
 * live picture of what the agent is working in, which the user can take
 * over by clicking or typing and hand back with one button.
 *
 * The picture is a canvas the host draws; the extension never runs code in
 * this panel. Pointer and keyboard events are translated to frame pixels
 * and sent as a batch per animation frame. While the surface has focus the
 * host's own shortcuts stand down (`data-terminal-owner`, the same gate the
 * terminal uses), so a Ctrl+P typed into a remote page stays in that page.
 * Paste sends text rather than the key chord; copy sends the chord and then
 * asks the extension for what was copied, so the user's clipboard follows.
 */
type Props = {
    mode: PluginContextPanelMode;
};
export declare const GuestSurfacePane: React.FC<Props>;
export {};
