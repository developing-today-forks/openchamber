import React from 'react';
import type { Agent } from '@/lib/opencode/model';
interface AgentSelectorProps {
    agentName: string;
    onChange: (agentName: string) => void;
    className?: string;
    filter?: (agent: Agent) => boolean;
    dropdownPortalToBody?: boolean;
    directory?: string;
}
export declare const AgentSelector: React.FC<AgentSelectorProps>;
export {};
