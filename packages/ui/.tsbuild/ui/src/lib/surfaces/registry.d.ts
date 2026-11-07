import type { IconName } from '@/components/icon/icons';
import type { I18nKey } from '@/lib/i18n';
import { type ContextPanelMode } from '@/lib/surfaces/modes';
type BuiltInContextSurfaceId = 'editor' | 'git' | 'pr' | 'diff' | 'walkthrough' | 'terminal' | 'notes' | 'messages' | 'context' | 'browser' | 'chat';
export type ContextSurfaceId = BuiltInContextSurfaceId | `plugin:${string}`;
export type ContextSurfaceDescriptor = {
    id: ContextSurfaceId;
    /** The context panel tab mode this surface activates. 1:1 in the current model. */
    mode: ContextPanelMode;
    icon: IconName;
    /** Authenticated package SVG for a guest rail mark. Prefer over `icon` when set. */
    iconSrc?: string;
    /** Guest-provided name. When set, the rail prefers this over `labelKey`. */
    label?: string;
    labelKey: I18nKey;
    /**
     * 'always' surfaces can be opened empty from the rail.
     * 'has-content' surfaces are content-driven: they need an existing tab of
     * their mode (a split session, a diff to show) and stay hidden on the rail
     * until one exists.
     */
    availability: 'always' | 'has-content';
    /** Short tooltip explanation shown on the rail. */
    descriptionKey: I18nKey;
    /**
     * Which of the two default widths the panel opens at until the user resizes
     * this surface. The panel never takes more than the chat area leaves after
     * a minimum chat column, so a small window shows it narrower.
     */
    width: ContextSurfaceWidth;
};
/** Default panel widths in px. Every surface, built-in or guest, uses one. */
export declare const CONTEXT_SURFACE_WIDTHS: {
    readonly wide: 640;
    readonly regular: 540;
};
type ContextSurfaceWidth = keyof typeof CONTEXT_SURFACE_WIDTHS;
export declare const CONTEXT_SURFACES: readonly ContextSurfaceDescriptor[];
export declare const WALKTHROUGH_MIN_WIDTH = 768;
export declare const getContextSurfaceDefaultWidth: (mode: ContextPanelMode) => number;
/**
 * Applies a persisted user reorder on top of the default registry order:
 * unknown ids are dropped, missing surfaces are appended in default order.
 */
export declare const sortContextSurfaces: (railOrder: readonly string[], extras?: readonly ContextSurfaceDescriptor[]) => ContextSurfaceDescriptor[];
type VisibleRailSurfacesOptions = {
    railOrder: readonly string[];
    /** Surfaces the user chose to hide from the rail (and from the digit
        shortcuts, which share this filter). */
    hiddenSurfaces?: readonly string[];
    isVSCode: boolean;
    screenWidth: number;
    tabs: readonly {
        mode: ContextPanelMode;
        targetPath?: string | null;
    }[];
    /** The Tracker rail icon stays off until a GitHub or GitLab account is
        connected (OAuth, a token, or a detected `gh`/`glab` login), or an item
        such as a Linear issue is open in it. Accounts are connected from
        Settings, so hiding the surface removes no entry point. */
    sourceControlConnected: boolean;
    /** Installed guest panels. Empty on VS Code and when the catalog has not
        loaded or failed. */
    extras?: readonly ContextSurfaceDescriptor[];
};
/**
 * The context panel rail's visible, user-ordered surfaces. Shared by the rail
 * (for rendering and number badges) and the global surface-switch shortcut so
 * both agree on which surface each digit maps to.
 *
 * Content-driven surfaces are hidden (not disabled) until content exists; an
 * existing tab keeps them visible even if the content source went away.
 */
export declare const getVisibleContextRailSurfaces: (options: VisibleRailSurfacesOptions) => ContextSurfaceDescriptor[];
export {};
