/**
 * The grant dialog of an isolated space (journey step 4): model keys per provider,
 * the domains the space may reach, and the attempts its gatekeeper refused, each opened from here.
 * Every grant goes through the host at once; nothing is saved at the end. A grant cannot be taken
 * back (decision 4), so opened domains show without a remove button.
 *
 * The journal lives in the gatekeeper's memory only: it holds nothing from before the last start,
 * and the dialog says so, so that an empty list never reads as "the agent tried nothing" when the
 * record is simply gone. It is read when the dialog opens and on "Refresh", never polled.
 *
 * Mounted once by the main layout, opened from the space's group and the session header; never in
 * VS Code (decision 16).
 */
import React from 'react';
export declare const SpaceAccessDialog: React.FC;
