"use client";

import React from "react";
import Link from "next/link";
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
  Users,
  Globe,
  BookOpen,
  Lightbulb,
  Layers,
  GraduationCap,
  GitBranch,
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
    id: "ai-frames",
    icon: Layers,
    title: "AI-Frames Platform",
    subtitle: "Annotate • Learn • Research • Manage",
    description:
      "Comprehensive AI platform combining annotation, learning, deep research, and workflow management in one unified experience.",
    features: [
      "🏷️ Annotation Engine - Intelligent content markup",
      "📚 Learning Platform - Interactive AI-driven learning",
      "🔬 Deep Research Tool - Multi-agent collaboration",
      "⚙️ Workflow Manager - AI-powered automation",
      "🤖 SWE Agent Bridge - Drive AI-Frames locally via Cursor/Codex/Claude Code",
    ],
    href: "/ai-frames",
    buttonText: "Explore AI-Frames",
    buttonIcon: Layers,
    status: "available",
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
  },
  {
    icon: Share2,
    title: "TimeCapsule Sharing",
    subtitle: "Export & Load Research Sessions",
    description:
      "Export your entire research structure and output as a .timecapsule.json file. Load a TimeCapsule to instantly restore topics, research output, and session metadata.",
    features: [
      "Share research with your team",
      "Reproducible research sessions",
      "Easy knowledge transfer",
    ],
  },
];

const educationSolutions = [
  {
    icon: Users,
    title: "For Teachers",
    description: "Dynamic lesson planning and content annotation tools",
    features: [
      "Knowledge base setup and organization",
      "Content annotation & organization",
      "Dynamic lesson planning with AI",
    ],
  },
  {
    icon: Brain,
    title: "For Students",
    description: "Self-guided learning and offline collaboration",
    features: [
      "Smart AI-generated insights",
      "Self-guided learning paths",
      "Non-linear learning with AI-Frames",
    ],
  },
  {
    icon: Globe,
    title: "Low-Resource Ready",
    description: "Optimized for minimal hardware and offline use",
    features: [
      "Minimal hardware requirements",
      "Offline-first approach",
      "Cost-effective solution",
    ],
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <AnimatedGroup preset="fade" className="text-center mb-16">
          <Badge variant="outline" className="mb-6">
            <Zap className="w-4 h-4 mr-1" />
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Complete AI Research Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      Available
                    </Badge>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {feature.subtitle}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link
                    href={feature.href}
                    className="flex items-center justify-center gap-2"
                  >
                    <feature.buttonIcon className="w-4 h-4" />
                    {feature.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </AnimatedGroup>

        {/* Core Capabilities */}
        <AnimatedGroup preset="blur-slide" className="space-y-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Core Capabilities
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Privacy-first AI research with seamless collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreCapabilities.map((capability, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <capability.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {capability.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {capability.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {capability.description}
                  </p>

                  <div className="space-y-2">
                    {capability.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
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

        {/* Education Solutions Section */}
        <AnimatedGroup preset="scale" className="space-y-8 mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Users className="w-4 h-4 mr-1" />
              Education Solutions
            </Badge>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Revolutionizing Education
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful tools for teachers and students in any environment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {educationSolutions.map((solution, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 mb-6">
                    <solution.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {solution.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {solution.description}
                  </p>

                  <div className="space-y-3">
                    {solution.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-left"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedGroup>

        {/* Call to Action */}
        <AnimatedGroup preset="scale" className="text-center">
          <div className="bg-blue-600 rounded-xl p-8 md:p-12 text-white">
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
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <Link href="/ai-frames">
                  <Layers className="w-5 h-5 mr-2" />
                  Try AI-Frames Platform
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
