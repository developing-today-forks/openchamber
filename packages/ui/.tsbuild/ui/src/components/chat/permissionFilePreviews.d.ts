import { z } from 'zod';
export declare const permissionFilePreviewsSchema: z.ZodPipe<z.ZodCatch<z.ZodArray<z.ZodCatch<z.ZodNullable<z.ZodObject<{
    file: z.ZodString;
    patch: z.ZodString;
}, z.core.$strip>>>>>, z.ZodTransform<{
    file: string;
    patch: string;
}[], ({
    file: string;
    patch: string;
} | null)[]>>;
