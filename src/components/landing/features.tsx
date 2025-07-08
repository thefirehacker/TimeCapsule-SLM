"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Microscope,
  Palette,
  Search,
  Brain,
  Share2,
  Rocket,
  FileText,
  Database,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedGroup } from "@/components/ui/animated-group";

const features = [
  {
    id: "deepresearch",
    icon: Microscope,
    title: "DeepResearch TimeCapsule",
    subtitle: "Generate Novel Ideas • Discover Hidden Insights",
    description:
      "Advanced AI-powered research platform that uncovers novel insights, generates innovative ideas, and enables collaborative knowledge discovery. Create comprehensive TimeCapsules that capture breakthrough research findings and facilitate team collaboration.",
    features: [
      "Generate novel research ideas with AI analysis",
      "Discover hidden patterns and insights",
      "Enable collaborative knowledge discovery",
      "Create comprehensive research TimeCapsules",
      "Share findings with research teams",
    ],
    href: "/deep-research",
    buttonText: "Start Deep Research",
    buttonIcon: Microscope,
    gradient: "from-pink-500 to-orange-500",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600",
    badgeColor:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300",
    status: "available",
  },
  {
    id: "playground",
    icon: Palette,
    title: "Playground",
    subtitle: "Build AI Content • Create Visual Stories",
    description:
      "Advanced creative coding environment powered by AI to build interactive content, visual narratives, and dynamic presentations. Transform research insights from TimeCapsules into engaging visual experiences with real-time AI assistance.",
    features: [
      "Build AI-powered interactive content",
      "Create visual stories from research data",
      "Real-time AI coding assistance",
      "Transform TimeCapsules into visuals",
      "Collaborate on creative projects",
    ],
    href: "/playground",
    buttonText: "Launch Playground",
    buttonIcon: Palette,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600",
    badgeColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    status: "available",
  },
  {
    id: "vision",
    icon: Search,
    title: "Project Vision & Roadmap",
    subtitle: "Building the Future of AI Research",
    description:
      "Discover our comprehensive vision for the future of AI-powered research and creative collaboration. See our current priorities, upcoming features, and long-term roadmap for TimeCapsule-SLM.",
    features: [
      "Complete development roadmap and milestones",
      "Current priority queue and active features",
      "Upcoming showcase projects and demos",
      "Agent philosophy and design principles",
    ],
    href: "/vision",
    buttonText: "View Vision",
    buttonIcon: Search,
    gradient: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600",
    badgeColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
    status: "available",
  },
  {
    id: "canvas",
    icon: Palette,
    title: "Canvas Creative Environment",
    subtitle: "Visual Storytelling • AI-Assisted Coding",
    description:
      "Creative coding environment with p5.js integration for building interactive visualizations and dynamic presentations. AI-assisted coding helps transform ideas into visual experiences.",
    features: [
      "Visual storytelling capabilities using p5.js",
      "AI-assisted coding guidance",
      "Interactive visualization tools",
      "Real-time creative collaboration",
    ],
    href: "#",
    buttonText: "Launching Soon",
    buttonIcon: Rocket,
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600",
    badgeColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    status: "coming-soon",
  },
];

const coreCapabilities = [
  {
    icon: Brain,
    title: "In-Browser RAG",
    subtitle: "Retrieval-Augmented Generation, privacy-first",
    description:
      "Perform semantic search and context retrieval directly in your browser using a local vector store. No server required—your data stays private.",
    features: [
      "Upload and search your own documents",
      "AI-powered research with your knowledge base",
      "Works offline after initial model load",
    ],
    iconColor: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    icon: Share2,
    title: "TimeCapsule Sharing",
    subtitle: "Export & Load Research Sessions",
    description:
      "Export your entire research structure and output as a .timecapsule.json file. Load a TimeCapsule to instantly restore topics, research output, and session metadata—enabling seamless sharing and collaboration.",
    features: [
      "Share research with your team",
      "Reproducible research sessions",
      "Easy knowledge transfer",
    ],
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Platform Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Everything You Need for AI Research
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools for research, creativity, and collaboration
            powered by cutting-edge AI technology
          </p>
        </AnimatedGroup>

        {/* Main Features Grid */}
        <AnimatedGroup
          preset="slide"
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                feature.status === "coming-soon"
                  ? "opacity-75 border-dashed"
                  : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl ${feature.bgColor} relative overflow-hidden`}
                  >
                    <feature.icon
                      className={`w-7 h-7 ${feature.iconColor} relative z-10`}
                    />
                    {feature.status === "available" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className={feature.badgeColor}>
                        {feature.status === "coming-soon"
                          ? "Coming Soon"
                          : "Available"}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base font-medium">
                      {feature.subtitle}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild={feature.status === "available"}
                  disabled={feature.status === "coming-soon"}
                  className={`w-full ${
                    feature.status === "available"
                      ? `bg-gradient-to-r ${feature.gradient} hover:shadow-lg hover:shadow-primary/25`
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {feature.status === "available" ? (
                    <Link
                      href={feature.href}
                      className="flex items-center justify-center gap-2"
                    >
                      <feature.buttonIcon className="w-4 h-4" />
                      {feature.buttonText}
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <feature.buttonIcon className="w-4 h-4" />
                      {feature.buttonText}
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </AnimatedGroup>

        {/* Core Capabilities */}
        <AnimatedGroup preset="blur-slide" className="space-y-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Core Capabilities</h3>
            <p className="text-lg text-muted-foreground">
              Privacy-first AI research with seamless collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreCapabilities.map((capability, index) => (
              <Card
                key={index}
                className="relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${capability.bgColor}`}>
                      <capability.icon
                        className={`w-6 h-6 ${capability.iconColor}`}
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">
                        {capability.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-medium">
                        {capability.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {capability.description}
                  </p>

                  <div className="space-y-2">
                    {capability.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Badge variant="outline" className="text-xs">
                      {capability.title === "TimeCapsule Sharing" ? (
                        <>
                          <FileText className="w-3 h-3 mr-1" />
                          .timecapsule.json
                        </>
                      ) : (
                        <>
                          <Database className="w-3 h-3 mr-1" />
                          Local Vector Store
                        </>
                      )}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedGroup>

        {/* Call to Action */}
        <AnimatedGroup preset="scale" className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Research?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join researchers and creators worldwide who are using
              TimeCapsule-SLM to generate novel insights and build incredible
              AI-powered content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/deep-research">
                  <Microscope className="w-5 h-5 mr-2" />
                  Start Research Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="">
                <Link href="/playground">
                  <Palette className="w-5 h-5 mr-2" />
                  Try Playground
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
