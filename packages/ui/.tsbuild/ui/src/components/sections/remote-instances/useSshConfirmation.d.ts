import { type I18nKey } from '@/lib/i18n';
export declare function useSshConfirmation(instanceId: string | null): {
    confirm: (messageKey: I18nKey, actionKey?: I18nKey) => Promise<boolean | null>;
    dialog: import("react/jsx-runtime").JSX.Element;
};
