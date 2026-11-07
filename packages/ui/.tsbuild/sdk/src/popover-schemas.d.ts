import { z } from 'zod';
import type { JsonValue } from './contract.ts';
export declare const guestPopoverDataSchema: z.ZodCustom<JsonValue, JsonValue>;
export declare const guestPopoverRequestSchema: z.ZodObject<{
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
    data: z.ZodCustom<JsonValue, JsonValue>;
}, z.core.$strict>;
export declare const guestPopoverClosedEventSchema: z.ZodObject<{
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
