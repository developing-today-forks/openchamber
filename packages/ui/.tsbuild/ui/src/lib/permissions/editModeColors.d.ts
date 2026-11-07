import type { EditPermissionMode } from '@/stores/types/sessionTypes';
interface EditModeColors {
    text: string;
    border?: string;
    background?: string;
    borderWidth?: number;
}
export declare const getEditModeColors: (mode?: EditPermissionMode | null) => EditModeColors | null;
export {};
