import { type Handle } from './dom.ts';
export type BannerTone = 'info' | 'success' | 'warning' | 'error';
export type BannerProps = {
    tone: BannerTone;
    title: string;
    body?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
};
export type BannerHandle = Handle<BannerProps>;
export declare const mountBanner: (root: Element, initial: BannerProps) => BannerHandle;
