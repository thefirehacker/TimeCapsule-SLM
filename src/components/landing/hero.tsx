"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Navbar } from "@/components/ui/navbar";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.25,
        duration: 0.8,
      },
    },
  },
};

const majorFeatures = [
  {
    icon: "🧠",
    title: "In-Browser RAG",
    description: "Privacy-first, no server required",
  },
  {
    icon: "🔗",
    title: "TimeCapsule Sharing",
    description: "Seamless collaboration with .timecapsule.json files",
  },
  {
    icon: "📚",
    title: "Knowledge Base Integration",
    description: "Upload PDFs, documents, and images",
  },
  {
    icon: "🤖",
    title: "Local LLM Support",
    description: "Ollama, LM Studio, OpenAI, and more",
  },
];

export function HeroSection() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 min-h-screen">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-5xl mx-auto">
              {/* Announcement Badge */}
              <AnimatedGroup variants={transitionVariants} className="mb-8">
                <Link
                  href="/deep-research"
                  className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    New
                  </Badge>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Introducing AI-Powered Research Platform
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </AnimatedGroup>

              {/* Main Heading */}
              <AnimatedGroup variants={transitionVariants} className="mb-8">
                <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-black leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  <span className="block sm:inline">Time</span>
                  <span className="block sm:inline">Capsule</span>
                  <span className="block sm:inline">-</span>
                  <span className="block sm:inline">SLM</span>
                </h1>

                <div className="mt-6 mb-6">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 leading-tight">
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold tracking-tight">
                        Solving Open Learning
                      </span>
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-30 rounded-full"></div>
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse delay-500"></div>
                    </span>
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                    with a Complete{" "}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold">
                        AI-Powered Platform
                      </span>
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50"></div>
                    </span>
                  </div>
                  <div className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-3">
                    for{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">Research</span>,{" "}
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">Creativity</span>, and{" "}
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Collaboration</span>
                  </div>
                </div>

                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Advanced research tools with DeepResearch, in-browser RAG, and
                  collaborative TimeCapsule sharing for seamless knowledge
                  discovery and creative collaboration.
                </p>
              </AnimatedGroup>

              {/* CTA Buttons */}
              <AnimatedGroup
                variants={{
                  ...transitionVariants,
                  item: {
                    ...transitionVariants.item,
                    visible: {
                      ...transitionVariants.item.visible,
                      transition: {
                        ...transitionVariants.item.visible.transition,
                        delay: 0.2,
                      },
                    },
                  },
                }}
                className="mb-16"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/deep-research" className="px-8 py-3">
                      <Zap className="w-5 h-5 mr-2" />
                      Start Research
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/ai-frames" className="px-8 py-3">
                      <span>Try AI-Frames</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </AnimatedGroup>

              {/* Major Features Grid */}
              <AnimatedGroup
                variants={{
                  ...transitionVariants,
                  item: {
                    ...transitionVariants.item,
                    visible: {
                      ...transitionVariants.item.visible,
                      transition: {
                        ...transitionVariants.item.visible.transition,
                        delay: 0.4,
                      },
                    },
                  },
                }}
                className="mb-16"
              >
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <Badge variant="outline" className="mb-4">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Major Features
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Everything You Need for AI Research
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {majorFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedGroup>

              {/* Hero Preview Image */}
              <AnimatedGroup
                variants={{
                  ...transitionVariants,
                  item: {
                    ...transitionVariants.item,
                    visible: {
                      ...transitionVariants.item.visible,
                      transition: {
                        ...transitionVariants.item.visible.transition,
                        delay: 0.6,
                      },
                    },
                  },
                }}
              >
                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />

                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl overflow-hidden">
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>

                    <div className="relative aspect-[16/10] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 rounded-2xl overflow-hidden mt-6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <Image
                            src="/Media/TimeCapsule_04.png"
                            alt="TimeCapsule Preview"
                            fill
                            className="object-contain drop-shadow-2xl animate-pulse"
                            priority
                          />
                        </div>
                      </div>

                      {/* Floating UI Elements */}
                      <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700 dark:text-gray-300">
                            DeepResearch Active
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          🧠 Generating insights...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedGroup>

              {/* Scroll indicator */}
              <div className="mt-20 flex justify-center">
                <div className="animate-bounce">
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
