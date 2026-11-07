import React from 'react';
/** Settings select trigger in stacked cells. */
export declare const SETTINGS_SELECT_TRIGGER_CLASS = "w-fit max-w-[28ch]";
/** Settings select trigger in SettingsFieldRow control columns. */
export declare const SETTINGS_SELECT_ROW_TRIGGER_CLASS = "w-fit max-w-[28ch]";
/**
 * Width for every settings NumberInput stepper. Font-relative for the same
 * reason as the trigger cap above: a rem-fixed `w-16`/`w-20`/`w-24`/`w-32`
 * clips its own digits once the interface font is scaled up. The explicit
 * `typography-ui-label` pins `ch` to the same scaled font the inner numeric
 * field renders in, since the wrapper would otherwise inherit an unscaled one.
 */
export declare const SETTINGS_NUMBER_INPUT_CLASS = "typography-ui-label w-[16ch]";
/** Compact reset / icon action next to a settings control (matches h-8 controls). */
export declare const SETTINGS_ICON_BUTTON_CLASS = "h-8 w-8 px-0 text-muted-foreground hover:text-foreground";
/** Custom dropdown triggers (ModelSelector / AgentSelector) in settings field rows. */
export declare const SETTINGS_CUSTOM_TRIGGER_CLASS: string;
/** Shared width for stacked control clusters (select/input + reset). */
export declare const SETTINGS_CONTROL_CLUSTER_CLASS = "w-full max-w-[24rem]";
/** Fill a control cluster the same way as a full-width select. */
export declare const SETTINGS_CLUSTER_CONTROL_CLASS = "min-w-0 flex-1";
/**
 * Row wrapping a NumberInput + unit label + reset.
 * Keep the stepper intrinsic — never flex-grow it or +/- buttons stretch unevenly.
 */
export declare const SETTINGS_NUMBER_STEPPER_ROW_CLASS = "flex w-full min-w-0 items-center gap-2";
/** Unit suffix next to a settings number stepper (%, px, …). */
export declare const SETTINGS_NUMBER_UNIT_CLASS = "typography-meta shrink-0 text-muted-foreground tabular-nums";
/** Vertical stack spacing for fields inside a column. */
export declare const SETTINGS_FIELDS_STACK_CLASS = "space-y-4";
/** Compact checkbox / radio list stack. */
export declare const SETTINGS_OPTION_STACK_CLASS = "space-y-1.5";
/**
 * Settings heading classes by context (size + default color).
 * Prefer these over ad-hoc typography-* + color combinations.
 */
/** L1 — page / detail-pane title (larger, quieter than section titles). */
export declare const SETTINGS_PAGE_TITLE_CLASS = "typography-settings-page-title text-muted-foreground";
/** L2 — section title inside a settings page. */
export declare const SETTINGS_SECTION_TITLE_CLASS = "typography-settings-section-title text-foreground";
/** L4 — field / control labels. */
export declare const SETTINGS_FIELD_LABEL_CLASS = "typography-settings-field-label text-foreground";
/** Supporting copy under page or section titles. */
export declare const SETTINGS_DESCRIPTION_CLASS = "typography-settings-description text-muted-foreground";
/** Supporting copy under group titles and fields. */
export declare const SETTINGS_HELPER_CLASS = "typography-meta text-muted-foreground";
/** Callout / alert headline inside a section (not a control-group title). */
export declare const SETTINGS_CALLOUT_TITLE_CLASS = "typography-meta font-medium text-foreground";
/** Brand / product name under a logo — quieter than L1 page title. */
export declare const SETTINGS_BRAND_TITLE_CLASS = "typography-settings-section-title text-foreground";
interface SettingsSectionProps {
    /** Section title. Strings render as the shared h2 style. */
    title?: React.ReactNode;
    /** Optional supporting text under the title. */
    description?: React.ReactNode;
    /** Optional icon/badge next to the title. */
    titleAccessory?: React.ReactNode;
    /** Helper text hidden behind an info icon next to the title. */
    info?: React.ReactNode;
    /** Optional action aligned to the right of the header. */
    headerAction?: React.ReactNode;
    children: React.ReactNode;
    /**
     * Show a top border divider.
     * Use `false` for the first section under the page header.
     * @default true
     */
    divider?: boolean;
    className?: string;
    contentClassName?: string;
    settingsItem?: string;
}
/**
 * Shared settings section chrome: single-style header + optional divider.
 */
export declare const SettingsSection: React.FC<SettingsSectionProps>;
interface SettingsTwoColumnProps {
    children: React.ReactNode;
    className?: string;
}
/** Responsive two-column settings grid used when space allows. */
export declare const SettingsTwoColumn: React.FC<SettingsTwoColumnProps>;
interface SettingsGroupTitleProps {
    children: React.ReactNode;
    className?: string;
    as?: 'h2' | 'h3' | 'div';
}
/** In-section control-group heading (quieter than SettingsSection title). */
export declare const SettingsGroupTitle: React.FC<SettingsGroupTitleProps>;
interface SettingsControlGroupProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Helper text hidden behind an info icon next to the group title. */
    info?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    settingsItem?: string;
}
/** Labeled control cluster inside a section (radios, chips, stacked fields). */
export declare const SettingsControlGroup: React.FC<SettingsControlGroupProps>;
interface SettingsStackedFieldProps {
    label: React.ReactNode;
    description?: React.ReactNode;
    /** Helper text hidden behind an info icon next to the label. */
    info?: React.ReactNode;
    /** Where helper text sits relative to the control. @default 'before' */
    descriptionPlacement?: 'before' | 'after';
    children: React.ReactNode;
    settingsItem?: string;
    className?: string;
    controlClassName?: string;
}
/**
 * Label (+ optional description) above a control — for two-column cells.
 * Prefer this over SettingsFieldRow inside SettingsTwoColumn (FieldRow overflows half-width columns).
 */
export declare const SettingsStackedField: React.FC<SettingsStackedFieldProps>;
interface SettingsFieldRowProps {
    label: React.ReactNode;
    description?: React.ReactNode;
    /** Helper text hidden behind an info icon next to the label. */
    info?: React.ReactNode;
    children: React.ReactNode;
    settingsItem?: string;
    className?: string;
    controlClassName?: string;
    /** Align control to the trailing edge on desktop. @default true */
    alignEnd?: boolean;
}
/**
 * Side-by-side form row: fixed label column + control cluster.
 * Use inside full-width sections or single columns.
 *
 * The row's own vertical padding keeps two stacked rows of 32px controls
 * apart (8px between them), so a list of field rows needs no spacing of its
 * own and labels keep one rhythm whatever control sits beside them.
 */
export declare const SettingsFieldRow: React.FC<SettingsFieldRowProps>;
interface SettingsInsetProps {
    children: React.ReactNode;
    className?: string;
    settingsItem?: string;
}
/** Optional inset block under a section (spacing only; section dividers own borders). */
export declare const SettingsInset: React.FC<SettingsInsetProps>;
interface SettingsCheckboxRowProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    ariaLabel?: string;
    settingsItem?: string;
    className?: string;
    labelAccessory?: React.ReactNode;
    /** Helper text hidden behind an info icon next to the label. */
    info?: React.ReactNode;
    /**
     * A line under the label that holds its own controls (a link). It sits
     * outside the clickable row, so the link is not a button inside a button,
     * and lines up with the label.
     */
    footer?: React.ReactNode;
}
/** Shared checkbox setting row with keyboard support. */
export declare const SettingsCheckboxRow: React.FC<SettingsCheckboxRowProps>;
interface SettingsRadioOptionProps {
    selected: boolean;
    onSelect: () => void;
    label: React.ReactNode;
    description?: React.ReactNode;
    ariaLabel?: string;
    disabled?: boolean;
    className?: string;
}
/** Single radio option row used inside SettingsRadioGroup. */
export declare const SettingsRadioOption: React.FC<SettingsRadioOptionProps>;
interface SettingsRadioGroupProps {
    'aria-label': string;
    children: React.ReactNode;
    className?: string;
}
/** Accessible radio group wrapper with compact vertical spacing. */
export declare const SettingsRadioGroup: React.FC<SettingsRadioGroupProps>;
interface SettingsChipOption<T extends string> {
    value: T;
    label: React.ReactNode;
    disabled?: boolean;
    /**
     * Shown on hover (long-press on touch). The popup stays open while the
     * pointer is on it, so it may carry a link. Keep what the user must read
     * visible elsewhere: touch users rarely long-press.
     */
    tooltip?: React.ReactNode;
}
interface SettingsChipGroupProps<T extends string> {
    value: T;
    options: Array<SettingsChipOption<T>>;
    onChange: (value: T) => void;
    className?: string;
    'aria-label'?: string;
}
/**
 * Compact segmented enum picker, drawn like the active-pill tab strip: the
 * options sit in a recessed track and the chosen one is raised out of it.
 * The track is as tall as the other settings controls (32px), so a row with
 * chips lines up with a row holding a select or a stepper.
 */
export declare function SettingsChipGroup<T extends string>({ value, options, onChange, className, 'aria-label': ariaLabel, }: SettingsChipGroupProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
