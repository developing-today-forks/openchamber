import type { GitIdentityProfile, SourceControlIdentity } from '@/lib/api/types';
/** The authors the Git view offers: complete identities whose account is still connected, after the global one. */
export declare const offeredAuthors: (profiles: GitIdentityProfile[], globalIdentity: GitIdentityProfile | null, connectedAccountIds: (account: SourceControlIdentity) => string[] | null) => GitIdentityProfile[];
/** The author the repository commits as; an author that matches no stored identity shows as a local one. */
export declare const activeAuthor: (profiles: GitIdentityProfile[], globalIdentity: GitIdentityProfile | null, currentIdentity: {
    userName?: string | null;
    userEmail?: string | null;
} | null | undefined, boundAccountId: string | null | undefined) => GitIdentityProfile | null;
