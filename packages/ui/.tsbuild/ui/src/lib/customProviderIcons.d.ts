import type { IconName } from '@/components/icon/icons';
export declare const CUSTOM_PROVIDER_ICONS: readonly [{
    readonly id: 'server';
    readonly icon: 'server';
}, {
    readonly id: 'cloud';
    readonly icon: 'cloud';
}, {
    readonly id: 'database';
    readonly icon: 'database-2';
}, {
    readonly id: 'terminal';
    readonly icon: 'terminal-box';
}, {
    readonly id: 'code';
    readonly icon: 'code-box';
}, {
    readonly id: 'ai';
    readonly icon: 'brain-ai-3';
}];
export type CustomProviderIcon = (typeof CUSTOM_PROVIDER_ICONS)[number]['id'];
export declare const isCustomProviderIcon: (value: unknown) => value is CustomProviderIcon;
export declare const customProviderIconName: (value: CustomProviderIcon) => IconName;
