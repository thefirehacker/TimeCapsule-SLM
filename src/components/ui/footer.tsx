"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Twitter,
  Mail,
  Heart,
  ExternalLink,
  Microscope,
  Palette,
  FileText,
  Shield,
  Users,
  Globe,
} from "lucide-react";
import { Separator } from "./separator";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "DeepResearch", href: "/deep-research" },
  { name: "AI-Frames", href: "/ai-frames" },
  { name: "Contact", href: "/contact" },
];

const productFeatures = [
  {
    name: "DeepResearch",
    href: "/deep-research",
    icon: Microscope,
    description: "AI-powered research platform",
  },
  {
    name: "AI-Frames",
    href: "/ai-frames",
    icon: Palette,
    description: "Interactive learning frames",
  },
];

const legalLinks = [
  { name: "Terms of Use", href: "/terms-and-conditions", icon: FileText },
  { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/thefirehacker/TimeCapsule-SLM",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://x.com/thefirehacker",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:contact@bubblspace.com",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/Media/TimeCapsule_04.png"
                  alt="TimeCapsule Logo"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                TimeCapsule
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              AI-powered research and learning platform that transforms how you
              discover, create, and share knowledge.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Features */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Features
            </h3>
            <ul className="space-y-3">
              {productFeatures.map((feature) => (
                <li key={feature.name}>
                  <Link
                    href={feature.href}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm group"
                  >
                    <feature.icon className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="font-medium">{feature.name}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Legal & Support
            </h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </h4>
              <Link
                href="mailto:contact@bubblspace.com"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>contact@bubblspace.com</span>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>© 2025 TimeCapsule. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by</span>
            <Link
              href="https://x.com/thefirehacker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
            >
              <span>FireHacker</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">AIEDX Private Limited</span>
            <div className="flex items-center space-x-4">
              <Link
                href="/terms-and-conditions"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
