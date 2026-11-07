/** The sections of the Routing page: one tab each, or all on one page. */
export type RoutingTab = 'auto' | 'categories' | 'rules' | 'pools' | 'plans';
/** The tab a Settings search result opens, or null for a result outside the Routing page. */
export declare const routingTabForSearchTarget: (id: string) => RoutingTab | null;
type RoutingPageView = {
    tab: RoutingTab;
    setTab: (tab: RoutingTab) => void;
    /** Every section on one scrolling page; the tabs then jump to their section. */
    showAllOnOnePage: boolean;
    setShowAllOnOnePage: (showAll: boolean) => void;
};
/** Which sections the Routing page shows. The tab is for this session; the all-on-one-page choice is kept. */
export declare const useRoutingPageViewStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<RoutingPageView>, "persist" | "setState"> & {
    setState(partial: Partial<RoutingPageView> | RoutingPageView | ((state: RoutingPageView) => Partial<RoutingPageView> | RoutingPageView), replace?: false | undefined): unknown;
    setState(state: RoutingPageView | ((state: RoutingPageView) => RoutingPageView), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<RoutingPageView, {
            showAllOnOnePage: boolean;
        }, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: RoutingPageView) => void) => () => void;
        onFinishHydration: (fn: (state: RoutingPageView) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<RoutingPageView, {
            showAllOnOnePage: boolean;
        }, unknown>>;
    };
}>;
export {};
