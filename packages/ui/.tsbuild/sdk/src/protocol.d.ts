import { z } from 'zod';
import { type GuestMessage, type HostMessage } from './contract.ts';
export declare const hostMessageSchema: z.ZodUnion<readonly [z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"workspace">;
    payload: z.ZodObject<{
        subscriptionId: z.ZodString;
        snapshot: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"shells">;
    payload: z.ZodObject<{
        subscriptionId: z.ZodString;
        snapshot: z.ZodObject<{
            kind: z.ZodLiteral<"shells">;
            scope: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"session">;
                sessionId: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"project">;
                projectId: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"global">;
            }, z.core.$strict>], "kind">;
            shells: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                sessionID: z.ZodString;
                command: z.ZodString;
                startedAt: z.ZodNumber;
                background: z.ZodBoolean;
            }, z.core.$strict>>;
            ended: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                sessionID: z.ZodString;
                command: z.ZodString;
                startedAt: z.ZodNumber;
                background: z.ZodBoolean;
                status: z.ZodEnum<{
                    exited: "exited";
                    killed: "killed";
                    stopped: "stopped";
                    timeout: "timeout";
                    unknown: "unknown";
                }>;
                exit: z.ZodOptional<z.ZodNumber>;
                endedAt: z.ZodNumber;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"ready">;
    payload: z.ZodObject<{
        theme: z.ZodObject<{
            mode: z.ZodEnum<{
                dark: "dark";
                light: "light";
            }>;
            tokens: z.ZodObject<{
                background: z.ZodString;
                elevated: z.ZodString;
                foreground: z.ZodString;
                muted: z.ZodString;
                subtle: z.ZodString;
                border: z.ZodString;
                hover: z.ZodString;
                selection: z.ZodString;
                focus: z.ZodString;
                primary: z.ZodString;
                mutedSurface: z.ZodString;
                elevatedForeground: z.ZodString;
                active: z.ZodString;
                selectionForeground: z.ZodString;
                primaryForeground: z.ZodString;
                primaryText: z.ZodString;
                successText: z.ZodString;
                warningText: z.ZodString;
                errorText: z.ZodString;
                infoText: z.ZodString;
                success: z.ZodString;
                warning: z.ZodString;
                error: z.ZodString;
                info: z.ZodString;
                font: z.ZodString;
                mono: z.ZodString;
                radius: z.ZodString;
                syntaxKeyword: z.ZodOptional<z.ZodString>;
                syntaxString: z.ZodOptional<z.ZodString>;
                syntaxNumber: z.ZodOptional<z.ZodString>;
                syntaxFunction: z.ZodOptional<z.ZodString>;
                syntaxType: z.ZodOptional<z.ZodString>;
                syntaxComment: z.ZodOptional<z.ZodString>;
                syntaxVariable: z.ZodOptional<z.ZodString>;
                syntaxOperator: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
        }, z.core.$strip>;
        locale: z.ZodString;
        directory: z.ZodNullable<z.ZodString>;
        session: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            busy: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            model: z.ZodOptional<z.ZodString>;
            agent: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        surface: z.ZodEnum<{
            background: "background";
            dialog: "dialog";
            file: "file";
            page: "page";
            panel: "panel";
            popover: "popover";
            status: "status";
        }>;
        connection: z.ZodObject<{
            connected: z.ZodBoolean;
            account: z.ZodString;
        }, z.core.$strip>;
        settings: z.ZodRecord<z.ZodString, z.ZodString>;
        item: z.ZodNullable<z.ZodUnion<readonly [z.ZodObject<{
            kind: z.ZodLiteral<"message">;
            action: z.ZodString;
            sessionId: z.ZodString;
            sessionTitle: z.ZodString;
            directory: z.ZodNullable<z.ZodString>;
            messageId: z.ZodString;
            role: z.ZodEnum<{
                assistant: "assistant";
                user: "user";
            }>;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"session">;
            action: z.ZodString;
            sessionId: z.ZodString;
            sessionTitle: z.ZodString;
            directory: z.ZodNullable<z.ZodString>;
            messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                role: z.ZodEnum<{
                    assistant: "assistant";
                    user: "user";
                }>;
                text: z.ZodString;
                createdAt: z.ZodNumber;
            }, z.core.$strip>>>;
            truncated: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodObject<{
            providerId: z.ZodString;
            id: z.ZodString;
            title: z.ZodString;
            url: z.ZodString;
            text: z.ZodOptional<z.ZodString>;
            kind: z.ZodOptional<z.ZodEnum<{
                issue: "issue";
                pull: "pull";
            }>>;
            author: z.ZodOptional<z.ZodString>;
            branches: z.ZodOptional<z.ZodObject<{
                head: z.ZodString;
                base: z.ZodString;
            }, z.core.$strip>>;
            data: z.ZodOptional<z.ZodJSONSchema>;
        }, z.core.$strip>]>>;
        popover: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            data: z.ZodCustom<import("./contract.ts").JsonValue, import("./contract.ts").JsonValue>;
        }, z.core.$strict>>;
        features: z.ZodOptional<z.ZodObject<{
            deviceStorage: z.ZodOptional<z.ZodLiteral<true>>;
            statusControls: z.ZodOptional<z.ZodLiteral<true>>;
            popovers: z.ZodOptional<z.ZodLiteral<true>>;
            lateGenerateResults: z.ZodOptional<z.ZodLiteral<true>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"directory">;
    payload: z.ZodObject<{
        directory: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"session">;
    payload: z.ZodObject<{
        session: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            busy: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            model: z.ZodOptional<z.ZodString>;
            agent: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"connection">;
    payload: z.ZodObject<{
        connection: z.ZodObject<{
            connected: z.ZodBoolean;
            account: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"settings">;
    payload: z.ZodObject<{
        settings: z.ZodRecord<z.ZodString, z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"session-lifecycle">;
    payload: z.ZodObject<{
        sessionId: z.ZodString;
        phase: z.ZodEnum<{
            completed: "completed";
            failure: "failure";
            started: "started";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"item">;
    payload: z.ZodObject<{
        item: z.ZodNullable<z.ZodUnion<readonly [z.ZodObject<{
            kind: z.ZodLiteral<"message">;
            action: z.ZodString;
            sessionId: z.ZodString;
            sessionTitle: z.ZodString;
            directory: z.ZodNullable<z.ZodString>;
            messageId: z.ZodString;
            role: z.ZodEnum<{
                assistant: "assistant";
                user: "user";
            }>;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"session">;
            action: z.ZodString;
            sessionId: z.ZodString;
            sessionTitle: z.ZodString;
            directory: z.ZodNullable<z.ZodString>;
            messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                role: z.ZodEnum<{
                    assistant: "assistant";
                    user: "user";
                }>;
                text: z.ZodString;
                createdAt: z.ZodNumber;
            }, z.core.$strip>>>;
            truncated: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodObject<{
            providerId: z.ZodString;
            id: z.ZodString;
            title: z.ZodString;
            url: z.ZodString;
            text: z.ZodOptional<z.ZodString>;
            kind: z.ZodOptional<z.ZodEnum<{
                issue: "issue";
                pull: "pull";
            }>>;
            author: z.ZodOptional<z.ZodString>;
            branches: z.ZodOptional<z.ZodObject<{
                head: z.ZodString;
                base: z.ZodString;
            }, z.core.$strip>>;
            data: z.ZodOptional<z.ZodJSONSchema>;
        }, z.core.$strip>]>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"status-control-event">;
    payload: z.ZodObject<{
        id: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"popover-closed">;
    payload: z.ZodObject<{
        id: z.ZodString;
        reason: z.ZodEnum<{
            anchor: "anchor";
            closed: "closed";
            escape: "escape";
            outside: "outside";
            owner: "owner";
            replaced: "replaced";
        }>;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"resolve">;
    id: z.ZodString;
    payload: z.ZodObject<{
        command: z.ZodString;
        args: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodPipe<z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"result">;
    id: z.ZodString;
    ok: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    payload: z.ZodOptional<z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodObject<{
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
    }, z.core.$strip>]>, z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strip>], "kind">, z.ZodObject<{
        output: z.ZodString;
        cursor: z.ZodNumber;
        skipped: z.ZodBoolean;
    }, z.core.$strip>, z.ZodObject<{
        stopped: z.ZodLiteral<true>;
    }, z.core.$strip>, z.ZodUnion<readonly [z.ZodObject<{
        sessionId: z.ZodString;
        sent: z.ZodEnum<{
            failed: "failed";
            "no-model": "no-model";
            sent: "sent";
            skipped: "skipped";
        }>;
        directory: z.ZodOptional<z.ZodString>;
        worktree: z.ZodOptional<z.ZodObject<{
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
        linked: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        sessionId: z.ZodNull;
        sent: z.ZodLiteral<"skipped">;
        directory: z.ZodString;
        worktree: z.ZodObject<{
            directory: z.ZodString;
            name: z.ZodString;
            branch: z.ZodString;
            status: z.ZodEnum<{
                invalid: "invalid";
                missing: "missing";
                pending: "pending";
                ready: "ready";
            }>;
        }, z.core.$strip>;
        failure: z.ZodEnum<{
            "bootstrap-failed": "bootstrap-failed";
            "session-create-failed": "session-create-failed";
        }>;
    }, z.core.$strip>]>, z.ZodObject<{
        status: z.ZodNumber;
        body: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        sent: z.ZodEnum<{
            failed: "failed";
            "no-model": "no-model";
            sent: "sent";
            skipped: "skipped";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        status: z.ZodEnum<{
            failed: "failed";
            ready: "ready";
            starting: "starting";
            stopped: "stopped";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        content: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        written: z.ZodLiteral<true>;
    }, z.core.$strip>, z.ZodObject<{
        entries: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            kind: z.ZodEnum<{
                directory: "directory";
                file: "file";
                other: "other";
            }>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodEnum<{
            directory: "directory";
            file: "file";
            missing: "missing";
            other: "other";
        }>;
        size: z.ZodNumber;
        mtime: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        text: z.ZodString;
    }, z.core.$strip>]>>;
}, z.core.$strip>, z.ZodTransform<{
    error?: undefined;
    channel: "openchamber.sdk";
    v: 1;
    type: 'result';
    id: string;
    ok: true;
    payload: {
        kind: "projects";
        state: "error" | "loading" | "ready";
        projects: {
            id: string;
            name: string;
            directory: string;
        }[];
    } | {
        kind: "worktrees";
        projectId: string;
        state: "error" | "loading" | "ready";
        worktrees: {
            directory: string;
            name: string;
            branch: string;
            status: "invalid" | "missing" | "pending" | "ready";
        }[];
    } | {
        kind: "sessions";
        projectId: string;
        state: "error" | "loading" | "ready";
        coverage: {
            directory: string;
            state: "error" | "loading" | "ready";
        }[];
        sessions: {
            id: string;
            title: string;
            projectId: string;
            directory: string;
            parentId: string | null;
            createdAt: number;
            updatedAt: number;
            archivedAt: number | null;
            worktree: {
                directory: string;
                name: string;
                branch: string;
                status: "invalid" | "missing" | "pending" | "ready";
            } | null;
            activity: "idle" | "retrying" | "running" | "unknown" | "waiting-permission" | "waiting-question";
            outcome: "completed" | "failed" | null;
            items: {
                id: string;
                data?: z.util.JSONType | undefined;
            }[];
        }[];
    } | {
        status: number;
        body: string;
    } | {
        sent: "failed" | "no-model" | "sent" | "skipped";
    } | {
        status: "failed" | "ready" | "starting" | "stopped";
    } | {
        content: string;
    } | {
        written: true;
    } | {
        entries: {
            name: string;
            kind: "directory" | "file" | "other";
        }[];
    } | {
        kind: "directory" | "file" | "missing" | "other";
        size: number;
        mtime: number;
    } | {
        text: string;
    } | {
        output: string;
        cursor: number;
        skipped: boolean;
    } | {
        stopped: true;
    } | {
        sessionId: string;
        sent: "failed" | "no-model" | "sent" | "skipped";
        directory?: string | undefined;
        worktree?: {
            directory: string;
            name: string;
            branch: string;
            status: "invalid" | "missing" | "pending" | "ready";
        } | undefined;
        linked?: boolean | undefined;
    } | {
        sessionId: null;
        sent: "skipped";
        directory: string;
        worktree: {
            directory: string;
            name: string;
            branch: string;
            status: "invalid" | "missing" | "pending" | "ready";
        };
        failure: "bootstrap-failed" | "session-create-failed";
    } | {
        storage: true;
        op: "get";
        found: false;
    } | {
        storage: true;
        op: "get";
        found: true;
        value: z.util.JSONType;
    } | {
        storage: true;
        op: "delete" | "set";
    } | {
        storage: true;
        op: "keys";
        keys: string[];
    };
    code?: undefined;
} | {
    error?: undefined;
    payload?: undefined;
    channel: "openchamber.sdk";
    v: 1;
    type: 'result';
    id: string;
    ok: true;
    code?: undefined;
} | {
    payload?: undefined;
    channel: "openchamber.sdk";
    v: 1;
    type: 'result';
    id: string;
    ok: false;
    error: string;
    code: "BAD_PATH" | "DENIED" | "DISABLED" | "DISCONNECTED" | "FILE_TOO_LARGE" | "HOST_REJECTED" | "HOST_TIMEOUT" | "HOST_UNAVAILABLE" | "MODEL_FAILED" | "NOT_FOUND" | "NOT_GRANTED" | "NO_DIRECTORY" | "NO_INTEGRATION" | "NO_MODEL" | "NO_SERVICE" | "NO_SESSION" | "REQUEST_FAILED" | "RESPONSE_TOO_LARGE" | "SERVICE_FAILED" | "SESSION_BUSY" | "UNSUPPORTED";
}, {
    channel: "openchamber.sdk";
    v: 1;
    type: "result";
    id: string;
    ok: boolean;
    error?: string | undefined;
    code?: string | undefined;
    payload?: {
        kind: "projects";
        state: "error" | "loading" | "ready";
        projects: {
            id: string;
            name: string;
            directory: string;
        }[];
    } | {
        kind: "worktrees";
        projectId: string;
        state: "error" | "loading" | "ready";
        worktrees: {
            directory: string;
            name: string;
            branch: string;
            status: "invalid" | "missing" | "pending" | "ready";
        }[];
    } | {
        kind: "sessions";
        projectId: string;
        state: "error" | "loading" | "ready";
        coverage: {
            directory: string;
            state: "error" | "loading" | "ready";
        }[];
        sessions: {
            id: string;
            title: string;
            projectId: string;
            directory: string;
            parentId: string | null;
            createdAt: number;
            updatedAt: number;
            archivedAt: number | null;
            worktree: {
                directory: string;
                name: string;
                branch: string;
                status: "invalid" | "missing" | "pending" | "ready";
            } | null;
            activity: "idle" | "retrying" | "running" | "unknown" | "waiting-permission" | "waiting-question";
            outcome: "completed" | "failed" | null;
            items: {
                id: string;
                data?: z.util.JSONType | undefined;
            }[];
        }[];
    } | {
        status: number;
        body: string;
    } | {
        sent: "failed" | "no-model" | "sent" | "skipped";
    } | {
        status: "failed" | "ready" | "starting" | "stopped";
    } | {
        content: string;
    } | {
        written: true;
    } | {
        entries: {
            name: string;
            kind: "directory" | "file" | "other";
        }[];
    } | {
        kind: "directory" | "file" | "missing" | "other";
        size: number;
        mtime: number;
    } | {
        text: string;
    } | {
        output: string;
        cursor: number;
        skipped: boolean;
    } | {
        stopped: true;
    } | {
        sessionId: string;
        sent: "failed" | "no-model" | "sent" | "skipped";
        directory?: string | undefined;
        worktree?: {
            directory: string;
            name: string;
            branch: string;
            status: "invalid" | "missing" | "pending" | "ready";
        } | undefined;
        linked?: boolean | undefined;
    } | {
        sessionId: null;
        sent: "skipped";
        directory: string;
        worktree: {
            directory: string;
            name: string;
            branch: string;
            status: "invalid" | "missing" | "pending" | "ready";
        };
        failure: "bootstrap-failed" | "session-create-failed";
    } | {
        storage: true;
        op: "get";
        found: false;
    } | {
        storage: true;
        op: "get";
        found: true;
        value: z.util.JSONType;
    } | {
        storage: true;
        op: "delete" | "set";
    } | {
        storage: true;
        op: "keys";
        keys: string[];
    } | undefined;
}>>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"action">;
    id: z.ZodString;
    payload: z.ZodUnion<readonly [z.ZodObject<{
        kind: z.ZodLiteral<"message">;
        action: z.ZodString;
        sessionId: z.ZodString;
        sessionTitle: z.ZodString;
        directory: z.ZodNullable<z.ZodString>;
        messageId: z.ZodString;
        role: z.ZodEnum<{
            assistant: "assistant";
            user: "user";
        }>;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"session">;
        action: z.ZodString;
        sessionId: z.ZodString;
        sessionTitle: z.ZodString;
        directory: z.ZodNullable<z.ZodString>;
        messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            role: z.ZodEnum<{
                assistant: "assistant";
                user: "user";
            }>;
            text: z.ZodString;
            createdAt: z.ZodNumber;
        }, z.core.$strip>>>;
        truncated: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>]>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-open">;
    payload: z.ZodUnion<readonly [z.ZodObject<{
        path: z.ZodString;
        name: z.ZodString;
        readOnly: z.ZodBoolean;
        encoding: z.ZodLiteral<"text">;
        content: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        path: z.ZodString;
        name: z.ZodString;
        readOnly: z.ZodBoolean;
        encoding: z.ZodLiteral<"binary">;
        bytes: z.ZodCustom<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>;
    }, z.core.$strip>]>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-snapshot">;
    id: z.ZodString;
    payload: z.ZodObject<{
        purpose: z.ZodEnum<{
            handoff: "handoff";
            save: "save";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-saved">;
    payload: z.ZodObject<{
        version: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"generate-late">;
    payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
        request: z.ZodObject<{
            prompt: z.ZodString;
            system: z.ZodOptional<z.ZodString>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        ok: z.ZodLiteral<true>;
        result: z.ZodObject<{
            text: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        request: z.ZodObject<{
            prompt: z.ZodString;
            system: z.ZodOptional<z.ZodString>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        ok: z.ZodLiteral<false>;
        code: z.ZodEnum<{
            BAD_PATH: "BAD_PATH";
            DENIED: "DENIED";
            DISABLED: "DISABLED";
            DISCONNECTED: "DISCONNECTED";
            FILE_TOO_LARGE: "FILE_TOO_LARGE";
            HOST_REJECTED: "HOST_REJECTED";
            HOST_TIMEOUT: "HOST_TIMEOUT";
            HOST_UNAVAILABLE: "HOST_UNAVAILABLE";
            MODEL_FAILED: "MODEL_FAILED";
            NOT_FOUND: "NOT_FOUND";
            NOT_GRANTED: "NOT_GRANTED";
            NO_DIRECTORY: "NO_DIRECTORY";
            NO_INTEGRATION: "NO_INTEGRATION";
            NO_MODEL: "NO_MODEL";
            NO_SERVICE: "NO_SERVICE";
            NO_SESSION: "NO_SESSION";
            REQUEST_FAILED: "REQUEST_FAILED";
            RESPONSE_TOO_LARGE: "RESPONSE_TOO_LARGE";
            SERVICE_FAILED: "SERVICE_FAILED";
            SESSION_BUSY: "SESSION_BUSY";
            UNSUPPORTED: "UNSUPPORTED";
        }>;
        error: z.ZodString;
    }, z.core.$strip>], "ok">;
}, z.core.$strip>]>;
export declare const guestMessageSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"action-result">;
    id: z.ZodString;
    payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
        ok: z.ZodLiteral<true>;
    }, z.core.$strip>, z.ZodObject<{
        ok: z.ZodLiteral<false>;
        error: z.ZodString;
    }, z.core.$strip>], "ok">;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"workspace-read">;
    id: z.ZodString;
    payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"projects">;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"worktrees">;
        projectId: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"sessions">;
        projectId: z.ZodString;
    }, z.core.$strict>], "kind">;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"workspace-subscribe">;
    id: z.ZodString;
    payload: z.ZodObject<{
        subscriptionId: z.ZodString;
        query: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"projects">;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"worktrees">;
            projectId: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"sessions">;
            projectId: z.ZodString;
        }, z.core.$strict>], "kind">;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"workspace-unsubscribe">;
    id: z.ZodString;
    payload: z.ZodObject<{
        subscriptionId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"shells-subscribe">;
    id: z.ZodString;
    payload: z.ZodObject<{
        subscriptionId: z.ZodString;
        scope: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"session">;
            sessionId: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"project">;
            projectId: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"global">;
        }, z.core.$strict>], "kind">;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"shells-unsubscribe">;
    id: z.ZodString;
    payload: z.ZodObject<{
        subscriptionId: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"shell-output">;
    id: z.ZodString;
    payload: z.ZodObject<{
        shellId: z.ZodString;
        cursor: z.ZodOptional<z.ZodNumber>;
        tailBytes: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"shell-stop">;
    id: z.ZodString;
    payload: z.ZodObject<{
        shellId: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"storage">;
    id: z.ZodString;
    payload: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"status-controls">;
    id: z.ZodString;
    payload: z.ZodObject<{
        controls: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"button">;
            id: z.ZodString;
            label: z.ZodString;
            disabled: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"select">;
            id: z.ZodString;
            label: z.ZodString;
            value: z.ZodString;
            options: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                label: z.ZodString;
            }, z.core.$strict>>;
            disabled: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"popover-open">;
    id: z.ZodString;
    payload: z.ZodObject<{
        id: z.ZodString;
        anchor: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, z.core.$strict>;
        width: z.ZodNumber;
        height: z.ZodNumber;
        side: z.ZodOptional<z.ZodEnum<{
            bottom: "bottom";
            left: "left";
            right: "right";
            top: "top";
        }>>;
        focus: z.ZodOptional<z.ZodBoolean>;
        data: z.ZodCustom<import("./contract.ts").JsonValue, import("./contract.ts").JsonValue>;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"popover-close">;
    id: z.ZodString;
    payload: z.ZodObject<{
        id: z.ZodString;
        reason: z.ZodOptional<z.ZodEnum<{
            closed: "closed";
            escape: "escape";
        }>>;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"popover-anchor">;
    id: z.ZodString;
    payload: z.ZodObject<{
        id: z.ZodString;
        active: z.ZodBoolean;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"open-session">;
    id: z.ZodString;
    payload: z.ZodObject<{
        sessionId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"hello">;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"toast">;
    id: z.ZodString;
    payload: z.ZodObject<{
        kind: z.ZodEnum<{
            error: "error";
            info: "info";
            success: "success";
        }>;
        message: z.ZodString;
        copy: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
            text: z.ZodString;
        }, z.core.$strip>]>>;
        dismiss: z.ZodOptional<z.ZodBoolean>;
        persistent: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"open-url">;
    id: z.ZodString;
    payload: z.ZodObject<{
        url: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"open-surface">;
    id: z.ZodString;
    payload: z.ZodObject<{
        surfaceId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"clipboard-write">;
    id: z.ZodString;
    payload: z.ZodObject<{
        text: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"compose">;
    id: z.ZodString;
    payload: z.ZodObject<{
        text: z.ZodString;
        mode: z.ZodOptional<z.ZodEnum<{
            append: "append";
            replace: "replace";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"attach">;
    id: z.ZodString;
    payload: z.ZodObject<{
        providerId: z.ZodString;
        id: z.ZodString;
        title: z.ZodString;
        url: z.ZodString;
        text: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodEnum<{
            issue: "issue";
            pull: "pull";
        }>>;
        author: z.ZodOptional<z.ZodString>;
        branches: z.ZodOptional<z.ZodObject<{
            head: z.ZodString;
            base: z.ZodString;
        }, z.core.$strip>>;
        data: z.ZodOptional<z.ZodJSONSchema>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"start-session">;
    id: z.ZodString;
    payload: z.ZodObject<{
        providerId: z.ZodString;
        id: z.ZodString;
        title: z.ZodString;
        url: z.ZodString;
        text: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodEnum<{
            issue: "issue";
            pull: "pull";
        }>>;
        author: z.ZodOptional<z.ZodString>;
        branches: z.ZodOptional<z.ZodObject<{
            head: z.ZodString;
            base: z.ZodString;
        }, z.core.$strip>>;
        data: z.ZodOptional<z.ZodJSONSchema>;
        worktree: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
            kind: z.ZodLiteral<"existing">;
            directory: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"new">;
            name: z.ZodOptional<z.ZodString>;
            baseBranch: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>]>>;
        projectId: z.ZodOptional<z.ZodString>;
        navigation: z.ZodOptional<z.ZodEnum<{
            open: "open";
            preserve: "preserve";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"prompt">;
    id: z.ZodString;
    payload: z.ZodObject<{
        text: z.ZodString;
        send: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"session-link">;
    id: z.ZodString;
    payload: z.ZodObject<{
        providerId: z.ZodString;
        id: z.ZodString;
        title: z.ZodString;
        url: z.ZodString;
        text: z.ZodOptional<z.ZodString>;
        kind: z.ZodOptional<z.ZodEnum<{
            issue: "issue";
            pull: "pull";
        }>>;
        author: z.ZodOptional<z.ZodString>;
        branches: z.ZodOptional<z.ZodObject<{
            head: z.ZodString;
            base: z.ZodString;
        }, z.core.$strip>>;
        data: z.ZodOptional<z.ZodJSONSchema>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"close">;
    id: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"oauth-start">;
    id: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"oauth-disconnect">;
    id: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"request">;
    id: z.ZodString;
    payload: z.ZodObject<{
        method: z.ZodEnum<{
            DELETE: "DELETE";
            GET: "GET";
            PATCH: "PATCH";
            POST: "POST";
            PUT: "PUT";
        }>;
        path: z.ZodString;
        query: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        body: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"service-request">;
    id: z.ZodString;
    payload: z.ZodObject<{
        method: z.ZodEnum<{
            DELETE: "DELETE";
            GET: "GET";
            PATCH: "PATCH";
            POST: "POST";
            PUT: "PUT";
        }>;
        path: z.ZodString;
        query: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        body: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"service-status">;
    id: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-read">;
    id: z.ZodString;
    payload: z.ZodObject<{
        path: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-write">;
    id: z.ZodString;
    payload: z.ZodObject<{
        path: z.ZodString;
        content: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-list">;
    id: z.ZodString;
    payload: z.ZodObject<{
        path: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-stat">;
    id: z.ZodString;
    payload: z.ZodObject<{
        path: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"generate">;
    id: z.ZodString;
    payload: z.ZodObject<{
        prompt: z.ZodString;
        system: z.ZodOptional<z.ZodString>;
        maxOutputTokens: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"badge">;
    id: z.ZodString;
    payload: z.ZodObject<{
        count: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"open-commit">;
    id: z.ZodString;
    payload: z.ZodObject<{
        sha: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"resize">;
    id: z.ZodString;
    payload: z.ZodObject<{
        height: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"resolve-result">;
    id: z.ZodString;
    payload: z.ZodUnion<readonly [z.ZodObject<{
        item: z.ZodNullable<z.ZodObject<{
            providerId: z.ZodString;
            id: z.ZodString;
            title: z.ZodString;
            url: z.ZodString;
            text: z.ZodOptional<z.ZodString>;
            kind: z.ZodOptional<z.ZodEnum<{
                issue: "issue";
                pull: "pull";
            }>>;
            author: z.ZodOptional<z.ZodString>;
            branches: z.ZodOptional<z.ZodObject<{
                head: z.ZodString;
                base: z.ZodString;
            }, z.core.$strip>>;
            data: z.ZodOptional<z.ZodJSONSchema>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        error: z.ZodString;
    }, z.core.$strip>]>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-snapshot-result">;
    id: z.ZodString;
    payload: z.ZodUnion<readonly [z.ZodObject<{
        snapshot: z.ZodUnion<readonly [z.ZodObject<{
            content: z.ZodString;
            version: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            bytes: z.ZodCustom<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>;
            version: z.ZodString;
        }, z.core.$strip>]>;
    }, z.core.$strip>, z.ZodObject<{
        error: z.ZodString;
    }, z.core.$strip>]>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-change">;
    payload: z.ZodObject<{
        dirty: z.ZodBoolean;
        edited: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-save">;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"file-unsupported">;
}, z.core.$strip>, z.ZodObject<{
    channel: z.ZodLiteral<"openchamber.sdk">;
    v: z.ZodLiteral<1>;
    type: z.ZodLiteral<"generate-late-listen">;
}, z.core.$strip>], "type">;
type HostWire = z.input<typeof hostMessageSchema>;
type GuestWire = z.input<typeof guestMessageSchema>;
export declare const parseHostMessage: (document: HostWire) => HostMessage | null;
export declare const parseGuestMessage: (document: GuestWire) => GuestMessage | null;
export {};
