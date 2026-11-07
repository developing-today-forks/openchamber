import { z } from 'zod';
declare const failureSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export type SpaceFailure = z.infer<typeof failureSchema>;
declare const reportedPathsSchema: z.ZodObject<{
    count: z.ZodNumber;
    paths: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type SpaceReportedPaths = z.infer<typeof reportedPathsSchema>;
declare const failureDetailsSchema: z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
    other: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    branch: z.ZodOptional<z.ZodString>;
    stillThere: z.ZodOptional<z.ZodObject<{
        count: z.ZodNumber;
        paths: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
    ignoredInTheWay: z.ZodOptional<z.ZodObject<{
        count: z.ZodNumber;
        paths: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
    filteredInTheWay: z.ZodOptional<z.ZodObject<{
        count: z.ZodNumber;
        paths: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
    tooLarge: z.ZodOptional<z.ZodArray<z.ZodString>>;
    failed: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type SpaceFailureDetails = z.infer<typeof failureDetailsSchema>;
/** A refusal or failure of a journey route: the server's code, its message, and the HTTP status. */
export declare class SpacesRequestError extends Error {
    readonly code: string;
    readonly status: number;
    readonly details: SpaceFailureDetails;
    constructor(code: string, message: string, status: number, details?: SpaceFailureDetails);
}
declare const switchSpaceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    state: z.ZodString;
}, z.core.$strip>;
type SpacesSwitchState = {
    enabled: false;
} | {
    enabled: true;
    spaces: z.infer<typeof switchSpaceSchema>[];
} | {
    enabled: true;
    spaces: null;
    failure: SpaceFailure;
};
declare const switchChangeSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    stopped: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>;
    stillRunning: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>;
    unknown: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SpacesSwitchChange = z.infer<typeof switchChangeSchema>;
declare const networkSchema: z.ZodObject<{
    mode: z.ZodEnum<{
        allowlist: "allowlist";
        open: "open";
    }>;
    domains: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type SpaceNetwork = z.infer<typeof networkSchema>;
declare const grantSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"model">;
    id: z.ZodString;
    provider: z.ZodString;
    upstream: z.ZodString;
    source: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"typed">;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"env">;
        name: z.ZodString;
    }, z.core.$strip>], "kind">;
    url: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"login">;
    id: z.ZodString;
    provider: z.ZodString;
    method: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"custom">;
    id: z.ZodString;
    provider: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"domain">;
    id: z.ZodString;
    upstream: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>], "kind">;
export type SpaceGrant = z.infer<typeof grantSchema>;
/** The grant that gives a space a provider: a key or the host's login, under the provider's id. */
export declare const providerGrantOf: (grants: readonly SpaceGrant[], providerId: string) => Extract<SpaceGrant, {
    kind: 'model' | 'login' | 'custom';
}> | undefined;
/** The steps of a creation, in order, as `openchamber:space-progress` announces them. */
declare const SPACE_CREATION_STEPS: readonly ['checking_place', 'creating', 'downloading_image', 'preparing_tools', 'setting_network', 'bringing_code', 'giving_access', 'ready'];
export type SpaceCreationStep = (typeof SPACE_CREATION_STEPS)[number];
export declare const spaceCreationStepSchema: z.ZodEnum<{
    bringing_code: "bringing_code";
    checking_place: "checking_place";
    creating: "creating";
    downloading_image: "downloading_image";
    giving_access: "giving_access";
    preparing_tools: "preparing_tools";
    ready: "ready";
    setting_network: "setting_network";
}>;
declare const setupSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    state: z.ZodLiteral<"queued">;
    total: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    state: z.ZodLiteral<"running">;
    index: z.ZodNumber;
    total: z.ZodNumber;
    command: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    state: z.ZodLiteral<"done">;
    total: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    state: z.ZodLiteral<"failed">;
    index: z.ZodNumber;
    total: z.ZodNumber;
    command: z.ZodString;
    exitCode: z.ZodNullable<z.ZodNumber>;
    timedOut: z.ZodBoolean;
    startedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    finishedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    state: z.ZodLiteral<"interrupted">;
    total: z.ZodNumber;
}, z.core.$strip>], "state">;
export type SpaceSetup = z.infer<typeof setupSchema>;
declare const spaceEntrySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    placeId: z.ZodString;
    machine: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    projectDirectory: z.ZodNullable<z.ZodString>;
    directory: z.ZodNullable<z.ZodString>;
    projectFolder: z.ZodDefault<z.ZodObject<{
        path: z.ZodNullable<z.ZodString>;
        found: z.ZodNullable<z.ZodBoolean>;
    }, z.core.$strip>>;
    state: z.ZodEnum<{
        exited: "exited";
        failed: "failed";
        missing: "missing";
        preparing: "preparing";
        running: "running";
        unreachable: "unreachable";
    }>;
    stoppedIdle: z.ZodDefault<z.ZodBoolean>;
    step: z.ZodNullable<z.ZodUnion<readonly [z.ZodEnum<{
        bringing_code: "bringing_code";
        checking_place: "checking_place";
        creating: "creating";
        downloading_image: "downloading_image";
        giving_access: "giving_access";
        preparing_tools: "preparing_tools";
        ready: "ready";
        setting_network: "setting_network";
    }>, z.ZodLiteral<"failed">]>>;
    failure: z.ZodNullable<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>;
    network: z.ZodNullable<z.ZodObject<{
        mode: z.ZodEnum<{
            allowlist: "allowlist";
            open: "open";
        }>;
        domains: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
    grants: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"model">;
        id: z.ZodString;
        provider: z.ZodString;
        upstream: z.ZodString;
        source: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"typed">;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"env">;
            name: z.ZodString;
        }, z.core.$strip>], "kind">;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"login">;
        id: z.ZodString;
        provider: z.ZodString;
        method: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"custom">;
        id: z.ZodString;
        provider: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"domain">;
        id: z.ZodString;
        upstream: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>], "kind">>;
    access: z.ZodNullable<z.ZodEnum<{
        granted: "granted";
        needs_access: "needs_access";
        unknown: "unknown";
    }>>;
    needsAccess: z.ZodArray<z.ZodString>;
    accessFailures: z.ZodDefault<z.ZodArray<z.ZodObject<{
        provider: z.ZodString;
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>>;
    damage: z.ZodDefault<z.ZodNullable<z.ZodEnum<{
        gatekeeper_gone: "gatekeeper_gone";
        repairable: "repairable";
    }>>>;
    setup: z.ZodDefault<z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
        state: z.ZodLiteral<"queued">;
        total: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"running">;
        index: z.ZodNumber;
        total: z.ZodNumber;
        command: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"done">;
        total: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"failed">;
        index: z.ZodNumber;
        total: z.ZodNumber;
        command: z.ZodString;
        exitCode: z.ZodNullable<z.ZodNumber>;
        timedOut: z.ZodBoolean;
        startedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"interrupted">;
        total: z.ZodNumber;
    }, z.core.$strip>], "state">>>;
}, z.core.$strip>;
export type SpaceEntry = z.infer<typeof spaceEntrySchema>;
/** The actions that get Docker going on this computer, see `places/docker-setup.js` on the server. */
declare const DOCKER_SETUP_ACTIONS: readonly ['install_all', 'install_cli', 'start_colima', 'start_desktop'];
export type DockerSetupAction = typeof DOCKER_SETUP_ACTIONS[number];
declare const DOCKER_REMEDIES: readonly ["install_all", "install_cli", "start_colima", "start_desktop", "get_brew", "linux_install", "linux_start", "permission", "windows_install", "windows_start"];
export type DockerRemedy = typeof DOCKER_REMEDIES[number];
declare const dockerSetupJobSchema: z.ZodObject<{
    action: z.ZodEnum<{
        install_all: "install_all";
        install_cli: "install_cli";
        start_colima: "start_colima";
        start_desktop: "start_desktop";
    }>;
    running: z.ZodBoolean;
    failure: z.ZodNullable<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        output: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type DockerSetupJob = z.infer<typeof dockerSetupJobSchema>;
declare const placeSchema: z.ZodUnion<readonly [z.ZodObject<{
    id: z.ZodString;
    machine: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    available: z.ZodLiteral<true>;
    hostIsolation: z.ZodBoolean;
    version: z.ZodDefault<z.ZodString>;
    setup: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        remedy: z.ZodCatch<z.ZodNullable<z.ZodEnum<{
            get_brew: "get_brew";
            install_all: "install_all";
            install_cli: "install_cli";
            linux_install: "linux_install";
            linux_start: "linux_start";
            permission: "permission";
            start_colima: "start_colima";
            start_desktop: "start_desktop";
            windows_install: "windows_install";
            windows_start: "windows_start";
        }>>>;
        job: z.ZodNullable<z.ZodObject<{
            action: z.ZodEnum<{
                install_all: "install_all";
                install_cli: "install_cli";
                start_colima: "start_colima";
                start_desktop: "start_desktop";
            }>;
            running: z.ZodBoolean;
            failure: z.ZodNullable<z.ZodObject<{
                code: z.ZodString;
                message: z.ZodString;
                output: z.ZodDefault<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        memory: z.ZodNullable<z.ZodObject<{
            bytes: z.ZodNumber;
            engine: z.ZodCatch<z.ZodEnum<{
                colima: "colima";
                docker_desktop: "docker_desktop";
                other: "other";
            }>>;
            low: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    machine: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    available: z.ZodLiteral<false>;
    code: z.ZodString;
    message: z.ZodString;
    setup: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        remedy: z.ZodCatch<z.ZodNullable<z.ZodEnum<{
            get_brew: "get_brew";
            install_all: "install_all";
            install_cli: "install_cli";
            linux_install: "linux_install";
            linux_start: "linux_start";
            permission: "permission";
            start_colima: "start_colima";
            start_desktop: "start_desktop";
            windows_install: "windows_install";
            windows_start: "windows_start";
        }>>>;
        job: z.ZodNullable<z.ZodObject<{
            action: z.ZodEnum<{
                install_all: "install_all";
                install_cli: "install_cli";
                start_colima: "start_colima";
                start_desktop: "start_desktop";
            }>;
            running: z.ZodBoolean;
            failure: z.ZodNullable<z.ZodObject<{
                code: z.ZodString;
                message: z.ZodString;
                output: z.ZodDefault<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        memory: z.ZodNullable<z.ZodObject<{
            bytes: z.ZodNumber;
            engine: z.ZodCatch<z.ZodEnum<{
                colima: "colima";
                docker_desktop: "docker_desktop";
                other: "other";
            }>>;
            low: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>]>;
export type SpacePlace = z.infer<typeof placeSchema>;
/** The id of the Docker over SSH place, the one place a machine can be set for. */
export declare const SSH_PLACE_ID = "docker-ssh";
export type SpaceStart = 'clean' | 'uncommitted';
export type CreateSpaceRequest = {
    projectDirectory: string;
    name: string;
    /** The place to make the space on; the host takes its first place without it. */
    placeId: string;
    start: SpaceStart;
    network: SpaceNetwork;
    /** The project's setup commands, resolved as for a new worktree, trust included. */
    setupCommands: string[];
    /** The model access chosen in the dialog; the host gives it before the space is ready. */
    grants: Extract<GrantRequest, {
        kind: 'model' | 'login' | 'custom';
    }>[];
};
export type GrantRequest = {
    kind: 'model';
    provider: string;
    upstream: string;
    secret: {
        kind: 'typed';
        value: string;
    } | {
        kind: 'env';
        name: string;
    };
} | {
    kind: 'login';
    provider: string;
} | {
    kind: 'custom';
    provider: string;
} | {
    kind: 'domain';
    upstream: string;
};
declare const hostLoginSchema: z.ZodObject<{
    provider: z.ZodString;
    method: z.ZodString;
    expires: z.ZodNullable<z.ZodString>;
    state: z.ZodEnum<{
        expired: "expired";
        unsupported: "unsupported";
        usable: "usable";
    }>;
}, z.core.$strip>;
export type SpaceHostLogin = z.infer<typeof hostLoginSchema>;
declare const customProviderSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    package: z.ZodString;
    baseURL: z.ZodNullable<z.ZodString>;
    loopback: z.ZodBoolean;
    models: z.ZodArray<z.ZodString>;
    hasKey: z.ZodBoolean;
    supported: z.ZodBoolean;
}, z.core.$strip>;
export type SpaceCustomProvider = z.infer<typeof customProviderSchema>;
export declare const readSpacesSwitch: (signal?: AbortSignal) => Promise<SpacesSwitchState>;
export declare const setSpacesSwitch: (enabled: boolean) => Promise<SpacesSwitchChange>;
export declare const listSpacePlaces: (signal?: AbortSignal) => Promise<SpacePlace[]>;
/**
 * Sets the machine of the Docker over SSH place, the empty string taking the place away, and
 * answers that place checked, or null. The host refuses with `place_has_spaces` while spaces
 * are on the machine, and with `invalid_machine` for anything but `[user@]host[:port]`.
 */
export declare const setSpaceMachine: (machine: string) => Promise<SpacePlace | null>;
declare const spaceDiskSchema: z.ZodObject<{
    imageBytes: z.ZodNullable<z.ZodNumber>;
    imagePulling: z.ZodDefault<z.ZodBoolean>;
    imageFailure: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>>;
    toolsBytes: z.ZodNumber;
    spacesBytes: z.ZodNumber;
    freeBytes: z.ZodNumber;
    freesImage: z.ZodBoolean;
}, z.core.$strip>;
export type SpaceDisk = z.infer<typeof spaceDiskSchema>;
declare const spaceCleanUpSchema: z.ZodObject<{
    freedBytes: z.ZodNumber;
    kept: z.ZodArray<z.ZodObject<{
        kind: z.ZodString;
        reason: z.ZodEnum<{
            failed: "failed";
            in_use: "in_use";
        }>;
    }, z.core.$strip>>;
    disk: z.ZodObject<{
        imageBytes: z.ZodNullable<z.ZodNumber>;
        imagePulling: z.ZodDefault<z.ZodBoolean>;
        imageFailure: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
        }, z.core.$strip>>>;
        toolsBytes: z.ZodNumber;
        spacesBytes: z.ZodNumber;
        freeBytes: z.ZodNumber;
        freesImage: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SpaceCleanUp = z.infer<typeof spaceCleanUpSchema>;
export declare const readSpaceDisk: (placeId: string, signal?: AbortSignal) => Promise<SpaceDisk>;
/** Removes what OpenChamber can make again on the place; Docker keeps whatever is in use. */
export declare const cleanUpSpaceDisk: (placeId: string) => Promise<SpaceCleanUp>;
/** Starts the download of the image ahead of the first space; answers the disk with `imagePulling` set. */
/** The Docker setup action under way on this computer, or the last one that failed; null for none. */
export declare const readDockerSetupJob: (signal?: AbortSignal) => Promise<DockerSetupJob | null>;
/**
 * Starts `action` on this computer and answers at once; the host refuses one its Docker no longer
 * needs with `docker_setup_not_offered`, and a second one with `docker_setup_running`.
 */
export declare const startDockerSetup: (action: DockerSetupAction) => Promise<DockerSetupJob | null>;
export declare const pullSpaceImage: (placeId: string) => Promise<SpaceDisk>;
export declare const listSpaces: (signal?: AbortSignal) => Promise<SpaceEntry[]>;
export declare const createSpace: (body: CreateSpaceRequest) => Promise<SpaceEntry>;
/** The host's browser logins a space can be given, by provider; a host that cannot be asked throws. */
export declare const readSpaceHostLogins: (signal?: AbortSignal) => Promise<SpaceHostLogin[]>;
/** The providers of the user's own a space of this project can be given, read from the host's configuration; a host that cannot be asked throws. */
export declare const readSpaceCustomProviders: (projectDirectory: string, signal?: AbortSignal) => Promise<SpaceCustomProvider[]>;
export declare const grantSpaceAccess: (spaceId: string, body: GrantRequest) => Promise<SpaceGrant>;
/** Adds a domain to a running space's allowlist, live; answers the network as it now is. */
export declare const openSpaceDomain: (spaceId: string, domain: string) => Promise<SpaceNetwork>;
declare const journalRecordSchema: z.ZodObject<{
    at: z.ZodString;
    listener: z.ZodString;
    host: z.ZodString;
    port: z.ZodNumber;
    decision: z.ZodString;
}, z.core.$strip>;
export type SpaceJournalRecord = z.infer<typeof journalRecordSchema>;
declare const journalSchema: z.ZodObject<{
    records: z.ZodArray<z.ZodObject<{
        at: z.ZodString;
        listener: z.ZodString;
        host: z.ZodString;
        port: z.ZodNumber;
        decision: z.ZodString;
    }, z.core.$strip>>;
    dropped: z.ZodNumber;
    since: z.ZodString;
}, z.core.$strip>;
export type SpaceJournal = z.infer<typeof journalSchema>;
export declare const readSpaceJournal: (spaceId: string, signal?: AbortSignal) => Promise<SpaceJournal>;
declare const removalSchema: z.ZodObject<{
    id: z.ZodString;
    removed: z.ZodBoolean;
    failures: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>;
    chats: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        saved: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type SpaceRemoval = z.infer<typeof removalSchema>;
/** Starts a stopped space; its network and the grants the host can say again come back with it. */
export declare const startSpace: (spaceId: string) => Promise<SpaceEntry>;
/** Stops a running space and its gatekeeper; its files stay. */
export declare const stopSpace: (spaceId: string) => Promise<SpaceEntry>;
/** Restarts the container of a running space, with a fresh token for the server inside. */
export declare const restartSpace: (spaceId: string) => Promise<SpaceEntry>;
/** Restarts OpenCode inside a running space and answers once it is ready again. */
export declare const restartSpaceOpenCode: (spaceId: string) => Promise<SpaceEntry>;
export declare const SPACE_IDLE_STOP_MIN_HOURS = 1;
export declare const SPACE_IDLE_STOP_MAX_HOURS = 168;
declare const idleStopSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    hours: z.ZodNumber;
}, z.core.$strip>;
export type SpaceIdleStop = z.infer<typeof idleStopSchema>;
export declare const readSpaceIdleStop: (signal?: AbortSignal) => Promise<SpaceIdleStop>;
/** Keeps the setting and tells every running space; answers the setting as kept. */
export declare const setSpaceIdleStop: (setting: SpaceIdleStop) => Promise<SpaceIdleStop>;
/** Runs the setup commands again in a running space; answers once they began. */
export declare const runSpaceSetup: (spaceId: string, commands: readonly string[]) => Promise<SpaceEntry>;
declare const setupOutputSchema: z.ZodObject<{
    setup: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
        state: z.ZodLiteral<"queued">;
        total: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"running">;
        index: z.ZodNumber;
        total: z.ZodNumber;
        command: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"done">;
        total: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"failed">;
        index: z.ZodNumber;
        total: z.ZodNumber;
        command: z.ZodString;
        exitCode: z.ZodNullable<z.ZodNumber>;
        timedOut: z.ZodBoolean;
        startedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"interrupted">;
        total: z.ZodNumber;
    }, z.core.$strip>], "state">>;
    output: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type SpaceSetupOutput = z.infer<typeof setupOutputSchema>;
export declare const readSpaceSetup: (spaceId: string, signal?: AbortSignal) => Promise<SpaceSetupOutput>;
/**
 * Deletes a space after its chats went to the Archive page. When they cannot all be saved the
 * space stays and the answer is `chats_not_saved`; `deleteUnsavedChats` is the user's "Delete
 * anyway", which saves what can be and deletes the space.
 */
export declare const removeSpace: (spaceId: string, { deleteUnsavedChats }?: {
    deleteUnsavedChats?: boolean;
}) => Promise<SpaceRemoval>;
declare const archiveSchema: z.ZodObject<{
    spaceId: z.ZodString;
    name: z.ZodString;
    directory: z.ZodString;
}, z.core.$strip>;
export type SpaceArchive = z.infer<typeof archiveSchema>;
/** The archives of deleted spaces. It reads a file of the host's and runs nothing of the feature. */
export declare const listSpaceArchives: (signal?: AbortSignal) => Promise<SpaceArchive[]>;
declare const applyPreviewSchema: z.ZodObject<{
    changedPaths: z.ZodNumber;
    changedBytes: z.ZodNumber;
    nestedRepositories: z.ZodObject<{
        count: z.ZodNumber;
        paths: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    unmerged: z.ZodObject<{
        count: z.ZodNumber;
        paths: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    changesRoute: z.ZodEnum<{
        closed: "closed";
        open: "open";
    }>;
    lastApplied: z.ZodNullable<z.ZodString>;
    newPaths: z.ZodNullable<z.ZodNumber>;
    newPathsUndecided: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type SpaceApplyPreview = z.infer<typeof applyPreviewSchema>;
export type SpaceApplyRequest = {
    as: 'branch';
    branch: string;
    removeAfterwards: boolean;
} | {
    as: 'changes';
    removeAfterwards: boolean;
};
declare const applyOutcomeSchema: z.ZodObject<{
    applied: z.ZodUnion<readonly [z.ZodObject<{
        status: z.ZodLiteral<"applied">;
        branch: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        status: z.ZodLiteral<"applied">;
        appliedPaths: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        status: z.ZodLiteral<"nothing_to_apply">;
    }, z.core.$strip>]>;
    removal: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        removed: z.ZodBoolean;
        failures: z.ZodArray<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
        }, z.core.$strip>>;
        chats: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            saved: z.ZodNumber;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    kept: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type SpaceApplyOutcome = z.infer<typeof applyOutcomeSchema>;
/** Brings the space's work out and says what an apply would do; writes nothing of the user's files. */
export declare const previewSpaceApply: (spaceId: string, signal?: AbortSignal) => Promise<SpaceApplyPreview>;
/** Brings the work out once more and applies it; what is applied is what this call brought. */
export declare const applySpaceWork: (spaceId: string, body: SpaceApplyRequest) => Promise<SpaceApplyOutcome>;
export {};
