import type { WalkthroughView } from '@/lib/walkthrough/model';
import type { WalkthroughReview } from './useWalkthroughReview';
type ControlSize = 'default' | 'mobile';
/**
 * A walkthrough nobody can read is worth nothing, so the prose language is a
 * per-review choice like the model — defaulting to the interface language,
 * which is the best evidence of what the reader reads.
 */
export declare const WalkthroughLanguagePicker: ({ review, size, className, }: {
    review: WalkthroughReview;
    size?: ControlSize;
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
/** Choosing a roomier model for a risky change is a per-review call, so this is review state rather than a settings edit. */
export declare const WalkthroughModelPicker: ({ review, className }: {
    review: WalkthroughReview;
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
/** Generate, Regenerate or Cancel, whichever the walkthrough is ready for. */
export declare const WalkthroughGenerateButton: ({ review, hasView, size, className, labelClassName, onActed, }: {
    review: WalkthroughReview;
    hasView: boolean;
    size?: 'sm' | 'lg';
    className?: string;
    /** Lets a tight toolbar drop the text and keep the icon. */
    labelClassName?: string;
    /** After the click, for a menu or sheet that should step aside. */
    onActed?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
/**
 * Where the reader is, and the whole list of steps to jump to. Shown where the
 * contents column is not, so position and what is ahead stay one tap away.
 */
export declare const WalkthroughStepMenu: ({ review, view, size, }: {
    review: WalkthroughReview;
    view: WalkthroughView;
    size?: ControlSize;
}) => import("react/jsx-runtime").JSX.Element | null;
/** Status of what is on screen: generating over it, asked in another language or model, outdated, or failed. */
export declare const WalkthroughBanners: ({ review, view }: {
    review: WalkthroughReview;
    view: WalkthroughView | null;
}) => import("react/jsx-runtime").JSX.Element;
/**
 * Before the first walkthrough: what it is, what it is asked with, and the
 * button that starts it. The model and the language sit here because this is
 * the moment they are decided; once a walkthrough exists they are rarely
 * touched again and live in the header or its options.
 */
export declare const WalkthroughEmptyState: ({ review, size }: {
    review: WalkthroughReview;
    size?: ControlSize;
}) => import("react/jsx-runtime").JSX.Element;
/**
 * The controls a narrow header has no room for, gathered in one place: the
 * model, the language, Generate, and the guide. The desktop header opens it
 * from "More", the phone from its own options button.
 */
export declare const WalkthroughOptions: ({ review, hasView, size, onOpenChanges, onActed, }: {
    review: WalkthroughReview;
    hasView: boolean;
    size?: ControlSize;
    /** The pull request's Changes, when the header had to drop its button. */
    onOpenChanges?: () => void;
    /** After an action that leaves the options behind (Generate, Changes, the guide). */
    onActed?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export {};
