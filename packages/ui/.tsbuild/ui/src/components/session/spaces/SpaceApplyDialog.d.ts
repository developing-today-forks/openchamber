/**
 * The apply dialog of an isolated space (decisions 7 and 8, user journey step 6): what
 * the agent changed, as a branch named after the space or as uncommitted changes, and "delete the
 * space afterwards", on unless an agent still works there. Opened from the group's "⋯" menu, the
 * phone's sheet, the session header and the delete confirmation.
 *
 * Every path it shows came out of the space, so it is text in a monospace list and nothing else.
 * Mounted once by the main layout and the mobile app, behind the switch; never in VS Code
 * (decision 16).
 */
import React from 'react';
export declare const SpaceApplyDialog: React.FC;
