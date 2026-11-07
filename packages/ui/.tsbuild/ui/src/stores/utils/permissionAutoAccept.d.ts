import { z } from "zod";
import type { Session } from "@/lib/opencode/model";
/**
 * How a session answers tool permissions. The server owns the policy
 * (`packages/web/server/lib/permission-auto-accept`):
 *
 * - `ask`: every request waits for the user.
 * - `safety`: accepted unless the safety net (Jev) says the user should decide.
 * - `auto`: every request is accepted.
 */
declare const permissionModeSchema: z.ZodEnum<{
    ask: "ask";
    auto: "auto";
    safety: "safety";
}>;
export type PermissionMode = z.infer<typeof permissionModeSchema>;
export type PermissionModeMap = Record<string, PermissionMode>;
/**
 * The mode the user sees. Without a classification provider there is no safety
 * net, and a `safety` session waits for the user exactly as an `ask` one does.
 */
export declare const displayedPermissionMode: (mode: PermissionMode, safetyAvailable: boolean) => PermissionMode;
/** The composer button's cycle: ask → safety → auto → ask, skipping safety while it is unavailable. */
export declare const nextPermissionMode: (mode: PermissionMode, safetyAvailable: boolean) => PermissionMode;
/**
 * The mode the UI writes onto a session it has just created: the user's own
 * choice, else, in an isolated space, the Settings default the composer showed.
 * The host's server writes that default itself when the session is created,
 * and so does the server inside a space from the file the host keeps there;
 * this write covers a space still running a server from before that file.
 * `undefined` writes nothing.
 */
export declare const permissionModeForNewSession: (choice: PermissionMode | undefined, inSpace: boolean, defaultMode: PermissionMode) => PermissionMode | undefined;
export type PermissionPolicySnapshot = {
    modes: PermissionModeMap;
    revision?: number;
};
/**
 * A policy as the server or VS Code's bridge sends it, over HTTP or as a
 * broadcast. `modes` is the policy; servers from before the modes and VS Code
 * send only `sessions` as on/off, where on means `auto`.
 */
export declare const permissionPolicyWireSchema: z.ZodObject<{
    sessions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
    modes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<{
        ask: "ask";
        auto: "auto";
        safety: "safety";
    }>>>;
    revision: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
type PermissionPolicyWire = z.infer<typeof permissionPolicyWireSchema>;
export declare const policySnapshotFromWire: (wire: PermissionPolicyWire) => PermissionPolicySnapshot;
/** The nearest explicit mode up the session's lineage, `ask` when there is none. */
export declare const resolvePermissionMode: (input: {
    modes: PermissionModeMap;
    sessions: Session[];
    sessionById?: ReadonlyMap<string, Session>;
    sessionID: string;
}) => PermissionMode;
export {};
