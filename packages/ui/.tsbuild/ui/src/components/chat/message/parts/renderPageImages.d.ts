import type { ToolPart } from '@/lib/opencode/model';
/** The local image paths a page names, in order, at most twelve. */
export declare function renderPageImageSources(html: string): string[];
/** The page with each loaded image's path swapped for its data URL; an image that did not load keeps its path. */
export declare function inlineRenderPageImages(html: string, images: ReadonlyMap<string, string>): string;
/**
 * The page's HTML with its local images in place, or null while they load. A
 * page that names none is ready at once. The page is drawn once its images are
 * in, not before: drawing it again would reload it and lose what its script
 * holds.
 */
export declare function useRenderPageHtml(part: ToolPart, html: string): string | null;
