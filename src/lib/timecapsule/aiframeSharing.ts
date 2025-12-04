// cspell:ignore AIFRAMES
import {
  GetCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "../aws/dynamodb";
import { shouldEnforceCredits, recordUsageEvent } from "./credits";
import { CREDIT_LIMITS, USER_TYPE_TO_TIER, TimeCapsuleTier } from "./creditConfig";

const AIFRAMES_TABLE = process.env.AIFRAMES_TABLE || "aiframes";
const USERS_TABLE = "Users";

export interface AIFrameShareRecord {
  frameSetId: string;
  version: string;
  userId: string;
  isShared: boolean;
  shareToken: string | null;
  allowedEmails: string[];
  pendingInviteEmails: string[];
  pendingInviteTokens?: Record<string, string>;
  updatedAt: string;
}

const generateShareToken = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const resolveTierFromUserType = (userType: unknown): TimeCapsuleTier => {
  if (
    typeof userType === "string" &&
    Object.prototype.hasOwnProperty.call(USER_TYPE_TO_TIER, userType)
  ) {
    return USER_TYPE_TO_TIER[userType as keyof typeof USER_TYPE_TO_TIER];
  }
  return "free";
};

const getUserRecord = async (userId: string) => {
  const response = await docClient.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { userId },
    })
  );
  return response.Item || null;
};

const applyUserSharingPatch = async (
  userId: string,
  patch: Record<string, unknown>
) => {
  const existing = await getUserRecord(userId);
  const currentSharing = existing?.sharing || {};
  const tierForLimits = resolveTierFromUserType(existing?.userType);
  const resolvedMaxInvitees =
    patch.maxInvitees ?? currentSharing.maxInvitees ?? CREDIT_LIMITS[tierForLimits].maxInvitees;
  const updated = {
    ...currentSharing,
    ...patch,
    allowedEmails: patch.allowedEmails ?? currentSharing.allowedEmails ?? [],
    pendingInviteTokens:
      patch.pendingInviteTokens ??
      currentSharing.pendingInviteTokens ??
      {},
    updatedAt: new Date().toISOString(),
    maxInvitees: resolvedMaxInvitees,
  };

  await docClient.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression: "SET sharing = :sharing",
      ExpressionAttributeValues: {
        ":sharing": updated,
      },
    })
  );
};

const getFrameRecord = async (
  frameSetId: string,
  version: string
): Promise<AIFrameShareRecord | null> => {
  const response = await docClient.send(
    new GetCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, version },
    })
  );
  return (response.Item as AIFrameShareRecord) || null;
};

const queryUserByEmail = async (email: string) => {
  const response = await docClient.send(
    new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email.toLowerCase(),
      },
      Limit: 1,
    })
  );
  return response.Items?.[0] || null;
};

export const toggleShareLink = async ({
  userId,
  frameSetId,
  version,
  enable,
}: {
  userId: string;
  frameSetId: string;
  version: string;
  enable: boolean;
}): Promise<AIFrameShareRecord | null> => {
  if (!shouldEnforceCredits()) {
    return getFrameRecord(frameSetId, version);
  }

  const now = new Date().toISOString();
  const shareToken = enable ? generateShareToken() : null;

  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, version },
      UpdateExpression: `
        SET userId = :userId,
            isShared = :isShared,
            shareToken = :shareToken,
            allowedEmails = if_not_exists(allowedEmails, :emptyList),
            pendingInviteEmails = if_not_exists(pendingInviteEmails, :emptyList),
            updatedAt = :now
      `,
      ExpressionAttributeValues: {
        ":userId": userId,
        ":isShared": enable,
        ":shareToken": shareToken,
        ":emptyList": [],
        ":now": now,
      },
    })
  );

  const ownerRecord = await getUserRecord(userId);
  const ownerTier = resolveTierFromUserType(ownerRecord?.userType);
  await applyUserSharingPatch(userId, {
    isLinkEnabled: enable,
    shareToken,
    maxInvitees: CREDIT_LIMITS[ownerTier].maxInvitees,
  });

  await recordUsageEvent(userId, enable ? "sharing.enabled" : "sharing.disabled", {
    frameSetId,
    version,
  });

  return getFrameRecord(frameSetId, version);
};

export const addInvites = async ({
  userId,
  frameSetId,
  version,
  emails,
}: {
  userId: string;
  frameSetId: string;
  version: string;
  emails: string[];
}) => {
  if (!shouldEnforceCredits()) return getFrameRecord(frameSetId, version);
  const trimmed = Array.from(
    new Set(
      emails
        .map((email) => email?.trim().toLowerCase())
        .filter((email): email is string => !!email)
    )
  );
  if (!trimmed.length) return getFrameRecord(frameSetId, version);

  const owner = await docClient.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { userId },
    })
  );
  const ownerRecord = owner.Item;
  const ownerTier = resolveTierFromUserType(ownerRecord?.userType);
  const maxInvitees = CREDIT_LIMITS[ownerTier].maxInvitees;
  if (maxInvitees === 0) {
    throw new Error("Sharing invites require a Pro subscription");
  }

  const existing = (await getFrameRecord(frameSetId, version)) || {
    frameSetId,
    version,
    userId,
    isShared: false,
    shareToken: null,
    allowedEmails: [],
    pendingInviteEmails: [],
    updatedAt: new Date().toISOString(),
  };

  const allowed = new Set(existing.allowedEmails || []);
  const pending = new Set(existing.pendingInviteEmails || []);
  const accepted: string[] = [];
  const awaitingSignup: string[] = [];

  for (const email of trimmed) {
    const user = await queryUserByEmail(email);
    if (user) {
      allowed.add(email);
      pending.delete(email);
      accepted.push(email);
    } else {
      pending.add(email);
      awaitingSignup.push(email);
    }
  }

  const totalInvites = allowed.size + pending.size;
  if (totalInvites > maxInvitees) {
    throw new Error(
      `Invite limit exceeded (${totalInvites}/${maxInvitees}). Remove recipients to continue.`
    );
  }

  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, version },
      UpdateExpression: `
        SET allowedEmails = :allowed,
            pendingInviteEmails = :pending,
            updatedAt = :now
      `,
      ExpressionAttributeValues: {
        ":allowed": Array.from(allowed),
        ":pending": Array.from(pending),
        ":now": new Date().toISOString(),
      },
    })
  );

  const pendingEntries = Array.from<string>(pending).map<[string, string]>(
    (email) => [email, "pending"]
  );
  await applyUserSharingPatch(userId, {
    allowedEmails: Array.from(allowed),
    pendingInviteTokens: Object.fromEntries(pendingEntries),
  });

  await recordUsageEvent(userId, "sharing.invites.updated", {
    frameSetId,
    version,
    accepted,
    awaitingSignup,
  });

  return getFrameRecord(frameSetId, version);
};

export const removeInvites = async ({
  userId,
  frameSetId,
  version,
  emails,
}: {
  userId: string;
  frameSetId: string;
  version: string;
  emails: string[];
}) => {
  if (!shouldEnforceCredits()) return getFrameRecord(frameSetId, version);
  const trimmed = emails.map((email) => email.trim().toLowerCase());
  const existing = await getFrameRecord(frameSetId, version);
  if (!existing) return null;

  const allowed = (existing.allowedEmails || []).filter(
    (email) => !trimmed.includes(email)
  );
  const pending = (existing.pendingInviteEmails || []).filter(
    (email) => !trimmed.includes(email)
  );

  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, version },
      UpdateExpression: `
        SET allowedEmails = :allowed,
            pendingInviteEmails = :pending,
            updatedAt = :now
      `,
      ExpressionAttributeValues: {
        ":allowed": allowed,
        ":pending": pending,
        ":now": new Date().toISOString(),
      },
    })
  );

  const pendingEntries = pending.map<[string, string]>((email) => [email, "pending"]);
  await applyUserSharingPatch(userId, {
    allowedEmails: allowed,
    pendingInviteTokens: Object.fromEntries(pendingEntries),
  });

  await recordUsageEvent(userId, "sharing.invites.removed", {
    frameSetId,
    version,
    removed: trimmed,
  });

  return getFrameRecord(frameSetId, version);
};

export const resolvePendingInvitesForEmail = async (
  email: string,
  newUserId: string
) => {
  if (!shouldEnforceCredits()) return;
  const normalized = email.toLowerCase();
  const scan = await docClient.send(
    new ScanCommand({
      TableName: AIFRAMES_TABLE,
      FilterExpression: "contains(pendingInviteEmails, :email)",
      ExpressionAttributeValues: {
        ":email": normalized,
      },
    })
  );

  if (!scan.Items?.length) return;

  await Promise.all(
    scan.Items.map(async (item) => {
      const pending = (item.pendingInviteEmails || []).filter(
        (value: string) => value !== normalized
      );
      const allowed = Array.from(
        new Set([...(item.allowedEmails || []), normalized])
      );

      await docClient.send(
        new UpdateCommand({
          TableName: AIFRAMES_TABLE,
          Key: { frameSetId: item.frameSetId, version: item.version },
          UpdateExpression: `
            SET allowedEmails = :allowed,
                pendingInviteEmails = :pending,
                updatedAt = :now
          `,
          ExpressionAttributeValues: {
            ":allowed": allowed,
            ":pending": pending,
            ":now": new Date().toISOString(),
          },
        })
      );

      await applyUserSharingPatch(item.userId, {
        allowedEmails: allowed,
        pendingInviteTokens: Object.fromEntries(
          pending.map((email: string) => [email, "pending"])
        ),
      });

      await recordUsageEvent(item.userId, "sharing.invite.accepted", {
        frameSetId: item.frameSetId,
        version: item.version,
        email: normalized,
        inviteeUserId: newUserId,
      });
    })
  );
};

