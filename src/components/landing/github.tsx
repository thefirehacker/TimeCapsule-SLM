"use client";

import React from "react";
import Link from "next/link";
import {
  Github,
  Star,
  GitFork,
  MessageCircle,
  Mail,
  Heart,
  Users,
  Code,
  Zap,
  ExternalLink,
  Award,
  Shield,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedGroup } from "@/components/ui/animated-group";

const projectStats = [
  {
    icon: Code,
    value: "Open Source",
    label: "Apache 2.0 Licensed",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Zap,
    value: "AI Powered",
    label: "Next Generation",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Users,
    value: "Community",
    label: "Driven Project",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: Award,
    value: "Research",
    label: "Focused Tools",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
];

const quickActions = [
  {
    name: "View Repository",
    description: "Explore the source code",
    href: "https://github.com/thefirehacker/TimeCapsule-SLM",
    icon: Github,
    variant: "default" as const,
    className: "bg-gray-900 hover:bg-gray-800 text-white",
  },
  {
    name: "Star Project",
    description: "Show your support",
    href: "https://github.com/thefirehacker/TimeCapsule-SLM/stargazers",
    icon: Star,
    variant: "secondary" as const,
    className: "bg-yellow-500 hover:bg-yellow-600 text-black",
  },
  {
    name: "Join Discord",
    description: "Connect with community",
    href: "https://discord.gg/ExQ8fCv9",
    icon: MessageCircle,
    variant: "outline" as const,
    className:
      "border-[#5865f2] text-[#5865f2] hover:bg-[#5865f2] hover:text-white",
  },
];

export function GitHubSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="p-4 bg-gray-900 dark:bg-white rounded-2xl shadow-lg">
              <Github className="w-10 h-10 text-white dark:text-gray-900" />
            </div>
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Open Source
              </h2>
              <div className="flex items-center gap-2 text-lg text-muted-foreground">
                <span>Built with</span>
                <Heart className="w-5 h-5 text-red-500" />
                <span>for the community</span>
              </div>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our mission to democratize AI research tools. Collaborate with
            researchers, developers, and innovators worldwide to build the
            future of knowledge discovery.
          </p>
        </AnimatedGroup>

        {/* Project Stats */}
        <AnimatedGroup preset="slide" className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {projectStats.map((stat, index) => (
              <Card
                key={index}
                className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedGroup>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Community & Support */}
          <AnimatedGroup preset="blur-slide">
            <Card className="h-full border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge
                    variant="outline"
                    className="mb-4 border-blue-200 text-blue-700"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Community
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4">
                    Join Our Community
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Connect with researchers, developers, and AI enthusiasts.
                    Get help, share ideas, and collaborate on cutting-edge
                    projects.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <MessageCircle className="w-5 h-5 text-[#5865f2]" />
                    <div>
                      <div className="font-medium">Discord Community</div>
                      <div className="text-sm text-muted-foreground">
                        Real-time discussions
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-sm text-muted-foreground">
                        Direct assistance
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Github className="w-5 h-5 text-gray-700" />
                    <div>
                      <div className="font-medium">GitHub Issues</div>
                      <div className="text-sm text-muted-foreground">
                        Bug reports & features
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedGroup>

          {/* Right Column - Contribution & Development */}
          <AnimatedGroup preset="blur-slide">
            <Card className="h-full border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge
                    variant="outline"
                    className="mb-4 border-purple-200 text-purple-700"
                  >
                    <Rocket className="w-4 h-4 mr-1" />
                    Development
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4">
                    Start Contributing
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're a beginner or expert, there are many ways to
                    contribute to TimeCapsule-SLM and help build the future of
                    AI research.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Apache 2.0 License</div>
                      <div className="text-sm text-muted-foreground">
                        Apache 2.0 Licensed • Community driven • Optional paid
                        add-ons
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Code className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">TypeScript & React</div>
                      <div className="text-sm text-muted-foreground">
                        Modern tech stack
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Beginner Friendly</div>
                      <div className="text-sm text-muted-foreground">
                        Detailed documentation
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedGroup>
        </div>

        {/* Quick Actions */}
        <AnimatedGroup preset="scale">
          <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border-0 text-white shadow-2xl">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-8">
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 mb-6"
                >
                  <Rocket className="w-4 h-4 mr-1" />
                  Get Started
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Get Involved?
                </h3>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Join hundreds of contributors building the next generation of
                  AI research tools. Every contribution, big or small, makes a
                  difference.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    asChild
                    size="lg"
                    variant={action.variant}
                    className={`flex-1 ${action.className} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-8 `}
                  >
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <action.icon className="w-5 h-5 mr-2" />
                      <div className="text-left">
                        <div className="font-semibold">{action.name}</div>
                        <div className="text-xs opacity-75">
                          {action.description}
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-60" />
                    </a>
                  </Button>
                ))}
              </div>

              {/* Additional Links */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                  <a
                    href="mailto:support@bubblspace.com"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </a>
                  <a
                    href="https://github.com/thefirehacker/TimeCapsule-SLM/fork"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <GitFork className="w-4 h-4" />
                    Fork Project
                  </a>
                </div>
                <p className="text-white/50 text-xs mt-4">
                  Free to get started • Community driven • Premium features
                  available
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedGroup>
      </div>
    </section>
  );
}
