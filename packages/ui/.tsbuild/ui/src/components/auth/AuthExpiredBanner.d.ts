import React from 'react';
/**
 * Non-blocking notice that the OpenChamber session expired mid-work. It never
 * takes the screen on its own: work stays visible and interactive, and only
 * the explicit "Log in" click hands control to the session gate's full login
 * flow (password, passkey, desktop shell — all already there).
 */
export declare const AuthExpiredBanner: React.FC;
