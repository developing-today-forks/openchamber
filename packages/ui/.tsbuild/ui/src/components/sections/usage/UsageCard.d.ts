import type { QuotaProviderId, UsageWindow } from '@/types';
interface UsageCardProps {
    title: string;
    window: UsageWindow;
    subtitle?: string | null;
    showToggle?: boolean;
    toggleEnabled?: boolean;
    onToggle?: (enabled: boolean) => void;
    providerId?: QuotaProviderId;
}
export declare const UsageCard: React.FC<UsageCardProps>;
export {};
