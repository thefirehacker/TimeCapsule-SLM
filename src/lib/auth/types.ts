import type { CreditUsageCounters } from "../timecapsule/creditConfig";

export interface User {
  userId: string;
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
  userType: "RegularPro" | "Free" | "OrgUser";
  company: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiry: number;
  payment_verified: boolean;
  immediate_access_until: number;
  subscriptionId: string;
  createdBy?: string;
  provider?: "google" | "github" | "email";
  loginCount?: number;
  sessionHistory?: Array<{
    timestamp: string;
    provider: "google" | "github" | "email";
    userAgent?: string;
    ip?: string;
  }>;
  lastLoginAt?: string | null;
  tier?: "free" | "pro";
  credits?: CreditUsageCounters;
  creditRenewsAt?: string;
  lastCreditResetAt?: string;
  sharing?: {
    isLinkEnabled?: boolean;
    shareToken?: string | null;
    allowedEmails?: string[];
    pendingInviteTokens?: Record<string, string>;
    maxInvitees?: number;
    updatedAt?: string;
    frameSetId?: string | null;
    frameVersion?: string | null;
    timeCapsuleName?: string | null;
  };
}

