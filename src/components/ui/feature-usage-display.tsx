import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Progress } from "./progress";
import { Alert, AlertDescription } from "./alert";
import {
  AlertTriangle,
  Crown,
  Search,
  Brain,
  Youtube,
  Info,
  TrendingUp,
  Clock,
} from "lucide-react";
import { FeatureType } from "@/lib/feature-access/FeatureAccessManager";

interface FeatureUsageDisplayProps {
  feature: FeatureType;
  usageSummary: {
    available: boolean;
    monthlyLimit: number;
    dailyLimit: number;
    monthlyUsed: number;
    dailyUsed: number;
    remainingMonthly: number;
    remainingDaily: number;
    nextReset: string;
  };
  onUpgrade?: () => void;
  showUpgradePrompt?: boolean;
  className?: string;
}

const featureIcons = {
  deep_research: Brain,
  web_search: Search,
  youtube_api: Youtube,
};

const featureNames = {
  deep_research: "Deep Research",
  web_search: "Web Search",
  youtube_api: "YouTube API",
};

const featureDescriptions = {
  deep_research: "Advanced AI-powered research with multi-agent coordination",
  web_search: "Real-time web search integration for current information",
  youtube_api: "YouTube video analysis and content extraction",
};

export function FeatureUsageDisplay({
  feature,
  usageSummary,
  onUpgrade,
  showUpgradePrompt = true,
  className = "",
}: FeatureUsageDisplayProps) {
  const Icon = featureIcons[feature];
  const featureName = featureNames[feature];
  const description = featureDescriptions[feature];

  const monthlyProgress =
    usageSummary.monthlyLimit > 0
      ? (usageSummary.monthlyUsed / usageSummary.monthlyLimit) * 100
      : 0;

  const dailyProgress =
    usageSummary.dailyLimit > 0
      ? (usageSummary.dailyUsed / usageSummary.dailyLimit) * 100
      : 0;

  const isNearLimit = monthlyProgress > 80 || dailyProgress > 80;
  const isAtLimit = monthlyProgress >= 100 || dailyProgress >= 100;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!usageSummary.available) {
    return (
      <Card className={`${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">{featureName}</CardTitle>
            <Badge variant="secondary" className="ml-auto">
              Premium Feature
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{description}</p>

          {showUpgradePrompt && (
            <Alert>
              <Crown className="h-4 w-4" />
              <AlertDescription>
                Upgrade to RegularPro to access {featureName.toLowerCase()} and
                unlock unlimited research capabilities.
              </AlertDescription>
            </Alert>
          )}

          {onUpgrade && (
            <Button onClick={onUpgrade} className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Upgrade to RegularPro
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{featureName}</CardTitle>
          <Badge
            variant={
              isAtLimit ? "destructive" : isNearLimit ? "secondary" : "default"
            }
            className="ml-auto"
          >
            {isAtLimit ? "Limit Reached" : "Available"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>

        {/* Monthly Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Monthly Usage</span>
            <span className="font-medium">
              {usageSummary.monthlyUsed} / {usageSummary.monthlyLimit}
            </span>
          </div>
          <Progress value={monthlyProgress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{usageSummary.remainingMonthly} remaining</span>
            <span>Resets {formatDate(usageSummary.nextReset)}</span>
          </div>
        </div>

        {/* Daily Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Usage</span>
            <span className="font-medium">
              {usageSummary.dailyUsed} / {usageSummary.dailyLimit}
            </span>
          </div>
          <Progress value={dailyProgress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{usageSummary.remainingDaily} remaining</span>
            <span>Resets tomorrow</span>
          </div>
        </div>

        {/* Warnings */}
        {isNearLimit && !isAtLimit && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You're approaching your {featureName.toLowerCase()} limit.
              Consider upgrading for unlimited access.
            </AlertDescription>
          </Alert>
        )}

        {isAtLimit && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You've reached your {featureName.toLowerCase()} limit. Upgrade to
              continue using this feature.
            </AlertDescription>
          </Alert>
        )}

        {/* Upgrade CTA */}
        {showUpgradePrompt && (isNearLimit || isAtLimit) && onUpgrade && (
          <Button onClick={onUpgrade} variant="outline" className="w-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            Upgrade for More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Compact version for inline display
export function FeatureUsageBadge({
  feature,
  usageSummary,
  onUpgrade,
}: {
  feature: FeatureType;
  usageSummary: {
    available: boolean;
    remainingMonthly: number;
    remainingDaily: number;
  };
  onUpgrade?: () => void;
}) {
  const Icon = featureIcons[feature];
  const featureName = featureNames[feature];

  if (!usageSummary.available) {
    return (
      <Badge variant="secondary" className="cursor-pointer" onClick={onUpgrade}>
        <Crown className="h-3 w-3 mr-1" />
        {featureName} - Upgrade Required
      </Badge>
    );
  }

  const isLow =
    usageSummary.remainingMonthly < 5 || usageSummary.remainingDaily < 2;

  return (
    <Badge
      variant={isLow ? "secondary" : "default"}
      className="cursor-pointer"
      onClick={onUpgrade}
    >
      <Icon className="h-3 w-3 mr-1" />
      {featureName}: {usageSummary.remainingMonthly}M/
      {usageSummary.remainingDaily}D
    </Badge>
  );
}

