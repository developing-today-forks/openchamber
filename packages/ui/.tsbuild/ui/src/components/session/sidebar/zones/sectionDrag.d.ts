import { type SidebarSectionKey } from '@/stores/sidebarLayout';
/**
 * The section order after the header of `activeKey` was dropped on the
 * header of `overKey`: it lands on the far side of that header from where it
 * came, like the sortable list showed while dragging. Sections that are not
 * drawn keep their places.
 */
export declare const reorderSectionsByDrop: (order: readonly SidebarSectionKey[], drawnKeys: readonly SidebarSectionKey[], activeKey: SidebarSectionKey, overKey: SidebarSectionKey) => SidebarSectionKey[];
/**
 * The List view's project headers with Chats among them, after one of them
 * was dropped on another: where Chats now sits among the projects, and the
 * project move (indexes among the projects alone) when a project moved.
 */
export declare const reorderProjectHeadersWithChats: (headerIds: readonly string[], chatsId: string, activeId: string, overId: string) => {
    chatsIndex: number;
    projectMove: {
        from: number;
        to: number;
    } | null;
} | null;
