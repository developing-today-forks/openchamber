import type { SourceControlProvider } from '@/lib/api/types';
export declare const rememberedRepositoryProvider: (runtimeKey: string, projectPath: string | null) => SourceControlProvider | null;
export declare const rememberRepositoryProvider: (runtimeKey: string, projectPath: string | null, provider: SourceControlProvider) => void;
export declare const subscribeRepositoryProviderMemory: (listener: () => void) => (() => void);
