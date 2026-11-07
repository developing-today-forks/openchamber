import { z } from 'zod';
export declare const guestWorkspaceQuerySchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"projects">;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"worktrees">;
    projectId: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"sessions">;
    projectId: z.ZodString;
}, z.core.$strict>], "kind">;
export declare const guestWorkspaceSnapshotSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"projects">;
    state: z.ZodEnum<{
        error: "error";
        loading: "loading";
        ready: "ready";
    }>;
    projects: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        directory: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"worktrees">;
    projectId: z.ZodString;
    state: z.ZodEnum<{
        error: "error";
        loading: "loading";
        ready: "ready";
    }>;
    worktrees: z.ZodArray<z.ZodObject<{
        directory: z.ZodString;
        name: z.ZodString;
        branch: z.ZodString;
        status: z.ZodEnum<{
            invalid: "invalid";
            missing: "missing";
            pending: "pending";
            ready: "ready";
        }>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"sessions">;
    projectId: z.ZodString;
    state: z.ZodEnum<{
        error: "error";
        loading: "loading";
        ready: "ready";
    }>;
    coverage: z.ZodArray<z.ZodObject<{
        directory: z.ZodString;
        state: z.ZodEnum<{
            error: "error";
            loading: "loading";
            ready: "ready";
        }>;
    }, z.core.$strip>>;
    sessions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        projectId: z.ZodString;
        directory: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodNumber;
        updatedAt: z.ZodNumber;
        archivedAt: z.ZodNullable<z.ZodNumber>;
        worktree: z.ZodNullable<z.ZodObject<{
            directory: z.ZodString;
            name: z.ZodString;
            branch: z.ZodString;
            status: z.ZodEnum<{
                invalid: "invalid";
                missing: "missing";
                pending: "pending";
                ready: "ready";
            }>;
        }, z.core.$strip>>;
        activity: z.ZodEnum<{
            idle: "idle";
            retrying: "retrying";
            running: "running";
            unknown: "unknown";
            "waiting-permission": "waiting-permission";
            "waiting-question": "waiting-question";
        }>;
        outcome: z.ZodNullable<z.ZodEnum<{
            completed: "completed";
            failed: "failed";
        }>>;
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            data: z.ZodOptional<z.ZodJSONSchema>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>], "kind">;
export declare const guestSessionWorktreeSchema: z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
    kind: z.ZodLiteral<"existing">;
    directory: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    kind: z.ZodLiteral<"new">;
    name: z.ZodOptional<z.ZodString>;
    baseBranch: z.ZodOptional<z.ZodString>;
}, z.core.$strict>]>;
export declare const guestStorageRequestSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    op: z.ZodLiteral<"get">;
    key: z.ZodString;
    scope: z.ZodOptional<z.ZodEnum<{
        device: "device";
        instance: "instance";
    }>>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"delete">;
    key: z.ZodString;
    scope: z.ZodOptional<z.ZodEnum<{
        device: "device";
        instance: "instance";
    }>>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"set">;
    key: z.ZodString;
    value: z.ZodJSONSchema;
    scope: z.ZodOptional<z.ZodEnum<{
        device: "device";
        instance: "instance";
    }>>;
}, z.core.$strict>, z.ZodObject<{
    op: z.ZodLiteral<"keys">;
    scope: z.ZodOptional<z.ZodEnum<{
        device: "device";
        instance: "instance";
    }>>;
}, z.core.$strict>], "op">;
export declare const guestStorageResultSchema: z.ZodUnion<readonly [z.ZodObject<{
    storage: z.ZodLiteral<true>;
    op: z.ZodLiteral<"get">;
    found: z.ZodLiteral<false>;
}, z.core.$strip>, z.ZodObject<{
    storage: z.ZodLiteral<true>;
    op: z.ZodLiteral<"get">;
    found: z.ZodLiteral<true>;
    value: z.ZodJSONSchema;
}, z.core.$strip>, z.ZodObject<{
    storage: z.ZodLiteral<true>;
    op: z.ZodEnum<{
        delete: "delete";
        set: "set";
    }>;
}, z.core.$strip>, z.ZodObject<{
    storage: z.ZodLiteral<true>;
    op: z.ZodLiteral<"keys">;
    keys: z.ZodArray<z.ZodString>;
}, z.core.$strip>]>;
