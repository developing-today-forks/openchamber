import { z } from 'zod';
export declare const guestStatusControlsSchema: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
export declare const guestStatusControlEventSchema: z.ZodObject<{
    id: z.ZodString;
    value: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
