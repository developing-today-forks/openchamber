import type { SpaceDisk } from '@/lib/spaces/spaces-api';
/** How often, and how many times at most, the disk is read again once a download ended and the image has no size yet. */
export declare const IMAGE_SETTLE_REFRESH_MS = 1000;
/**
 * When the disk is read again after this answer, in milliseconds, or null to stop: while the host
 * downloads the image, every few seconds; once the download ended, a few more times while Docker
 * lists the image but gives it no size yet, because `docker system df` learns a freshly pulled
 * image a moment after `docker pull` returns, and the last read of the poll would otherwise show
 * "image 0 B" until the page is opened again. `settleReads` counts those reads so far.
 */
export declare const nextDiskReadDelay: (disk: Pick<SpaceDisk, 'imagePulling' | 'imageBytes'>, settleReads: number) => number | null;
