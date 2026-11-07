import { z } from 'zod';
import { type DiagnosticEvent } from './timeline';
type FileDiagnostics = {
    events: DiagnosticEvent[];
    coverage: {
        source: string;
        status: string;
        omitted?: number;
        filtered?: number;
        warnings?: number;
        errors?: number;
    }[];
};
declare const fileResponseSchema: z.ZodObject<{
    events: z.ZodArray<z.ZodUnknown>;
    coverage: z.ZodArray<z.ZodUnknown>;
}, z.core.$strip>;
/** The envelope is parsed at the transport boundary; validate every record separately. */
export declare function parseFileDiagnostics(response: z.infer<typeof fileResponseSchema>): FileDiagnostics;
export declare function buildDiagnosticLog(): Promise<string>;
export {};
