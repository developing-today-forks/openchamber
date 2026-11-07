import React from 'react';
interface AgentSelectorProps {
    /** Currently selected agent name (empty string for no agent) */
    value: string;
    /** Called when agent selection changes */
    onChange: (agentName: string) => void;
    /** Optional className for the trigger */
    className?: string;
    /** Whether the selector is disabled */
    disabled?: boolean;
    /** ID for accessibility */
    id?: string;
    /** Portal menu to body instead of nearest dialog. */
    portalToBody?: boolean;
}
/**
 * Agent selector dropdown for selecting an agent for multi-run sessions.
 * Uses getVisibleAgents from useConfigStore to show available agents.
 */
export declare const AgentSelector: React.FC<AgentSelectorProps>;
export {};
