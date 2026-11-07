import { z } from 'zod';
import type { GitStatus, GitDiffResponse, GetGitDiffOptions, GetGitDiffsOptions, GitPathDiffBatchEntry, GetGitRangeDiffOptions, GetGitRangeFilesOptions, GetGitCommitDiffOptions, GitFileDiffResponse, GitPathDiffResponse, GetGitFileDiffOptions, GitBranch, GitBranchListOptions, GitUnpushedBranchCounts, GitDeleteBranchPayload, GitRemoveRemotePayload, GeneratedCommitMessage, GitWorktreeInfo, CreateGitWorktreePayload, GitWorktreeCreateResult, RemoveGitWorktreePayload, GitWorktreeSnapshotPayload, GitWorktreeSnapshotResult, GitWorktreeValidationResult, CreateGitCommitOptions, GitCommitResult, GitPushResult, GitPullResult, GitPullOptions, GitNetworkOperation, GitNetworkOperationPlan, GitNetworkOperationRequest, GitContributorDestinationRequest, GitContributorDestinationSelection, GitContributorDestinationCandidates, GitCheckoutTrustInspection, GitStashEntry, GitLogOptions, GitLogResponse, GitCommitFilesResponse, CommitFileDiffResponse, GitIdentityProfile, GitIdentitySummary, GitRemote, MergeConflictDetails, CheckoutCommitResponse, CherryPickResponse, RevertCommitResponse, ResetToCommitResponse } from './api/types';
export declare const gitRemoteListSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    fetchUrl: z.ZodString;
    pushUrl: z.ZodString;
}, z.core.$strict>>;
export declare const gitNetworkOperationSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    operationId: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    transport: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"anonymous">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"anonymous">;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"managed">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            method: z.ZodEnum<{
                credential: "credential";
                "git-identity": "git-identity";
            }>;
        }, z.core.$strict>;
        actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"provider">;
            provider: z.ZodString;
            instance: z.ZodString;
            accountId: z.ZodString;
            login: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"ssh-key">;
            fingerprint: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"system">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"unverified">;
            reason: z.ZodLiteral<"system-credentials">;
        }, z.core.$strict>;
    }, z.core.$strict>], "mode">, z.ZodObject<{
        fetch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
        push: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
    }, z.core.$strict>]>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"push">;
        forceWithLease: z.ZodOptional<z.ZodObject<{
            expectedRemoteSha: z.ZodString;
        }, z.core.$strict>>;
        configureUpstream: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodOptional<z.ZodLiteral<"ref">>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodLiteral<"remote">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        force: z.ZodBoolean;
    }, z.core.$strict>], "fetchScope">, z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"pull">;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"delete-remote-branch">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        destinationRef: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"checkout-hydration">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        requirements: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                lfs: "lfs";
                submodule: "submodule";
            }>;
            path: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"sync">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        fetch: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        pull: z.ZodObject<{
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        push: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
            forceWithLease: z.ZodOptional<z.ZodObject<{
                expectedRemoteSha: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"clone">;
        remote: z.ZodObject<{
            displayUrl: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
        destination: z.ZodObject<{
            displayName: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>], "operation">;
    completedSteps: z.ZodArray<z.ZodEnum<{
        authenticated: "authenticated";
        "checked-out": "checked-out";
        "cleaned-up": "cleaned-up";
        transferred: "transferred";
        "updated-local-repository": "updated-local-repository";
        validated: "validated";
    }>>;
    stepResults: z.ZodOptional<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            fetch: "fetch";
            pull: "pull";
            push: "push";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            conflicted: "conflicted";
            failed: "failed";
            skipped: "skipped";
            succeeded: "succeeded";
        }>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodEnum<{
                AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                CANCELLED: "CANCELLED";
                CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                CONFLICT: "CONFLICT";
                CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                INVALID_REQUEST: "INVALID_REQUEST";
                NOT_FOUND: "NOT_FOUND";
                OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                REMOTE_CHANGED: "REMOTE_CHANGED";
                RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                STALE_BINDING: "STALE_BINDING";
                STALE_CONFIG: "STALE_CONFIG";
                STALE_REPOSITORY: "STALE_REPOSITORY";
                TIMEOUT: "TIMEOUT";
                TRANSPORT_FAILED: "TRANSPORT_FAILED";
                UNKNOWN: "UNKNOWN";
            }>;
            message: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    hydration: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            "authorization-required": "authorization-required";
            cancelled: "cancelled";
            "client-missing": "client-missing";
            failed: "failed";
            invalid: "invalid";
            "not-needed": "not-needed";
            succeeded: "succeeded";
        }>;
        submodules: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lfs: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state: z.ZodLiteral<"planned">;
}, z.core.$strict>, z.ZodObject<{
    operationId: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    transport: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"anonymous">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"anonymous">;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"managed">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            method: z.ZodEnum<{
                credential: "credential";
                "git-identity": "git-identity";
            }>;
        }, z.core.$strict>;
        actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"provider">;
            provider: z.ZodString;
            instance: z.ZodString;
            accountId: z.ZodString;
            login: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"ssh-key">;
            fingerprint: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"system">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"unverified">;
            reason: z.ZodLiteral<"system-credentials">;
        }, z.core.$strict>;
    }, z.core.$strict>], "mode">, z.ZodObject<{
        fetch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
        push: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
    }, z.core.$strict>]>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"push">;
        forceWithLease: z.ZodOptional<z.ZodObject<{
            expectedRemoteSha: z.ZodString;
        }, z.core.$strict>>;
        configureUpstream: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodOptional<z.ZodLiteral<"ref">>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodLiteral<"remote">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        force: z.ZodBoolean;
    }, z.core.$strict>], "fetchScope">, z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"pull">;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"delete-remote-branch">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        destinationRef: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"checkout-hydration">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        requirements: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                lfs: "lfs";
                submodule: "submodule";
            }>;
            path: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"sync">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        fetch: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        pull: z.ZodObject<{
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        push: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
            forceWithLease: z.ZodOptional<z.ZodObject<{
                expectedRemoteSha: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"clone">;
        remote: z.ZodObject<{
            displayUrl: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
        destination: z.ZodObject<{
            displayName: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>], "operation">;
    completedSteps: z.ZodArray<z.ZodEnum<{
        authenticated: "authenticated";
        "checked-out": "checked-out";
        "cleaned-up": "cleaned-up";
        transferred: "transferred";
        "updated-local-repository": "updated-local-repository";
        validated: "validated";
    }>>;
    stepResults: z.ZodOptional<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            fetch: "fetch";
            pull: "pull";
            push: "push";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            conflicted: "conflicted";
            failed: "failed";
            skipped: "skipped";
            succeeded: "succeeded";
        }>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodEnum<{
                AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                CANCELLED: "CANCELLED";
                CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                CONFLICT: "CONFLICT";
                CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                INVALID_REQUEST: "INVALID_REQUEST";
                NOT_FOUND: "NOT_FOUND";
                OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                REMOTE_CHANGED: "REMOTE_CHANGED";
                RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                STALE_BINDING: "STALE_BINDING";
                STALE_CONFIG: "STALE_CONFIG";
                STALE_REPOSITORY: "STALE_REPOSITORY";
                TIMEOUT: "TIMEOUT";
                TRANSPORT_FAILED: "TRANSPORT_FAILED";
                UNKNOWN: "UNKNOWN";
            }>;
            message: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    hydration: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            "authorization-required": "authorization-required";
            cancelled: "cancelled";
            "client-missing": "client-missing";
            failed: "failed";
            invalid: "invalid";
            "not-needed": "not-needed";
            succeeded: "succeeded";
        }>;
        submodules: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lfs: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state: z.ZodLiteral<"running">;
}, z.core.$strict>, z.ZodObject<{
    operationId: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    transport: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"anonymous">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"anonymous">;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"managed">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            method: z.ZodEnum<{
                credential: "credential";
                "git-identity": "git-identity";
            }>;
        }, z.core.$strict>;
        actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"provider">;
            provider: z.ZodString;
            instance: z.ZodString;
            accountId: z.ZodString;
            login: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"ssh-key">;
            fingerprint: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"system">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"unverified">;
            reason: z.ZodLiteral<"system-credentials">;
        }, z.core.$strict>;
    }, z.core.$strict>], "mode">, z.ZodObject<{
        fetch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
        push: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
    }, z.core.$strict>]>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"push">;
        forceWithLease: z.ZodOptional<z.ZodObject<{
            expectedRemoteSha: z.ZodString;
        }, z.core.$strict>>;
        configureUpstream: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodOptional<z.ZodLiteral<"ref">>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodLiteral<"remote">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        force: z.ZodBoolean;
    }, z.core.$strict>], "fetchScope">, z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"pull">;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"delete-remote-branch">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        destinationRef: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"checkout-hydration">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        requirements: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                lfs: "lfs";
                submodule: "submodule";
            }>;
            path: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"sync">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        fetch: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        pull: z.ZodObject<{
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        push: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
            forceWithLease: z.ZodOptional<z.ZodObject<{
                expectedRemoteSha: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"clone">;
        remote: z.ZodObject<{
            displayUrl: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
        destination: z.ZodObject<{
            displayName: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>], "operation">;
    completedSteps: z.ZodArray<z.ZodEnum<{
        authenticated: "authenticated";
        "checked-out": "checked-out";
        "cleaned-up": "cleaned-up";
        transferred: "transferred";
        "updated-local-repository": "updated-local-repository";
        validated: "validated";
    }>>;
    stepResults: z.ZodOptional<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            fetch: "fetch";
            pull: "pull";
            push: "push";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            conflicted: "conflicted";
            failed: "failed";
            skipped: "skipped";
            succeeded: "succeeded";
        }>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodEnum<{
                AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                CANCELLED: "CANCELLED";
                CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                CONFLICT: "CONFLICT";
                CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                INVALID_REQUEST: "INVALID_REQUEST";
                NOT_FOUND: "NOT_FOUND";
                OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                REMOTE_CHANGED: "REMOTE_CHANGED";
                RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                STALE_BINDING: "STALE_BINDING";
                STALE_CONFIG: "STALE_CONFIG";
                STALE_REPOSITORY: "STALE_REPOSITORY";
                TIMEOUT: "TIMEOUT";
                TRANSPORT_FAILED: "TRANSPORT_FAILED";
                UNKNOWN: "UNKNOWN";
            }>;
            message: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    hydration: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            "authorization-required": "authorization-required";
            cancelled: "cancelled";
            "client-missing": "client-missing";
            failed: "failed";
            invalid: "invalid";
            "not-needed": "not-needed";
            succeeded: "succeeded";
        }>;
        submodules: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lfs: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state: z.ZodLiteral<"succeeded">;
}, z.core.$strict>, z.ZodObject<{
    operationId: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    transport: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"anonymous">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"anonymous">;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"managed">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            method: z.ZodEnum<{
                credential: "credential";
                "git-identity": "git-identity";
            }>;
        }, z.core.$strict>;
        actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"provider">;
            provider: z.ZodString;
            instance: z.ZodString;
            accountId: z.ZodString;
            login: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"ssh-key">;
            fingerprint: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"system">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"unverified">;
            reason: z.ZodLiteral<"system-credentials">;
        }, z.core.$strict>;
    }, z.core.$strict>], "mode">, z.ZodObject<{
        fetch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
        push: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
    }, z.core.$strict>]>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"push">;
        forceWithLease: z.ZodOptional<z.ZodObject<{
            expectedRemoteSha: z.ZodString;
        }, z.core.$strict>>;
        configureUpstream: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodOptional<z.ZodLiteral<"ref">>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodLiteral<"remote">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        force: z.ZodBoolean;
    }, z.core.$strict>], "fetchScope">, z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"pull">;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"delete-remote-branch">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        destinationRef: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"checkout-hydration">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        requirements: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                lfs: "lfs";
                submodule: "submodule";
            }>;
            path: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"sync">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        fetch: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        pull: z.ZodObject<{
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        push: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
            forceWithLease: z.ZodOptional<z.ZodObject<{
                expectedRemoteSha: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"clone">;
        remote: z.ZodObject<{
            displayUrl: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
        destination: z.ZodObject<{
            displayName: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>], "operation">;
    completedSteps: z.ZodArray<z.ZodEnum<{
        authenticated: "authenticated";
        "checked-out": "checked-out";
        "cleaned-up": "cleaned-up";
        transferred: "transferred";
        "updated-local-repository": "updated-local-repository";
        validated: "validated";
    }>>;
    stepResults: z.ZodOptional<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            fetch: "fetch";
            pull: "pull";
            push: "push";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            conflicted: "conflicted";
            failed: "failed";
            skipped: "skipped";
            succeeded: "succeeded";
        }>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodEnum<{
                AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                CANCELLED: "CANCELLED";
                CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                CONFLICT: "CONFLICT";
                CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                INVALID_REQUEST: "INVALID_REQUEST";
                NOT_FOUND: "NOT_FOUND";
                OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                REMOTE_CHANGED: "REMOTE_CHANGED";
                RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                STALE_BINDING: "STALE_BINDING";
                STALE_CONFIG: "STALE_CONFIG";
                STALE_REPOSITORY: "STALE_REPOSITORY";
                TIMEOUT: "TIMEOUT";
                TRANSPORT_FAILED: "TRANSPORT_FAILED";
                UNKNOWN: "UNKNOWN";
            }>;
            message: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    hydration: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            "authorization-required": "authorization-required";
            cancelled: "cancelled";
            "client-missing": "client-missing";
            failed: "failed";
            invalid: "invalid";
            "not-needed": "not-needed";
            succeeded: "succeeded";
        }>;
        submodules: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lfs: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state: z.ZodLiteral<"partial">;
    error: z.ZodObject<{
        code: z.ZodEnum<{
            AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
            AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
            CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
            GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
            INVALID_REQUEST: "INVALID_REQUEST";
            RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
            TRANSPORT_FAILED: "TRANSPORT_FAILED";
            UNKNOWN: "UNKNOWN";
        }>;
        message: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>, z.ZodObject<{
    operationId: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    transport: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"anonymous">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"anonymous">;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"managed">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            method: z.ZodEnum<{
                credential: "credential";
                "git-identity": "git-identity";
            }>;
        }, z.core.$strict>;
        actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"provider">;
            provider: z.ZodString;
            instance: z.ZodString;
            accountId: z.ZodString;
            login: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"ssh-key">;
            fingerprint: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"system">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"unverified">;
            reason: z.ZodLiteral<"system-credentials">;
        }, z.core.$strict>;
    }, z.core.$strict>], "mode">, z.ZodObject<{
        fetch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
        push: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
    }, z.core.$strict>]>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"push">;
        forceWithLease: z.ZodOptional<z.ZodObject<{
            expectedRemoteSha: z.ZodString;
        }, z.core.$strict>>;
        configureUpstream: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodOptional<z.ZodLiteral<"ref">>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodLiteral<"remote">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        force: z.ZodBoolean;
    }, z.core.$strict>], "fetchScope">, z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"pull">;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"delete-remote-branch">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        destinationRef: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"checkout-hydration">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        requirements: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                lfs: "lfs";
                submodule: "submodule";
            }>;
            path: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"sync">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        fetch: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        pull: z.ZodObject<{
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        push: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
            forceWithLease: z.ZodOptional<z.ZodObject<{
                expectedRemoteSha: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"clone">;
        remote: z.ZodObject<{
            displayUrl: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
        destination: z.ZodObject<{
            displayName: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>], "operation">;
    completedSteps: z.ZodArray<z.ZodEnum<{
        authenticated: "authenticated";
        "checked-out": "checked-out";
        "cleaned-up": "cleaned-up";
        transferred: "transferred";
        "updated-local-repository": "updated-local-repository";
        validated: "validated";
    }>>;
    stepResults: z.ZodOptional<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            fetch: "fetch";
            pull: "pull";
            push: "push";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            conflicted: "conflicted";
            failed: "failed";
            skipped: "skipped";
            succeeded: "succeeded";
        }>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodEnum<{
                AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                CANCELLED: "CANCELLED";
                CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                CONFLICT: "CONFLICT";
                CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                INVALID_REQUEST: "INVALID_REQUEST";
                NOT_FOUND: "NOT_FOUND";
                OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                REMOTE_CHANGED: "REMOTE_CHANGED";
                RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                STALE_BINDING: "STALE_BINDING";
                STALE_CONFIG: "STALE_CONFIG";
                STALE_REPOSITORY: "STALE_REPOSITORY";
                TIMEOUT: "TIMEOUT";
                TRANSPORT_FAILED: "TRANSPORT_FAILED";
                UNKNOWN: "UNKNOWN";
            }>;
            message: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    hydration: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            "authorization-required": "authorization-required";
            cancelled: "cancelled";
            "client-missing": "client-missing";
            failed: "failed";
            invalid: "invalid";
            "not-needed": "not-needed";
            succeeded: "succeeded";
        }>;
        submodules: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lfs: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state: z.ZodLiteral<"failed">;
    error: z.ZodObject<{
        code: z.ZodEnum<{
            AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
            AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
            CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
            GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
            INVALID_REQUEST: "INVALID_REQUEST";
            RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
            TRANSPORT_FAILED: "TRANSPORT_FAILED";
            UNKNOWN: "UNKNOWN";
        }>;
        message: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>, z.ZodObject<{
    operationId: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    transport: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"anonymous">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"anonymous">;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"managed">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            method: z.ZodEnum<{
                credential: "credential";
                "git-identity": "git-identity";
            }>;
        }, z.core.$strict>;
        actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"provider">;
            provider: z.ZodString;
            instance: z.ZodString;
            accountId: z.ZodString;
            login: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"ssh-key">;
            fingerprint: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"system">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"unverified">;
            reason: z.ZodLiteral<"system-credentials">;
        }, z.core.$strict>;
    }, z.core.$strict>], "mode">, z.ZodObject<{
        fetch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
        push: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
    }, z.core.$strict>]>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"push">;
        forceWithLease: z.ZodOptional<z.ZodObject<{
            expectedRemoteSha: z.ZodString;
        }, z.core.$strict>>;
        configureUpstream: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodOptional<z.ZodLiteral<"ref">>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodLiteral<"remote">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        force: z.ZodBoolean;
    }, z.core.$strict>], "fetchScope">, z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"pull">;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"delete-remote-branch">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        destinationRef: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"checkout-hydration">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        requirements: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                lfs: "lfs";
                submodule: "submodule";
            }>;
            path: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"sync">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        fetch: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        pull: z.ZodObject<{
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        push: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
            forceWithLease: z.ZodOptional<z.ZodObject<{
                expectedRemoteSha: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"clone">;
        remote: z.ZodObject<{
            displayUrl: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
        destination: z.ZodObject<{
            displayName: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>], "operation">;
    completedSteps: z.ZodArray<z.ZodEnum<{
        authenticated: "authenticated";
        "checked-out": "checked-out";
        "cleaned-up": "cleaned-up";
        transferred: "transferred";
        "updated-local-repository": "updated-local-repository";
        validated: "validated";
    }>>;
    stepResults: z.ZodOptional<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            fetch: "fetch";
            pull: "pull";
            push: "push";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            conflicted: "conflicted";
            failed: "failed";
            skipped: "skipped";
            succeeded: "succeeded";
        }>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodEnum<{
                AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                CANCELLED: "CANCELLED";
                CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                CONFLICT: "CONFLICT";
                CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                INVALID_REQUEST: "INVALID_REQUEST";
                NOT_FOUND: "NOT_FOUND";
                OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                REMOTE_CHANGED: "REMOTE_CHANGED";
                RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                STALE_BINDING: "STALE_BINDING";
                STALE_CONFIG: "STALE_CONFIG";
                STALE_REPOSITORY: "STALE_REPOSITORY";
                TIMEOUT: "TIMEOUT";
                TRANSPORT_FAILED: "TRANSPORT_FAILED";
                UNKNOWN: "UNKNOWN";
            }>;
            message: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    hydration: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            "authorization-required": "authorization-required";
            cancelled: "cancelled";
            "client-missing": "client-missing";
            failed: "failed";
            invalid: "invalid";
            "not-needed": "not-needed";
            succeeded: "succeeded";
        }>;
        submodules: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lfs: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state: z.ZodLiteral<"cancelled">;
    error: z.ZodObject<{
        code: z.ZodEnum<{
            CANCELLED: "CANCELLED";
            TIMEOUT: "TIMEOUT";
        }>;
        message: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>, z.ZodObject<{
    operationId: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    transport: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"anonymous">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"anonymous">;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"managed">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            method: z.ZodEnum<{
                credential: "credential";
                "git-identity": "git-identity";
            }>;
        }, z.core.$strict>;
        actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"provider">;
            provider: z.ZodString;
            instance: z.ZodString;
            accountId: z.ZodString;
            login: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"ssh-key">;
            fingerprint: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"system">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"unverified">;
            reason: z.ZodLiteral<"system-credentials">;
        }, z.core.$strict>;
    }, z.core.$strict>], "mode">, z.ZodObject<{
        fetch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
        push: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
    }, z.core.$strict>]>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"push">;
        forceWithLease: z.ZodOptional<z.ZodObject<{
            expectedRemoteSha: z.ZodString;
        }, z.core.$strict>>;
        configureUpstream: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodOptional<z.ZodLiteral<"ref">>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodLiteral<"remote">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        force: z.ZodBoolean;
    }, z.core.$strict>], "fetchScope">, z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"pull">;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"delete-remote-branch">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        destinationRef: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"checkout-hydration">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        requirements: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                lfs: "lfs";
                submodule: "submodule";
            }>;
            path: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"sync">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        fetch: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        pull: z.ZodObject<{
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        push: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
            forceWithLease: z.ZodOptional<z.ZodObject<{
                expectedRemoteSha: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"clone">;
        remote: z.ZodObject<{
            displayUrl: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
        destination: z.ZodObject<{
            displayName: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>], "operation">;
    completedSteps: z.ZodArray<z.ZodEnum<{
        authenticated: "authenticated";
        "checked-out": "checked-out";
        "cleaned-up": "cleaned-up";
        transferred: "transferred";
        "updated-local-repository": "updated-local-repository";
        validated: "validated";
    }>>;
    stepResults: z.ZodOptional<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            fetch: "fetch";
            pull: "pull";
            push: "push";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            conflicted: "conflicted";
            failed: "failed";
            skipped: "skipped";
            succeeded: "succeeded";
        }>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodEnum<{
                AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                CANCELLED: "CANCELLED";
                CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                CONFLICT: "CONFLICT";
                CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                INVALID_REQUEST: "INVALID_REQUEST";
                NOT_FOUND: "NOT_FOUND";
                OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                REMOTE_CHANGED: "REMOTE_CHANGED";
                RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                STALE_BINDING: "STALE_BINDING";
                STALE_CONFIG: "STALE_CONFIG";
                STALE_REPOSITORY: "STALE_REPOSITORY";
                TIMEOUT: "TIMEOUT";
                TRANSPORT_FAILED: "TRANSPORT_FAILED";
                UNKNOWN: "UNKNOWN";
            }>;
            message: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    hydration: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            "authorization-required": "authorization-required";
            cancelled: "cancelled";
            "client-missing": "client-missing";
            failed: "failed";
            invalid: "invalid";
            "not-needed": "not-needed";
            succeeded: "succeeded";
        }>;
        submodules: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lfs: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state: z.ZodLiteral<"outcome-unknown">;
    error: z.ZodObject<{
        code: z.ZodEnum<{
            OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
        }>;
        message: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>, z.ZodObject<{
    operationId: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    transport: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"anonymous">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"anonymous">;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"managed">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"verified">;
            method: z.ZodEnum<{
                credential: "credential";
                "git-identity": "git-identity";
            }>;
        }, z.core.$strict>;
        actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"provider">;
            provider: z.ZodString;
            instance: z.ZodString;
            accountId: z.ZodString;
            login: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"ssh-key">;
            fingerprint: z.ZodString;
        }, z.core.$strict>], "kind">>;
    }, z.core.$strict>, z.ZodObject<{
        mode: z.ZodLiteral<"system">;
        verification: z.ZodObject<{
            status: z.ZodLiteral<"unverified">;
            reason: z.ZodLiteral<"system-credentials">;
        }, z.core.$strict>;
    }, z.core.$strict>], "mode">, z.ZodObject<{
        fetch: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
        push: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"anonymous">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"anonymous">;
            }, z.core.$strict>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"managed">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"verified">;
                method: z.ZodEnum<{
                    credential: "credential";
                    "git-identity": "git-identity";
                }>;
            }, z.core.$strict>;
            actor: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"provider">;
                provider: z.ZodString;
                instance: z.ZodString;
                accountId: z.ZodString;
                login: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>, z.ZodObject<{
                kind: z.ZodLiteral<"ssh-key">;
                fingerprint: z.ZodString;
            }, z.core.$strict>], "kind">>;
        }, z.core.$strict>, z.ZodObject<{
            mode: z.ZodLiteral<"system">;
            verification: z.ZodObject<{
                status: z.ZodLiteral<"unverified">;
                reason: z.ZodLiteral<"system-credentials">;
            }, z.core.$strict>;
        }, z.core.$strict>], "mode">;
    }, z.core.$strict>]>;
    target: z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"push">;
        forceWithLease: z.ZodOptional<z.ZodObject<{
            expectedRemoteSha: z.ZodString;
        }, z.core.$strict>>;
        configureUpstream: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodDiscriminatedUnion<[z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodOptional<z.ZodLiteral<"ref">>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"fetch">;
        fetchScope: z.ZodLiteral<"remote">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        force: z.ZodBoolean;
    }, z.core.$strict>], "fetchScope">, z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        sourceRef: z.ZodString;
        destinationRef: z.ZodString;
        operation: z.ZodLiteral<"pull">;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"delete-remote-branch">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        destinationRef: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"checkout-hydration">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        remote: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>;
        requirements: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<{
                lfs: "lfs";
                submodule: "submodule";
            }>;
            path: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
        }, z.core.$strict>>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"sync">;
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        configRevision: z.ZodString;
        fetch: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        pull: z.ZodObject<{
            destinationRef: z.ZodString;
        }, z.core.$strict>;
        push: z.ZodObject<{
            name: z.ZodString;
            endpoint: z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>;
            sourceRef: z.ZodString;
            destinationRef: z.ZodString;
            forceWithLease: z.ZodOptional<z.ZodObject<{
                expectedRemoteSha: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    }, z.core.$strict>, z.ZodObject<{
        operation: z.ZodLiteral<"clone">;
        remote: z.ZodObject<{
            displayUrl: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
        destination: z.ZodObject<{
            displayName: z.ZodString;
            fingerprint: z.ZodString;
        }, z.core.$strict>;
    }, z.core.$strict>], "operation">;
    completedSteps: z.ZodArray<z.ZodEnum<{
        authenticated: "authenticated";
        "checked-out": "checked-out";
        "cleaned-up": "cleaned-up";
        transferred: "transferred";
        "updated-local-repository": "updated-local-repository";
        validated: "validated";
    }>>;
    stepResults: z.ZodOptional<z.ZodArray<z.ZodObject<{
        step: z.ZodEnum<{
            fetch: "fetch";
            pull: "pull";
            push: "push";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            conflicted: "conflicted";
            failed: "failed";
            skipped: "skipped";
            succeeded: "succeeded";
        }>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodEnum<{
                AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                CANCELLED: "CANCELLED";
                CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                CONFLICT: "CONFLICT";
                CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                INVALID_REQUEST: "INVALID_REQUEST";
                NOT_FOUND: "NOT_FOUND";
                OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                REMOTE_CHANGED: "REMOTE_CHANGED";
                RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                STALE_BINDING: "STALE_BINDING";
                STALE_CONFIG: "STALE_CONFIG";
                STALE_REPOSITORY: "STALE_REPOSITORY";
                TIMEOUT: "TIMEOUT";
                TRANSPORT_FAILED: "TRANSPORT_FAILED";
                UNKNOWN: "UNKNOWN";
            }>;
            message: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    hydration: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            "authorization-required": "authorization-required";
            cancelled: "cancelled";
            "client-missing": "client-missing";
            failed: "failed";
            invalid: "invalid";
            "not-needed": "not-needed";
            succeeded: "succeeded";
        }>;
        submodules: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lfs: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            status: z.ZodEnum<{
                "authorization-required": "authorization-required";
                cancelled: "cancelled";
                "client-missing": "client-missing";
                failed: "failed";
                invalid: "invalid";
                "not-needed": "not-needed";
                succeeded: "succeeded";
            }>;
            endpoint: z.ZodOptional<z.ZodObject<{
                displayUrl: z.ZodString;
                fingerprint: z.ZodString;
            }, z.core.$strict>>;
            error: z.ZodOptional<z.ZodObject<{
                code: z.ZodEnum<{
                    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED";
                    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED";
                    CANCELLED: "CANCELLED";
                    CHECKOUT_TOO_LARGE: "CHECKOUT_TOO_LARGE";
                    CONFLICT: "CONFLICT";
                    CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED: "CONTRIBUTOR_MANAGED_TRANSPORT_REQUIRED";
                    DESTINATION_SELECTION_REQUIRED: "DESTINATION_SELECTION_REQUIRED";
                    GIT_LFS_CLIENT_MISSING: "GIT_LFS_CLIENT_MISSING";
                    INVALID_REQUEST: "INVALID_REQUEST";
                    NOT_FOUND: "NOT_FOUND";
                    OUTCOME_UNKNOWN: "OUTCOME_UNKNOWN";
                    REMOTE_CHANGED: "REMOTE_CHANGED";
                    RUNTIME_UNSUPPORTED: "RUNTIME_UNSUPPORTED";
                    STALE_BINDING: "STALE_BINDING";
                    STALE_CONFIG: "STALE_CONFIG";
                    STALE_REPOSITORY: "STALE_REPOSITORY";
                    TIMEOUT: "TIMEOUT";
                    TRANSPORT_FAILED: "TRANSPORT_FAILED";
                    UNKNOWN: "UNKNOWN";
                }>;
                message: z.ZodString;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    state: z.ZodLiteral<"conflicted">;
    error: z.ZodObject<{
        code: z.ZodEnum<{
            CONFLICT: "CONFLICT";
            REMOTE_CHANGED: "REMOTE_CHANGED";
            STALE_BINDING: "STALE_BINDING";
            STALE_CONFIG: "STALE_CONFIG";
            STALE_REPOSITORY: "STALE_REPOSITORY";
        }>;
        message: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>], "state">;
/**
 * Read the full status of many project directories in one batched request and
 * keep each answer in the status cache, so the per-project `getGitStatus` reads
 * that follow are cache hits. Meant for a project list populating its badges:
 * a single directory's status keeps its own request in `getGitStatus`, so the
 * repository the user works in never waits on a slower project's status.
 * Failures are left to the per-project reads, which retry them one by one.
 */
export declare function prefetchProjectStatuses(directories: string[]): Promise<void>;
export declare function checkIsGitRepository(directory: string): Promise<boolean>;
export declare class GitDirectoriesUnsupportedError extends Error {
    constructor();
}
export declare function listGitDirectories(root: string): Promise<string[]>;
export declare function getGitStatus(directory: string, options?: {
    mode?: 'light';
    fresh?: boolean;
}): Promise<GitStatus>;
export declare function resolveGitPrimaryRoot(directory: string): Promise<{
    root: string;
}>;
/**
 * Where `directory` sits inside its repository's checkout: `ai` for `<checkout>/ai`,
 * an empty string at the checkout root. Rejects when the answer is unavailable, so
 * a caller never takes a failed read for "at the root".
 */
export declare function resolveGitRepositoryPrefix(directory: string): Promise<string>;
export declare function resolveGitTopLevel(directory: string): Promise<{
    root: string;
}>;
export declare function getGitCommitSummaries(directory: string, shas: string[]): Promise<{
    commits: Array<{
        sha: string;
        short: string;
        subject: string;
    }>;
}>;
export declare function getGitDiff(directory: string, options: GetGitDiffOptions): Promise<GitPathDiffResponse>;
export declare function getGitDiffs(directory: string, options: GetGitDiffsOptions): Promise<GitPathDiffBatchEntry[]>;
export declare function getGitRangeDiff(directory: string, options: GetGitRangeDiffOptions): Promise<GitDiffResponse>;
export declare function getGitCommitDiff(directory: string, options: GetGitCommitDiffOptions): Promise<GitDiffResponse>;
export declare function getGitRangeFiles(directory: string, options: GetGitRangeFilesOptions): Promise<import('./api/types').GitRangeFileEntry[]>;
export declare function getBranchBase(directory: string, branch: string): Promise<import('./api/types').GitBranchBaseResponse>;
export declare function getGitFileDiff(directory: string, options: GetGitFileDiffOptions): Promise<GitFileDiffResponse>;
export declare function revertGitFile(directory: string, filePath: string, options?: {
    scope?: 'all' | 'working';
}): Promise<void>;
export declare function stageGitFile(directory: string, filePath: string): Promise<void>;
export declare function stageGitFiles(directory: string, filePaths: string[]): Promise<void>;
export declare function unstageGitFile(directory: string, filePath: string): Promise<void>;
export declare function unstageGitFiles(directory: string, filePaths: string[]): Promise<void>;
export declare function stageGitHunk(directory: string, filePath: string, patch: string): Promise<void>;
export declare function unstageGitHunk(directory: string, filePath: string, patch: string): Promise<void>;
export declare function revertGitHunk(directory: string, filePath: string, patch: string): Promise<void>;
export declare function isLinkedWorktree(directory: string): Promise<boolean>;
export declare function getGitBranches(directory: string, options?: GitBranchListOptions): Promise<GitBranch>;
export declare function getGitUnpushedBranchCounts(directory: string, branches: string[]): Promise<GitUnpushedBranchCounts>;
export declare function deleteGitBranch(directory: string, payload: GitDeleteBranchPayload): Promise<{
    success: boolean;
}>;
export declare function removeRemote(directory: string, payload: GitRemoveRemotePayload): Promise<{
    success: boolean;
}>;
export declare function generateCommitMessage(directory: string, files: string[], options?: {
    zenModel?: string;
    providerId?: string;
    modelId?: string;
}): Promise<{
    message: GeneratedCommitMessage;
}>;
export declare function generatePullRequestDescription(directory: string, payload: {
    base: string;
    head: string;
    context?: string;
    zenModel?: string;
    providerId?: string;
    modelId?: string;
}): Promise<{
    title: string;
    body: string;
}>;
export declare function listGitWorktrees(directory: string): Promise<GitWorktreeInfo[]>;
export declare function validateGitWorktree(directory: string, payload: CreateGitWorktreePayload): Promise<GitWorktreeValidationResult>;
export declare function getGitWorktreeBootstrapStatus(directory: string): Promise<import('./api/types').GitWorktreeBootstrapStatus>;
export declare function previewGitWorktree(directory: string, payload: CreateGitWorktreePayload): Promise<GitWorktreeCreateResult>;
export declare function createGitWorktree(directory: string, payload: CreateGitWorktreePayload): Promise<GitWorktreeCreateResult>;
export declare function deleteGitWorktree(directory: string, payload: RemoveGitWorktreePayload): Promise<{
    success: boolean;
}>;
export declare function snapshotGitWorktree(directory: string, payload: GitWorktreeSnapshotPayload): Promise<GitWorktreeSnapshotResult>;
export declare function createGitCommit(directory: string, message: string, options?: CreateGitCommitOptions): Promise<GitCommitResult>;
export declare function gitPush(directory: string, options?: {
    remote?: string;
    branch?: string;
    options?: string[] | Record<string, unknown>;
}): Promise<GitPushResult>;
export declare function gitPull(directory: string, options?: GitPullOptions): Promise<GitPullResult>;
export declare function gitFetch(directory: string, options?: {
    remote?: string;
    branch?: string;
}): Promise<{
    success: boolean;
}>;
export declare function planNetworkOperation(request: GitNetworkOperationRequest): Promise<GitNetworkOperationPlan>;
export declare function issueContributorDestination(request: GitContributorDestinationRequest): Promise<GitContributorDestinationSelection>;
export declare function listContributorDestinations(directory: string): Promise<GitContributorDestinationCandidates>;
export declare function inspectCheckoutTrust(directory: string): Promise<GitCheckoutTrustInspection>;
export declare function decideCheckoutTrust(directory: string, digest: string, decision: 'run' | 'skip'): Promise<{
    state: string;
}>;
export declare function executeNetworkOperation(operationId: string): Promise<GitNetworkOperation>;
export declare function getNetworkOperation(operationId: string): Promise<GitNetworkOperation>;
export declare function cancelNetworkOperation(operationId: string): Promise<GitNetworkOperation>;
export declare function listGitStashes(directory: string): Promise<{
    stashes: GitStashEntry[];
}>;
export declare function countGitStashFiles(directory: string, refs: string[]): Promise<{
    counts: Record<string, number>;
}>;
export declare function stashGitChanges(directory: string, options?: {
    message?: string;
}): Promise<{
    success: boolean;
    created: boolean;
    message: string;
    output: string;
}>;
export declare const applyGitStash: (directory: string, options: {
    ref: string;
}) => Promise<{
    success: boolean;
    ref: string;
}>;
export declare const popGitStash: (directory: string, options: {
    ref: string;
}) => Promise<{
    success: boolean;
    ref: string;
}>;
export declare const dropGitStash: (directory: string, options: {
    ref: string;
}) => Promise<{
    success: boolean;
    ref: string;
}>;
export declare function checkoutBranch(directory: string, branch: string): Promise<{
    success: boolean;
    branch: string;
}>;
export declare function createBranch(directory: string, name: string, startPoint?: string): Promise<{
    success: boolean;
    branch: string;
}>;
export declare function renameBranch(directory: string, oldName: string, newName: string): Promise<{
    success: boolean;
    branch: string;
}>;
export declare function getGitLog(directory: string, options?: GitLogOptions): Promise<GitLogResponse>;
export declare function getCommitFiles(directory: string, hash: string): Promise<GitCommitFilesResponse>;
export declare function getCommitFileDiff(directory: string, hash: string, filePath: string, isBinary: boolean): Promise<CommitFileDiffResponse>;
export declare function getGitIdentities(): Promise<GitIdentityProfile[]>;
export declare function createGitIdentity(profile: GitIdentityProfile): Promise<GitIdentityProfile>;
export declare function updateGitIdentity(id: string, updates: GitIdentityProfile): Promise<GitIdentityProfile>;
export declare function deleteGitIdentity(id: string): Promise<void>;
export declare function getCurrentGitIdentity(directory: string): Promise<GitIdentitySummary | null>;
export declare function hasLocalIdentity(directory: string): Promise<boolean>;
export declare function getGlobalGitIdentity(): Promise<GitIdentitySummary | null>;
export declare function setGitIdentity(directory: string, profileId: string): Promise<{
    success: boolean;
    profile: GitIdentityProfile | null;
}>;
export declare function getRemotes(directory: string): Promise<GitRemote[]>;
export declare function rebase(directory: string, options: {
    onto: string;
}): Promise<{
    success: boolean;
    conflict?: boolean;
    conflictFiles?: string[];
}>;
export declare function abortRebase(directory: string): Promise<{
    success: boolean;
}>;
export declare function merge(directory: string, options: {
    branch: string;
}): Promise<{
    success: boolean;
    conflict?: boolean;
    conflictFiles?: string[];
}>;
export declare function checkoutCommit(directory: string, hash: string): Promise<CheckoutCommitResponse>;
export declare function cherryPick(directory: string, hash: string): Promise<CherryPickResponse>;
export declare function revertCommit(directory: string, hash: string): Promise<RevertCommitResponse>;
export declare function resetToCommit(directory: string, hash: string, mode: 'soft' | 'mixed' | 'hard', force?: boolean): Promise<ResetToCommitResponse>;
export declare function abortMerge(directory: string): Promise<{
    success: boolean;
}>;
export declare function continueRebase(directory: string): Promise<{
    success: boolean;
    conflict: boolean;
    conflictFiles?: string[];
}>;
export declare function continueMerge(directory: string): Promise<{
    success: boolean;
    conflict: boolean;
    conflictFiles?: string[];
}>;
export declare function stash(directory: string, options?: {
    message?: string;
    includeUntracked?: boolean;
}): Promise<{
    success: boolean;
}>;
export declare function stashPop(directory: string): Promise<{
    success: boolean;
}>;
export declare function getConflictDetails(directory: string): Promise<MergeConflictDetails>;
export declare function validateWorktreeDirectory(directory: string, worktreeRoot: string): Promise<{
    valid: boolean;
    insideWorktreeRoot: boolean;
    resolvedWorktreeRoot: string | null;
    resolvedCwd: string | null;
}>;
export declare function canonicalizeWorktreeState(directory: string): Promise<{
    worktreeRoot: string | null;
    cwd: string | null;
    branch: string | null;
    headState: 'branch' | 'detached' | 'unborn';
    worktreeStatus: 'pending' | 'ready' | 'missing' | 'invalid' | 'not-a-repo';
    legacy: boolean;
    degraded: boolean;
    attentionReason?: 'merge' | 'rebase' | 'cherry-pick' | 'revert' | 'bisect' | null;
}>;
