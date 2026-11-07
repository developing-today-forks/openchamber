import { type PWADisplayMode } from '@/lib/pwa';
type PwaDetectionState = {
    displayMode: PWADisplayMode;
    installed: boolean;
    browserTab: boolean;
};
export declare const usePwaDetection: () => PwaDetectionState;
export {};
