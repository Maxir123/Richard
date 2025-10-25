"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShoppingBag,
  Shield,
  Heart,
  Calendar,
  Star,
  Users,
  Tag,
} from "lucide-react";

const footerSections = {
  shop: {
    title: "Shop",
    links: [
      { name: "Browse All", href: "/collections" },
      { name: "New Arrivals", href: "/collections/new-drop" },
      { name: "Best Sellers", href: "/collections/bestsellers" },
      { name: "Jackets", href: "/collections/jackets" },
      { name: "Jeans", href: "/collections/jeans" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Shipping & Delivery", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Alterations", href: "/alterations" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Richview", href: "/about" },
      { name: "Store Locator", href: "/store-locator" },
      { name: "Careers", href: "/careers" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
};

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: Facebook, color: "hover:text-blue-400" },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter, color: "hover:text-blue-300" },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram, color: "hover:text-pink-500" },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube, color: "hover:text-red-500" },
];

const features = [
  { icon: Tag, title: "Limited Drops", description: "Exclusive releases, small runs" },
  { icon: Shield, title: "Quality Assurance", description: "Premium materials & stitching" },
  { icon: CreditCard, title: "Secure Payment", description: "Pay via Paystack & cards" },
  { icon: Users, title: "Customer Care", description: "Responsive support team" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Background gradient + subtle blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-slate-900 to-black" />
      <div className="absolute -left-20 -top-16 w-96 h-96 rounded-full blur-3xl opacity-8 bg-blue-700" />
      <div className="absolute -right-20 -bottom-16 w-96 h-96 rounded-full blur-3xl opacity-8 bg-purple-700" />

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 lg:py-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "linear-gradient(90deg,#1e40af,#7c3aed)" }}
              >
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-medium text-sm">{f.title}</div>
              <div className="text-xs text-zinc-400 mt-1">{f.description}</div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-3">
            <span>© {currentYear} Richview. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> in Nigeria
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/sitemap" className="hover:text-white transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
