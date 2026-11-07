import type { Theme } from '@/types/theme';
export declare class CSSVariableGenerator {
    generate(theme: Theme): string;
    private generateTailwindVariables;
    apply(theme: Theme): void;
    private generatePrimaryColors;
    private generateSurfaceColors;
    private generateInteractiveColors;
    private generateStatusColors;
    private generatePullRequestColors;
    private generateSyntaxColors;
    private generateReadableColors;
    private generateComponentColors;
    private generateMarkdownColors;
    private generateToolColors;
    private generateConfigVariables;
    private generateTypographyVariables;
    private opacity;
    private darken;
    private kebabCase;
}
