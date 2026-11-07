import { z } from 'zod';
import type { Theme } from '../../types/theme';
declare const definition: z.ZodObject<{
    metadata: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        variant: z.ZodEnum<{
            dark: "dark";
            light: "light";
        }>;
        description: z.ZodDefault<z.ZodString>;
        version: z.ZodDefault<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>;
    colors: z.ZodObject<{
        primary: z.ZodObject<{
            base: z.ZodString;
            foreground: z.ZodOptional<z.ZodString>;
            hover: z.ZodOptional<z.ZodString>;
            active: z.ZodOptional<z.ZodString>;
            muted: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        surface: z.ZodObject<{
            background: z.ZodString;
            foreground: z.ZodString;
            muted: z.ZodString;
            mutedForeground: z.ZodString;
            elevated: z.ZodString;
            elevatedForeground: z.ZodOptional<z.ZodString>;
            overlay: z.ZodOptional<z.ZodString>;
            subtle: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        interactive: z.ZodObject<{
            border: z.ZodString;
            selection: z.ZodOptional<z.ZodString>;
            selectionForeground: z.ZodOptional<z.ZodString>;
            borderHover: z.ZodOptional<z.ZodString>;
            borderFocus: z.ZodOptional<z.ZodString>;
            focus: z.ZodOptional<z.ZodString>;
            focusRing: z.ZodOptional<z.ZodString>;
            cursor: z.ZodOptional<z.ZodString>;
            hover: z.ZodOptional<z.ZodString>;
            active: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        status: z.ZodObject<{
            error: z.ZodString;
            errorForeground: z.ZodOptional<z.ZodString>;
            errorBackground: z.ZodOptional<z.ZodString>;
            errorBorder: z.ZodOptional<z.ZodString>;
            warning: z.ZodString;
            warningForeground: z.ZodOptional<z.ZodString>;
            warningBackground: z.ZodOptional<z.ZodString>;
            warningBorder: z.ZodOptional<z.ZodString>;
            success: z.ZodString;
            successForeground: z.ZodOptional<z.ZodString>;
            successBackground: z.ZodOptional<z.ZodString>;
            successBorder: z.ZodOptional<z.ZodString>;
            info: z.ZodString;
            infoForeground: z.ZodOptional<z.ZodString>;
            infoBackground: z.ZodOptional<z.ZodString>;
            infoBorder: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        syntax: z.ZodObject<{
            base: z.ZodObject<{
                background: z.ZodOptional<z.ZodString>;
                foreground: z.ZodOptional<z.ZodString>;
                comment: z.ZodString;
                keyword: z.ZodString;
                string: z.ZodString;
                number: z.ZodString;
                function: z.ZodString;
                variable: z.ZodString;
                type: z.ZodString;
                operator: z.ZodString;
            }, z.core.$strip>;
            tokens: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            highlights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, z.core.$strip>;
        pr: z.ZodOptional<z.ZodObject<{
            open: z.ZodOptional<z.ZodString>;
            draft: z.ZodOptional<z.ZodString>;
            blocked: z.ZodOptional<z.ZodString>;
            merged: z.ZodOptional<z.ZodString>;
            closed: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        chat: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
            [k: string]: string;
        }, Record<string, string>>>>;
        markdown: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
            [k: string]: string;
        }, Record<string, string>>>>;
        tools: z.ZodOptional<z.ZodObject<{
            border: z.ZodOptional<z.ZodString>;
            icon: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            edit: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
                [k: string]: string;
            }, Record<string, string>>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    config: z.ZodOptional<z.ZodObject<{
        fonts: z.ZodOptional<z.ZodObject<{
            sans: z.ZodOptional<z.ZodString>;
            mono: z.ZodOptional<z.ZodString>;
            heading: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        transitions: z.ZodOptional<z.ZodObject<{
            fast: z.ZodOptional<z.ZodString>;
            normal: z.ZodOptional<z.ZodString>;
            slow: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ThemeDefinition = z.input<typeof definition>;
export declare const themeSchema: z.ZodPipe<z.ZodObject<{
    metadata: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        variant: z.ZodEnum<{
            dark: "dark";
            light: "light";
        }>;
        description: z.ZodDefault<z.ZodString>;
        version: z.ZodDefault<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>;
    colors: z.ZodObject<{
        primary: z.ZodObject<{
            base: z.ZodString;
            foreground: z.ZodOptional<z.ZodString>;
            hover: z.ZodOptional<z.ZodString>;
            active: z.ZodOptional<z.ZodString>;
            muted: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        surface: z.ZodObject<{
            background: z.ZodString;
            foreground: z.ZodString;
            muted: z.ZodString;
            mutedForeground: z.ZodString;
            elevated: z.ZodString;
            elevatedForeground: z.ZodOptional<z.ZodString>;
            overlay: z.ZodOptional<z.ZodString>;
            subtle: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        interactive: z.ZodObject<{
            border: z.ZodString;
            selection: z.ZodOptional<z.ZodString>;
            selectionForeground: z.ZodOptional<z.ZodString>;
            borderHover: z.ZodOptional<z.ZodString>;
            borderFocus: z.ZodOptional<z.ZodString>;
            focus: z.ZodOptional<z.ZodString>;
            focusRing: z.ZodOptional<z.ZodString>;
            cursor: z.ZodOptional<z.ZodString>;
            hover: z.ZodOptional<z.ZodString>;
            active: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        status: z.ZodObject<{
            error: z.ZodString;
            errorForeground: z.ZodOptional<z.ZodString>;
            errorBackground: z.ZodOptional<z.ZodString>;
            errorBorder: z.ZodOptional<z.ZodString>;
            warning: z.ZodString;
            warningForeground: z.ZodOptional<z.ZodString>;
            warningBackground: z.ZodOptional<z.ZodString>;
            warningBorder: z.ZodOptional<z.ZodString>;
            success: z.ZodString;
            successForeground: z.ZodOptional<z.ZodString>;
            successBackground: z.ZodOptional<z.ZodString>;
            successBorder: z.ZodOptional<z.ZodString>;
            info: z.ZodString;
            infoForeground: z.ZodOptional<z.ZodString>;
            infoBackground: z.ZodOptional<z.ZodString>;
            infoBorder: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        syntax: z.ZodObject<{
            base: z.ZodObject<{
                background: z.ZodOptional<z.ZodString>;
                foreground: z.ZodOptional<z.ZodString>;
                comment: z.ZodString;
                keyword: z.ZodString;
                string: z.ZodString;
                number: z.ZodString;
                function: z.ZodString;
                variable: z.ZodString;
                type: z.ZodString;
                operator: z.ZodString;
            }, z.core.$strip>;
            tokens: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            highlights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, z.core.$strip>;
        pr: z.ZodOptional<z.ZodObject<{
            open: z.ZodOptional<z.ZodString>;
            draft: z.ZodOptional<z.ZodString>;
            blocked: z.ZodOptional<z.ZodString>;
            merged: z.ZodOptional<z.ZodString>;
            closed: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        chat: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
            [k: string]: string;
        }, Record<string, string>>>>;
        markdown: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
            [k: string]: string;
        }, Record<string, string>>>>;
        tools: z.ZodOptional<z.ZodObject<{
            border: z.ZodOptional<z.ZodString>;
            icon: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            edit: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
                [k: string]: string;
            }, Record<string, string>>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    config: z.ZodOptional<z.ZodObject<{
        fonts: z.ZodOptional<z.ZodObject<{
            sans: z.ZodOptional<z.ZodString>;
            mono: z.ZodOptional<z.ZodString>;
            heading: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        transitions: z.ZodOptional<z.ZodObject<{
            fast: z.ZodOptional<z.ZodString>;
            normal: z.ZodOptional<z.ZodString>;
            slow: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodTransform<Theme, {
    metadata: {
        id: string;
        name: string;
        variant: "dark" | "light";
        description: string;
        version: string;
        author?: string | undefined;
        tags: string[];
    };
    colors: {
        primary: {
            base: string;
            foreground?: string | undefined;
            hover?: string | undefined;
            active?: string | undefined;
            muted?: string | undefined;
        };
        surface: {
            background: string;
            foreground: string;
            muted: string;
            mutedForeground: string;
            elevated: string;
            elevatedForeground?: string | undefined;
            overlay?: string | undefined;
            subtle?: string | undefined;
        };
        interactive: {
            border: string;
            selection?: string | undefined;
            selectionForeground?: string | undefined;
            borderHover?: string | undefined;
            borderFocus?: string | undefined;
            focus?: string | undefined;
            focusRing?: string | undefined;
            cursor?: string | undefined;
            hover?: string | undefined;
            active?: string | undefined;
        };
        status: {
            error: string;
            errorForeground?: string | undefined;
            errorBackground?: string | undefined;
            errorBorder?: string | undefined;
            warning: string;
            warningForeground?: string | undefined;
            warningBackground?: string | undefined;
            warningBorder?: string | undefined;
            success: string;
            successForeground?: string | undefined;
            successBackground?: string | undefined;
            successBorder?: string | undefined;
            info: string;
            infoForeground?: string | undefined;
            infoBackground?: string | undefined;
            infoBorder?: string | undefined;
        };
        syntax: {
            base: {
                background?: string | undefined;
                foreground?: string | undefined;
                comment: string;
                keyword: string;
                string: string;
                number: string;
                function: string;
                variable: string;
                type: string;
                operator: string;
            };
            tokens?: Record<string, string> | undefined;
            highlights?: Record<string, string> | undefined;
        };
        pr?: {
            open?: string | undefined;
            draft?: string | undefined;
            blocked?: string | undefined;
            merged?: string | undefined;
            closed?: string | undefined;
        } | undefined;
        chat?: {
            [k: string]: string;
        } | undefined;
        markdown?: {
            [k: string]: string;
        } | undefined;
        tools?: {
            border?: string | undefined;
            icon?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            edit?: {
                [k: string]: string;
            } | undefined;
        } | undefined;
    };
    config?: {
        fonts?: {
            sans?: string | undefined;
            mono?: string | undefined;
            heading?: string | undefined;
        } | undefined;
        transitions?: {
            fast?: string | undefined;
            normal?: string | undefined;
            slow?: string | undefined;
        } | undefined;
    } | undefined;
}>>;
export declare const requireTheme: (data: unknown, params?: z.core.ParseContext<z.core.$ZodIssue>) => Theme;
export declare const themeListSchema: z.ZodPipe<z.ZodArray<z.ZodCatch<z.ZodNullable<z.ZodPipe<z.ZodObject<{
    metadata: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        variant: z.ZodEnum<{
            dark: "dark";
            light: "light";
        }>;
        description: z.ZodDefault<z.ZodString>;
        version: z.ZodDefault<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>;
    colors: z.ZodObject<{
        primary: z.ZodObject<{
            base: z.ZodString;
            foreground: z.ZodOptional<z.ZodString>;
            hover: z.ZodOptional<z.ZodString>;
            active: z.ZodOptional<z.ZodString>;
            muted: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        surface: z.ZodObject<{
            background: z.ZodString;
            foreground: z.ZodString;
            muted: z.ZodString;
            mutedForeground: z.ZodString;
            elevated: z.ZodString;
            elevatedForeground: z.ZodOptional<z.ZodString>;
            overlay: z.ZodOptional<z.ZodString>;
            subtle: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        interactive: z.ZodObject<{
            border: z.ZodString;
            selection: z.ZodOptional<z.ZodString>;
            selectionForeground: z.ZodOptional<z.ZodString>;
            borderHover: z.ZodOptional<z.ZodString>;
            borderFocus: z.ZodOptional<z.ZodString>;
            focus: z.ZodOptional<z.ZodString>;
            focusRing: z.ZodOptional<z.ZodString>;
            cursor: z.ZodOptional<z.ZodString>;
            hover: z.ZodOptional<z.ZodString>;
            active: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        status: z.ZodObject<{
            error: z.ZodString;
            errorForeground: z.ZodOptional<z.ZodString>;
            errorBackground: z.ZodOptional<z.ZodString>;
            errorBorder: z.ZodOptional<z.ZodString>;
            warning: z.ZodString;
            warningForeground: z.ZodOptional<z.ZodString>;
            warningBackground: z.ZodOptional<z.ZodString>;
            warningBorder: z.ZodOptional<z.ZodString>;
            success: z.ZodString;
            successForeground: z.ZodOptional<z.ZodString>;
            successBackground: z.ZodOptional<z.ZodString>;
            successBorder: z.ZodOptional<z.ZodString>;
            info: z.ZodString;
            infoForeground: z.ZodOptional<z.ZodString>;
            infoBackground: z.ZodOptional<z.ZodString>;
            infoBorder: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        syntax: z.ZodObject<{
            base: z.ZodObject<{
                background: z.ZodOptional<z.ZodString>;
                foreground: z.ZodOptional<z.ZodString>;
                comment: z.ZodString;
                keyword: z.ZodString;
                string: z.ZodString;
                number: z.ZodString;
                function: z.ZodString;
                variable: z.ZodString;
                type: z.ZodString;
                operator: z.ZodString;
            }, z.core.$strip>;
            tokens: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            highlights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, z.core.$strip>;
        pr: z.ZodOptional<z.ZodObject<{
            open: z.ZodOptional<z.ZodString>;
            draft: z.ZodOptional<z.ZodString>;
            blocked: z.ZodOptional<z.ZodString>;
            merged: z.ZodOptional<z.ZodString>;
            closed: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        chat: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
            [k: string]: string;
        }, Record<string, string>>>>;
        markdown: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
            [k: string]: string;
        }, Record<string, string>>>>;
        tools: z.ZodOptional<z.ZodObject<{
            border: z.ZodOptional<z.ZodString>;
            icon: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            edit: z.ZodOptional<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodString>, z.ZodTransform<{
                [k: string]: string;
            }, Record<string, string>>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    config: z.ZodOptional<z.ZodObject<{
        fonts: z.ZodOptional<z.ZodObject<{
            sans: z.ZodOptional<z.ZodString>;
            mono: z.ZodOptional<z.ZodString>;
            heading: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        transitions: z.ZodOptional<z.ZodObject<{
            fast: z.ZodOptional<z.ZodString>;
            normal: z.ZodOptional<z.ZodString>;
            slow: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodTransform<Theme, {
    metadata: {
        id: string;
        name: string;
        variant: "dark" | "light";
        description: string;
        version: string;
        author?: string | undefined;
        tags: string[];
    };
    colors: {
        primary: {
            base: string;
            foreground?: string | undefined;
            hover?: string | undefined;
            active?: string | undefined;
            muted?: string | undefined;
        };
        surface: {
            background: string;
            foreground: string;
            muted: string;
            mutedForeground: string;
            elevated: string;
            elevatedForeground?: string | undefined;
            overlay?: string | undefined;
            subtle?: string | undefined;
        };
        interactive: {
            border: string;
            selection?: string | undefined;
            selectionForeground?: string | undefined;
            borderHover?: string | undefined;
            borderFocus?: string | undefined;
            focus?: string | undefined;
            focusRing?: string | undefined;
            cursor?: string | undefined;
            hover?: string | undefined;
            active?: string | undefined;
        };
        status: {
            error: string;
            errorForeground?: string | undefined;
            errorBackground?: string | undefined;
            errorBorder?: string | undefined;
            warning: string;
            warningForeground?: string | undefined;
            warningBackground?: string | undefined;
            warningBorder?: string | undefined;
            success: string;
            successForeground?: string | undefined;
            successBackground?: string | undefined;
            successBorder?: string | undefined;
            info: string;
            infoForeground?: string | undefined;
            infoBackground?: string | undefined;
            infoBorder?: string | undefined;
        };
        syntax: {
            base: {
                background?: string | undefined;
                foreground?: string | undefined;
                comment: string;
                keyword: string;
                string: string;
                number: string;
                function: string;
                variable: string;
                type: string;
                operator: string;
            };
            tokens?: Record<string, string> | undefined;
            highlights?: Record<string, string> | undefined;
        };
        pr?: {
            open?: string | undefined;
            draft?: string | undefined;
            blocked?: string | undefined;
            merged?: string | undefined;
            closed?: string | undefined;
        } | undefined;
        chat?: {
            [k: string]: string;
        } | undefined;
        markdown?: {
            [k: string]: string;
        } | undefined;
        tools?: {
            border?: string | undefined;
            icon?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            edit?: {
                [k: string]: string;
            } | undefined;
        } | undefined;
    };
    config?: {
        fonts?: {
            sans?: string | undefined;
            mono?: string | undefined;
            heading?: string | undefined;
        } | undefined;
        transitions?: {
            fast?: string | undefined;
            normal?: string | undefined;
            slow?: string | undefined;
        } | undefined;
    } | undefined;
}>>>>>, z.ZodTransform<Theme[], (Theme | null)[]>>;
/** Remove only semantic defaults, never equal colors belonging to unrelated roles. */
export declare function compactTheme(value: ThemeDefinition): ThemeDefinition;
export {};
