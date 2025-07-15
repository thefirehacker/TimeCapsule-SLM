"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              TimeCapsule respects your privacy and provides data control
              tailored to three modes of usage:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                <strong>Local-only:</strong> No data leaves your device
              </li>
              <li>
                <strong>External API usage:</strong> With your own API keys
              </li>
              <li>
                <strong>Cloud-based usage:</strong> Through purchased credits
                (hosted processing)
              </li>
            </ul>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  2.1 Local Users
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>
                    All processing and data are stored locally in your browser
                    or device.
                  </li>
                  <li>
                    We do not access, transmit, or analyze your documents or
                    interactions.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  2.2 BYOA/API Key Users
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>
                    We may temporarily process prompts and responses via your
                    chosen API provider.
                  </li>
                  <li>
                    Your API keys are stored only if explicitly permitted and
                    encrypted at rest.
                  </li>
                  <li>
                    We do not retain document content unless necessary for a
                    specific session or feature.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  2.3 Credit-Based Users
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>
                    We collect basic authentication data (email, name) via OAuth
                    providers.
                  </li>
                  <li>
                    Prompts and results may be stored temporarily for credit
                    accounting, debugging, or improving user experience.
                  </li>
                  <li>
                    All data is automatically deleted from our servers after 30
                    days.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Usage */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Cookie Usage
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                <strong>Essential Cookies:</strong> Used for authentication,
                session management, and core functionality.
              </li>
              <li>
                <strong>Analytics Cookies (Optional):</strong> Used only with
                consent. These help us improve performance and UX. No cross-site
                tracking.
              </li>
            </ul>
          </section>

          {/* How We Use Your Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                To provide requested services (AI generation, document
                interaction)
              </li>
              <li>To personalize your experience and provide support</li>
              <li>
                To comply with legal requirements or respond to lawful requests
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Data Security
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>All transmissions use HTTPS</li>
              <li>Sensitive data (API keys, tokens) are encrypted</li>
              <li>Local-first architecture is prioritized whenever possible</li>
              <li>
                All data is automatically deleted from our servers after 30 days
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Your Rights
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  6.1 For EU Users (GDPR)
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>
                    Right to access, correct, delete, or restrict your data
                  </li>
                  <li>Right to data portability and to object to processing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  6.2 For California Users (CCPA)
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Right to know what data we collect and how we use it</li>
                  <li>
                    Right to delete personal information and opt-out of sale (we
                    don't sell data)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Data Retention
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                <strong>Analytics:</strong> Retained for 26 months (if opted-in)
              </li>
              <li>
                <strong>Session and auth:</strong> Retained while active or
                until deletion
              </li>
              <li>
                <strong>Uploaded documents:</strong> Not stored unless
                explicitly uploaded for collaboration or sharing
              </li>
              <li>
                <strong>All server data:</strong> Automatically deleted after 30
                days
              </li>
            </ul>
          </section>

          {/* Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Updates
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This policy may change as our features evolve. We'll notify you of
              material changes via in-app notification or email.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Contact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For questions about this privacy policy, email us at{" "}
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
