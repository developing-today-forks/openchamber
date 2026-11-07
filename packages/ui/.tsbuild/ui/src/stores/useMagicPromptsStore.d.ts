type MagicPromptsState = {
    selectedPromptId: string;
    setSelectedPromptId: (id: string) => void;
};
export declare const useMagicPromptsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<MagicPromptsState>>;
export {};
