import { type ContextZonePlacement } from '@/lib/workspace/zones';
/** The placement another window saved, or null when the value carries none. */
export declare const readPersistedZonePlacement: (raw: string | null) => ContextZonePlacement | null;
/**
 * Adopts surface moves made in another window of this app. Without it, this
 * window's next save writes its older placement back over the move. Only the
 * placement is shared: each window keeps what it has open.
 */
export declare const followZonePlacementOfOtherWindows: () => (() => void);
