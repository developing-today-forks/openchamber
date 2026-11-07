import type { HostRequestErrorCode } from '@openchamber/sdk';
import type { ContextPanelMode } from '@/lib/surfaces/modes';
export type GuestOpenSurfaceResult = {
    ok: true;
} | {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
};
type OpenGuestSurfaceOptions = {
    mode: ContextPanelMode;
    /** The panel's directory, the same key the rail opens it under; null before the app knows one. */
    directory: string | null;
    /** VS Code and mobile have no context panel for guests. */
    supported: boolean;
};
/**
 * `host.openSurface`: open the surface the way its rail icon does, and answer
 * by what the panel shows afterwards. A surface already on screen stays open:
 * the rail toggles it closed, the SDK call only ever opens.
 */
export declare const openGuestSurface: ({ mode, directory, supported }: OpenGuestSurfaceOptions) => GuestOpenSurfaceResult;
export {};
