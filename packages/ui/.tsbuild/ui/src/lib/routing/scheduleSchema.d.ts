/**
 * Schedule shapes. The wire carries a schedule list exactly as the config file
 * holds it (`storedSchedulesSchema`); the editor reads it entry by entry with
 * `globalScheduleSchema`.
 */
import { z } from 'zod';
declare const scheduleWindowSchema: z.ZodObject<{
    daysOfWeek: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
    daysOfMonth: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
    start: z.ZodOptional<z.ZodString>;
    end: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodNumber>;
    until: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>;
/**
 * One schedule as far as the editor can read it: OpenCode's `Schedule` inside
 * a pool, plus the `GlobalSchedule` match lists across pools. Schedules arrive
 * as stored (`storedSchedulesSchema`) and are read entry by entry with this, so
 * a hand-written entry it cannot read still loads, shows read-only, and the
 * server names the problem on save.
 */
export declare const globalScheduleSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    providers: z.ZodOptional<z.ZodArray<z.ZodString>>;
    models: z.ZodOptional<z.ZodArray<z.ZodString>>;
    targets: z.ZodOptional<z.ZodArray<z.ZodString>>;
    routes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    when: z.ZodOptional<z.ZodObject<{
        daysOfWeek: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
        daysOfMonth: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
        start: z.ZodOptional<z.ZodString>;
        end: z.ZodOptional<z.ZodString>;
        timezone: z.ZodOptional<z.ZodString>;
        from: z.ZodOptional<z.ZodNumber>;
        until: z.ZodOptional<z.ZodNumber>;
    }, z.core.$loose>>;
    factor: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$loose>;
/** A schedule list exactly as the config file holds it. */
export declare const storedSchedulesSchema: z.ZodJSONSchema;
export type ScheduleWindow = z.infer<typeof scheduleWindowSchema>;
export type GlobalSchedule = z.infer<typeof globalScheduleSchema>;
export type StoredSchedules = z.infer<typeof storedSchedulesSchema>;
/** What a save sends: entries the editor read, and the ones it kept as stored. */
export type ScheduleListValue = ReadonlyArray<GlobalSchedule | StoredSchedules>;
/** A schedule list as loaded, or as edited and not yet confirmed by the server. */
export type ScheduleList = StoredSchedules | ScheduleListValue;
export {};
