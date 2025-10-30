"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, User, FileText, Mail } from "lucide-react";

export default function PrivacyPage() {
  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.8, 
      delay, 
      ease: [0.25, 0.46, 0.45, 0.94] as const 
    },
    viewport: { once: true, amount: 0.1 } as const,
  });

  const privacySections = [
    {
      icon: <User className="h-6 w-6" />,
      title: "Information We Collect",
      content: [
        "Personal details (name, email, shipping address)",
        "Payment information processed securely through Paystack",
        "Order history and preferences",
        "Device and browsing information for analytics"
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "How We Use Your Information",
      content: [
        "Process and fulfill your orders",
        "Provide customer support and service",
        "Send order updates and tracking information",
        "Improve our products and user experience",
        "Send marketing communications (with your consent)"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Protection",
      content: [
        "SSL encryption for all data transmissions",
        "Secure payment processing via Paystack",
        "Regular security assessments and updates",
        "Limited employee access to personal data",
        "Data retention policies in compliance with regulations"
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Your Rights & Choices",
      content: [
        "Access and review your personal information",
        "Update or correct inaccurate data",
        "Request deletion of your data",
        "Opt-out of marketing communications",
        "Export your data in a portable format"
      ]
    }
  ];

  const policyUpdates = [
    { date: "2025-01-15", change: "Updated data retention policies" },
    { date: "2025-11-01", change: "Enhanced cookie consent management" },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-black" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
              <Shield className="h-4 w-4 text-blue-400" />
              Privacy & Security
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-blue-200 leading-relaxed max-w-3xl mx-auto">
              At Richview, we&apos;re committed to protecting your privacy and ensuring your personal 
              information is handled with care and transparency.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="text-sm text-blue-300">
                Last Updated: January 15, 2024
              </div>
              <div className="w-px h-4 bg-blue-400/30 hidden sm:block" />
              <div className="text-sm text-blue-300">
                Effective Immediately
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gradient-to-b from-transparent to-blue-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...anim(0.1)}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-lg text-blue-200 leading-relaxed mb-8">
              Your privacy is important to us. This policy explains what personal data we collect, 
              how we use it, and your rights regarding your information. We encourage you to read 
              this policy carefully.
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-blue-200 italic">
                &quot;We believe in being transparent about how we collect and use your data. 
                This policy reflects our commitment to protecting your privacy while delivering 
                exceptional service.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Privacy Sections */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {privacySections.map((section, index) => (
              <motion.div
                key={section.title}
                {...anim(index * 0.1)}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full group-hover:scale-105">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-blue-200">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sharing & Third Parties */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-950/20 to-purple-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...anim(0.1)}
            className="max-w-4xl mx-auto"
          >
          <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Data Sharing & Third Parties
              </h2>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                We work with trusted partners to provide our services. Here&apos;s how we handle data sharing.
              </p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[{ title: "Payment Processing", description: "Paystack - Secure payment gateway", purpose: "Process transactions and prevent fraud" },
                { title: "Shipping Partners", description: "Delivery services worldwide", purpose: "Ship your orders and provide tracking" },
                { title: "Analytics", description: "Google Analytics & similar tools", purpose: "Understand website usage and improve service" }
              ].map((partner, index) => (
                <motion.div
                  key={partner.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
                >
                  <h4 className="font-bold text-white text-lg mb-2">{partner.title}</h4>
                  <p className="text-blue-200 text-sm mb-3">{partner.description}</p>
                  <p className="text-blue-300 text-xs">{partner.purpose}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Legal Compliance</h3>
              <p className="text-blue-200 leading-relaxed mb-4">
                We may disclose your information when required by law or to protect our rights, 
                property, or safety, or that of our users or others. This includes exchanging 
                information with other companies and organizations for fraud protection.
              </p>
              <p className="text-blue-200 leading-relaxed">
                We do not sell your personal data to third parties for marketing purposes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookies & Tracking */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...anim(0.1)}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Cookies & Tracking Technologies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h4 className="font-bold text-white text-lg mb-3">Essential Cookies</h4>
                  <p className="text-blue-200 text-sm">
                    Required for basic site functionality, such as shopping cart and checkout processes.
                    These cannot be disabled.
                  </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h4 className="font-bold text-white text-lg mb-3">Analytics Cookies</h4>
                  <p className="text-blue-200 text-sm">
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h4 className="font-bold text-white text-lg mb-3">Marketing Cookies</h4>
                  <p className="text-blue-200 text-sm">
                    Used to track visitors across websites to display relevant advertisements.
                    These require your consent.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h4 className="font-bold text-white text-lg mb-3">Cookie Management</h4>
                  <p className="text-blue-200 text-sm">
                    You can control cookie preferences through your browser settings or using 
                    our cookie consent tool.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-purple-950/20 to-blue-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...anim(0.1)}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Policy Updates & Changes
              </h2>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Recent Updates</h3>
              <div className="space-y-4">
                {policyUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium min-w-20 text-center">
                      {update.date}
                    </div>
                    <p className="text-blue-200 flex-1">{update.change}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-blue-200 mb-6">
                We will notify you of any material changes to this policy by posting the updated version 
                on our website and, if appropriate, through other communication channels.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-sm text-blue-300 border border-white/10">
                <FileText className="h-4 w-4" />
                Continued use of our services constitutes acceptance of updated policies
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Questions */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...anim(0.1)}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
                <Mail className="h-4 w-4 text-blue-400" />
                Questions & Contact
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Have Questions About Your Privacy?
              </h2>

              <p className="text-lg text-blue-200 mb-8 leading-relaxed max-w-2xl mx-auto">
                If you have any questions about this privacy policy, your personal data, 
                or wish to exercise your rights, please don&apos;t hesitate to contact us.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Email</div>
                  <a 
                    href="mailto:richviewlimited@gmail.com" 
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    richviewlimited@gmail.com
                  </a>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Response Time</div>
                  <div className="text-blue-300">Within 48 hours</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="font-bold text-white text-lg mb-3">Data Protection Officer</h4>
                <p className="text-blue-200">
                  For urgent privacy concerns or data protection inquiries, contact our Data Protection Officer directly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-blue-200 text-lg mb-6">
              Thank you for trusting Richview with your personal information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Return to Home
              </Link>
              
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
