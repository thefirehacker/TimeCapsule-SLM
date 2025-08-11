import { docClient } from "../aws/dynamodb";
import { UpdateCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getUserById } from "../auth/auth";

// Feature definitions with limits
export const FEATURE_LIMITS = {
  deep_research: {
    Free: { monthly: 3, daily: 1 },
    RegularPro: { monthly: 50, daily: 5 },
    Premium: { monthly: 200, daily: 20 },
  },
  web_search: {
    Free: { monthly: 0, daily: 0 }, // Not available for free users
    RegularPro: { monthly: 100, daily: 10 },
    Premium: { monthly: 500, daily: 50 },
  },
  youtube_api: {
    Free: { monthly: 0, daily: 0 }, // Not available for free users
    RegularPro: { monthly: 50, daily: 5 },
    Premium: { monthly: 200, daily: 20 },
  },
} as const;

export type FeatureType = keyof typeof FEATURE_LIMITS;
export type UserType = keyof typeof FEATURE_LIMITS.deep_research;

// Feature usage tracking interface
export interface FeatureUsage {
  userId: string;
  feature: FeatureType;
  usageCount: number;
  monthlyLimit: number;
  dailyLimit: number;
  monthlyUsed: number;
  dailyUsed: number;
  resetDate: string; // ISO date string for monthly reset
  lastUsed: string;
  createdAt: string;
  updatedAt: string;
}

// Access check result
export interface AccessCheckResult {
  allowed: boolean;
  reason?: string;
  remainingMonthly?: number;
  remainingDaily?: number;
  nextReset?: string;
  upgradeRequired?: boolean;
}

export class FeatureAccessManager {
  private static instance: FeatureAccessManager;
  private cache = new Map<string, FeatureUsage>();

  static getInstance(): FeatureAccessManager {
    if (!FeatureAccessManager.instance) {
      FeatureAccessManager.instance = new FeatureAccessManager();
    }
    return FeatureAccessManager.instance;
  }

  /**
   * Check if user can access a specific feature
   */
  async checkFeatureAccess(
    userId: string,
    feature: FeatureType
  ): Promise<AccessCheckResult> {
    try {
      // Get user details
      const user = await getUserById(userId);
      if (!user) {
        return { allowed: false, reason: "User not found" };
      }

      // Check if user is active and verified
      if (user.status !== "active") {
        return { allowed: false, reason: "Account is suspended" };
      }

      // Get user type and determine limits
      const userType = user.userType as UserType;
      const limits = FEATURE_LIMITS[feature][userType];

      if (!limits) {
        return { allowed: false, reason: "Invalid user type" };
      }

      // Check if feature requires payment
      if (limits.monthly === 0 && limits.daily === 0) {
        return {
          allowed: false,
          reason: "This feature requires a paid subscription",
          upgradeRequired: true,
        };
      }

      // Get current usage
      const usage = await this.getFeatureUsage(userId, feature);
      if (!usage) {
        // Initialize usage tracking
        await this.initializeFeatureUsage(userId, feature, userType);
        return {
          allowed: true,
          remainingMonthly: limits.monthly - 1,
          remainingDaily: limits.daily - 1,
        };
      }

      // Check if monthly reset is needed
      const now = new Date();
      const resetDate = new Date(usage.resetDate);
      if (
        now.getMonth() !== resetDate.getMonth() ||
        now.getFullYear() !== resetDate.getFullYear()
      ) {
        // Reset monthly usage
        await this.resetMonthlyUsage(userId, feature);
        usage.monthlyUsed = 0;
        usage.dailyUsed = 0;
      }

      // Check daily reset
      const lastUsed = new Date(usage.lastUsed);
      if (
        now.getDate() !== lastUsed.getDate() ||
        now.getMonth() !== lastUsed.getMonth()
      ) {
        // Reset daily usage
        await this.resetDailyUsage(userId, feature);
        usage.dailyUsed = 0;
      }

      // Check limits
      if (usage.monthlyUsed >= limits.monthly) {
        return {
          allowed: false,
          reason: "Monthly limit reached",
          remainingMonthly: 0,
          nextReset: this.getNextMonthlyReset(),
        };
      }

      if (usage.dailyUsed >= limits.daily) {
        return {
          allowed: false,
          reason: "Daily limit reached",
          remainingDaily: 0,
          nextReset: this.getNextDailyReset(),
        };
      }

      return {
        allowed: true,
        remainingMonthly: limits.monthly - usage.monthlyUsed,
        remainingDaily: limits.daily - usage.dailyUsed,
        nextReset: this.getNextMonthlyReset(),
      };
    } catch (error) {
      console.error("Error checking feature access:", error);
      return { allowed: false, reason: "System error" };
    }
  }

  /**
   * Record feature usage
   */
  async recordFeatureUsage(
    userId: string,
    feature: FeatureType
  ): Promise<boolean> {
    try {
      const user = await getUserById(userId);
      if (!user) return false;

      const userType = user.userType as UserType;
      const limits = FEATURE_LIMITS[feature][userType];

      // Check access before recording
      const accessCheck = await this.checkFeatureAccess(userId, feature);
      if (!accessCheck.allowed) {
        return false;
      }

      // Update usage
      const now = new Date().toISOString();
      const usage = await this.getFeatureUsage(userId, feature);

      if (usage) {
        // Update existing usage
        const updateParams = {
          TableName: "FeatureUsage",
          Key: { userId, feature },
          UpdateExpression: `
            SET monthlyUsed = monthlyUsed + :inc,
                dailyUsed = dailyUsed + :inc,
                lastUsed = :now,
                updatedAt = :now
          `,
          ExpressionAttributeValues: {
            ":inc": 1,
            ":now": now,
          },
        };

        await docClient.send(new UpdateCommand(updateParams));
      } else {
        // Initialize new usage
        await this.initializeFeatureUsage(userId, feature, userType);
      }

      // Clear cache
      this.cache.delete(`${userId}_${feature}`);

      return true;
    } catch (error) {
      console.error("Error recording feature usage:", error);
      return false;
    }
  }

  /**
   * Get feature usage for a user
   */
  private async getFeatureUsage(
    userId: string,
    feature: FeatureType
  ): Promise<FeatureUsage | null> {
    const cacheKey = `${userId}_${feature}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const params = {
        TableName: "FeatureUsage",
        Key: { userId, feature },
      };

      const { Item } = await docClient.send(new GetCommand(params));

      if (Item) {
        const usage = Item as FeatureUsage;
        this.cache.set(cacheKey, usage);
        return usage;
      }

      return null;
    } catch (error) {
      console.error("Error getting feature usage:", error);
      return null;
    }
  }

  /**
   * Initialize feature usage tracking
   */
  private async initializeFeatureUsage(
    userId: string,
    feature: FeatureType,
    userType: UserType
  ): Promise<void> {
    const limits = FEATURE_LIMITS[feature][userType];
    const now = new Date().toISOString();

    const usage: FeatureUsage = {
      userId,
      feature,
      usageCount: 0,
      monthlyLimit: limits.monthly,
      dailyLimit: limits.daily,
      monthlyUsed: 0,
      dailyUsed: 0,
      resetDate: this.getNextMonthlyReset(),
      lastUsed: now,
      createdAt: now,
      updatedAt: now,
    };

    const params = {
      TableName: "FeatureUsage",
      Item: usage,
    };

    await docClient.send(new UpdateCommand(params));
    this.cache.set(`${userId}_${feature}`, usage);
  }

  /**
   * Reset monthly usage
   */
  private async resetMonthlyUsage(
    userId: string,
    feature: FeatureType
  ): Promise<void> {
    const params = {
      TableName: "FeatureUsage",
      Key: { userId, feature },
      UpdateExpression: `
        SET monthlyUsed = :zero,
            resetDate = :resetDate,
            updatedAt = :now
      `,
      ExpressionAttributeValues: {
        ":zero": 0,
        ":resetDate": this.getNextMonthlyReset(),
        ":now": new Date().toISOString(),
      },
    };

    await docClient.send(new UpdateCommand(params));
    this.cache.delete(`${userId}_${feature}`);
  }

  /**
   * Reset daily usage
   */
  private async resetDailyUsage(
    userId: string,
    feature: FeatureType
  ): Promise<void> {
    const params = {
      TableName: "FeatureUsage",
      Key: { userId, feature },
      UpdateExpression: `
        SET dailyUsed = :zero,
            updatedAt = :now
      `,
      ExpressionAttributeValues: {
        ":zero": 0,
        ":now": new Date().toISOString(),
      },
    };

    await docClient.send(new UpdateCommand(params));
    this.cache.delete(`${userId}_${feature}`);
  }

  /**
   * Get next monthly reset date
   */
  private getNextMonthlyReset(): string {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toISOString();
  }

  /**
   * Get next daily reset date
   */
  private getNextDailyReset(): string {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    return tomorrow.toISOString();
  }

  /**
   * Get user's feature usage summary
   */
  async getUserFeatureSummary(
    userId: string
  ): Promise<Record<FeatureType, any>> {
    const user = await getUserById(userId);
    if (!user) return {} as Record<FeatureType, any>;

    const userType = user.userType as UserType;
    const summary: Record<FeatureType, any> = {} as Record<FeatureType, any>;

    for (const feature of Object.keys(FEATURE_LIMITS) as FeatureType[]) {
      const limits = FEATURE_LIMITS[feature][userType];
      const usage = await this.getFeatureUsage(userId, feature);

      summary[feature] = {
        available: limits.monthly > 0 || limits.daily > 0,
        monthlyLimit: limits.monthly,
        dailyLimit: limits.daily,
        monthlyUsed: usage?.monthlyUsed || 0,
        dailyUsed: usage?.dailyUsed || 0,
        remainingMonthly: Math.max(
          0,
          limits.monthly - (usage?.monthlyUsed || 0)
        ),
        remainingDaily: Math.max(0, limits.daily - (usage?.dailyUsed || 0)),
        nextReset: usage?.resetDate || this.getNextMonthlyReset(),
      };
    }

    return summary;
  }

  /**
   * Check if user needs to upgrade for a feature
   */
  async checkUpgradeRequired(
    userId: string,
    feature: FeatureType
  ): Promise<boolean> {
    const user = await getUserById(userId);
    if (!user) return false;

    const userType = user.userType as UserType;
    const limits = FEATURE_LIMITS[feature][userType];

    return limits.monthly === 0 && limits.daily === 0;
  }
}

// Export singleton instance
export const featureAccessManager = FeatureAccessManager.getInstance();

