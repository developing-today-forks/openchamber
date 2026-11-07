import React from 'react';
/**
 * Keeps the chat usable when a side zone opens in a narrow window: the
 * session sidebar folds first, then the zone on the other side closes
 * (`planZoneFit`). Both come back when the zone that took their room closes,
 * the sidebar only if the user has not toggled it since. Renders nothing and
 * reads the store outside React, so it re-renders nothing either.
 */
export declare const ZoneFitArbiter: React.FC;
