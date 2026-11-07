/**
 * Where a plain click on a web link in chat content goes. With the settings
 * on, an issue, PR or Linear link opens in the Tracker beside the chat (on the
 * phone, on the issues and PRs board), and any other link in the built-in
 * browser panel of `directory`; whatever they cannot show (no panel here, no
 * open project) opens in the system browser.
 * Only the desktop panel can show any site: on the web it is an iframe, which
 * most sites refuse to load in, so links there keep opening in a new tab.
 * Modified clicks never come here: they keep the browser's own meaning, which
 * on desktop is the system browser.
 */
export declare function useOpenChatLink(directory: string): (url: string) => void;
