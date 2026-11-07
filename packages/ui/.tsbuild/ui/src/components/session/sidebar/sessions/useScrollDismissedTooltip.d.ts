/**
 * Closes a session row's tooltip when the list scrolls under it.
 *
 * Row tooltips stay open while the pointer travels into them, so their PR
 * links take clicks, and that kind of tooltip closes only when the pointer
 * moves. Scrolling under a still pointer moves the rows instead: every row
 * that slid under the pointer opened its own tooltip and the earlier ones
 * stayed, piled on top of each other. Now a scroll of anything containing the
 * row closes its tooltip, and a row that arrives under the pointer while the
 * list is still scrolling does not open one.
 */
import React from 'react';
import type { Tooltip } from '@/components/ui/tooltip';
type TooltipProps = React.ComponentProps<typeof Tooltip>;
type TooltipActions = NonNullable<NonNullable<TooltipProps['actionsRef']>['current']>;
type TooltipOpenChange = NonNullable<TooltipProps['onOpenChange']>;
type ScrollDismissedTooltip = {
    actionsRef: React.RefObject<TooltipActions | null>;
    onOpenChange: TooltipOpenChange;
};
export declare function useScrollDismissedTooltip(): ScrollDismissedTooltip;
export {};
