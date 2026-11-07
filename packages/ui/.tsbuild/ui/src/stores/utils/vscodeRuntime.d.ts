import type { RuntimeAPIs } from '@/lib/api/types';
import { type VSCodeBootstrapConfig } from '@/lib/vscodeBootstrap';
export declare const isVSCodeRuntime: (runtimeApis: RuntimeAPIs | null, bootstrapConfig?: VSCodeBootstrapConfig | null) => boolean;
