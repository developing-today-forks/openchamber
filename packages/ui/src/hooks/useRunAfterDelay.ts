import React from 'react';
import { afterDelay } from '@/lib/timing/afterDelay';

export const useRunAfterDelay = (active: boolean, delayMs: number, run: () => void): void => {
  const runRef = React.useRef(run);
  runRef.current = run;
  React.useEffect(() => {
    if (!active) return undefined;
    return afterDelay(delayMs, () => runRef.current());
  }, [active, delayMs]);
};
