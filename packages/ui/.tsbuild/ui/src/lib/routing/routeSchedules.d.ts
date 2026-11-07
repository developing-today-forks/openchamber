import { type GlobalSchedule, type ScheduleList, type ScheduleListValue, type ScheduleWindow } from '@/lib/routing/scheduleSchema';
/** One entry of a stored list: a schedule the editor can read, or the stored value it cannot. */
export type ScheduleEntry = {
    kind: 'schedule';
    schedule: GlobalSchedule;
} | {
    kind: 'stored';
    stored: ScheduleListValue[number];
};
/**
 * Reads a stored schedule list entry by entry. Unset is an empty list; a value
 * that is not a list at all is null. An entry the editor cannot read is kept as
 * stored, so a save writes it back unchanged and the server names its problem.
 */
export declare const readScheduleList: (stored: ScheduleList | null | undefined) => ScheduleEntry[] | null;
export declare const scheduleListValue: (entries: readonly ScheduleEntry[]) => ScheduleListValue;
/**
 * A stored time as `<input type="time">` holds it: zero-padded HH:mm, seconds
 * zero-padded and kept. Unset is ''. Null when the text is no time OpenCode
 * could read; such a value would show as an empty time input and be erased on
 * the next blur.
 */
export declare const timeInputValue: (stored: string | undefined) => string | null;
export declare const WEEKDAYS: readonly [0, 1, 2, 3, 4, 5, 6];
/** The weekdays a window names, as numbers; entries the editor cannot read are left out. */
export declare const windowWeekdays: (window: ScheduleWindow | undefined) => number[];
/** Turns one weekday on or off, keeping stored days the editor cannot read. */
export declare const toggleWeekday: (window: ScheduleWindow | undefined, day: number) => ScheduleWindow;
/** Sets or removes one window field; an undefined value removes it. */
export declare const withWindowField: <K extends keyof ScheduleWindow>(window: ScheduleWindow | undefined, key: K, value: ScheduleWindow[K] | undefined) => ScheduleWindow;
/** A comma-separated list as trimmed entries, without blanks; an empty list is undefined. */
export declare const parseList: (text: string) => string[] | undefined;
/**
 * Days of the month typed as "1, 15, -1". Returns undefined for an empty field
 * (every day) and null when an entry is not 1 to 31 or -1.
 */
export declare const parseDaysOfMonth: (text: string) => number[] | undefined | null;
/** Whether the runtime knows an IANA timezone name. */
export declare const isTimezone: (name: string) => boolean;
type ScheduleEffect = 'factor' | 'weight';
export declare const scheduleEffect: (schedule: GlobalSchedule) => ScheduleEffect;
/** Sets the schedule's change as a factor or an outright weight; the other one is removed. */
export declare const withScheduleEffect: (schedule: GlobalSchedule, effect: ScheduleEffect, value: number) => GlobalSchedule;
/** Sets or removes one schedule field; an undefined value removes it. */
export declare const withScheduleField: <K extends keyof GlobalSchedule>(schedule: GlobalSchedule, key: K, value: GlobalSchedule[K] | undefined) => GlobalSchedule;
/** A new entry: every day, all day, weight unchanged until the user picks a change. */
export declare const newSchedule: () => GlobalSchedule;
export {};
