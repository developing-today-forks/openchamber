/**
 * Client for the OpenChamber route that owns the `messaging` section of
 * OpenCode's config (`/api/config/messaging`). The server writes the file
 * Settings owns (`OPENCODE_CONFIG`, else the user's `opencode.json`); OpenCode
 * watches it and applies a change without a restart. This module speaks HTTP
 * and parses what comes back; a failed read throws.
 */
import { z } from 'zod';
declare const remoteSchema: z.ZodObject<{
    url: z.ZodString;
    model: z.ZodString;
    key: z.ZodOptional<z.ZodString>;
    dimensions: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type MessagingRemoteConfig = z.infer<typeof remoteSchema>;
declare const embeddingSchema: z.ZodObject<{
    tier: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
    pooling: z.ZodOptional<z.ZodEnum<{
        cls: "cls";
        last: "last";
        mean: "mean";
    }>>;
    query: z.ZodOptional<z.ZodString>;
    server: z.ZodOptional<z.ZodString>;
    autostart: z.ZodOptional<z.ZodBoolean>;
    gpu_layers: z.ZodOptional<z.ZodNumber>;
    threads: z.ZodOptional<z.ZodNumber>;
    remote: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        model: z.ZodString;
        key: z.ZodOptional<z.ZodString>;
        dimensions: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MessagingEmbeddingConfig = z.infer<typeof embeddingSchema>;
declare const configSchema: z.ZodObject<{
    presets: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    vars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    session_start: z.ZodOptional<z.ZodString>;
    delivery: z.ZodOptional<z.ZodObject<{
        direct: z.ZodOptional<z.ZodEnum<{
            inbox: "inbox";
            none: "none";
            wake: "wake";
        }>>;
        root: z.ZodOptional<z.ZodEnum<{
            inbox: "inbox";
            none: "none";
            wake: "wake";
        }>>;
        user: z.ZodOptional<z.ZodEnum<{
            hidden: "hidden";
            visible: "visible";
            wake: "wake";
        }>>;
    }, z.core.$strip>>;
    search: z.ZodOptional<z.ZodObject<{
        match: z.ZodOptional<z.ZodEnum<{
            advanced: "advanced";
            exact: "exact";
            fuzzy: "fuzzy";
            hybrid: "hybrid";
            regex: "regex";
            semantic: "semantic";
        }>>;
        model: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    embedding: z.ZodOptional<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<{
        tier?: string | undefined;
        url?: string | undefined;
        path?: string | undefined;
        pooling?: "cls" | "last" | "mean" | undefined;
        query?: string | undefined;
        server?: string | undefined;
        autostart?: boolean | undefined;
        gpu_layers?: number | undefined;
        threads?: number | undefined;
        remote?: {
            url: string;
            model: string;
            key?: string | undefined;
            dimensions?: number | undefined;
        } | undefined;
    }, string>>, z.ZodObject<{
        tier: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
        pooling: z.ZodOptional<z.ZodEnum<{
            cls: "cls";
            last: "last";
            mean: "mean";
        }>>;
        query: z.ZodOptional<z.ZodString>;
        server: z.ZodOptional<z.ZodString>;
        autostart: z.ZodOptional<z.ZodBoolean>;
        gpu_layers: z.ZodOptional<z.ZodNumber>;
        threads: z.ZodOptional<z.ZodNumber>;
        remote: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            model: z.ZodString;
            key: z.ZodOptional<z.ZodString>;
            dimensions: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
export type MessagingConfig = z.infer<typeof configSchema>;
export type MessagingConfigSnapshot = {
    config: MessagingConfig;
    /** The file Settings writes. */
    path: string;
    /** A project config that sets `messaging` and so overrides what Settings writes for that project. */
    projectPath: string | null;
};
export declare function readMessagingConfig(directory: string | null): Promise<MessagingConfigSnapshot>;
/** Replaces the whole section; an empty section removes the key. */
export declare function writeMessagingConfig(config: MessagingConfig): Promise<void>;
export {};
