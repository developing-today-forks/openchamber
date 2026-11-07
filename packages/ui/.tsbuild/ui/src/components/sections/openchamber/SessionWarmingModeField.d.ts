import React from 'react';
/**
 * How idle sessions are kept warm, and for how long after a reply: OpenCode's
 * `warming` config for every session, or the OpenChamber server for the
 * sessions the user picks. One at a time; the server switches both in one
 * request. VS Code has no OpenChamber server and shows `SessionWarmingCheckbox`
 * instead.
 */
export declare const SessionWarmingModeField: React.FC;
