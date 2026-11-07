import React from 'react';
/**
 * While a working turn shows only its latest rows, a new row pushes the
 * oldest one out at the top and everything moves up by its height at once.
 * This replays that move as a short glide: after the commit, the rows are drawn
 * back where they were and slide into place (FLIP). Only `transform` changes,
 * so layout, scroll following and the reader's position stay as they are. The
 * last element of the rows is the reference: it is the one that grows, and it
 * stays mounted between steps.
 */
export declare const useActivityRowGlide: (rowsRef: React.RefObject<HTMLElement | null>, hiddenRows: number, active: boolean) => void;
