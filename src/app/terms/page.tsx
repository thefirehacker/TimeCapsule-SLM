"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Shield, AlertTriangle, Scale, Users } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Terms of Service
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Terms and conditions for using TimeCapsule
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Acceptance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                By accessing and using TimeCapsule, you accept and agree to be bound by these Terms of Service 
                and our Privacy Policy. If you do not agree to these terms, please do not use our service.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Important:</strong> These terms constitute a legally binding agreement between you and TimeCapsule.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                TimeCapsule is an AI-powered research & learning platform that provides:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>AI-assisted research and document analysis</li>
                <li>Vector-based document search and retrieval</li>
                <li>Interactive learning through AI-Frames</li>
                <li>Knowledge base creation and sharing</li>
                <li>Integration with various AI providers (Ollama, OpenAI, etc.)</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ✅ Acceptable Use
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>Use the service for lawful purposes only</li>
                    <li>Respect intellectual property rights</li>
                    <li>Provide accurate information when required</li>
                    <li>Maintain the security of your account</li>
                    <li>Report any security vulnerabilities responsibly</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ❌ Prohibited Activities
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>Attempting to gain unauthorized access to systems</li>
                    <li>Uploading malicious content or malware</li>
                    <li>Violating any applicable laws or regulations</li>
                    <li>Interfering with the service's operation</li>
                    <li>Using the service to harm others</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                    AI Content Disclaimer
                  </h4>
                </div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  AI-generated content may contain errors, biases, or inaccuracies. You are responsible for 
                  reviewing, verifying, and validating all AI-generated content before use.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    🏢 Our Rights
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    TimeCapsule and its original content, features, and functionality are owned by AIEDX Private Limited and are protected by:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>Copyright and trademark laws</li>
                    <li>International intellectual property treaties</li>
                    <li>Other applicable laws and regulations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    👤 Your Content
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                    <li>You retain ownership of content you upload</li>
                    <li>You grant us a license to process your content to provide the service</li>
                    <li>You are responsible for ensuring you have rights to uploaded content</li>
                    <li>You must not upload copyrighted material without permission</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Privacy and Data Handling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Your privacy is important to us. Please review our{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </Link>{" "}
                for detailed information about how we collect, use, and protect your data.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    🔒 Data Protection
                  </h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• End-to-end encryption</li>
                    <li>• Local processing when possible</li>
                    <li>• GDPR and CCPA compliance</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    🍪 Cookie Control
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Optional analytics cookies</li>
                    <li>• Granular consent controls</li>
                    <li>• Easy opt-out options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    ⚠️ AI Accuracy Disclaimer
                  </h4>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    AI-generated content may contain errors, biases, or inaccuracies. TimeCapsule does not 
                    guarantee the accuracy, completeness, or reliability of AI-generated content. Users must 
                    verify and validate all AI output before relying on it.
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                    🚫 Service Availability
                  </h4>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    We strive to maintain high availability but cannot guarantee uninterrupted service. 
                    The service is provided "as is" without warranties of any kind.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    📋 Limitation of Liability
                  </h4>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    AIEDX Private Limited shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages arising from your use of TimeCapsule.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                We may terminate or suspend your access to TimeCapsule at our sole discretion, 
                without prior notice, for conduct that we believe violates these Terms of Service 
                or is harmful to other users, us, or third parties.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upon termination, your right to use the service will cease immediately. 
                You may delete your account at any time through your account settings.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to modify these Terms of Service at any time. We will notify 
                users of any material changes by posting the updated terms on this page and updating 
                the "Last updated" date.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your continued use of TimeCapsule after changes are posted constitutes acceptance 
                of the updated terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Email:</strong> legal@timecapsule.dev</p>
                <p><strong>Company:</strong> AIEDX Private Limited</p>
                <p><strong>Address:</strong> [Your Company Address]</p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center gap-6 mb-4">
            <Link 
              href="/privacy" 
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Back to Home
            </Link>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 AIEDX Private Limited. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
} 