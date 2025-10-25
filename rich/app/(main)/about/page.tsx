"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Award, Globe, Sparkles, Zap, Target, Heart, Mail, Phone, MapPin } from "lucide-react";

export default function AboutPage() {
  const timeline = [
    { year: "2021", title: "Vision Born", desc: "Late night sketches turned into a bold vision for streetwear revolution.", icon: "🎨" },
    { year: "2022", title: "First Drop Explosion", desc: "Debut collection sold out in 72 hours, breaking all expectations.", icon: "🚀" },
    { year: "2023", title: "Global Recognition", desc: "Featured in major fashion publications and stocked in premium boutiques worldwide.", icon: "🌍" },
    { year: "2024", title: "Next Evolution", desc: "Expanding into sustainable materials and immersive digital experiences.", icon: "⚡" },
  ];

  const values = [
    { icon: <Zap className="h-8 w-8" />, title: "Radical Innovation", desc: "Pushing boundaries with cutting-edge designs and materials that redefine streetwear." },
    { icon: <Target className="h-8 w-8" />, title: "Elite Craftsmanship", desc: "Every stitch, every fabric, every detail perfected through obsessive attention." },
    { icon: <Heart className="h-8 w-8" />, title: "Community First", desc: "Building a movement, not just a brand. Our people are our power." },
    { icon: <Globe className="h-8 w-8" />, title: "Global Impact", desc: "From Lagos to London, creating waves that transcend borders and cultures." },
  ];

  const achievements = [
    { number: "50K+", label: "Pieces Sold Worldwide", icon: <Star className="h-6 w-6" /> },
    { number: "15", label: "Countries Reached", icon: <Globe className="h-6 w-6" /> },
    { number: "98.7%", label: "Customer Satisfaction", icon: <Heart className="h-6 w-6" /> },
    { number: "24", label: "Industry Awards", icon: <Award className="h-6 w-6" /> },
  ];

  const contactInfo = [
    { icon: <Mail className="h-6 w-6" />, label: "Email", value: "hello@richview.com", link: "mailto:hello@richview.com" },
    { icon: <Phone className="h-6 w-6" />, label: "Phone", value: "+234 1 632 5830", link: "tel:+23416325830" },
    { icon: <MapPin className="h-6 w-6" />, label: "Headquarters", value: "Lagos, Nigeria", link: "https://maps.google.com/?q=Lagos,Nigeria" },
  ];

  // Enhanced animation configuration
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

  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      {/* ENHANCED HERO SECTION WITH PARTICLES */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/Post2.jpg')",
              filter: "brightness(0.4) contrast(1.2)",
            }}
            aria-hidden="true"
          />
          
          {/* Animated Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  The Future of Streetwear is Here
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200">
                  RICHVIEW
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  REDEFINED
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="text-xl sm:text-2xl text-blue-100 max-w-2xl mb-10 leading-relaxed font-light"
              >
                Where futuristic design meets urban culture. Crafting limited-edition pieces that defy conventions and celebrate individuality.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
              >
                <Link
                  href="/collections"
                  className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl font-bold text-lg hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative">Explore Collections</span>
                </Link>
                <a
                  href="#mission"
                  className="inline-flex items-center justify-center px-10 py-5 rounded-2xl border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all duration-500 font-semibold text-lg hover:scale-105"
                >
                  Our Story
                </a>
              </motion.div>

              {/* Enhanced Stats Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-2xl"
              >
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        {achievement.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{achievement.number}</div>
                    <div className="text-blue-200 text-sm font-medium">{achievement.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Enhanced Image Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-2xl">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px]">
                    <Image 
                      src="/logo1.jpg" 
                      alt="Richview Streetwear Collection" 
                      fill 
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/20">
                    <span className="text-white font-semibold text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      New Collection Live
                    </span>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 rounded-2xl">
                    <span className="text-white font-bold text-sm">Limited Edition</span>
                  </div>
                </div>
                
                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full blur-xl opacity-60"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-500 rounded-full blur-xl opacity-40"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-blue-300 text-sm font-medium">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-400 rounded-full mt-2"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ENHANCED MISSION SECTION */}
      <section id="mission" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-purple-950/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              {...anim(0.1)}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
                <Target className="h-4 w-4 text-blue-400" />
                Our Purpose
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Beyond Fashion.<br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  A Movement.
                </span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed font-light">
                We&apos;re not just creating clothing; we&apos;re architecting a new era of self-expression. 
                Each piece is a statement—a fusion of Nigerian resilience and global vision, crafted 
                for those who dare to stand out and redefine what&apos;s possible.
              </p>

              <div className="space-y-6">
                {[
                  "Limited runs ensuring exclusivity and collectibility",
                  "Advanced sustainable materials and ethical production",
                  "Digital-native experiences blending physical and virtual worlds",
                  "Community-driven collaborations and cultural exchanges"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4 text-blue-200 group"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-lg font-medium group-hover:text-white transition-colors duration-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              {...anim(0.3)}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
                <div className="relative w-full h-80 sm:h-96 lg:h-[500px]">
                  <Image 
                    src="/Post10.jpg" 
                    alt="Craftsmanship at Richview" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                
                {/* Floating stats overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">100%</div>
                      <div className="text-blue-200 text-sm">Handcrafted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-blue-200 text-sm">Quality Control</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ENHANCED VALUES SECTION */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-blue-950/30 to-purple-950/40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/10">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Our Core Values
            </div>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              The Pillars of<br />Our Revolution
            </h3>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              These principles guide every decision, every design, and every interaction within the Richview universe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full flex flex-col items-center text-center group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h4 className="font-bold text-2xl mb-4 text-white">{value.title}</h4>
                  <p className="text-blue-200 leading-relaxed flex-grow">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED TIMELINE SECTION */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-black" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/10">
              <Zap className="h-4 w-4 text-yellow-400" />
              Our Journey
            </div>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              From Vision to<br />Revolution
            </h3>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Enhanced Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 shadow-2xl shadow-blue-500/30" />
            
            <div className="space-y-16 lg:space-y-24">
              {timeline.map((step, idx) => (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl shadow-blue-500/50 items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  
                  <div className={`flex flex-col lg:flex-row items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className="lg:w-1/2">
                      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 group hover:scale-105">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-4xl">{step.icon}</div>
                          <div className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            {step.year}
                          </div>
                        </div>
                        <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                          {step.title}
                        </h4>
                        <p className="text-blue-200 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    
                    {/* Spacer for desktop */}
                    <div className="lg:w-1/2 hidden lg:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED CONTACT SECTION */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/10">
              <Mail className="h-4 w-4 text-blue-400" />
              Get In Touch
            </div>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Let&apos;s Create<br />Together
            </h3>
            <p className="text-xl text-blue-200 leading-relaxed max-w-2xl mx-auto">
              Have questions about our collections, collaborations, or just want to say hello? 
              We&apos;d love to hear from you and explore how we can create something amazing together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactInfo.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 text-center hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </div>
                </div>
                <h4 className="font-bold text-xl mb-3 text-white">{contact.label}</h4>
                <p className="text-blue-200 group-hover:text-white transition-colors duration-300 text-lg">
                  {contact.value}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Additional Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
              <h4 className="font-bold text-2xl mb-4 text-white">Business Hours</h4>
              <div className="text-blue-200 space-y-2 text-lg">
                <p>Monday - Friday: 9:00 AM - 6:00 PM WAT</p>
                <p>Saturday: 10:00 AM - 4:00 PM WAT</p>
                <p>Sunday: Closed</p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-blue-200 text-lg">
                  Response Time: We typically reply within 2-4 hours during business hours.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED CTA SECTION */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ready to Join<br />the Revolution?
            </h3>
            <p className="text-xl text-blue-200 mb-12 leading-relaxed max-w-2xl mx-auto">
              Become part of the movement that&apos;s reshaping streetwear. Explore our latest collection and experience the future of fashion today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/collections"
                className="group relative inline-flex items-center justify-center px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl font-bold text-lg hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Shop The Collection
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
