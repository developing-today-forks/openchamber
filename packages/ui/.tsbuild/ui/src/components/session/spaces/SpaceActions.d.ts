/**
 * The actions of an isolated space: apply its work (user journey step 6) above the repair actions
 * (step 8), from soft to hard: restart OpenCode, restart the container, stop or start, and delete
 * after a confirmation, which offers to apply first. The
 * desktop has them in a menu on the space's group; the phone opens the same list as a sheet from
 * the group's swipe actions. Delete never runs from the list itself: it opens the confirmation,
 * which says what goes with the space. The space's chats go to the Archive page first (decision 9);
 * when they cannot all be saved the space stays and the confirmation opens again with "Delete
 * anyway", and once they went, a notice says where they are, with "Open".
 *
 * The sheet and the confirmation are mounted once by the main layout and the mobile app, behind
 * the switch; never in VS Code (decision 16).
 */
import React from 'react';
/** The "⋯" menu on a space's group header, beside the grant key and the new-session button. */
export declare const SpaceActionsMenu: React.FC<{
    spaceId: string;
    label: string;
    className?: string;
}>;
/** The same actions on the phone, as a sheet opened from the group's swipe actions. */
export declare const SpaceActionsSheet: React.FC;
/** The confirmation before a space is deleted; the deletion's progress and failure show on the group. */
export declare const SpaceDeleteDialog: React.FC;
