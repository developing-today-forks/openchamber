import type { LinearAPI } from '@/lib/api/types';
/**
 * Status comments are written into a Linear workspace other people read, so
 * they stay off until the user turns them on. The server posts nothing while
 * this is off, including the completed and failure comments the event hub
 * sends without going through this interface.
 */
export declare function LinearSessionComments({ linear, connected, }: {
    linear: LinearAPI;
    connected: boolean;
}): import("react/jsx-runtime").JSX.Element | null;
