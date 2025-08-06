import { ResearchType } from "../hooks/useResearch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Search,
  Users,
  DollarSign,
  GraduationCap,
  Code,
  TrendingUp,
  Brain,
  Globe,
} from "lucide-react";

interface ResearchTypeSelectorProps {
  selectedType: ResearchType;
  onTypeChange: (type: ResearchType) => void;
  disabled?: boolean;
}

const researchTypes = [
  {
    type: "deep-research" as ResearchType,
    label: "Deep Research",
    icon: Brain,
    description: "Comprehensive analysis",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    type: "social" as ResearchType,
    label: "Social",
    icon: Users,
    description: "Social trends & culture",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    type: "finance" as ResearchType,
    label: "Finance",
    icon: DollarSign,
    description: "Financial analysis",
    color: "bg-green-500/10 text-green-600 border-green-200",
  },
  {
    type: "academic" as ResearchType,
    label: "Academic",
    icon: GraduationCap,
    description: "Scholarly research",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  },
  {
    type: "technical" as ResearchType,
    label: "Technical",
    icon: Code,
    description: "Technical analysis",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
  {
    type: "market" as ResearchType,
    label: "Market",
    icon: TrendingUp,
    description: "Market insights",
    color: "bg-red-500/10 text-red-600 border-red-200",
  },
];

export function ResearchTypeSelector({
  selectedType,
  onTypeChange,
  disabled = false,
}: ResearchTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Research Type
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {researchTypes.map((research) => {
          const IconComponent = research.icon;
          const isSelected = selectedType === research.type;

          return (
            <Card
              key={research.type}
              className={`
                relative cursor-pointer transition-all duration-200 hover:shadow-md
                ${
                  isSelected
                    ? "ring-2 ring-primary shadow-md scale-105"
                    : "hover:scale-102"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              onClick={() => !disabled && onTypeChange(research.type)}
            >
              <div className="p-3 text-center space-y-2">
                <div
                  className={`
                  inline-flex items-center justify-center w-10 h-10 rounded-lg
                  ${research.color}
                `}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-sm">{research.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {research.description}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
