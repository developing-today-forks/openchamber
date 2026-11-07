/**
 * Whether `text` draws nothing a person can see. Some models send text parts
 * holding only a zero-width space between steps; a plain `trim()` keeps them,
 * and each became a blank line in the chat (#5215). Only whole texts count:
 * a ZWJ inside an emoji or a ZWNJ inside a Persian word is left alone.
 */
export declare const isInvisibleText: (text: string) => boolean;
