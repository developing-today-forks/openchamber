export type ChatSettingsTab = 'messages' | 'composer' | 'assistance';
/**
 * The tab the Settings Chat page shows. It lives outside the page so a
 * Settings search result can open the tab that holds its target before the
 * page highlights it, and so leaving the page and coming back keeps the tab.
 */
export declare const useChatSettingsTabStore: import("zustand").UseBoundStore<import("zustand").StoreApi<{
    tab: ChatSettingsTab;
    setTab: (tab: ChatSettingsTab) => void;
}>>;
export declare const chatSettingsTabForSearchTarget: (id: string) => ChatSettingsTab | null;
