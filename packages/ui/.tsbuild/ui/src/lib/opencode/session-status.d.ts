import { z } from "zod";
export declare const activeSessionSnapshotSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    type: z.ZodLiteral<"running">;
}, z.core.$strip>>;
export declare const hostSessionStatusSnapshotSchema: z.ZodObject<{
    sessions: z.ZodRecord<z.ZodString, z.ZodObject<{
        status: z.ZodString;
        lastUpdateAt: z.ZodNumber;
    }, z.core.$strip>>;
    pending: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        permissions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            sessionID: z.ZodString;
            action: z.ZodString;
            resources: z.ZodArray<z.ZodString>;
            save: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>;
        forms: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            sessionID: z.ZodString;
            title: z.ZodString;
        }, z.core.$strip>>;
        pages: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            sessionID: z.ZodString;
            title: z.ZodString;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>>;
    serverTime: z.ZodNumber;
}, z.core.$strip>;
export type HostSessionStatusSnapshot = z.infer<typeof hostSessionStatusSnapshotSchema>;
declare const sessionActivityV1EntrySchema: z.ZodObject<{
    type: z.ZodEnum<{
        busy: "busy";
        cooldown: "cooldown";
        idle: "idle";
    }>;
    lastActivityAt: z.ZodNumber;
    status: z.ZodNullable<z.ZodString>;
    model: z.ZodNullable<z.ZodObject<{
        modelID: z.ZodNullable<z.ZodString>;
        providerID: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    toolInFlight: z.ZodNull;
}, z.core.$strip>;
export declare const sessionActivityV1SnapshotSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    serverTime: z.ZodNumber;
    watcherReady: z.ZodBoolean;
    sessions: z.ZodRecord<z.ZodString, z.ZodObject<{
        type: z.ZodEnum<{
            busy: "busy";
            cooldown: "cooldown";
            idle: "idle";
        }>;
        lastActivityAt: z.ZodNumber;
        status: z.ZodNullable<z.ZodString>;
        model: z.ZodNullable<z.ZodObject<{
            modelID: z.ZodNullable<z.ZodString>;
            providerID: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>>;
        toolInFlight: z.ZodNull;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SessionActivityV1Entry = z.infer<typeof sessionActivityV1EntrySchema>;
export {};
