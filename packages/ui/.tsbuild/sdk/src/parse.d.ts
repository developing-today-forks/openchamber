import { z } from 'zod';
import { type ServicePermissions, type ParseManifestResult, type SocketBinding } from './manifest.ts';
export declare const openChamberManifestSchema: z.ZodObject<{
    apiVersion: z.ZodLiteral<1>;
    engines: z.ZodOptional<z.ZodObject<{
        openchamber: z.ZodString;
    }, z.core.$strict>>;
    contributes: z.ZodObject<{
        panel: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            icon: z.ZodString;
            entry: z.ZodOptional<z.ZodString>;
            dock: z.ZodOptional<z.ZodEnum<{
                bottom: "bottom";
                left: "left";
                right: "right";
                top: "top";
            }>>;
            size: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        background: z.ZodOptional<z.ZodObject<{
            entry: z.ZodString;
        }, z.core.$strip>>;
        attach: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodEnum<{
            dialog: "dialog";
            panel: "panel";
        }>, z.ZodObject<{
            mode: z.ZodEnum<{
                dialog: "dialog";
                panel: "panel";
            }>;
            entry: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>]>>;
        page: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<true>, z.ZodObject<{
            entry: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>]>>;
        statusSection: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<true>, z.ZodObject<{
            entry: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            height: z.ZodOptional<z.ZodNumber>;
            defaultExpanded: z.ZodOptional<z.ZodBoolean>;
            requiresProject: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>]>>;
        capabilities: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            files: "files";
            model: "model";
            prompt: "prompt";
            sessions: "sessions";
            shells: "shells";
        }>>>;
        integration: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            oauth: z.ZodOptional<z.ZodObject<{
                authorizeUrl: z.ZodString;
                tokenUrl: z.ZodString;
                apiOrigin: z.ZodString;
                scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                account: z.ZodOptional<z.ZodObject<{
                    path: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
            token: z.ZodOptional<z.ZodObject<{
                apiOrigin: z.ZodString;
                account: z.ZodOptional<z.ZodObject<{
                    path: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strip>>;
                scheme: z.ZodOptional<z.ZodEnum<{
                    basic: "basic";
                    bearer: "bearer";
                    raw: "raw";
                }>>;
                usernameLabel: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
            host: z.ZodOptional<z.ZodObject<{
                provider: z.ZodEnum<{
                    linear: "linear";
                }>;
            }, z.core.$strip>>;
            settings: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                label: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
        service: z.ZodOptional<z.ZodObject<{
            entry: z.ZodString;
            runtime: z.ZodLiteral<"host">;
            permissions: z.ZodOptional<z.ZodPipe<z.ZodObject<{
                sockets: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<SocketBinding, string>>, z.ZodPipe<z.ZodObject<{
                    id: z.ZodString;
                    path: z.ZodOptional<z.ZodString>;
                    candidates: z.ZodOptional<z.ZodObject<{
                        linux: z.ZodOptional<z.ZodArray<z.ZodString>>;
                        darwin: z.ZodOptional<z.ZodArray<z.ZodString>>;
                        win32: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    }, z.core.$strict>>;
                }, z.core.$strict>, z.ZodTransform<SocketBinding, {
                    id: string;
                    path?: string | undefined;
                    candidates?: {
                        linux?: string[] | undefined;
                        darwin?: string[] | undefined;
                        win32?: string[] | undefined;
                    } | undefined;
                }>>]>>>;
                exec: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strict>, z.ZodTransform<ServicePermissions, {
                sockets?: SocketBinding[] | undefined;
                exec?: string[] | undefined;
            }>>>;
            provides: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                browser: "browser";
            }>>>;
            surface: z.ZodOptional<z.ZodLiteral<true>>;
        }, z.core.$strip>>;
        filesystem: z.ZodOptional<z.ZodArray<z.ZodString>>;
        origins: z.ZodOptional<z.ZodArray<z.ZodString>>;
        actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            icon: z.ZodOptional<z.ZodString>;
            where: z.ZodEnum<{
                message: "message";
                session: "session";
            }>;
            mode: z.ZodOptional<z.ZodEnum<{
                background: "background";
                open: "open";
            }>>;
            roles: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                assistant: "assistant";
                user: "user";
            }>>>;
            payload: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                messages: "messages";
            }>>>;
        }, z.core.$strip>>>;
        commands: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        tools: z.ZodOptional<z.ZodArray<z.ZodObject<{
            match: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            icon: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            subtitle: z.ZodOptional<z.ZodString>;
            output: z.ZodOptional<z.ZodEnum<{
                auto: "auto";
                code: "code";
                json: "json";
                markdown: "markdown";
                table: "table";
                text: "text";
            }>>;
            language: z.ZodOptional<z.ZodString>;
            columns: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>>;
        fileEditors: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            match: z.ZodArray<z.ZodString>;
            entry: z.ZodString;
            content: z.ZodOptional<z.ZodEnum<{
                binary: "binary";
                text: "text";
            }>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const PACKAGE_VERSION_PATTERN: RegExp;
export declare const packageManifestSchema: z.ZodObject<{
    version: z.ZodOptional<z.ZodString>;
    openchamber: z.ZodObject<{
        apiVersion: z.ZodLiteral<1>;
        engines: z.ZodOptional<z.ZodObject<{
            openchamber: z.ZodString;
        }, z.core.$strict>>;
        contributes: z.ZodObject<{
            panel: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                icon: z.ZodString;
                entry: z.ZodOptional<z.ZodString>;
                dock: z.ZodOptional<z.ZodEnum<{
                    bottom: "bottom";
                    left: "left";
                    right: "right";
                    top: "top";
                }>>;
                size: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>;
            background: z.ZodOptional<z.ZodObject<{
                entry: z.ZodString;
            }, z.core.$strip>>;
            attach: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodEnum<{
                dialog: "dialog";
                panel: "panel";
            }>, z.ZodObject<{
                mode: z.ZodEnum<{
                    dialog: "dialog";
                    panel: "panel";
                }>;
                entry: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>]>>;
            page: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<true>, z.ZodObject<{
                entry: z.ZodString;
                title: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>]>>;
            statusSection: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<true>, z.ZodObject<{
                entry: z.ZodString;
                title: z.ZodOptional<z.ZodString>;
                height: z.ZodOptional<z.ZodNumber>;
                defaultExpanded: z.ZodOptional<z.ZodBoolean>;
                requiresProject: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>]>>;
            capabilities: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                files: "files";
                model: "model";
                prompt: "prompt";
                sessions: "sessions";
                shells: "shells";
            }>>>;
            integration: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
                description: z.ZodString;
                oauth: z.ZodOptional<z.ZodObject<{
                    authorizeUrl: z.ZodString;
                    tokenUrl: z.ZodString;
                    apiOrigin: z.ZodString;
                    scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    account: z.ZodOptional<z.ZodObject<{
                        path: z.ZodString;
                        name: z.ZodString;
                    }, z.core.$strip>>;
                }, z.core.$strip>>;
                token: z.ZodOptional<z.ZodObject<{
                    apiOrigin: z.ZodString;
                    account: z.ZodOptional<z.ZodObject<{
                        path: z.ZodString;
                        name: z.ZodString;
                    }, z.core.$strip>>;
                    scheme: z.ZodOptional<z.ZodEnum<{
                        basic: "basic";
                        bearer: "bearer";
                        raw: "raw";
                    }>>;
                    usernameLabel: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                host: z.ZodOptional<z.ZodObject<{
                    provider: z.ZodEnum<{
                        linear: "linear";
                    }>;
                }, z.core.$strip>>;
                settings: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    label: z.ZodString;
                }, z.core.$strip>>>;
            }, z.core.$strip>>;
            service: z.ZodOptional<z.ZodObject<{
                entry: z.ZodString;
                runtime: z.ZodLiteral<"host">;
                permissions: z.ZodOptional<z.ZodPipe<z.ZodObject<{
                    sockets: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<SocketBinding, string>>, z.ZodPipe<z.ZodObject<{
                        id: z.ZodString;
                        path: z.ZodOptional<z.ZodString>;
                        candidates: z.ZodOptional<z.ZodObject<{
                            linux: z.ZodOptional<z.ZodArray<z.ZodString>>;
                            darwin: z.ZodOptional<z.ZodArray<z.ZodString>>;
                            win32: z.ZodOptional<z.ZodArray<z.ZodString>>;
                        }, z.core.$strict>>;
                    }, z.core.$strict>, z.ZodTransform<SocketBinding, {
                        id: string;
                        path?: string | undefined;
                        candidates?: {
                            linux?: string[] | undefined;
                            darwin?: string[] | undefined;
                            win32?: string[] | undefined;
                        } | undefined;
                    }>>]>>>;
                    exec: z.ZodOptional<z.ZodArray<z.ZodString>>;
                }, z.core.$strict>, z.ZodTransform<ServicePermissions, {
                    sockets?: SocketBinding[] | undefined;
                    exec?: string[] | undefined;
                }>>>;
                provides: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                    browser: "browser";
                }>>>;
                surface: z.ZodOptional<z.ZodLiteral<true>>;
            }, z.core.$strip>>;
            filesystem: z.ZodOptional<z.ZodArray<z.ZodString>>;
            origins: z.ZodOptional<z.ZodArray<z.ZodString>>;
            actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                label: z.ZodString;
                icon: z.ZodOptional<z.ZodString>;
                where: z.ZodEnum<{
                    message: "message";
                    session: "session";
                }>;
                mode: z.ZodOptional<z.ZodEnum<{
                    background: "background";
                    open: "open";
                }>>;
                roles: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                    assistant: "assistant";
                    user: "user";
                }>>>;
                payload: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                    messages: "messages";
                }>>>;
            }, z.core.$strip>>>;
            commands: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
            tools: z.ZodOptional<z.ZodArray<z.ZodObject<{
                match: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                icon: z.ZodOptional<z.ZodString>;
                title: z.ZodOptional<z.ZodString>;
                subtitle: z.ZodOptional<z.ZodString>;
                output: z.ZodOptional<z.ZodEnum<{
                    auto: "auto";
                    code: "code";
                    json: "json";
                    markdown: "markdown";
                    table: "table";
                    text: "text";
                }>>;
                language: z.ZodOptional<z.ZodString>;
                columns: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strip>>>;
            fileEditors: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                title: z.ZodString;
                match: z.ZodArray<z.ZodString>;
                entry: z.ZodString;
                content: z.ZodOptional<z.ZodEnum<{
                    binary: "binary";
                    text: "text";
                }>>;
            }, z.core.$strip>>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type ManifestDocument = z.input<typeof openChamberManifestSchema> | z.input<typeof packageManifestSchema>;
export declare const parseManifest: (document: ManifestDocument) => ParseManifestResult;
export declare const parseManifestJson: (json: string) => ParseManifestResult;
