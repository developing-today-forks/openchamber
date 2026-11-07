/**
 * Inline chip for a reference in a user message or the composer: an attachment
 * citation or a skill, each with its own icon.
 *
 * The negative vertical margins keep the chip's margin box well inside the
 * text line, so inserting one never grows the line box and nudges the lines
 * below by a pixel; the chip still paints at its full height.
 */
export declare const INLINE_REFERENCE_CHIP_CLASS = "mx-px -my-[0.2em] inline-flex h-[1.3em] max-w-full items-center gap-1 rounded-md border border-border/70 bg-background/50 px-1.5 align-middle text-[0.875em] leading-none text-foreground";
/** A chip that opens something (a skill) reacts to hover with a firmer border, not a fill. */
export declare const INTERACTIVE_REFERENCE_CHIP_CLASS = "mx-px -my-[0.2em] inline-flex h-[1.3em] max-w-full items-center gap-1 rounded-md border border-border/70 bg-background/50 px-1.5 align-middle text-[0.875em] leading-none text-foreground cursor-pointer transition-colors hover:border-foreground/40";
/** Sprite symbol for the skill chip icon (the `book-open` app icon). */
export declare const SKILL_CHIP_ICON_HREF = "#oc-book-open";
export type AttachmentCitationLink = {
    filename: string;
    /** File-type sprite symbol id, without the leading `#`. */
    iconId: string;
    /** The chip opens the attachment on click (sent messages, files the app can show). */
    openable?: boolean;
};
export declare const buildAgentMentionUrl: (name: string) => string;
export declare const buildSkillHref: (name: string) => string;
export declare const buildAgentHref: (name: string) => string;
export declare const parseSkillHref: (href: string | null | undefined) => string | null;
export declare const parseAgentHref: (href: string | null | undefined) => string | null;
/** An attachment citation (`[name.png]` in a user message) carried through Markdown as a link. */
export declare const buildAttachmentHref: ({ filename, iconId, openable }: AttachmentCitationLink) => string;
export declare const parseAttachmentHref: (href: string | null | undefined) => AttachmentCitationLink | null;
