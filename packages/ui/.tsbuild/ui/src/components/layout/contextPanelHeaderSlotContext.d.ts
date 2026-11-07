import React from 'react';
/**
 * The panel header element the surface on screen may render its toolbar into,
 * or null everywhere else. See contextPanelHeaderSlot.tsx.
 */
export declare const ContextPanelHeaderSlotContext: React.Context<HTMLElement | null>;
/** True when the surface's toolbar is rendered into the panel header. */
export declare function useInContextPanelHeader(): boolean;
