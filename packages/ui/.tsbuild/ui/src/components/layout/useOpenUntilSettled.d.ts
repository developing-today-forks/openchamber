/**
 * A side column's open state as of the end of its animation
 * (`lib/layoutAnimation.ts`): it follows a toggle in either direction only
 * once that animation ended. Call it after the layout effect that begins the
 * animation, so a toggle's animation is already running when this hook
 * queues behind it.
 */
export declare const useOpenWhenSettled: (isOpen: boolean) => boolean;
/**
 * Whether a side column's content still counts as shown: true at once when it
 * opens, and through its closing animation until that ends. Same call order
 * as `useOpenWhenSettled`.
 */
export declare const useOpenUntilSettled: (isOpen: boolean) => boolean;
