/**
 * Reading a drop's payload.
 *
 * Hosts describe a dragged file in incompatible ways: a browser exposes real
 * `File` entries, VS Code's explorer offers only proprietary data types whose
 * payloads must be parsed for paths, and OpenChamber's own file tree marks an
 * internal drag with a private type. These helpers answer the three questions
 * the composer actually asks of a `DataTransfer`, and are pure so they can be
 * exercised without a browser.
 *
 * `getData` throws in some hosts when called during dragover rather than drop;
 * every read here is guarded so one unreadable type cannot abort the scan.
 */
/** Data type marking a drag that started in OpenChamber's own file tree. */
export declare const INTERNAL_FILE_PATH_TYPE = "application/x-openchamber-file-path";
/**
 * Whether this drag carries files at all, used to decide if the composer
 * should show its drop target. Checked on dragenter/dragover, where payloads
 * are often unreadable, so the declared types are the primary signal and the
 * payload scan is the fallback for hosts that declare nothing useful.
 */
export declare function hasDraggedFiles(dataTransfer: DataTransfer | null | undefined): boolean;
/**
 * The actual `File` objects in a drop. `files` is the normal source; `items`
 * covers hosts that only populate the item list.
 */
export declare function collectDroppedFiles(dataTransfer: DataTransfer | null | undefined): File[];
/**
 * File references from a drop that carries no `File` objects — VS Code hands
 * over paths and expects the receiver to resolve them itself.
 */
export declare function collectDroppedFileUris(dataTransfer: DataTransfer | null | undefined): string[];
