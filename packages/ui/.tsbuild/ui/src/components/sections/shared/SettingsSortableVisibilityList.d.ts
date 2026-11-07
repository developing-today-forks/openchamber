import React from 'react';
interface SortableVisibilityItem {
    id: string;
    label: string;
    visible: boolean;
    /** Its checkbox cannot change, such as the last item that must stay shown. */
    locked?: boolean;
}
/**
 * A list the user orders by dragging and filters with checkboxes: the rail's
 * panels on desktop, the workspace tabs on a phone. Mouse drags after a small
 * move, touch after a long press (a swipe still scrolls the page), and the
 * keyboard picks a row up with Space.
 */
export declare const SettingsSortableVisibilityList: React.FC<{
    items: SortableVisibilityItem[];
    onVisibleChange: (id: string, visible: boolean) => void;
    /** The new order of every listed id, after a drop that moved something. */
    onReorder: (ids: string[]) => void;
    /** Each row's `data-settings-item` is this prefix plus the item id. */
    settingsItemPrefix: string;
    /** What a screen reader hears about picking a row up with the keyboard. */
    dragInstructions: string;
    /** For a host that must not close or steal arrow keys mid-drag, such as a dialog. */
    onDraggingChange?: (dragging: boolean) => void;
}>;
export {};
