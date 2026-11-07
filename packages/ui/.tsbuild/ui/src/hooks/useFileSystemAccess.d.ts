export declare const useFileSystemAccess: () => {
    isDesktop: boolean;
    canRequestAccess: boolean;
    requestAccess: (directoryPath: string) => Promise<{
        success: boolean;
        path?: string;
        projectId?: string;
        error?: string;
    }>;
    startAccessing: (directoryPath: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    stopAccessing: (directoryPath: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
};
