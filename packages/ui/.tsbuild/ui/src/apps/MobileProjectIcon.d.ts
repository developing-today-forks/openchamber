import React from 'react';
/** The project fields the icon needs — a structural subset of the sheet's
    ProjectMeta, so both the sheet and the timeline list can pass their own
    project objects without sharing a type. */
export type MobileProjectIconProject = {
    id: string;
    icon?: string | null;
    color?: string | null;
    iconImage?: {
        mime: string;
        updatedAt: number;
        source: 'custom' | 'auto';
    } | null;
    iconBackground?: string | null;
};
export declare const MobileProjectIcon: React.FC<{
    project: MobileProjectIconProject;
    /** xs sits inside a 16px text line, md in a header's 32px slot. */
    size?: 'xs' | 'md';
}>;
