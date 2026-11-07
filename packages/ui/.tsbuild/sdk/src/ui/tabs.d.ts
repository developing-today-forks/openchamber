import { type Handle } from './dom.ts';
export type TabItem = {
    id: string;
    label: string;
    count?: number;
};
export type TabsProps = {
    items: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
    /** Paints a faint track behind the pills. */
    trackBackground?: boolean;
};
export type TabsHandle = Handle<TabsProps>;
export declare const mountTabs: (root: Element, initial: TabsProps) => TabsHandle;
