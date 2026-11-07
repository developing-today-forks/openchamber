import type { InstalledGuest } from './types';
/** Turns the recorded clone origin into a browser link, without Git credentials or refs. */
export declare const getGuestSourceUrl: (guest: InstalledGuest) => string | null;
