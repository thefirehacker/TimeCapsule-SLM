"use client";

import Link from "next/link";

const LAST_UPDATED = "November 13, 2025";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Use
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms of Use govern your use of TimeCapsule AI-Frames, a
              knowledge-to-action platform that lets you connect everything in
              one flow. By using TimeCapsule, you agree to these Terms.
            </p>
          </section>

          {/* Service Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Service Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              TimeCapsule is an AI-powered research and learning platform that
              offers flexible modes of usage based on user preferences and
              capabilities:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                <strong>Local Mode:</strong> Allows users to operate entirely
                within their browser using local storage. No data is transmitted
                to our servers.
              </li>
              <li>
                <strong>Bring Your Own API (BYOA) Mode:</strong> Users can
                integrate their own API keys from supported providers such as
                OpenAI, Firecrawl, Anthropic, OpenRouter, etc., to use
                TimeCapsule with external AI services.
              </li>
              <li>
                <strong>Subscription Mode:</strong> Users can purchase credits
                or subscriptions from TimeCapsule, allowing them to access AI
                services and collaboration features without managing external
                API keys.
              </li>
            </ul>
          </section>

          {/* User Types and Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. User Types and Responsibilities
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  2.1 Local Users
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>
                    You are responsible for maintaining your browser environment
                    and data backups.
                  </li>
                  <li>
                    No data is shared with our servers unless explicitly
                    requested via features that require network access.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  2.2 API Key Users (BYOA Mode)
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>
                    You are responsible for ensuring compliance with the terms
                    of the third-party API providers.
                  </li>
                  <li>
                    We do not store your API keys unless explicitly authorized,
                    and we do not access or analyze the responses unless
                    debugging or logging is enabled by you.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  2.3 Subscription Users
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>
                    You may use our services through purchased credits or
                    subscriptions. We retain the minimum data required to
                    provide access to AI-Frames workspaces and shared content.
                  </li>
                  <li>
                    Misuse of credits, reverse engineering, or attempting to
                    access unauthorized systems will result in account
                    suspension.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  2.4 Shared AI-Frames & Knowledge Bases
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>
                    Collaboration features allow you to share frames, chapters,
                    and Knowledge Base entries. You control who has access and
                    can revoke sharing at any time.
                  </li>
                  <li>
                    We store sharing metadata (e.g., workspace membership,
                    invitations) only to deliver these services.
                  </li>
                  <li>
                    You are responsible for ensuring collaborators respect the
                    intellectual property and privacy of shared content.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Acceptable Use
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Use the service only for lawful and ethical purposes.</li>
              <li>
                Refrain from using AI-generated content for harm,
                disinformation, or illegal activity.
              </li>
              <li>
                Protect your credentials and respect the privacy of others.
              </li>
              <li>Comply with all applicable laws and regulations.</li>
              <li>
                Not attempt to reverse engineer or compromise the platform.
              </li>
              <li>
                Not use the service for automated attacks or excessive load.
              </li>
            </ul>
          </section>

          {/* AI Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. AI Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              TimeCapsule AI-Frames is a knowledge-to-action platform that lets
              you connect everything in one flow. Content generated by AI models
              may contain errors or inaccuracies. TimeCapsule does not guarantee
              the reliability or factual correctness of AI outputs. Users
              should verify all critical information independently.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By using TimeCapsule's AI features, you acknowledge that
              AI-generated content is provided "as-is" and should be used with
              appropriate caution and verification.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              All platform content, interface design, and brand assets are owned
              by AIEDX Private Limited.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              User-generated content remains your intellectual property. You
              grant TimeCapsule a license to use it only for providing services.
            </p>
          </section>

          {/* Service Availability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Service Availability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We strive for high uptime, but the platform is provided "as-is."
              We make no warranties regarding uninterrupted access, and features
              may change over time.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We reserve the right to suspend or terminate your access for
              violating these Terms, misuse of AI models, or any activity that
              may compromise the service or its users.
            </p>
          </section>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Modifications
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              These Terms may be updated periodically. Your continued use of the
              service indicates your acceptance of the latest version.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Contact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For questions about these terms, email us at{" "}
              <a
                href="mailto:contact@bubblspace.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                contact@bubblspace.com
              </a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
