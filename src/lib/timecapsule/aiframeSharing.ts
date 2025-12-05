// cspell:ignore AIFRAMES
import {
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { createHash } from "crypto";
import { docClient } from "../aws/dynamodb";
import { shouldEnforceCredits, recordUsageEvent } from "./credits";
import {
  CREDIT_LIMITS,
  USER_TYPE_TO_TIER,
  TimeCapsuleTier,
} from "./creditConfig";
import { sendTimeCapsuleInviteEmail } from "../email/sendTimeCapsuleInvite";

export const AIFRAMES_TABLE = process.env.AIFRAMES_TABLE || "aiframes";
const USERS_TABLE = "Users";

export type ShareMode = "collaborative" | "read-only";

export interface AIFrameShareRecord {
  frameSetId: string;
  frameVersion: string;
  userId: string;
  isShared: boolean;
  shareToken: string | null;
  allowedEmails: string[];
  pendingInviteEmails: string[];
  pendingInviteTokens?: Record<string, string>;
  updatedAt: string;
  title?: string | null;
  createdAt?: string;
  lastSyncedAt?: string | null;
  syncSummary?: {
    frames: number;
    chapters: number;
    lastSaved?: string | null;
  } | null;
  snapshotPayload?: TimeCapsuleSyncPayload | null;
  payloadChecksum?: string | null;
  shareMode: ShareMode;
  parentFrameSetId?: string | null;
  parentFrameVersion?: string | null;
  parentShareToken?: string | null;
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
    frameSetId:
      patch.frameSetId ??
      currentSharing.frameSetId ??
      null,
    frameVersion:
      patch.frameVersion ??
      currentSharing.frameVersion ??
      null,
    timeCapsuleName:
      patch.timeCapsuleName ??
      currentSharing.timeCapsuleName ??
      null,
    shareMode:
      (patch as any).shareMode ??
      currentSharing.shareMode ??
      "collaborative",
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

const hydrateFrameRecord = (item: any): AIFrameShareRecord | null => {
  if (!item) return null;
  const frameVersion = item.frameVersion ?? item.version;
  if (!frameVersion) return null;
  return {
    frameSetId: item.frameSetId,
    frameVersion,
    userId: item.userId,
    isShared: Boolean(item.isShared),
    shareToken: item.shareToken ?? null,
    allowedEmails: Array.isArray(item.allowedEmails) ? item.allowedEmails : [],
    pendingInviteEmails: Array.isArray(item.pendingInviteEmails)
      ? item.pendingInviteEmails
      : [],
    pendingInviteTokens: item.pendingInviteTokens ?? {},
    updatedAt: item.updatedAt,
    title: item.title ?? null,
    createdAt: item.createdAt,
    lastSyncedAt: item.lastSyncedAt ?? null,
    syncSummary: item.syncSummary ?? null,
    snapshotPayload: item.snapshotPayload ?? null,
    payloadChecksum: item.payloadChecksum ?? null,
    shareMode: (item.shareMode as ShareMode) ?? "collaborative",
    parentFrameSetId: item.parentFrameSetId ?? null,
    parentFrameVersion: item.parentFrameVersion ?? null,
    parentShareToken: item.parentShareToken ?? null,
  };
};

const getFrameRecord = async (
  frameSetId: string,
  frameVersion: string
): Promise<AIFrameShareRecord | null> => {
  const response = await docClient.send(
    new GetCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, frameVersion },
    })
  );
  return hydrateFrameRecord(response.Item);
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

interface EnsureFrameRecordParams {
  userId: string;
  frameSetId: string;
  frameVersion: string;
  title?: string | null;
}

export const ensureFrameRecord = async ({
  userId,
  frameSetId,
  frameVersion,
  title,
}: EnsureFrameRecordParams): Promise<AIFrameShareRecord> => {
  const existing = await getFrameRecord(frameSetId, frameVersion);
  if (existing) {
    return existing;
  }
  const now = new Date().toISOString();
  await docClient.send(
    new PutCommand({
      TableName: AIFRAMES_TABLE,
      Item: {
        frameSetId,
        frameVersion,
        userId,
        title: title ?? null,
        isShared: false,
        shareToken: null,
        allowedEmails: [],
        pendingInviteEmails: [],
        pendingInviteTokens: {},
        createdAt: now,
        updatedAt: now,
        shareMode: "collaborative",
        snapshotPayload: null,
        payloadChecksum: null,
        parentFrameSetId: null,
        parentFrameVersion: null,
        parentShareToken: null,
      },
    })
  );
  return (
    (await getFrameRecord(frameSetId, frameVersion)) as AIFrameShareRecord
  );
};

interface SyncPayloadSummary {
  frames?: number;
  chapters?: number;
  lastSaved?: string | null;
}

export interface TimeCapsuleSyncPayload {
  frames?: unknown;
  chapters?: unknown;
  graphState?: unknown;
  metadata?: { lastSaved?: string };
}

export const upsertTimeCapsuleRecord = async ({
  userId,
  frameSetId,
  frameVersion,
  title,
  payload,
}: {
  userId: string;
  frameSetId: string;
  frameVersion: string;
  title?: string | null;
  payload?: TimeCapsuleSyncPayload;
}): Promise<AIFrameShareRecord> => {
  const existing = await ensureFrameRecord({
    userId,
    frameSetId,
    frameVersion,
    title,
  });

  const now = new Date().toISOString();
  const sanitizedPayload = payload
    ? {
        frames: Array.isArray((payload as any).frames)
          ? (payload as any).frames
          : [],
        chapters: Array.isArray((payload as any).chapters)
          ? (payload as any).chapters
          : [],
        graphState: (payload as any).graphState ?? {
          nodes: [],
          edges: [],
          selectedNodeId: null,
        },
        metadata: {
          ...(payload as any).metadata,
          lastSaved: (payload as any)?.metadata?.lastSaved ?? now,
        },
      }
    : null;
  const payloadChecksum = sanitizedPayload
    ? createHash("sha256")
        .update(JSON.stringify(sanitizedPayload))
        .digest("hex")
    : null;
  const summary: SyncPayloadSummary = {
    frames: Array.isArray((payload as any)?.frames)
      ? (payload as any).frames.length
      : undefined,
    chapters: Array.isArray((payload as any)?.chapters)
      ? (payload as any).chapters.length
      : undefined,
    lastSaved: (payload as any)?.metadata?.lastSaved ?? null,
  };

  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, frameVersion },
      UpdateExpression: `
        SET userId = :userId,
            title = :title,
            updatedAt = :now,
            lastSyncedAt = :now,
            syncSummary = :summary,
            snapshotPayload = :payload,
            payloadChecksum = :checksum
      `,
      ExpressionAttributeValues: {
        ":userId": userId,
        ":title": title ?? existing.title ?? null,
        ":now": now,
        ":summary": summary,
        ":payload": sanitizedPayload,
        ":checksum": payloadChecksum,
      },
    })
  );

  return (await getFrameRecord(frameSetId, frameVersion)) as AIFrameShareRecord;
};

export const toggleShareLink = async ({
  userId,
  frameSetId,
  frameVersion,
  enable,
  timeCapsuleName,
}: {
  userId: string;
  frameSetId: string;
  frameVersion: string;
  enable: boolean;
  timeCapsuleName?: string;
}): Promise<AIFrameShareRecord | null> => {
  if (!shouldEnforceCredits()) {
    return getFrameRecord(frameSetId, frameVersion);
  }

  const now = new Date().toISOString();
  const shareToken = enable ? generateShareToken() : null;

  await ensureFrameRecord({
    userId,
    frameSetId,
    frameVersion,
    title: timeCapsuleName,
  });

  const expressionParts = [
    "userId = :userId",
    "isShared = :isShared",
    "shareToken = :shareToken",
    "allowedEmails = if_not_exists(allowedEmails, :emptyList)",
    "pendingInviteEmails = if_not_exists(pendingInviteEmails, :emptyList)",
    "updatedAt = :now",
  ];
  const expressionValues: Record<string, unknown> = {
    ":userId": userId,
    ":isShared": enable,
    ":shareToken": shareToken,
    ":emptyList": [],
    ":now": now,
  };
  if (timeCapsuleName) {
    expressionParts.push("title = :title");
    expressionValues[":title"] = timeCapsuleName;
  }

  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, frameVersion },
      UpdateExpression: `SET ${expressionParts.join(", ")}`,
      ExpressionAttributeValues: expressionValues,
    })
  );

  const nextRecord = await getFrameRecord(frameSetId, frameVersion);
  const ownerRecord = await getUserRecord(userId);
  const ownerTier = resolveTierFromUserType(ownerRecord?.userType);
  await applyUserSharingPatch(userId, {
    isLinkEnabled: enable,
    shareToken,
    maxInvitees: CREDIT_LIMITS[ownerTier].maxInvitees,
    frameSetId,
    frameVersion,
    timeCapsuleName: timeCapsuleName ?? null,
    shareMode: nextRecord?.shareMode ?? "collaborative",
  });

  await recordUsageEvent(userId, enable ? "sharing.enabled" : "sharing.disabled", {
    frameSetId,
    version: frameVersion,
  });

  return nextRecord;
};

export const getShareRecordByToken = async (
  shareToken: string
): Promise<AIFrameShareRecord | null> => {
  if (!shareToken) return null;
  const response = await docClient.send(
    new ScanCommand({
      TableName: AIFRAMES_TABLE,
      FilterExpression: "shareToken = :token",
      ExpressionAttributeValues: {
        ":token": shareToken,
      },
      Limit: 1,
    })
  );
  if (!response.Items?.length) {
    return null;
  }
  return hydrateFrameRecord(response.Items[0]);
};

export const getShareRecordByKey = async (
  frameSetId: string,
  frameVersion: string
): Promise<AIFrameShareRecord | null> => {
  return getFrameRecord(frameSetId, frameVersion);
};

export const ensureInviteeAccessByToken = async ({
  shareToken,
  inviteeEmail,
}: {
  shareToken: string;
  inviteeEmail?: string | null;
}): Promise<AIFrameShareRecord | null> => {
  if (!shareToken) return null;
  const normalizedEmail = inviteeEmail?.trim().toLowerCase();
  const record = await getShareRecordByToken(shareToken);
  if (!record || !normalizedEmail) {
    return record;
  }

  const allowed = new Set(record.allowedEmails || []);
  const pending = new Set(record.pendingInviteEmails || []);
  let changed = false;
  if (!allowed.has(normalizedEmail)) {
    allowed.add(normalizedEmail);
    changed = true;
  }
  if (pending.has(normalizedEmail)) {
    pending.delete(normalizedEmail);
    changed = true;
  }
  if (!changed) {
    return record;
  }

  const now = new Date().toISOString();
  const nextAllowed = Array.from(allowed);
  const nextPending = Array.from(pending);

  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId: record.frameSetId, frameVersion: record.frameVersion },
      UpdateExpression: `
        SET allowedEmails = :allowed,
            pendingInviteEmails = :pending,
            updatedAt = :now
      `,
      ExpressionAttributeValues: {
        ":allowed": nextAllowed,
        ":pending": nextPending,
        ":now": now,
      },
    })
  );

  await applyUserSharingPatch(record.userId, {
    allowedEmails: nextAllowed,
    pendingInviteTokens: Object.fromEntries(
      nextPending.map((email) => [email, "pending"])
    ),
    frameSetId: record.frameSetId,
    frameVersion: record.frameVersion,
    timeCapsuleName: record.title ?? null,
  });

  return {
    ...record,
    allowedEmails: nextAllowed,
    pendingInviteEmails: nextPending,
    updatedAt: now,
  };
};

export const updateShareMode = async ({
  userId,
  frameSetId,
  frameVersion,
  shareMode,
}: {
  userId: string;
  frameSetId: string;
  frameVersion: string;
  shareMode: ShareMode;
}): Promise<AIFrameShareRecord | null> => {
  const normalizedMode =
    shareMode === "read-only" ? "read-only" : ("collaborative" as ShareMode);
  await ensureFrameRecord({
    userId,
    frameSetId,
    frameVersion,
  });
  const now = new Date().toISOString();
  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, frameVersion },
      UpdateExpression: `
        SET shareMode = :mode,
            updatedAt = :now
      `,
      ExpressionAttributeValues: {
        ":mode": normalizedMode,
        ":now": now,
      },
    })
  );

  await applyUserSharingPatch(userId, {
    shareMode: normalizedMode,
    frameSetId,
    frameVersion,
  });

  return getFrameRecord(frameSetId, frameVersion);
};

export const forkSharedTimeCapsule = async ({
  sourceRecord,
  targetUserId,
  targetFrameSetId,
  targetFrameVersion,
  targetTitle,
}: {
  sourceRecord: AIFrameShareRecord;
  targetUserId: string;
  targetFrameSetId: string;
  targetFrameVersion: string;
  targetTitle?: string | null;
}): Promise<AIFrameShareRecord> => {
  if (!sourceRecord.snapshotPayload) {
    throw new Error("Owner has not synced this TimeCapsule to the cloud yet.");
  }

  const forked = await upsertTimeCapsuleRecord({
    userId: targetUserId,
    frameSetId: targetFrameSetId,
    frameVersion: targetFrameVersion,
    title: targetTitle ?? sourceRecord.title ?? null,
    payload: sourceRecord.snapshotPayload,
  });

  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId: targetFrameSetId, frameVersion: targetFrameVersion },
      UpdateExpression: `
        SET parentFrameSetId = :parentId,
            parentFrameVersion = :parentVersion,
            parentShareToken = :parentToken,
            updatedAt = :now
      `,
      ExpressionAttributeValues: {
        ":parentId": sourceRecord.frameSetId,
        ":parentVersion": sourceRecord.frameVersion,
        ":parentToken": sourceRecord.shareToken ?? null,
        ":now": new Date().toISOString(),
      },
    })
  );

  await recordUsageEvent(targetUserId, "sharing.fork", {
    parentFrameSetId: sourceRecord.frameSetId,
    parentFrameVersion: sourceRecord.frameVersion,
    forkFrameSetId: targetFrameSetId,
  });

  return forked;
};

export const addInvites = async ({
  userId,
  frameSetId,
  frameVersion,
  emails,
  timeCapsuleName,
}: {
  userId: string;
  frameSetId: string;
  frameVersion: string;
  emails: string[];
  timeCapsuleName?: string;
}) => {
  if (!shouldEnforceCredits()) return getFrameRecord(frameSetId, frameVersion);
  const trimmed = Array.from(
    new Set(
      emails
        .map((email) => email?.trim().toLowerCase())
        .filter((email): email is string => !!email)
    )
  );
  if (!trimmed.length) return getFrameRecord(frameSetId, frameVersion);

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

  const existing = (await getFrameRecord(frameSetId, frameVersion)) || {
    frameSetId,
    frameVersion,
    userId,
    isShared: false,
    shareToken: null,
    allowedEmails: [],
    pendingInviteEmails: [],
    updatedAt: new Date().toISOString(),
    title: timeCapsuleName || null,
    shareMode: "collaborative" as ShareMode,
  };

  const allowed = new Set(existing.allowedEmails || []);
  const pending = new Set(existing.pendingInviteEmails || []);
  const accepted: string[] = [];
  const awaitingSignup: string[] = [];

  for (const email of trimmed) {
    const user = await queryUserByEmail(email);
    if (user) {
      const wasAllowed = allowed.has(email);
      allowed.add(email);
      pending.delete(email);
      if (!wasAllowed) {
        accepted.push(email);
      }
    } else {
      const wasPending = pending.has(email);
      if (!allowed.has(email)) {
        pending.add(email);
      }
      if (!wasPending && !allowed.has(email)) {
        awaitingSignup.push(email);
      }
    }
  }

  const totalInvites = allowed.size + pending.size;
  if (totalInvites > maxInvitees) {
    throw new Error(
      `Invite limit exceeded (${totalInvites}/${maxInvitees}). Remove recipients to continue.`
    );
  }

  const inviteExpressionParts = [
    "allowedEmails = :allowed",
    "pendingInviteEmails = :pending",
    "updatedAt = :now",
  ];
  const inviteExpressionValues: Record<string, unknown> = {
    ":allowed": Array.from(allowed),
    ":pending": Array.from(pending),
    ":now": new Date().toISOString(),
  };
  if (timeCapsuleName) {
    inviteExpressionParts.push("title = :title");
    inviteExpressionValues[":title"] = timeCapsuleName;
  }

  await docClient.send(
    new UpdateCommand({
      TableName: AIFRAMES_TABLE,
      Key: { frameSetId, frameVersion },
      UpdateExpression: `SET ${inviteExpressionParts.join(", ")}`,
      ExpressionAttributeValues: inviteExpressionValues,
    })
  );

  const pendingEntries = Array.from<string>(pending).map<[string, string]>(
    (email) => [email, "pending"]
  );
  const updatedRecord = await getFrameRecord(frameSetId, frameVersion);
  await applyUserSharingPatch(userId, {
    allowedEmails: Array.from(allowed),
    pendingInviteTokens: Object.fromEntries(pendingEntries),
    frameSetId: updatedRecord?.frameSetId ?? frameSetId,
    frameVersion: updatedRecord?.frameVersion ?? frameVersion,
    timeCapsuleName: updatedRecord?.title ?? timeCapsuleName ?? existing.title ?? null,
    isLinkEnabled: updatedRecord?.isShared ?? existing.isShared,
    shareToken: updatedRecord?.shareToken ?? existing.shareToken ?? null,
    maxInvitees: CREDIT_LIMITS[ownerTier].maxInvitees,
    shareMode: updatedRecord?.shareMode ?? existing.shareMode ?? "collaborative",
  });

  await recordUsageEvent(userId, "sharing.invites.updated", {
    frameSetId,
    version: frameVersion,
    accepted,
    awaitingSignup,
  });

  try {
    const shareUrl =
      updatedRecord?.isShared && updatedRecord?.shareToken
        ? `${(process.env.NEXT_PUBLIC_SITE_URL || "https://timecapsule.bubblspace.com").replace(/\/$/, "")}/timecapsule/${updatedRecord.shareToken}`
        : undefined;
    const capsuleLabel =
      timeCapsuleName ||
      updatedRecord?.title ||
      `TimeCapsule ${frameSetId}`;
    const recipients = Array.from(
      new Set([...accepted, ...awaitingSignup])
    );
    if (recipients.length) {
      await Promise.allSettled(
        recipients.map((recipient) =>
          sendTimeCapsuleInviteEmail({
            recipient,
            inviterName: ownerRecord?.name,
            inviterEmail: ownerRecord?.email,
            capsuleName: capsuleLabel,
            shareUrl,
          })
        )
      );
    }
  } catch (emailError) {
    console.error("Failed to send TimeCapsule invite emails:", emailError);
  }

  return updatedRecord;
};

export const removeInvites = async ({
  userId,
  frameSetId,
  frameVersion,
  emails,
}: {
  userId: string;
  frameSetId: string;
  frameVersion: string;
  emails: string[];
}) => {
  if (!shouldEnforceCredits()) return getFrameRecord(frameSetId, frameVersion);
  const trimmed = emails.map((email) => email.trim().toLowerCase());
  const existing = await getFrameRecord(frameSetId, frameVersion);
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
      Key: { frameSetId, frameVersion },
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
  const ownerRecordForRemoval = await getUserRecord(userId);
  const ownerTierForRemoval = resolveTierFromUserType(ownerRecordForRemoval?.userType);
  await applyUserSharingPatch(userId, {
    allowedEmails: allowed,
    pendingInviteTokens: Object.fromEntries(pendingEntries),
    frameSetId: existing.frameSetId,
    frameVersion: existing.frameVersion,
    timeCapsuleName: existing.title ?? null,
    isLinkEnabled: existing.isShared,
    shareToken: existing.shareToken ?? null,
    maxInvitees: CREDIT_LIMITS[ownerTierForRemoval].maxInvitees,
  });

  await recordUsageEvent(userId, "sharing.invites.removed", {
    frameSetId,
    version: frameVersion,
    removed: trimmed,
  });

  return getFrameRecord(frameSetId, frameVersion);
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
          Key: { frameSetId: item.frameSetId, frameVersion: item.frameVersion ?? item.version },
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
        frameVersion: item.frameVersion ?? item.version,
        email: normalized,
        inviteeUserId: newUserId,
      });
    })
  );
};

