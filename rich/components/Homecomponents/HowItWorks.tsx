"use client";

import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Products",
    description: "Explore our exclusive collection and find your perfect streetwear style.",
    icon: ShoppingCart,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    id: 2,
    title: "Add to Cart",
    description: "Select your favorites and add them to your shopping cart.",
    icon: CreditCard,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  },
  {
    id: 3,
    title: "Secure Checkout",
    description: "Pay safely online with Paystack integration.",
    icon: Truck,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  {
    id: 4,
    title: " Delivery",
    description: "Get your order delivered quickly and hassle-free.",
    icon: CheckCircle,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full bg-black py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4"
          >
            How <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">It Works</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Simple steps to get your favorite Richview items delivered to your doorstep.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="relative group"
              >
                {/* Step Number - Desktop */}
                <div className="hidden lg:flex absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full items-center justify-center text-white text-sm font-bold border-4 border-black z-10">
                  {index + 1}
                </div>

                {/* Step Card */}
                <div className={`relative h-full bg-zinc-900/50 backdrop-blur-sm border ${step.borderColor} rounded-2xl p-6 lg:p-8 shadow-2xl hover:shadow-zinc-900/50 transition-all duration-500 group-hover:border-opacity-50 ${step.bgColor} group-hover:bg-opacity-20`}>
                  
                  {/* Icon Container */}
                  <div className={`relative mb-6 lg:mb-8 flex justify-center`}>
                    <div className="relative">
                      {/* Background Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                      
                      {/* Icon */}
                      <div className={`relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-8 h-8 lg:w-10 lg:h-10" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm lg:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Number - Mobile */}
                  <div className="lg:hidden absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Connecting Line - Mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 lg:p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-400 text-lg mb-6">
              Join thousands of satisfied customers who trust Richview for premium streetwear.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              onClick={() => (window.location.href = "/collections")}
            >
              Start Shopping Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}