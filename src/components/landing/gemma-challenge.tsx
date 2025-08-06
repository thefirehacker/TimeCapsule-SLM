"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  Trophy,
  Sparkles,
  Zap,
  Award,
  Users,
  Brain,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Card, CardContent } from "@/components/ui/card";

const challengeFeatures = [
  {
    icon: Trophy,
    title: "Competition Ready",
    description:
      "Built with cutting-edge AI technology for the Gemma 3n challenge",
  },
  {
    icon: Brain,
    title: "AI Innovation",
    description: "Leveraging Google's latest Gemma 3n model for research",
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Open source platform accessible to researchers worldwide",
  },
];

export function GemmaChallengeSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <Badge variant="outline" className="mb-6">
            <Trophy className="w-4 h-4 mr-1" />
            Challenge Participation
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Google Gemma 3n Impact Challenge
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Building the future of AI research tools with Google's latest open
            model. Join us in democratizing AI-powered research and learning.
          </p>
        </AnimatedGroup>

        {/* Challenge Features */}
        <AnimatedGroup preset="slide" className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {challengeFeatures.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
