"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Star, Target, Users } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: <Star className="w-5 h-5" />,
      text: "Premium quality & trusted services",
      color: "text-yellow-400"
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Affordable & transparent pricing",
      color: "text-green-400"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Dedicated support for every customer",
      color: "text-blue-400"
    }
  ];

  return (
    <section className="relative w-full bg-black py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements - Dark Theme */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-zinc-900 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-zinc-900 rounded-full translate-x-1/3 translate-y-1/3 opacity-60" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            {/* Section Header */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
              >
                Why Choose{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Richview
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-900/50 -z-0 opacity-80" />
                </span>
                ?
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "80px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg lg:text-xl text-gray-300 leading-relaxed lg:leading-loose"
            >
              At <span className="font-semibold text-white">Richview</span>, we are redefining 
              modern fashion by providing high-quality, reliable, and affordable 
              fashion solutions tailored to your lifestyle. Our focus is on{" "}
              <span className="text-white font-medium bg-white/10 px-2 py-1 rounded-lg">
                trust, innovation, and customer satisfaction
              </span>, 
              ensuring every experience with us is seamless and memorable.
            </motion.p>

            {/* Features List */}
            <motion.ul 
              className="space-y-4 lg:space-y-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-900/50 transition-all duration-300 group border border-zinc-800/50 hover:border-zinc-700/50"
                >
                  <div className={`flex-shrink-0 w-10 h-10 bg-zinc-900 rounded-full border border-zinc-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <span className="text-gray-200 text-base lg:text-lg font-medium pt-1.5 group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800"
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400 mt-1">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">10+</div>
                <div className="text-sm text-gray-400 mt-1">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-400 mt-1">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg h-80 sm:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
                <Image
                  src="/logo2r.png"
                  alt="About Richview - Premium Streetwear Brand"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Subtle Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute -top-4 -right-4 bg-zinc-900 rounded-2xl shadow-xl p-4 border border-zinc-700 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-white">Trending Now</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl p-4 border border-blue-500/30"
              >
                <div className="text-sm font-semibold">Premium Quality</div>
                <div className="text-xs opacity-90">Since 2024</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
