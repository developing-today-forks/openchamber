interface TypeField {
    readonly offset: number;
    readonly size: number;
    readonly type: string;
}
interface TypeLayout {
    readonly size: number;
    readonly align: number;
    readonly fields: Readonly<Record<string, TypeField>>;
}
type TypeLayouts = Readonly<Record<string, TypeLayout>>;
export declare class GhosttyRuntime {
    readonly memory: WebAssembly.Memory;
    readonly layouts: TypeLayouts;
    private readonly exports;
    private memoryView;
    private readonly ptyWriters;
    private nextPtyWriterId;
    private writePtyFunctionIndex;
    private constructor();
    static load(bytes?: ArrayBuffer): Promise<GhosttyRuntime>;
    call(name: string, ...args: Array<number | bigint>): number;
    layout(name: string): TypeLayout;
    alloc(size: number): number;
    free(pointer: number, size: number): void;
    allocOpaque(): number;
    freeOpaque(pointer: number): void;
    readPointer(slot: number): number;
    attachPtyWriter(terminal: number, writer: (data: string) => void): number;
    detachPtyWriter(terminal: number, id: number): void;
    view(pointer: number, size?: number): DataView;
    bytes(pointer: number, size: number): Uint8Array;
    /** Reuse scalar reads across cells, refreshing after any terminal grows shared WASM memory. */
    private currentMemoryView;
    setField(pointer: number, structName: string, fieldName: string, value: number): void;
    readField(pointer: number, structName: string, fieldName: string): number;
    private installWritePtyTrampoline;
}
/** One WebAssembly instance per page; every terminal owns and frees its own handles inside it. */
export declare function loadGhosttyRuntime(): Promise<GhosttyRuntime>;
export {};
