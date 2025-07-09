"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Cookie, Eye, Lock, Database, Globe } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            How TimeCapsule protects and uses your information
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              GDPR Compliant
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Lock className="h-3 w-3 mr-1" />
              Privacy First
            </Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Privacy Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                TimeCapsule is committed to protecting your privacy. This policy explains how we collect, 
                use, and protect your information when you use our AI-powered research platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Data Protection</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your data is encrypted and protected
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Cookie className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Cookie Control</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    You control what cookies we use
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Database className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200">Local Processing</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    AI processing happens locally when possible
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    📊 Analytics Data (Optional - Requires Consent)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    When you consent to analytics cookies, we collect:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>Page views and navigation patterns</li>
                    <li>Feature usage (AI-Frames, DeepResearch, etc.)</li>
                    <li>Device information (type, OS, browser, screen resolution)</li>
                    <li>Session duration and engagement metrics</li>
                    <li>Error tracking for service improvement</li>
                    <li>General location (country/region, not precise location)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    🔐 Authentication Data (When You Sign In)
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>Email address and profile information from OAuth providers</li>
                    <li>Authentication tokens (securely stored)</li>
                    <li>Session information for maintaining login state</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    📄 Content Data (Local Processing)
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>Documents you upload for research (processed locally)</li>
                    <li>Research queries and generated content</li>
                    <li>TimeCapsule exports you create</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    🍪 Technical Data (Essential)
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>Cookies necessary for website functionality</li>
                    <li>Browser and device information for compatibility</li>
                    <li>IP address (anonymized for analytics)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    🎯 Service Provision
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Provide AI-powered research capabilities</li>
                    <li>Process documents and generate insights</li>
                    <li>Maintain user authentication and sessions</li>
                    <li>Enable TimeCapsule sharing and collaboration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    📈 Service Improvement
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Analyze usage patterns to improve features</li>
                    <li>Identify and fix technical issues</li>
                    <li>Optimize performance and user experience</li>
                    <li>Develop new features based on user needs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🔒 What We DON'T Do
                </h4>
                <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>We never sell your personal information</li>
                  <li>We don't use your data for advertising</li>
                  <li>We don't share data with third parties (except as required by law)</li>
                  <li>We don't track you across other websites</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-blue-600" />
                Cookie Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    ✅ Essential Cookies (Always Active)
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Authentication and session management</li>
                    <li>Security and fraud prevention</li>
                    <li>Basic website functionality</li>
                    <li>User preferences and settings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    📊 Analytics Cookies (Optional)
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Google Analytics 4 (IP anonymized)</li>
                    <li>Usage statistics and performance monitoring</li>
                    <li>Feature adoption and user journey analysis</li>
                    <li>Error tracking and diagnostics</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  🎛️ Your Cookie Controls
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  You can manage your cookie preferences at any time through our cookie banner or 
                  by clearing your browser cookies. Changes take effect immediately.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    🇪🇺 GDPR Rights (EU Users)
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Right to access your data</li>
                    <li>Right to rectify inaccurate data</li>
                    <li>Right to erasure ("right to be forgotten")</li>
                    <li>Right to restrict processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    🇺🇸 CCPA Rights (California Users)
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Right to know what data is collected</li>
                    <li>Right to delete personal information</li>
                    <li>Right to opt-out of sale (we don't sell data)</li>
                    <li>Right to non-discrimination</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  📧 Contact Us About Your Rights
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  To exercise your privacy rights or ask questions about this policy, 
                  contact us at: <strong>privacy@timecapsule.dev</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                Data Security & Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    🔐 Security Measures
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>HTTPS encryption for all data transmission</li>
                    <li>Secure authentication through OAuth providers</li>
                    <li>Local processing for sensitive documents when possible</li>
                    <li>Regular security audits and updates</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ⏰ Data Retention
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>Analytics data: 26 months (Google Analytics default)</li>
                    <li>Authentication data: Until account deletion</li>
                    <li>Session data: Until session expires</li>
                    <li>Uploaded documents: Processed locally, not permanently stored</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this privacy policy from time to time. We will notify you of any 
                material changes by posting the new policy on this page and updating the 
                "Last updated" date.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                By continuing to use TimeCapsule after changes are posted, you agree to the 
                updated privacy policy.
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Questions about this privacy policy? Contact us at{" "}
            <a href="mailto:privacy@timecapsule.dev" className="text-blue-600 hover:text-blue-800">
              privacy@timecapsule.dev
            </a>
          </p>
          <div className="mt-4">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
} 