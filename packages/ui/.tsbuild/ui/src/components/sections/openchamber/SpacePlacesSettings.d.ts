/**
 * The places of isolated spaces in Settings (journey step 9, and decision 12): each
 * place with how many spaces run and stand stopped there, the disk its image, tools and spaces take,
 * the spaces whose container is gone, and "Clean up…", which removes what OpenChamber can make again.
 * The server decides what goes, see `places/docker-disk.js`; this screen only shows and asks.
 *
 * A place that cannot be reached says so and what to do, never a count of zero: the spaces this
 * window last saw are listed as out of reach, and nothing is when it saw none. Nothing polls, except
 * the disk while the host downloads the image, which "Download image" starts ahead of the first
 * space (journey step 0); "Try again" reads the place again. Rendered only while the switch is on
 * (decision 19).
 */
import React from 'react';
export declare const SpacePlacesSettings: React.FC;
