"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Sparkles, Zap, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { signIn } from "next-auth/react";

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
      <main className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 min-h-screen">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-6xl mx-auto">
              {/* Announcement Badge */}
              <AnimatedGroup
                variants={transitionVariants}
                className="mb-6 md:mb-8"
              >
                <Link
                  href="/deep-research"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs sm:text-sm"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    New
                  </Badge>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Introducing AI-Powered Research Platform
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </AnimatedGroup>

              {/* Main Heading */}
              <AnimatedGroup
                variants={transitionVariants}
                className="mb-6 md:mb-8"
              >
                <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  <span className="block sm:inline">Time</span>
                  <span className="block sm:inline">Capsule</span>
                  <span className="block sm:inline">-</span>
                  <span className="block sm:inline">SLM</span>
                </h1>

                <div className="mt-4 md:mt-6 mb-4 md:mb-6">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 dark:text-gray-200 leading-tight">
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold tracking-tight">
                        Solving Open Learning
                      </span>
                      <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-30 rounded-full"></div>
                      <div className="absolute -top-0.5 sm:-top-1 -left-0.5 sm:-left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
                      <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse delay-500"></div>
                    </span>
                  </div>
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                    with a Complete{" "}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold">
                        AI-Powered Platform
                      </span>
                      <div className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50"></div>
                    </span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2 sm:mt-3">
                    for{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      Research
                    </span>
                    ,{" "}
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">
                      Creativity
                    </span>
                    , and{" "}
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      Collaboration
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
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
                className="mb-12 md:mb-16"
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  >
                    <Link href="/deep-research" className="px-6 sm:px-8 py-3">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Start Research
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  >
                    <Link href="/ai-frames" className="px-6 sm:px-8 py-3">
                      <span>Try AI-Frames</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    onClick={() => signIn()}
                    size="lg"
                    variant="ghost"
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  >
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Sign In
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
                className="mb-12 md:mb-16"
              >
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8 shadow-2xl mx-4">
                  <div className="text-center mb-6 md:mb-8">
                    <Badge variant="outline" className="mb-3 md:mb-4">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Major Features
                    </Badge>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      Everything You Need for AI Research
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {majorFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedGroup>

              {/* Scroll indicator */}
              <div className="mt-16 md:mt-20 flex justify-center">
                <div className="animate-bounce">
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
