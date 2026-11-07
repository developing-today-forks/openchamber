import React from 'react';
/**
 * A short explanation beside a session menu item, shown after the pointer
 * rests on it and gone as soon as it leaves. Each hint is its own tooltip
 * group, so the next item waits again instead of opening at once. A menu
 * focuses the item under the pointer, and a tooltip opens on focus without
 * delay, so focus never opens a hint.
 */
export declare function SessionMenuItemHint({ hint, children }: {
    hint: string;
    children: React.ReactElement;
}): import("react/jsx-runtime").JSX.Element;
