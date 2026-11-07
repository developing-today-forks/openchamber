/**
 * A changed file's path on one line that keeps the file name whole: the folder
 * is muted and gives way first, cut from its start, so a narrow row still says
 * which file it is. The full path is the tooltip. Typography comes from the
 * caller through `className`.
 */
export declare const ChangedPathLabel: ({ path, className }: {
    path: string;
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
