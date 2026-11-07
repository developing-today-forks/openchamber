import { type ShortcutActionId, type ShortcutHandler } from '@/lib/shortcuts';
export declare function useKeybind(actionId: ShortcutActionId, handler: ShortcutHandler): void;
export type ShortcutBindings<Bindings extends Partial<Record<ShortcutActionId, ShortcutHandler>>> = Bindings & Record<Exclude<keyof Bindings, ShortcutActionId>, never>;
export declare function useKeybinds<const Bindings extends Partial<Record<ShortcutActionId, ShortcutHandler>>>(bindings: ShortcutBindings<Bindings>): void;
