/**
 * The iOS keyboard's motion, as one shared timing.
 *
 * `useNativeMobileChrome` slides the composer with it, tweens the chat
 * scroller's keyboard inset with it, and the pill ↔ composer morph grows and
 * shrinks with it, so the keyboard, the composer and the transcript read as
 * one movement. The curve mimics UIKit's keyboard animation (≈0.25s, a
 * decelerating cubic); dismissal reads faster than the rise, so the hide leg
 * runs shorter.
 */
export declare const KEYBOARD_SHOW_MS = 250;
export declare const KEYBOARD_HIDE_MS = 200;
export declare const KEYBOARD_EASING_CSS: string;
/**
 * Evaluate a CSS `cubic-bezier(x1, y1, x2, y2)` timing function at progress
 * `t` (0..1): solve the x curve for the parameter, then read y. Used to drive
 * a value from JavaScript on the same curve a CSS transition follows.
 */
export declare const createCubicBezierEasing: (x1: number, y1: number, x2: number, y2: number) => (t: number) => number;
/** Progress (0..1) → eased progress on the keyboard curve. */
export declare const keyboardEase: (t: number) => number;
