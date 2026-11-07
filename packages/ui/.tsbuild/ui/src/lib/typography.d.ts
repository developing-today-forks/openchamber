export declare const SEMANTIC_TYPOGRAPHY: {
    readonly markdown: '0.875rem';
    readonly code: '0.75rem';
    readonly uiHeader: '0.875rem';
    readonly uiLabel: '0.84375rem';
    readonly meta: '0.78125rem';
    readonly micro: '0.75rem';
    /** Settings page / detail-pane title — larger than section headers */
    readonly settingsPageTitle: '1.0625rem';
};
export declare const VSCODE_TYPOGRAPHY: {
    readonly markdown: '0.8438rem';
    readonly code: '0.8125rem';
    readonly uiHeader: '0.8438rem';
    readonly uiLabel: '0.7813rem';
    readonly meta: '0.7813rem';
    readonly micro: '0.75rem';
    readonly settingsPageTitle: '1rem';
};
export type SemanticTypographyKey = keyof typeof SEMANTIC_TYPOGRAPHY;
export declare function getTypographyVariable(key: SemanticTypographyKey): string;
export declare const typography: {
    semanticMarkdown: {
        fontSize: string;
    };
    semanticCode: {
        fontSize: string;
    };
    uiHeader: {
        fontSize: string;
    };
    uiLabel: {
        fontSize: string;
    };
    meta: {
        fontSize: string;
    };
    micro: {
        fontSize: string;
    };
    ui: {
        button: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        buttonSmall: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        buttonLarge: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        label: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        caption: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        badge: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        tooltip: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        input: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        helperText: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
    };
    code: {
        inline: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        block: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        lineNumbers: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
    };
    markdown: {
        body: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        bodySmall: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        bodyLarge: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        blockquote: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        list: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        link: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        code: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        codeBlock: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
    };
    tool: {
        collapsed: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        popup: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
        inline: {
            fontSize: string;
            lineHeight: string;
            letterSpacing: string;
            fontWeight: string;
        };
    };
};
export declare const toolDisplayStyles: {
    padding: {
        collapsed: string;
        popup: string;
        popupContainer: string;
    };
    backgroundOpacity: {
        muted: string;
        mutedAlt: string;
    };
    getCollapsedStyles: () => {
        fontSize: string;
        lineHeight: string;
        letterSpacing: string;
        fontWeight: string;
        background: string;
        backgroundColor: string;
        margin: number;
        padding: string;
        borderRadius: number;
    };
    getPopupStyles: () => {
        fontSize: string;
        lineHeight: string;
        letterSpacing: string;
        fontWeight: string;
        background: string;
        backgroundColor: string;
        margin: number;
        padding: string;
        borderRadius: string;
    };
    getPopupContainerStyles: () => {
        fontSize: string;
        lineHeight: string;
        letterSpacing: string;
        fontWeight: string;
        background: string;
        backgroundColor: string;
        margin: number;
        padding: string;
        borderRadius: string;
        overflowX: 'auto';
    };
    getInlineStyles: () => {
        fontSize: string;
        lineHeight: string;
        letterSpacing: string;
        fontWeight: string;
    };
};
