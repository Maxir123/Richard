"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const BRAND = {
  name: "Richview",
  tagline: "Swag Rendition",
  description: "Elevate your style with our premium denim and alternative wears . Limited drops, exceptional quality.",
  season: "Autumn Collection 2024",
} as const;

// Paystack product type
type PaystackProduct = {
  id: string | number;
  name: string;
  description?: string | null;
  price?: number | null; // subunit (kobo)
  currency?: string | null;
  images?: string[];
  image?: string | null;
  metadata?: {
    sizes?: string[];
    colors?: string[];
    sku?: string;
    tag?: string;
    image?: string;
    [k: string]: any;
  } | null;
  active?: boolean;
};

export default function HeroSection() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [firstProduct, setFirstProduct] = useState<PaystackProduct | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch first product from Paystack
  useEffect(() => {
    async function fetchFirstProduct() {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        // Get the first product from the array
        const products = data.products || [];
        if (products.length > 0) {
          setFirstProduct(products[0]);
        } else {
          setFirstProduct(null);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setFirstProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchFirstProduct();
  }, []);

  // Convert subunit (kobo) to Naira
  function subunitToNaira(subunit?: number | null) {
    if (!subunit && subunit !== 0) return 0;
    return Math.round(subunit / 100);
  }

  // Format price for display
  function formatPrice(subunit?: number | null) {
    const naira = subunitToNaira(subunit);
    return `₦${naira.toLocaleString()}`;
  }

  const handleBuyWithPaystack = (product: PaystackProduct) => {
      const meta = typeof product.metadata === "string"
        ? JSON.parse(product.metadata || "{}")
        : product.metadata || {};
      const shareableLink = meta.shareable_link || `https://paystack.com/buy/${product.id}`;

      // navigate to internal checkout page in the same tab (SPA navigation)
      router.push(`/checkout?url=${encodeURIComponent(shareableLink)}`);
    };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Enhanced Background with Performance Optimization */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="/Post1.jpg"
            alt="Richview Fashion Collection"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>
        
        {/* Improved Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">
          {/* Brand Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-center lg:text-left"
          >
            {/* Season Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-4 lg:mb-6"
            >
              <span className="text-white/70 text-sm font-medium tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full">
                {BRAND.season}
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-4 lg:mb-6">
              {BRAND.tagline}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="block text-2xl sm:text-3xl lg:text-4xl font-normal mt-2 lg:mt-4 text-white/80"
              >
                Redefined
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-white/75 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0 font-light"
            >
              {BRAND.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link href="/collections" className="flex justify-center lg:justify-start">
                <Button
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-none hover:bg-white/90 transition-all duration-300 font-medium text-sm tracking-widest uppercase min-w-[160px]"
                >
                  Shop Collection
                </Button>
              </Link>
              
              <Link href="/lookbook" className="flex justify-center lg:justify-start">
                <Button
                  className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-none hover:bg-white/90 transition-all duration-300 font-medium text-sm tracking-widest uppercase min-w-[160px]"
                >
                  View Lookbook
                </Button>
              </Link>
            </motion.div>

            {/* Product Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-6 lg:gap-8 mt-8 lg:mt-12 text-xs text-white/60 uppercase tracking-wider justify-center lg:justify-start"
            >
              <div className="text-center lg:text-left">
                <div className="text-white/50 text-[11px] mb-1 font-medium">Materials</div>
                <div className="text-white/80">Premium Cotton • Japanese Denim</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-white/50 text-[11px] mb-1 font-medium">Craftsmanship</div>
                <div className="text-white/80">Hand-finished Details</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Highlight - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:flex justify-center xl:justify-end"
          >
            <ProductHighlightCard 
              isHovered={isHovered} 
              product={firstProduct}
              loading={loading}
              formatPrice={formatPrice}
              onBuyWithPaystack={handleBuyWithPaystack}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="text-white/50 text-xs tracking-widest uppercase animate-pulse">
          Scroll to explore
        </div>
      </motion.div>

      {/* Mobile Product Card */}
      <div className="lg:hidden relative z-10 px-4 sm:px-6 pb-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <ProductHighlightCard 
            isHovered={isHovered} 
            product={firstProduct}
            loading={loading}
            formatPrice={formatPrice}
            onBuyWithPaystack={handleBuyWithPaystack}
          />
        </motion.div>
      </div>
    </section>
  );
}

interface ProductHighlightCardProps {
  isHovered: boolean;
  product: PaystackProduct | null;
  loading: boolean;
  formatPrice: (subunit?: number | null) => string;
  onBuyWithPaystack: (product: PaystackProduct) => void;
}

function ProductHighlightCard({ isHovered, product, loading, formatPrice, onBuyWithPaystack }: ProductHighlightCardProps) {
  if (loading) {
    return (
      <motion.div
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 max-w-sm w-full mx-auto lg:mx-0 shadow-2xl"
      >
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-4 bg-white/20 rounded mb-2"></div>
          <div className="h-8 bg-white/20 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-white/20 rounded"></div>
            <div className="h-12 bg-white/20 rounded"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <motion.div
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 max-w-sm w-full mx-auto lg:mx-0 shadow-2xl"
      >
        <div className="text-center text-white/70">
          <p>No products available</p>
          <Link href="/collections">
            <button className="mt-3 w-full border border-white/40 text-white py-3 text-sm font-medium hover:bg-white/10 transition-all duration-300">
              Browse Collection
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  const productImage = product.images?.[0] || product.image || '/fallback-product.jpg';
  const productTag = product.metadata?.tag || 'Featured';
  const availableSizes = product.metadata?.sizes || ['S', 'M', 'L', 'XL'];
  const availableColors = product.metadata?.colors || [];

  return (
    <motion.div
      animate={{ y: isHovered ? -8 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 max-w-sm w-full mx-auto lg:mx-0 shadow-2xl"
    >
      <div className="mb-4 sm:mb-5">
        <h3 className="text-white text-lg sm:text-xl font-medium mb-2">{product.name}</h3>
        <p className="text-white/70 text-sm mb-3">{productTag}</p>
        <div className="text-white text-xl sm:text-2xl font-light">
          {formatPrice(product.price)}
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBuyWithPaystack(product)}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl hover:shadow-green-500/25 px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          View Details
        </motion.button>

        <Link href="/collections">
          <button className="w-full border border-white/40 text-white py-3 text-sm font-medium hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            Browse Collection
          </button>
        </Link>
      </div>
      
      <div className="mt-4 sm:mt-5 pt-4 border-t border-white/20">
        <div className="text-white/60 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-white/50">Size</span>
            <span className="text-white font-medium">{availableSizes.join(', ')}</span>
          </div>
          {availableColors.length > 0 && (
            <div className="flex justify-between">
              <span className="text-white/50">Colors</span>
              <span className="text-white font-medium">{availableColors.join(', ')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-white/50">Delivery</span>
            <span className="text-white font-medium">2-4 Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Status</span>
            <span className={`font-medium ${product.active ? 'text-green-400' : 'text-red-400'}`}>
              {product.active ? 'Available' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}