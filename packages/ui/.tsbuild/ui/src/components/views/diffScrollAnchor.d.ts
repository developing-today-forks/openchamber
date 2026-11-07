export type DiffScrollAnchor = {
    path: string;
    topOffset: number;
};
export declare const findDiffScrollAnchor: (rootTop: number, sections: Array<{
    path: string;
    top: number;
}>) => DiffScrollAnchor | null;
export declare const getRestoredDiffScrollTop: (scrollTop: number, previousTopOffset: number, currentTopOffset: number, maxScrollTop: number) => number;
