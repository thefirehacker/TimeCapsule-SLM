import React from "react";
import {
  Check,
  X,
  Crown,
  Rocket,
  Users,
  Building2,
  Globe,
  Zap,
  Shield,
  Database,
} from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Local & BYOA",
    description: "Perfect for getting started",
    price: "Free",
    period: "",
    features: [
      "AI Frame Creation",
      "Learning Graph Generation",
      "Document Processing",
      "Browser Storage",
      "Community Support",
      "Basic Integrations",
    ],
    cta: "Get Started Free",
    ctaLink: "/auth/signup",
    popular: false,
    icon: Rocket,
    gradient: "from-slate-500 to-slate-600",
  },
  {
    name: "Professional",
    description: "For serious learners and professionals",
    price: "$20",
    period: "/month",
    features: [
      "Everything in Free",
      "Unlimited AI Interactions",
      "Advanced Analytics",
      "Priority Support",
      "Cloud Storage (10GB)",
      "All Integrations",
      "API Access",
      "Custom AI Models",
    ],
    cta: "Start Free Trial",
    ctaLink: "/auth/signup",
    popular: true,
    icon: Crown,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Team",
    description: "Built for growing teams",
    price: "$200",
    period: "/month",
    features: [
      "Everything in Professional",
      "Up to 3 Team Members",
      "Team Management",
      "Advanced Security",
      "Cloud Storage (100GB)",
      "Custom Branding",
      "Dedicated Support",
      "Advanced Analytics",
    ],
    cta: "Start Free Trial",
    ctaLink: "/auth/signup",
    popular: false,
    icon: Users,
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: "",
    features: [
      "Everything in Team",
      "Unlimited Team Members",
      "Enterprise SSO",
      "99.9% SLA Guarantee",
      "Unlimited Storage",
      "On-premise Deployment",
      "24/7 Priority Support",
      "Custom Integration",
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
    popular: false,
    icon: Building2,
    gradient: "from-purple-500 to-purple-600",
  },
];

const integrations = [
  { name: "Google Drive", icon: Database },
  { name: "Discord", icon: Globe },
  { name: "Slack", icon: Zap },
  { name: "Notion", icon: Shield },
  { name: "GitHub", icon: Database },
  { name: "Figma", icon: Globe },
];

const faqs = [
  {
    question: "What's the difference between Local and BYOA plans?",
    answer:
      "Local stores data in your browser only. BYOA lets you use your own API keys (OpenAI, Anthropic, etc.) for full control over costs and data.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes! Upgrade or downgrade anytime. Changes take effect immediately with prorated billing adjustments.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Data is preserved for 30 days after cancellation. You can reactivate anytime during this period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee for all paid plans. Contact support for a full refund if unsatisfied.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Simple, transparent pricing
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Choose Your
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative group ${
                  plan.popular ? "scale-105 z-10" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:shadow-2xl ${
                    plan.popular
                      ? "ring-2 ring-blue-500 dark:ring-blue-400"
                      : "group-hover:border-blue-200 dark:group-hover:border-blue-700"
                  }`}
                >
                  <div className="p-8">
                    {/* Icon and Title */}
                    <div className="mb-8">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-6`}
                      >
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-gray-900 dark:text-white">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 ml-2 text-lg">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href={plan.ctaLink}
                      className={`w-full block text-center py-4 px-6 rounded-2xl font-semibold transition-all duration-200 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with your favorite tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-700 rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <integration.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {integration.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of users who are already experiencing the future of
              knowledge management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
