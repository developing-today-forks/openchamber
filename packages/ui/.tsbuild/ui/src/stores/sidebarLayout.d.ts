import { z } from 'zod';
/**
 * How the desktop and web sessions sidebar arranges its sections: their
 * order, which sessions the live attention sections pull out of Pinned, In
 * work and the rest of the list, what the open session does while it changes
 * state, and how the List view lays out chats and projects.
 *
 * One value, stored per surface kind with the other sidebar toggles
 * (`sidebarLayout`). VS Code keeps the classic layout; the phone sheet draws
 * the same value as the desktop and web sidebar, keeping its own order.
 */
/** Live states a top-level session can be in, as the attention sections see it. */
export type SessionAttentionState = 'approval' | 'question' | 'running' | 'error' | 'stopped' | 'idle';
/**
 * How the sessions of Pinned and In work that need the user are pulled out:
 * not at all, one section per kind, approvals and questions together as
 * Blocked, all four kinds together, or everything that is not running.
 */
export type AttentionGrouping = 'off' | 'separate' | 'blocked' | 'combined' | 'pending';
/**
 * Whether sessions outside Pinned and In work take part: not at all, in the
 * same sections, or in sections of their own.
 */
export type OtherAttentionScope = 'off' | 'shared' | 'separate';
export type OtherAttentionGrouping = 'separate' | 'blocked' | 'combined';
/**
 * What happens when the open session is marked done or archived: its row
 * stays put until another session opens, it moves at once, it moves and the
 * list scrolls to where it went, or another session opens (the top one
 * needing attention, the next one down or up, the next one down unless it was
 * last, the reverse, or the one open before). An archived session always
 * closes; the first three choices open nothing in its place.
 */
export type OpenSessionLeave = 'hold' | 'stay' | 'reveal' | 'attention' | 'down' | 'up' | 'down-up' | 'up-down' | 'previous';
/** Chats in the List view: one more group among the projects, or their own section. */
export type TimelineChatsPlacement = 'group' | 'section';
/**
 * Every section the sidebar can show, in the default order: the attention
 * zones, Pinned, In work, the zones of other sessions, then Chats and the
 * project list. `projects` is the whole project list (with Chats among the
 * List view's projects, under one heading); every other key is a zone with
 * its own header. Every section can be moved.
 */
export declare const SIDEBAR_SECTION_KEYS: readonly ['approvals', 'questions', 'blocked', 'attention', 'pending', 'errors', 'stopped', 'pinned', 'work', 'other-approvals', 'other-questions', 'other-blocked', 'other-attention', 'other-errors', 'other-stopped', 'other-active', 'chats', 'projects'];
export type SidebarSectionKey = typeof SIDEBAR_SECTION_KEYS[number];
/** Sections drawn as a zone with its own header. */
export type SidebarZoneKey = Exclude<SidebarSectionKey, 'projects'>;
/** Zones that only ever hold sessions pulled out by their live state. */
export type SidebarAttentionZoneKey = Exclude<SidebarZoneKey, 'chats' | 'pinned' | 'work'>;
export declare const isSidebarSectionKey: (value: string) => value is SidebarSectionKey;
export declare const isSidebarAttentionZoneKey: (key: SidebarSectionKey) => key is SidebarAttentionZoneKey;
export type SidebarLayout = {
    sectionOrder: readonly SidebarSectionKey[];
    attention: AttentionGrouping;
    otherAttention: OtherAttentionScope;
    otherAttentionGrouping: OtherAttentionGrouping;
    /** Sessions outside Pinned and In work that run, or finished unseen, get a section of their own. */
    otherActive: boolean;
    /** The open session keeps its row where it is until another session opens. */
    holdOpenSession: boolean;
    afterLeave: OpenSessionLeave;
    timelineChats: TimelineChatsPlacement;
    /** List view: sessions under one header per project; off, one combined list. */
    timelineProjectGroups: boolean;
    /** List view: one line per session. */
    timelineCompactRows: boolean;
    /** List view with Chats as a group: its place among the projects. */
    chatsGroupIndex: number;
};
export declare const DEFAULT_SIDEBAR_LAYOUT: SidebarLayout;
/** The sidebar as it was before these options: no attention sections, nothing held, Chats on top. */
export declare const CLASSIC_SIDEBAR_LAYOUT: SidebarLayout;
/**
 * A stored order completed with every known section: unknown and repeated
 * keys are dropped, and a section the stored order lacks (one added by a
 * later version) goes right after the section that precedes it by default.
 */
export declare const normalizeSectionOrder: (order: readonly string[]) => SidebarSectionKey[];
/**
 * Moves `key` one place up or down among the sections that are shown, so a
 * click always visibly moves it. Hidden sections keep their places.
 */
export declare const moveSectionAmongShown: (order: readonly SidebarSectionKey[], shown: readonly SidebarSectionKey[], key: SidebarSectionKey, direction: 'up' | 'down') => SidebarSectionKey[];
/** Puts `key` right before or after `anchor`. */
export declare const placeSection: (order: readonly SidebarSectionKey[], key: SidebarSectionKey, anchor: SidebarSectionKey, side: 'before' | 'after') => SidebarSectionKey[];
/**
 * A stored layout, completed with the defaults: a field that is missing or
 * holds a value this version does not know falls back to its default, so a
 * layout saved by a newer version still applies what this one understands.
 * Anything that is not an object fails to parse.
 */
export declare const sidebarLayoutSchema: z.ZodPipe<z.ZodObject<{
    sectionOrder: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    attention: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        blocked: "blocked";
        combined: "combined";
        off: "off";
        pending: "pending";
        separate: "separate";
    }>>>;
    otherAttention: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        off: "off";
        separate: "separate";
        shared: "shared";
    }>>>;
    otherAttentionGrouping: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        blocked: "blocked";
        combined: "combined";
        separate: "separate";
    }>>>;
    otherActive: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    holdOpenSession: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    afterLeave: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        attention: "attention";
        down: "down";
        "down-up": "down-up";
        hold: "hold";
        previous: "previous";
        reveal: "reveal";
        stay: "stay";
        up: "up";
        "up-down": "up-down";
    }>>>;
    timelineChats: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        group: "group";
        section: "section";
    }>>>;
    timelineProjectGroups: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    timelineCompactRows: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    chatsGroupIndex: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>, z.ZodTransform<SidebarLayout, {
    sectionOrder?: string[] | undefined;
    attention?: "blocked" | "combined" | "off" | "pending" | "separate" | undefined;
    otherAttention?: "off" | "separate" | "shared" | undefined;
    otherAttentionGrouping?: "blocked" | "combined" | "separate" | undefined;
    otherActive?: boolean | undefined;
    holdOpenSession?: boolean | undefined;
    afterLeave?: "attention" | "down" | "down-up" | "hold" | "previous" | "reveal" | "stay" | "up" | "up-down" | undefined;
    timelineChats?: "group" | "section" | undefined;
    timelineProjectGroups?: boolean | undefined;
    timelineCompactRows?: boolean | undefined;
    chatsGroupIndex?: number | undefined;
}>>;
/** The attention zone a pinned or in-work session in `state` moves to, if any. */
export declare const trackedAttentionZone: (layout: SidebarLayout, state: SessionAttentionState) => SidebarAttentionZoneKey | null;
/**
 * The attention zone a session outside Pinned and In work moves to, if any.
 * Sharing the sections never pulls idle sessions: "everything not running"
 * would be the whole list.
 */
export declare const otherAttentionZone: (layout: SidebarLayout, state: SessionAttentionState) => SidebarAttentionZoneKey | null;
/** The attention zones a layout can fill, in no particular order. */
export declare const attentionZonesInUse: (layout: SidebarLayout) => ReadonlySet<SidebarAttentionZoneKey>;
/** Whether the layout needs the live state of sessions outside Pinned and In work. */
export declare const watchesOtherSessions: (layout: SidebarLayout) => boolean;
