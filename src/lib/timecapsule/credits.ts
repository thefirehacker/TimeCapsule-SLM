import {
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "../aws/dynamodb";
import { getUserById } from "../auth/auth";
import { isLocalServerEnv } from "../env";
import {
  CREDIT_LIMITS,
  CreditLimits,
  CreditUsageCounters,
  TimeCapsuleTier,
  USER_TYPE_TO_TIER,
  createEmptyUsage,
  getNextMonthlyResetISO,
} from "./creditConfig";
import type { User } from "../auth/types";

const USERS_TABLE = "Users";
const TIMECAPSULE_TABLE = "timecapsule";

export type CreditType = "sessions" | "flowBuilders" | "kbDocs" | "agentCalls";

export interface CreditSnapshot {
  tier: TimeCapsuleTier;
  limits: CreditLimits;
  usage: CreditUsageCounters;
  remaining: Record<Exclude<CreditType, "kbDocs">, number> & {
    kbDocs: number;
  };
  renewsAt: string;
  sharing?: User["sharing"];
  enforced: boolean;
}

export interface DocumentComplexityEstimate {
  pageEstimate: number;
  tokenEstimate: number;
  filename?: string;
  mimeType?: string;
}

export class CreditLimitError extends Error {
  code = "CREDIT_LIMIT_REACHED";
  details?: Record<string, unknown>;

  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.details = details;
  }
}

export const shouldEnforceCredits = (): boolean =>
  !isLocalServerEnv() &&
  process.env.NEXT_PUBLIC_DISABLE_CREDITS !== "true" &&
  process.env.DISABLE_TIMECAPSULE_CREDITS !== "true";

const defaultSharingState = (
  tier: TimeCapsuleTier
): NonNullable<User["sharing"]> => ({
  isLinkEnabled: false,
  shareToken: null,
  allowedEmails: [],
  pendingInviteTokens: {},
  maxInvitees: CREDIT_LIMITS[tier].maxInvitees,
  updatedAt: new Date().toISOString(),
  frameSetId: null,
  frameVersion: null,
  timeCapsuleName: null,
  shareMode: "collaborative",
});

const resolveTier = (user: User | null): TimeCapsuleTier => {
  if (!user?.userType) return "free";
  return USER_TYPE_TO_TIER[user.userType] ?? "free";
};

const mergeUsage = (usage?: CreditUsageCounters): CreditUsageCounters => {
  return {
    ...createEmptyUsage(),
    ...(usage || {}),
  };
};

const ensureCreditEnvelope = async (
  user: User
): Promise<{ user: User; tier: TimeCapsuleTier }> => {
  const now = new Date();
  const tier = resolveTier(user);
  let usage = mergeUsage(user.credits);
  const limits = CREDIT_LIMITS[tier];
  const sharing = {
    ...defaultSharingState(tier),
    ...(user.sharing || {}),
    maxInvitees: limits.maxInvitees,
    updatedAt: new Date().toISOString(),
  };

  let renewsAt = user.creditRenewsAt;
  let needsReset = false;

  if (!renewsAt) {
    renewsAt = getNextMonthlyResetISO(now);
    needsReset = true;
  } else {
    const renewalDate = new Date(renewsAt);
    if (now >= renewalDate) {
      usage = createEmptyUsage();
      renewsAt = getNextMonthlyResetISO(now);
      needsReset = true;
    }
  }

  const requiresUpdate =
    needsReset ||
    !user.credits ||
    user.tier !== tier ||
    !user.sharing ||
    (user.sharing?.maxInvitees ?? -1) !== limits.maxInvitees;

  if (requiresUpdate) {
    const updateParts: string[] = [];
    const expressionNames: Record<string, string> = {
      "#tier": "tier",
      "#sharing": "sharing",
      "#updatedAt": "updatedAt",
    };
    const expressionValues: Record<string, unknown> = {
      ":tier": tier,
      ":sharing": sharing,
      ":now": now.toISOString(),
    };

    updateParts.push("#tier = :tier");
    updateParts.push("#sharing = :sharing");
    updateParts.push("#updatedAt = :now");

    if (needsReset || !user.credits) {
      expressionNames["#credits"] = "credits";
      updateParts.push("#credits = :credits");
      expressionValues[":credits"] = usage;

      updateParts.push("creditRenewsAt = :renewsAt");
      expressionValues[":renewsAt"] = renewsAt;

      updateParts.push("lastCreditResetAt = :lastReset");
      expressionValues[":lastReset"] = now.toISOString();
    }

    await docClient.send(
      new UpdateCommand({
        TableName: USERS_TABLE,
        Key: { userId: user.userId },
        UpdateExpression: `SET ${updateParts.join(", ")}`,
        ExpressionAttributeNames: expressionNames,
        ExpressionAttributeValues: expressionValues,
      })
    );
  }

  return {
    user: {
      ...user,
      credits: usage,
      tier,
      creditRenewsAt: renewsAt,
      sharing,
    },
    tier,
  };
};

export const recordUsageEvent = async (
  userId: string,
  eventType: string,
  payload: Record<string, unknown> = {}
) => {
  if (!shouldEnforceCredits()) return;
  const now = new Date();
  await docClient.send(
    new PutCommand({
      TableName: TIMECAPSULE_TABLE,
      Item: {
        timecapsuleid: `usage_${now.getTime()}_${userId}`,
        bubblspaceid: userId,
        eventType,
        payload,
        createdAt: now.toISOString(),
      },
    })
  );
};

const buildSnapshot = (
  tier: TimeCapsuleTier,
  user: User
): CreditSnapshot => {
  const limits = CREDIT_LIMITS[tier];
  const usage = mergeUsage(user.credits);
  return {
    tier,
    limits,
    usage,
    remaining: {
      sessions: Math.max(limits.sessions - usage.sessions, 0),
      flowBuilders: Math.max(limits.flowBuilders - usage.flowBuilders, 0),
      kbDocs: Math.max(limits.kbDocs - usage.kbDocs, 0),
      agentCalls: Math.max(limits.agentCalls - usage.agentCalls, 0),
    },
    renewsAt: user.creditRenewsAt || getNextMonthlyResetISO(),
    sharing: user.sharing,
    enforced: shouldEnforceCredits(),
  };
};

export const getCreditSnapshot = async (
  userId: string
): Promise<CreditSnapshot> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("User not found while fetching credits");
  }
  const { user: ensuredUser, tier } = await ensureCreditEnvelope(user);
  return buildSnapshot(tier, ensuredUser);
};

export const ensureDocumentWithinLimits = async (
  userId: string,
  estimate: DocumentComplexityEstimate
) => {
  if (!shouldEnforceCredits()) return;
  const snapshot = await getCreditSnapshot(userId);
  const {
    limits: { kbPagesPerDoc, kbTokensPerDoc },
  } = snapshot;

  if (estimate.pageEstimate > kbPagesPerDoc) {
    throw new CreditLimitError(
      `Document exceeds per-upload page cap (${estimate.pageEstimate}/${kbPagesPerDoc} pages)`
    );
  }

  if (estimate.tokenEstimate > kbTokensPerDoc) {
    throw new CreditLimitError(
      `Document exceeds per-upload token cap (${estimate.tokenEstimate}/${kbTokensPerDoc} tokens)`
    );
  }
};

export const verifyCreditAvailability = async (
  userId: string,
  type: CreditType,
  amount = 1
): Promise<CreditSnapshot> => {
  const snapshot = await getCreditSnapshot(userId);
  if (!shouldEnforceCredits()) {
    return snapshot;
  }
  const remaining = snapshot.remaining[type];
  if (remaining < amount) {
    throw new CreditLimitError(`Monthly ${type} quota exhausted`, {
      type,
      remaining,
    });
  }
  return snapshot;
};

export const consumeCredit = async (
  userId: string,
  type: CreditType,
  amount = 1,
  metadata: Record<string, unknown> = {}
): Promise<CreditSnapshot> => {
  const snapshot = await verifyCreditAvailability(userId, type, amount);
  if (!shouldEnforceCredits()) {
    return snapshot;
  }

  const now = new Date().toISOString();
  const updateParts = [
    `credits.${type} = credits.${type} + :inc`,
    "#updatedAt = :now",
  ];
  const names: Record<string, string> = {
    "#updatedAt": "updatedAt",
  };
  const values: Record<string, unknown> = {
    ":inc": amount,
    ":now": now,
  };

  if (type === "kbDocs") {
    const pages = Number(metadata.pageEstimate) || 0;
    const tokens = Number(metadata.tokenEstimate) || 0;
    if (pages > 0) {
      updateParts.push("credits.kbPagesUsed = credits.kbPagesUsed + :pageInc");
      values[":pageInc"] = pages;
    }
    if (tokens > 0) {
      updateParts.push("credits.kbTokensUsed = credits.kbTokensUsed + :tokenInc");
      values[":tokenInc"] = tokens;
    }
  }

  await docClient.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression: `SET ${updateParts.join(", ")}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    })
  );

  await recordUsageEvent(userId, `credits.consume.${type}`, {
    amount,
    ...metadata,
  });

  return getCreditSnapshot(userId);
};

