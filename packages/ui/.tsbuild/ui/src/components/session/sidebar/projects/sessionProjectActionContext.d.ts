type ProjectActionContext = {
    projectId: string | null;
    mobileVariant: boolean;
    closeMobileSwitcher: boolean;
    setActiveProjectIdOnly: (projectId: string) => void;
    setSessionSwitcherOpen: (open: boolean) => void;
};
export declare const prepareSessionProjectAction: ({ projectId, mobileVariant, closeMobileSwitcher, setActiveProjectIdOnly, setSessionSwitcherOpen, }: ProjectActionContext) => void;
export {};
