/**
 * Keeps the board's lists and preview current. The desktop board stays
 * mounted while closed, so without this it shows what it read when a list was
 * first shown. While the board is on screen, anything read more than a minute
 * ago is read again when it opens and when the user comes back to the window.
 */
export declare function useBoardRevalidation(onScreen: boolean): void;
