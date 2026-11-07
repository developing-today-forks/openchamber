import { z } from 'zod';
export declare const surfaceInputEventSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"pointer">;
    action: z.ZodEnum<{
        down: "down";
        move: "move";
        up: "up";
    }>;
    x: z.ZodNumber;
    y: z.ZodNumber;
    button: z.ZodNumber;
    buttons: z.ZodNumber;
    modifiers: z.ZodObject<{
        alt: z.ZodBoolean;
        ctrl: z.ZodBoolean;
        meta: z.ZodBoolean;
        shift: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"wheel">;
    x: z.ZodNumber;
    y: z.ZodNumber;
    deltaX: z.ZodNumber;
    deltaY: z.ZodNumber;
    modifiers: z.ZodObject<{
        alt: z.ZodBoolean;
        ctrl: z.ZodBoolean;
        meta: z.ZodBoolean;
        shift: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"key">;
    action: z.ZodEnum<{
        down: "down";
        up: "up";
    }>;
    key: z.ZodString;
    code: z.ZodString;
    modifiers: z.ZodObject<{
        alt: z.ZodBoolean;
        ctrl: z.ZodBoolean;
        meta: z.ZodBoolean;
        shift: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}, z.core.$strip>], "type">;
/** What a viewer (the host panel) sends the host over the surface socket. */
export declare const surfaceViewerMessageSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"ack">;
    seq: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"input">;
    events: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"pointer">;
        action: z.ZodEnum<{
            down: "down";
            move: "move";
            up: "up";
        }>;
        x: z.ZodNumber;
        y: z.ZodNumber;
        button: z.ZodNumber;
        buttons: z.ZodNumber;
        modifiers: z.ZodObject<{
            alt: z.ZodBoolean;
            ctrl: z.ZodBoolean;
            meta: z.ZodBoolean;
            shift: z.ZodBoolean;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"wheel">;
        x: z.ZodNumber;
        y: z.ZodNumber;
        deltaX: z.ZodNumber;
        deltaY: z.ZodNumber;
        modifiers: z.ZodObject<{
            alt: z.ZodBoolean;
            ctrl: z.ZodBoolean;
            meta: z.ZodBoolean;
            shift: z.ZodBoolean;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"key">;
        action: z.ZodEnum<{
            down: "down";
            up: "up";
        }>;
        key: z.ZodString;
        code: z.ZodString;
        modifiers: z.ZodObject<{
            alt: z.ZodBoolean;
            ctrl: z.ZodBoolean;
            meta: z.ZodBoolean;
            shift: z.ZodBoolean;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"text">;
        text: z.ZodString;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"release">;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"resize">;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"clipboard-read">;
    id: z.ZodString;
}, z.core.$strip>], "type">;
export type SurfaceViewerMessage = z.infer<typeof surfaceViewerMessageSchema>;
export declare const surfaceControllerSchema: z.ZodEnum<{
    agent: "agent";
    none: "none";
    user: "user";
}>;
/**
 * What the host sends a viewer. A `frame` text message is followed by one
 * binary message carrying exactly `bytes` bytes of the image.
 */
export declare const surfaceHostMessageSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"hello">;
    viewerId: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"frame">;
    seq: z.ZodNumber;
    width: z.ZodNumber;
    height: z.ZodNumber;
    mime: z.ZodEnum<{
        "image/jpeg": "image/jpeg";
        "image/png": "image/png";
    }>;
    bytes: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    agentActive: z.ZodBoolean;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"control">;
    controller: z.ZodEnum<{
        agent: "agent";
        none: "none";
        user: "user";
    }>;
    mine: z.ZodBoolean;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"resized">;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"clipboard">;
    id: z.ZodString;
    text: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"error">;
    code: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"ended">;
    reason: z.ZodEnum<{
        "extension-unavailable": "extension-unavailable";
        "host-shutdown": "host-shutdown";
        "service-stopped": "service-stopped";
    }>;
}, z.core.$strip>], "type">;
export type SurfaceHostMessage = z.infer<typeof surfaceHostMessageSchema>;
/** Service answers the host parses. */
export declare const surfaceResizeAnswerSchema: z.ZodObject<{
    width: z.ZodNumber;
    height: z.ZodNumber;
}, z.core.$strip>;
export declare const surfaceClipboardAnswerSchema: z.ZodObject<{
    text: z.ZodString;
}, z.core.$strip>;
