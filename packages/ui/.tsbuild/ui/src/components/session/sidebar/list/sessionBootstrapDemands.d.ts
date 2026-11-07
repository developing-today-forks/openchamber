import type { DirectoryBootstrapDemand } from "@/sync/child-store";
export declare function buildSessionBootstrapDemands(input: {
    currentDirectory: string | null;
    currentSessionDirectory: string | null;
}): DirectoryBootstrapDemand[];
