import React from 'react';
import type { InstalledGuest } from '@/lib/guests/types';
type GuestIntegrationCardProps = {
    guest: InstalledGuest;
};
export declare const GuestIntegrationCard: React.FC<GuestIntegrationCardProps>;
export declare const GuestIntegrationsSection: React.FC<{
    divider?: boolean;
}>;
export {};
