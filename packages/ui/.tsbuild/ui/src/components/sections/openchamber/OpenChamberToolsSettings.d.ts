import * as React from 'react';
/**
 * Which OpenChamber capabilities agents are given.
 *
 * Each entry is one tool the managed OpenCode child is handed, so the choices
 * belong together and not under the CLI's own configuration — the binary path
 * is about which OpenCode runs, these are about what it can do.
 *
 * A toggle only writes the setting: the server keeps OpenChamber's plugin
 * injection in a watched file, so OpenCode picks the change up on its own and
 * the tool list is live without a restart.
 *
 * Each tool is a list row with a switch because each one adds or removes a
 * whole capability, and the one-line summary says what without opening the
 * hint. A setting of one tool alone is a nested row under it. The Code Mode
 * checkbox is an option on how the enabled ones are offered, so it sits below
 * the list rather than in it.
 */
export declare const OpenChamberToolsSettings: React.FC;
