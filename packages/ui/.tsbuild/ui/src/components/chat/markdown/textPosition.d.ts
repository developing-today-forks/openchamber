type TextNodeLike = {
    data: string;
};
type TextBoundaryAffinity = 'left' | 'right';
export declare const findTextPosition: <T extends TextNodeLike>(textNodes: T[], targetOffset: number, affinity: TextBoundaryAffinity) => {
    node: T;
    offset: number;
} | null;
export {};
