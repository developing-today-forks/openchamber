import { type GenerateRequest, type GuestHostSurface, type HostMessage, type LateGenerateResult } from '@openchamber/sdk';
import type { InstalledGuest } from './types.ts';
/**
 * Where a `generate` was asked. Its late outcome goes only to a frame with the
 * same owner: same runtime, same installation of the extension, same surface
 * and same project, so it shows up where the user pressed the button.
 */
export type GenerateOwner = {
    runtimeKey: string;
    guestId: string;
    storageId: string | null;
    surface: GuestHostSurface;
    directory: string | null;
};
type GenerateResultListener = {
    /** The listening frame's owner now; read on every delivery, since a frame can follow a project switch. */
    owner: () => GenerateOwner;
    /** Post the outcome to the frame. `false` when the frame cannot take it now; the outcome stays kept. */
    deliver: (result: LateGenerateResult) => boolean;
};
type Catalog = {
    status: string;
    runtimeKey: string;
    guests: InstalledGuest[];
};
/**
 * What the reply to a `generate` call says, for keeping. `null` for a reply
 * that is no `generate` answer.
 */
export declare const lateGenerateResult: (request: GenerateRequest, reply: HostMessage) => LateGenerateResult | null;
/**
 * Keeps `generate` outcomes whose frame was gone when the model answered and
 * hands each one, once, to the next frame of the same owner that listens.
 * Memory only, per window: a reload or another window starts empty, and the
 * request itself never outlives the window that sent it.
 */
export declare const createGuestGenerateResults: (deps: {
    now: () => number;
    readCatalog: () => Catalog;
    subscribeCatalog: (listener: () => void) => () => void;
}) => {
    keep: (owner: GenerateOwner, result: LateGenerateResult) => void;
    listen: (listener: GenerateResultListener) => (() => void);
};
export declare const guestGenerateResults: {
    keep: (owner: GenerateOwner, result: LateGenerateResult) => void;
    listen: (listener: GenerateResultListener) => (() => void);
};
export {};
