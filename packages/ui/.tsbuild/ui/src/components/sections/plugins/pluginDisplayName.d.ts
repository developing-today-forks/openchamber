/**
 * The name a plugin card shows for a config entry. The spec itself stays the
 * card's second line: a local path is one long unbreakable word whose start
 * (`/Users/…`) says nothing, and a package spec carries a version range.
 *
 * - A path (absolute, `./`, `../`, `file://`) shows its last segment; an
 *   entry file named `index.*` shows the folder that holds it.
 * - A Git spec (`github:owner/repo`, `git+https://…/repo.git#tag`) shows the
 *   repository name.
 * - An npm spec shows the package name without its version or tag.
 */
export declare function pluginDisplayName(spec: string): string;
