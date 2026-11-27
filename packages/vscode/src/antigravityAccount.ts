import { z } from 'zod';

type AntigravityJsonValue = string | number | boolean | null | AntigravityJsonValue[] | AntigravityJsonRecord;
type AntigravityJsonInput = AntigravityJsonValue | undefined;
type AntigravityJsonRecord = { [key: string]: AntigravityJsonInput };

const antigravityFileSchema = z.object({
  activeIndex: z.number().catch(0).optional(),
  accounts: z.array(z.unknown()).optional(),
});

const optionalText = z.string().optional().catch(undefined).transform((value) => value?.trim() || null);
const antigravityAccountSchema = z.object({
  refreshToken: optionalText,
  projectId: optionalText,
  managedProjectId: optionalText,
  email: optionalText,
});

type AntigravityAccountData = z.infer<typeof antigravityAccountSchema>;

export const selectAntigravityAccount = (data: AntigravityJsonRecord | null): AntigravityAccountData | null => {
  const parsedFile = antigravityFileSchema.safeParse(data);
  if (!parsedFile.success || !parsedFile.data.accounts?.length) return null;

  const { accounts, activeIndex } = parsedFile.data;
  const parsedAccount = antigravityAccountSchema.safeParse(accounts[activeIndex ?? 0] ?? accounts[0]);
  return parsedAccount.success ? parsedAccount.data : null;
};
