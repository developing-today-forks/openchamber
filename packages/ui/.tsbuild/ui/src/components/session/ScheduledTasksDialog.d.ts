/** Why the page is being left: a started session or a loop file to edit
 *  takes over the screen, and each shell decides how to get there. */
export type ScheduledTasksLeaveReason = 'session' | 'file';
/**
 * The scheduled tasks page. `page` is the desktop surface that replaces the
 * chat area (scope list at the left, tasks at the right); `mobile` is the
 * single-column body of the mobile shell's fullscreen surface.
 */
export declare function ScheduledTasksView({ layout, onLeave }: {
    layout: 'page' | 'mobile';
    onLeave: (reason: ScheduledTasksLeaveReason) => void;
}): import("react/jsx-runtime").JSX.Element;
/** The desktop page, open while the UI store says so. The mobile shell mounts
 *  ScheduledTasksView in its own fullscreen surface instead. */
export declare function ScheduledTasksDialog(): import("react/jsx-runtime").JSX.Element | null;
