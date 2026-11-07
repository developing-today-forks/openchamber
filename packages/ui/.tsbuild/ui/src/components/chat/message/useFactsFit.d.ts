import React from 'react';
/**
 * Keeps the assistant footer's facts on one line by dropping the least
 * important ones until the rest fit.
 *
 * The row itself never overflows — the model name truncates instead — so "did
 * it fit" is read off the model, and facts marked `data-fact-priority` are
 * hidden in that order (1 goes first) until the model is whole again. That is
 * the rule the design asks for: the timestamp goes, then the agent, then the
 * thinking effort, and only a row with nothing left to give truncates the
 * model.
 *
 * CSS alone cannot do this. Hiding on container-width breakpoints guesses at
 * the model's length and drops facts that would have fitted, and wrapping the
 * overflow onto a clipped second line leaves the dropped fact's width behind as
 * a hole in the middle of the row.
 *
 * Measuring forces a layout (it un-hides the facts, then reads widths), so
 * after a render it runs only when the row mounted or its text changed; a
 * resize or a web font finishing loading refits through the listeners.
 */
export declare const useFactsFit: (ref: React.RefObject<HTMLElement | null>) => void;
