/**
 * Every section the work-status panel can render, in default display order.
 *
 * One list drives both the panel and its settings dialog, so a section cannot
 * exist in the panel without being switchable, or appear in the dialog without
 * existing.
 *
 * The ids are persisted in user settings — renaming one silently resets that
 * user's choice for it.
 */
export declare const WORK_STATUS_SECTION_IDS: readonly ['session', 'repository', 'usage', 'telemetry', 'subagents', 'mcp', 'pinned', 'contextSources'];
export type WorkStatusSectionId = (typeof WORK_STATUS_SECTION_IDS)[number];
export declare const WORK_STATUS_SECTION_LABEL_KEYS: {
    readonly session: 'chat.workStatus.section.session';
    readonly repository: 'chat.workStatus.section.project';
    readonly usage: 'chat.workStatus.section.usage';
    readonly telemetry: 'chat.workStatus.section.telemetry';
    readonly subagents: 'chat.workStatus.section.subagents';
    readonly mcp: 'chat.workStatus.section.mcp';
    readonly pinned: 'chat.workStatus.section.pinned';
    readonly contextSources: 'chat.workStatus.section.contextBreakdown';
};
/**
 * A section contributed by an installed extension (`contributes.statusSection`),
 * keyed by its extension id. Persisted next to the built-in ids.
 */
export type ExtensionSectionId = `ext:${string}`;
/** Any id the panel can place: a built-in section or an extension's. */
export type WorkStatusPanelSectionId = WorkStatusSectionId | ExtensionSectionId;
export declare const extensionSectionId: (guestId: string) => ExtensionSectionId;
export declare const isExtensionSectionId: (value: string) => value is ExtensionSectionId;
/** Preserve chosen positions, discard obsolete ids, and append newly added built-in sections. */
export declare const sanitizeWorkStatusSectionOrder: (value: readonly string[] | null | undefined) => WorkStatusPanelSectionId[];
/**
 * What the panel and the sections dialog show: the saved order with sections
 * of extensions that are not available here left out, and available ones the
 * saved order does not know appended in the order given.
 */
export declare const resolveWorkStatusSectionOrder: (stored: readonly string[] | null | undefined, extensionIds: readonly ExtensionSectionId[]) => WorkStatusPanelSectionId[];
/**
 * Hidden sections are stored, not visible ones. Every section is on by default.
 */
export declare const isWorkStatusSectionVisible: (hidden: readonly string[] | null | undefined, id: WorkStatusPanelSectionId) => boolean;
/**
 * True when every section the panel could show appears in the hidden set.
 *
 * Uses `.every()` instead of a length comparison so that stale ids left over
 * from a removed section cannot inflate the count past the current list length.
 */
export declare const areAllWorkStatusSectionsHidden: (hidden: readonly string[] | null | undefined, extensionIds?: readonly ExtensionSectionId[]) => boolean;
export declare const getWorkStatusPanelPresentation: ({ visible, contentMounted, renderedSections, allSectionsHidden, }: {
    visible: boolean;
    contentMounted: boolean;
    renderedSections: number;
    allSectionsHidden: boolean;
}) => {
    interactive: boolean;
    showEmptyState: boolean;
};
export declare const sanitizeWorkStatusHiddenSections: (value: unknown, explicit?: boolean) => WorkStatusPanelSectionId[];
