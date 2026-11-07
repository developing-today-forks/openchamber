import type { IconName } from "@/components/icon/icons";
import type { I18nKey } from "@/lib/i18n";
export type DraftStarterType = 'command' | 'skill';
export type DraftStarterRef = {
    type: DraftStarterType;
    name: string;
};
type BuiltInStarter = {
    name: string;
    icon: IconName;
    labelKey: I18nKey;
    command: string;
};
export declare const BUILTIN_STARTERS: readonly BuiltInStarter[];
export declare const getBuiltInStarter: (name: string) => BuiltInStarter | undefined;
export declare const DEFAULT_GLOBAL_STARTERS: readonly DraftStarterRef[];
export declare const COMMAND_FALLBACK_ICON: IconName;
export declare const SKILL_FALLBACK_ICON: IconName;
export declare const starterKey: (ref: DraftStarterRef) => string;
export declare const sameStarter: (a: DraftStarterRef, b: DraftStarterRef) => boolean;
export declare const normalizeStarterLabel: (name: string) => string;
export declare const sanitizeStarterRefs: (value: unknown) => DraftStarterRef[];
export {};
