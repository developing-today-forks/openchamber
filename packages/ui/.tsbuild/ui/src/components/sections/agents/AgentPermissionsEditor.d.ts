import React from 'react';
import { type AgentWithExtras } from '@/stores/useAgentsStore';
import { type AutosaveResult } from '@/components/sections/shared/SettingsAutosave';
interface AgentPermissionsEditorProps {
    agent: AgentWithExtras;
    /**
     * Hand the page this section's save routine. It is called on mount and
     * whenever the routine changes, and with `null` on unmount.
     */
    registerSave: (save: (() => Promise<AutosaveResult>) | null) => void;
    /** The page's autosave request; this section never runs its own. */
    requestSave: () => void;
}
export declare const AgentPermissionsEditor: React.FC<AgentPermissionsEditorProps>;
export {};
