export type ConfigChangeScope = "agents" | "providers" | "commands" | "skills" | "all";
export interface ConfigChangeEvent {
    scopes: ConfigChangeScope[];
    source?: string;
    timestamp: number;
}
type ConfigChangeListener = (event: ConfigChangeEvent) => void | Promise<void>;
export declare function subscribeToConfigChanges(listener: ConfigChangeListener): () => void;
export declare function emitConfigChange(scopes: ConfigChangeScope | ConfigChangeScope[], options?: {
    source?: string;
}): void;
export declare function scopeMatches(event: ConfigChangeEvent, scope: ConfigChangeScope): boolean;
export {};
