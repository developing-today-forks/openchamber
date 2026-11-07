/**
 * The window with the end of a failed setup command's output (5d-4), opened from "Output" on the
 * group's status line. The output was printed by the project's code inside the space, so it is
 * plain text in a monospace block and never anything else. For a space that reaches only allowed
 * domains it lists, above the output, the domains the gatekeeper refused while the run went, each
 * with Allow; when it refused none, or the journal cannot say, there is no such list at all.
 *
 * Mounted once by the main layout and the mobile app, behind the switch; never in VS Code
 * (decision 16).
 */
import React from 'react';
export declare const SpaceSetupOutputDialog: React.FC;
