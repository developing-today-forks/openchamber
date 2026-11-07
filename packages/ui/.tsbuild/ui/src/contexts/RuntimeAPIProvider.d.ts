import { type JSX, type ReactNode } from 'react';
import type { RuntimeAPIs } from '@/lib/api/types';
export declare function RuntimeAPIProvider({ apis, children }: {
    apis: RuntimeAPIs;
    children: ReactNode;
}): JSX.Element;
