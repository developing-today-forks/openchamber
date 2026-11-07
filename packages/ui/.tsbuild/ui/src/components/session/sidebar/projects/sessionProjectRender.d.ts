import type { SessionGroup } from '../types';
export type ProjectSection = {
    project: {
        id: string;
        label?: string;
        normalizedPath: string;
        icon?: string;
        color?: string;
        iconImage?: {
            mime: string;
            updatedAt: number;
            source: 'custom' | 'auto';
        };
        iconBackground?: string;
    };
    groups: SessionGroup[];
};
export declare const selectRenderedProjectSections: (sections: ProjectSection[], singleProjectMode: boolean, singleProjectId: string | null) => ProjectSection[];
/**
 * What the sidebar shows when a search leaves no project section to render.
 *
 * The managed chats live in the scroller's top content rather than in a project
 * section, so a query that matches only a chat empties `sectionsForRender` while
 * a real result is still on screen above it. Answering `top-content` there keeps
 * that result visible; answering `empty-state` before checking it hid the chat
 * and claimed nothing matched, while the header counted the match (issue #3200).
 */
export declare const resolveSearchResultPlacement: (topContentHasSearchMatches: boolean) => 'top-content' | 'empty-state';
type GroupRenderDescriptor = {
    group: SessionGroup;
    groupKey: string;
    projectId: string;
    hideGroupLabel: boolean;
};
export declare const buildGroupRenderDescriptors: (section: ProjectSection, options: {
    mainWorkspaceOnly: boolean;
}) => GroupRenderDescriptor[];
export {};
