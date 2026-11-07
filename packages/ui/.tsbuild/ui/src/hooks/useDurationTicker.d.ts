/** Wall-clock time for a live duration readout, updated once a second while `active`. */
export declare const useDurationTickerNow: (active: boolean) => number;
/**
 * Wall-clock time for labels that change by the minute ("5m ago") on a view
 * that stays open for hours. It listens on the 1 s tick but re-renders only
 * when the minute turns.
 */
export declare const useMinuteTickerNow: (active: boolean) => number;
/**
 * Bright/dim phase for an indicator of a real wait that cannot spin (a status
 * dot, a provider logo, a loading skeleton): `waiting-dim` every other second.
 * Steady states (connected, error) stay still and never call this.
 */
export declare const useWaitingBlink: (active: boolean) => string | undefined;
/** Which of `count` phases a waiting indicator shows, advancing once a second. */
export declare const useWaitingPhase: (active: boolean, count: number) => number;
/** Which of `count` positions a spinner shows, advancing four times a second. */
export declare const useSpinnerPhase: (active: boolean, count: number) => number;
