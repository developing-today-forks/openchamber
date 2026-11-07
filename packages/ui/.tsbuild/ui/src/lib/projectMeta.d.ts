import React from 'react';
import type { ProjectEntry } from '@/lib/api/types';
import type { IconName } from "@/components/icon/icons";
type ThemeVariant = 'light' | 'dark';
type ProjectIconImageOptions = {
    themeVariant?: ThemeVariant;
    iconColor?: string;
};
export declare const PROJECT_ICONS: Array<{
    key: string;
    Icon: IconName;
    label: string;
}>;
export declare const PROJECT_ICON_MAP: Record<string, IconName>;
/** The CSS colour a project's stored `color` paints with, or null for none or an unknown value. */
export declare const resolveProjectColor: (color: string | null | undefined) => string | null;
/**
 * The background an image icon gets for a project colour: the colour itself.
 * A legacy theme key has no hex, and the stored background accepts only hex.
 */
export declare const iconBackgroundForProjectColor: (color: string | null) => string | null;
type ProjectIconImageProps = {
    project: Pick<ProjectEntry, 'id' | 'iconImage'>;
    options?: ProjectIconImageOptions;
    className?: string;
    alt?: string;
    draggable?: boolean;
    fallback?: React.ReactNode;
    onError?: React.ReactEventHandler<HTMLImageElement>;
};
export declare const ProjectIconImage: React.FC<ProjectIconImageProps>;
export {};
