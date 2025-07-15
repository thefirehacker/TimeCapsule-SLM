"use client";

import { useState } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Clock,
  MessageSquare,
  HeadphonesIcon,
} from "lucide-react";

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-primary" strokeWidth={1.5} />,
      title: "Address",
      details: [
        "A-6, Samundar Darshan,",
        "Andheri West,",
        "Mumbai-400053, India",
      ],
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" strokeWidth={1.5} />,
      title: "Phone",
      details: ["+91 75061 55016", "Mon-Fri 9AM-6PM IST"],
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" strokeWidth={1.5} />,
      title: "Email",
      details: ["contact@bubblspace.com", "support@bubblspace.com"],
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" strokeWidth={1.5} />,
      title: "Website",
      details: ["www.bubblspace.com"],
    },
  ];

  const departments = [
    {
      icon: (
        <MessageSquare className="h-6 w-6 text-primary" strokeWidth={1.5} />
      ),
      title: "General Inquiries",
      description: "Questions about our services and solutions",
      email: "hello@bubblspace.com",
    },
    {
      icon: (
        <HeadphonesIcon className="h-6 w-6 text-primary" strokeWidth={1.5} />
      ),
      title: "Technical Support",
      description: "Get help with implementation and troubleshooting",
      email: "support@bubblspace.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" strokeWidth={1.5} />,
      title: "Sales Team",
      description: "Enterprise solutions and partnership opportunities",
      email: "sales@bubblspace.com",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-12 lg:mb-20">
        {/* Form - First on mobile, Left on desktop */}
        <div className="lg:col-span-7 order-1">
          <div className="bg-white dark:bg-background border border-slate-200 dark:border-slate-700 p-6 sm:p-8 rounded-xl shadow-md">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Send us a Message
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>
            </div>
            <ContactForm
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
        </div>

        {/* Contact Information - Second on mobile, Right on desktop */}
        <div className="lg:col-span-5 order-2 space-y-6 lg:space-y-8">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-background/90 to-white dark:from-background/90 dark:to-background/90 border border-slate-200 dark:border-slate-700 p-6 sm:p-7 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 flex items-center">
              <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
              </span>
              Contact Information
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4"
                >
                  <div className="bg-primary/5 p-1.5 sm:p-2 rounded-md flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium mb-1 text-sm sm:text-base">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-xs sm:text-sm text-muted-foreground break-words"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                Follow Us
              </h3>
              <div className="flex space-x-2 sm:space-x-3">
                <a
                  href="https://x.com/aiedxlearn"
                  className="bg-primary/10 p-2 rounded-md hover:bg-primary/20 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </a>
                <a
                  href="https://www.facebook.com/AIEDX"
                  className="bg-primary/10 p-2 rounded-md hover:bg-primary/20 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </a>
                <a
                  href="https://www.linkedin.com/company/aiedx"
                  className="bg-primary/10 p-2 rounded-md hover:bg-primary/20 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </a>
                <a
                  href="https://github.com/aiedx"
                  className="bg-primary/10 p-2 rounded-md hover:bg-primary/20 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Section */}
      <div className="mb-12 lg:mb-16">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Our Response Promise
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            We&apos;re committed to providing timely responses to all inquiries
            across different channels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-background/90 to-white dark:from-background/90 dark:to-background/90 p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-2.5 sm:p-3 rounded-full mb-3 sm:mb-4">
              <Mail
                className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">
              Email Inquiries
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 px-2">
              Response within 24 hours during business days
            </p>
            <span className="text-xl sm:text-2xl font-bold text-primary">
              24h
            </span>
          </div>
          <div className="bg-gradient-to-br from-background/90 to-white dark:from-background/90 dark:to-background/90 p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-2.5 sm:p-3 rounded-full mb-3 sm:mb-4">
              <HeadphonesIcon
                className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">
              Technical Support
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 px-2">
              Priority support for technical issues
            </p>
            <span className="text-xl sm:text-2xl font-bold text-primary">
              4-6h
            </span>
          </div>
          <div className="bg-gradient-to-br from-background/90 to-white dark:from-background/90 dark:to-background/90 p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center sm:col-span-2 lg:col-span-1">
            <div className="bg-primary/10 p-2.5 sm:p-3 rounded-full mb-3 sm:mb-4">
              <Phone
                className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">
              Phone Support
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 px-2">
              Immediate assistance during business hours
            </p>
            <span className="text-xl sm:text-2xl font-bold text-primary">
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
