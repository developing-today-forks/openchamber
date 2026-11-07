import { type ShortcutCombo, type ShortcutConflict } from './bindings';
import { SHORTCUT_SCHEMA } from './config';
export { SHORTCUT_SCHEMA } from './config';
export type ShortcutAction = (typeof SHORTCUT_SCHEMA)[number];
export type ShortcutActionId = ShortcutAction['id'];
export type ShortcutCategory = ShortcutAction['category'];
export type CustomizableShortcutAction = Extract<ShortcutAction, {
    customizable: true;
}>;
/** 'contextual-prefix' is kept in the union for the recording dialog's
    messaging even though no default layout produces it any more. */
export type ShortcutBindingConflictKind = ShortcutConflict | 'contextual-prefix';
export type ShortcutBindingConflict = {
    action: ShortcutAction;
    kind: ShortcutBindingConflictKind;
};
export declare function getShortcutAction(id: string): ShortcutAction | undefined;
export declare function getCustomizableShortcutActions(): ReadonlyArray<CustomizableShortcutAction>;
export declare function getEffectiveShortcutCombo(actionId: string, overrides?: Record<string, ShortcutCombo>): ShortcutCombo;
export declare function getEffectiveShortcutPrefix(actionId: string, overrides?: Record<string, ShortcutCombo>): ShortcutCombo;
export declare function getShortcutBindingConflicts(actionId: ShortcutActionId, combo: ShortcutCombo, overrides?: Record<string, ShortcutCombo>): ShortcutBindingConflict[];
