import { z } from 'zod';
import type { GuestCatalog, InstalledGuest } from './types.ts';
export declare const guestUpdateSchema: z.ZodObject<{
    version: z.ZodString;
}, z.core.$strip>;
/**
 * Rows are read one by one: a row this build cannot read (a newer server, a
 * broken package) is listed in `unreadable` and every other row still loads.
 * Only a response without a guest list is a failure.
 */
export declare const parseGuestCatalogJson: (json: string) => GuestCatalog | null;
/**
 * The answer to an install: the row, `'unreadable'` when the server installed
 * a package and answered with a row this build cannot read, or null when the
 * answer is not an install row at all.
 */
export declare const parseInstallAnswerJson: (json: string) => InstalledGuest | 'unreadable' | null;
export declare const parseInstalledGuestJson: (json: string) => InstalledGuest | null;
