/**
 * What gets Docker going on this computer, under its place in Settings and in the create dialog:
 * the one action OpenChamber can take (install with Homebrew, start Colima, open Docker Desktop),
 * or the step the user takes themselves with the exact command or page, and while Docker answers,
 * a warning when it has too little memory for a space. The host decides which, see
 * `places/docker-setup.js`; this screen shows it and starts the action it offers.
 *
 * While an action runs, its state is read every two seconds, the only reading this does on its
 * own, and only while it is on screen: the user started it and watches it. When it ends well the
 * caller checks the place again, which then answers.
 */
import React from 'react';
import { type SpacePlace } from '@/lib/spaces/spaces-api';
type DockerSetupNoticeProps = {
    place: SpacePlace;
    /** Checks the places again, after an action ended or when the user asks. */
    onRecheck: () => void;
    /** Whether the notice carries its own "Check again"; Settings has one beside it already. */
    withCheck?: boolean;
};
export declare const DockerSetupNotice: React.FC<DockerSetupNoticeProps>;
export {};
