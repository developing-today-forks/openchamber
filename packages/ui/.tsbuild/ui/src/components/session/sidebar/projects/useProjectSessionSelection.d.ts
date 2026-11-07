import React from 'react';
import type { SessionGroup } from '../types';
type ProjectSection = {
    project: {
        id: string;
        normalizedPath: string;
    };
    groups: SessionGroup[];
};
type Args = {
    projectSections: ProjectSection[];
    activeProjectId: string | null;
    activeSessionByProject: Map<string, string>;
    setActiveSessionByProject: React.Dispatch<React.SetStateAction<Map<string, string>>>;
    currentSessionId: string | null;
    currentSessionOwnerProjectId?: string | null;
    handleSessionSelect: (sessionId: string, sessionDirectory: string | null) => void;
    newSessionDraftOpen: boolean;
    mobileVariant: boolean;
    openNewSessionDraft: (options?: {
        selectedProjectId?: string | null;
        directoryOverride?: string | null;
        preserveDirectoryOverride?: boolean;
    }) => void;
    setSessionSwitcherOpen: (open: boolean) => void;
};
type ProjectSessionSelectionEffectProps = Omit<Args, 'activeSessionByProject' | 'setActiveSessionByProject' | 'currentSessionId' | 'newSessionDraftOpen' | 'currentSessionOwnerProjectId'> & {
    initialActiveSessionByProject: Map<string, string>;
    persistActiveSessionByProject: (value: Map<string, string>) => void;
    sessionOwnerBySessionId?: ReadonlyMap<string, {
        projectId: string;
    }>;
};
export declare const ProjectSessionSelectionEffect: React.FC<ProjectSessionSelectionEffectProps>;
export {};
