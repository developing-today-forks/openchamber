/**
 * Single source of truth for every dropdown-style trigger surface in the app:
 * native Select triggers, DropdownMenu trigger buttons, and custom pickers
 * (model/agent/project selectors, git branch pickers, …).
 *
 * Change shape, border, radius, or interaction colors HERE and every trigger
 * in every surface follows. Do not re-declare these classes at call sites —
 * call sites may only add layout (width/min-width/max-width, truncation).
 *
 * Look: a raised control (`oc-raised`), the same edge and shadow as the text
 * fields and the active tab pill. Light themes paint elevated darker than the
 * canvas, so the trigger takes the canvas colour there to stand up. Width
 * hugs the value, the chevron right after it; call sites cap it with a
 * max-width and long values truncate.
 *
 * Sizes:
 * - `default` — every desktop trigger: forms, dialogs, settings, toolbars,
 *               filter rows (h-7). One height, so pickers in one window never
 *               disagree; it matches `Button size="sm"`.
 * - `mobile`  — phone layouts that render the same trigger inline (h-8).
 * - `touch`   — mobile value pickers opening a sheet (h-11).
 */
export declare const dropdownTriggerVariants: (props?: ({
    size?: "default" | "mobile" | "touch" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
