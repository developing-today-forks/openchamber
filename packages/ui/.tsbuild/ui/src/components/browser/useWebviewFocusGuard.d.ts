import React from 'react';
/** Whether the stage is laid out inside the window where the user can see it. */
export declare const isStageShown: (stage: HTMLElement) => boolean;
/**
 * Keeps keyboard focus where the user left it while the agent works a page.
 *
 * Chromium treats the guest page as a frame of the app window, so a page that
 * autofocuses a field, or a click the agent performs, moves focus out of
 * whatever the user was typing in. The page may take focus only when the user
 * can see it and no agent action is driving it; otherwise focus goes straight
 * back. An action that has to give the page real focus, because the desktop
 * shell could not emulate it, holds focus through `holdPageFocus` and hands it
 * back as soon as it releases the hold.
 */
export declare const useWebviewFocusGuard: (webview: WebviewElement | null, stageRef: React.RefObject<HTMLElement | null>) => <T>(run: (holdPageFocus: HoldPageFocus) => Promise<T>) => Promise<T>;
/**
 * Lets the page keep the focus the action is about to give it; the returned
 * function hands focus back and is safe to call more than once.
 */
export type HoldPageFocus = () => () => void;
