import React from 'react';
type Props = {
    sessionId: string | null;
    directory: string | null;
};
/**
 * What is loaded into the agent's context: the GitHub threads this session was
 * pointed at, plus how much ambient material is available.
 *
 * Agents are deliberately absent — an agent is who does the work, not material
 * the work is done with. Tools are absent for want of an honest source:
 * `Agent.tools` is a per-agent override map, not a registry, so its size would
 * report something other than "tools available".
 */
export declare const WorkStatusContextSection: React.FC<Props>;
export {};
