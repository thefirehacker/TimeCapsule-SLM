export type TimeCapsuleTier = "free" | "pro";

export interface CreditUsageCounters {
  sessions: number;
  flowBuilders: number;
  kbDocs: number;
  kbPagesUsed: number;
  kbTokensUsed: number;
  agentCalls: number;
}

export interface CreditLimits {
  sessions: number;
  flowBuilders: number;
  kbDocs: number;
  kbPagesPerDoc: number;
  kbTokensPerDoc: number;
  agentCalls: number;
  maxInvitees: number;
}

export const CREDIT_LIMITS: Record<TimeCapsuleTier, CreditLimits> = {
  free: {
    sessions: 1,
    flowBuilders: 3,
    kbDocs: 5,
    kbPagesPerDoc: 50,
    kbTokensPerDoc: 120_000,
    agentCalls: 40,
    maxInvitees: 0,
  },
  pro: {
    sessions: 3,
    flowBuilders: 10,
    kbDocs: 15,
    kbPagesPerDoc: 150,
    kbTokensPerDoc: 300_000,
    agentCalls: 60,
    maxInvitees: 10,
  },
};

export const USER_TYPE_TO_TIER: Record<string, TimeCapsuleTier> = {
  Free: "free",
  RegularPro: "pro",
  OrgUser: "pro",
};

export const createEmptyUsage = (): CreditUsageCounters => ({
  sessions: 0,
  flowBuilders: 0,
  kbDocs: 0,
  kbPagesUsed: 0,
  kbTokensUsed: 0,
  agentCalls: 0,
});

export const getNextMonthlyResetISO = (base = new Date()): string => {
  const next = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + 1, 1));
  return next.toISOString();
};

