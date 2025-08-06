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
  ExternalLink,
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
  },
  {
    icon: Users,
    value: "Community",
    label: "Driven Project",
  },
  {
    icon: Shield,
    value: "Privacy",
    label: "First Platform",
  },
  {
    icon: Rocket,
    value: "Research",
    label: "Focused Tools",
  },
];

const quickActions = [
  {
    name: "View Repository",
    description: "Explore the source code",
    href: "https://github.com/thefirehacker/TimeCapsule-SLM",
    icon: Github,
  },
  {
    name: "Star Project",
    description: "Show your support",
    href: "https://github.com/thefirehacker/TimeCapsule-SLM/stargazers",
    icon: Star,
  },
  {
    name: "Join Discord",
    description: "Connect with community",
    href: "https://discord.gg/ExQ8fCv9",
    icon: MessageCircle,
  },
];

export function GitHubSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="p-4 bg-gray-900 dark:bg-white rounded-xl shadow-md">
              <Github className="w-10 h-10 text-white dark:text-gray-900" />
            </div>
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Open Source
              </h2>
              <div className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400">
                <span>Built with</span>
                <Heart className="w-5 h-5 text-red-500" />
                <span>for the community</span>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedGroup>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Community & Support */}
          <AnimatedGroup preset="blur-slide">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge variant="outline" className="mb-4">
                    <Users className="w-4 h-4 mr-1" />
                    Community
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Join Our Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Connect with researchers, developers, and AI enthusiasts.
                    Get help, share ideas, and collaborate on cutting-edge
                    projects.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Discord Community
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Real-time discussions
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Email Support
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Direct assistance
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        GitHub Issues
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
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
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge variant="outline" className="mb-4">
                    <Rocket className="w-4 h-4 mr-1" />
                    Development
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Start Contributing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Whether you're a beginner or expert, there are many ways to
                    contribute to TimeCapsule-SLM and help build the future of
                    AI research.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Apache 2.0 License
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Open source and community driven
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <Code className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        TypeScript & React
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Modern tech stack
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Beginner Friendly
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
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
          <Card className="bg-gray-900 dark:bg-gray-800 text-white">
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
                    variant="secondary"
                    className="bg-white text-gray-900 hover:bg-gray-100 border-white"
                  >
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <action.icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">{action.name}</div>
                      </div>
                      <ExternalLink className="w-3 h-3 opacity-60" />
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
                  Free to get started • Community driven • Open source
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedGroup>
      </div>
    </section>
  );
}
