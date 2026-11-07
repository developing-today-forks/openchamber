import React from 'react';
import type { ContextPanelMode } from '@/lib/surfaces/modes';
/**
 * "Move panel to …" for a surface: the keyboard and right-click way to do
 * what dragging a tab onto a zone does. Lists the zones the surface is not in.
 */
export declare const ZoneMoveMenuItems: React.FC<{
    mode: ContextPanelMode;
}>;
