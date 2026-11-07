import React from 'react';
/**
 * OpenCode's `warming` config key: keeps an idle session's prompt cache alive
 * with small keep-alive requests. The checkbox shows the effective value
 * OpenCode reports and writes through `PUT /api/config/warming`. Shown in VS
 * Code only; elsewhere `SessionWarmingModeField` also offers per-session warming.
 */
export declare const SessionWarmingCheckbox: React.FC;
