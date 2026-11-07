/**
 * Scripts the agent's browser actions run inside the page.
 *
 * Each builder returns a self-contained expression evaluated in the page's own
 * context, so none of them may reference anything from this module at runtime.
 * Inputs are embedded with `JSON.stringify`, which is what keeps a selector or
 * a typed value from terminating the expression and becoming code.
 *
 * Every script resolves to `{ ok, ... }` instead of throwing, so a failed match
 * comes back as an explainable result rather than an opaque evaluation error.
 */
/**
 * `selector` narrows the snapshot to one subtree.
 *
 * A long page truncates against the caps no matter how they are tuned, which
 * leaves the agent hunting. Scoping answers that directly: ask about the part
 * you mean and the caps stop mattering.
 */
export declare const buildSnapshotScript: ({ selector }?: {
    selector?: string;
}) => string;
export declare const buildClickScript: ({ selector, text }: {
    selector?: string;
    text?: string;
}) => string;
export declare const buildTypeScript: ({ selector, value, submit }: {
    selector: string;
    value: string;
    submit: boolean;
}) => string;
/**
 * Scrolling, reported after it has actually happened.
 *
 * Two things made this lie. Pages commonly set `scroll-behavior: smooth`, which
 * turns a programmatic scroll into an animation — so the position read straight
 * afterwards is the position before the scroll, and the result said nothing
 * moved. And a scroll that is already at the end is indistinguishable from one
 * that failed unless the limits are reported too. An agent reading "scrollY: 0"
 * from a scroll that worked learns a superstition it will apply for the rest of
 * the session.
 */
export declare const buildScrollScript: ({ selector, direction }: {
    selector?: string;
    direction?: string;
}) => string;
/**
 * Reads how one element actually renders.
 *
 * The snapshot describes structure, which leaves questions of appearance
 * answerable only by reading the source and hoping the build agrees. Computed
 * styles come from the live page, so a colour reported from here is the colour
 * on screen — and unlike a screenshot it is readable by an agent that cannot
 * see images.
 */
export declare const buildInspectScript: ({ selector }: {
    selector: string;
}) => string;
