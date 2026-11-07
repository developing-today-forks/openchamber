import { z } from 'zod';
declare const extensionSchema: z.ZodObject<{
    namespace: z.ZodString;
    name: z.ZodString;
    version: z.ZodString;
    label: z.ZodString;
    icon: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type ThemeExtension = z.infer<typeof extensionSchema>;
export declare function searchThemeCatalog(query: string, signal: AbortSignal): Promise<{
    namespace: string;
    name: string;
    version: string;
    label: string;
    icon: string | null;
}[]>;
export declare function readThemePackage(extension: ThemeExtension, signal: AbortSignal): Promise<({
    status: 'ready';
    key: string;
    name: string;
    definition: {
        metadata: {
            id: string;
            name: string;
            variant: "dark" | "light";
            description?: string | undefined;
            version?: string | undefined;
            author?: string | undefined;
            tags?: string[] | undefined;
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
            chat?: Record<string, string> | undefined;
            markdown?: Record<string, string> | undefined;
            tools?: {
                border?: string | undefined;
                icon?: string | undefined;
                title?: string | undefined;
                description?: string | undefined;
                edit?: Record<string, string> | undefined;
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
    };
    theme: import("../../../types/theme").Theme;
} | {
    definition?: undefined;
    theme?: undefined;
    status: 'invalid';
    key: string;
    name: string;
})[]>;
export {};
