"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, Star, Heart, Shirt, TrendingUp, Zap, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cart-store";

type MetadataObj = Record<string, unknown>;
type RemoteProduct = {
  id: string | number;
  name: string;
  description?: string | null;
  price?: number | null;
  currency?: string | null;
  unlimited?: boolean;
  active?: boolean;
  metadata?: MetadataObj | string | null;
  image?: string | null;
  badge?: string | null;
  rating?: number | null;
  category?: string | null;
};

function getString(val: unknown): string | null {
  return typeof val === "string" && val.trim() !== "" ? val : null;
}

function getArray(val: unknown): unknown[] | null {
  return Array.isArray(val) ? val : null;
}

function extractImageFromProduct(product: unknown, metadata: unknown): string | null {
  try {
    if (product && typeof product === "object" && product !== null) {
      const prod = product as MetadataObj;

      const files = getArray(prod.files);
      if (files) {
        for (const file of files) {
          if (file && typeof file === "object" && file !== null) {
            const fileObj = file as MetadataObj;
            const path = getString(fileObj.path);
            if (path) return path;
          }
        }
      }

      const images = getArray(prod.images);
      if (images) {
        for (const img of images) {
          const str = getString(img);
          if (str) return str;
          if (img && typeof img === "object" && img !== null) {
            const imgObj = img as MetadataObj;
            const url = getString(imgObj.url) ?? getString(imgObj.path);
            if (url) return url;
          }
        }
      }

      const singleImage = getString(prod.image);
      if (singleImage) return singleImage;
    }

    // metadata fallback
    if (metadata && typeof metadata === "object" && metadata !== null) {
      const meta = metadata as MetadataObj;
      const files = getArray(meta.files);
      if (files) {
        for (const file of files) {
          if (file && typeof file === "object" && file !== null) {
            const fileObj = file as MetadataObj;
            const path = getString(fileObj.path);
            if (path) return path;
          }
        }
      }

      const images = getArray(meta.images);
      if (images) {
        for (const img of images) {
          const str = getString(img);
          if (str) return str;
          if (img && typeof img === "object" && img !== null) {
            const imgObj = img as MetadataObj;
            const url = getString(imgObj.url) ?? getString(imgObj.path);
            if (url) return url;
          }
        }
      }

      const metaImage = getString((metadata as MetadataObj).image);
      if (metaImage) return metaImage;
    }

    return null;
  } catch (err) {
    // keep console for debugging
    // eslint-disable-next-line no-console
    console.error("Error extracting image:", err);
    return null;
  }

}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FashionCollection() {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const [products, setProducts] = useState<RemoteProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/products", { signal: controller.signal });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        const remote = data?.data ?? data?.products ?? [];

        if (mounted) {
          const mapped: RemoteProduct[] = (remote as unknown[]).map((p, idx) => {
            const pObj = (p && typeof p === "object" && p !== null) ? (p as MetadataObj) : {};

            // Parse metadata if it's a string
            let meta: MetadataObj = {};
            if (pObj.metadata != null) {
              if (typeof pObj.metadata === "string") {
                try {
                  const parsed = JSON.parse(pObj.metadata);
                  if (parsed && typeof parsed === "object") meta = parsed as MetadataObj;
                } catch {
                  // fallback to empty metadata object if parse fails
                  meta = {};
                }
              } else if (typeof pObj.metadata === "object" && pObj.metadata !== null) {
                meta = pObj.metadata as MetadataObj;
              }
            }

            const image = extractImageFromProduct(pObj, meta);

            const fashionBadges = ["New Arrival", "Bestseller", "Limited Edition", "Trending", "Sale"];
            const randomBadge = fashionBadges[Math.floor(Math.random() * fashionBadges.length)];

            const id = pObj.id ?? `fashion_${idx}`;
            const name = getString(pObj.name) ?? `Fashion Item ${idx + 1}`;
            const description = getString(pObj.description) ?? "Premium quality fashion item";

            let priceVal: number | null = null;
            if (typeof pObj.price === "number") priceVal = pObj.price;
            else if (typeof pObj.price === "string" && !Number.isNaN(Number(pObj.price))) priceVal = Math.round(Number(pObj.price));
            else priceVal = Math.floor(Math.random() * 50000) + 5000;

            const currency = getString(pObj.currency) ?? "NGN";
            const badge = getString(meta.badge) ?? randomBadge;
            const rating = typeof meta.rating === "number" ? meta.rating : Math.round((Math.random() * 1 + 4) * 10) / 10;
            const category = getString(meta.category) ?? getString(pObj.category) ?? "Fashion";

            return {
              id,
              name,
              description,
              price: priceVal,
              currency,
              unlimited: Boolean(pObj.unlimited),
              active: Boolean(pObj.active),
              metadata: meta,
              image,
              badge,
              rating,
              category,
            } as RemoteProduct;
          });

          const shuffledProducts = shuffleArray(mapped);
          setProducts(shuffledProducts);
        }
           } catch (errUnknown) {
        // handle AbortError safely without `any`
        const maybeErr = errUnknown as unknown;
        if (maybeErr && typeof maybeErr === "object" && (maybeErr as { name?: unknown }).name === "AbortError") {
          return;
        }
        // eslint-disable-next-line no-console
        console.error("Products fetch error:", errUnknown);
        if (mounted) {
          if (errUnknown instanceof Error) setError(errUnknown.message);
          else setError(String(errUnknown ?? "Unknown error"));
        }
      }
       finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const displayProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          (product.category ?? "").toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    return result;
  }, [products, searchQuery, selectedCategory]);

  const handleAddToCart = (product: RemoteProduct) => {
    const fallbackDataUri = "/fallback-fashion.jpg";

    addItem(
      {
        id: String(product.id),
        name: product.name,
        price: product.price ?? 0,
        imageUrl: product.image ?? fallbackDataUri,
      },
      1
    );
  };

  const handleBuyWithPaystack = (product: RemoteProduct) => {
    const metaRaw = product.metadata;
    let metaObj: MetadataObj = {};
    if (typeof metaRaw === "string") {
      try {
        const parsed = JSON.parse(metaRaw);
        if (parsed && typeof parsed === "object") metaObj = parsed as MetadataObj;
      } catch {
        metaObj = {};
      }
    } else if (typeof metaRaw === "object" && metaRaw !== null) {
      metaObj = metaRaw as MetadataObj;
    }

    const shareableLink = getString(metaObj.shareable_link) ?? `https://paystack.com/buy/${product.id}`;

    router.push(`/checkout?url=${encodeURIComponent(shareableLink)}`);
  };

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))] as string[];

  const fashionStats = [
    { icon: Shirt, label: "Premium Brands", value: "10+" },
    { icon: TrendingUp, label: "Happy Customers", value: "50+" },
    { icon: Zap, label: "Fast Delivery", value: "24h" },
  ];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* Fashion Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></g></svg>`
          )}")`,
          backgroundSize: "60px 60px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16 lg:mb-20">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white/80 text-sm font-medium">TRENDING FASHION COLLECTION</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
            Style That{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">Speaks</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Discover exclusive fashion pieces that redefine your style. Curated collections from top designers worldwide.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {fashionStats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <stat.icon className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 mb-12 p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search fashion items..."
              value={searchQuery}
              onChange={(ev) => setSearchQuery(ev.currentTarget.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              suppressHydrationWarning
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(ev) => setSelectedCategory(ev.currentTarget.value)}
              className="bg-white/10 border border-white/20 rounded-xl pl-12 pr-8 py-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none transition-all duration-300 w-full sm:w-48"
              suppressHydrationWarning
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-slate-800">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        {!loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 text-center">
            <p className="text-gray-400">
              Showing {displayProducts.length} of {products.length} products
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </p>
          </motion.div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/5 rounded-2xl h-96 border border-white/10" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-400 text-xl mb-4">❌ {error}</div>
            <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300">
              Try Again
            </button>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">No fashion items found</div>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300">
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayProducts.map((product, index) => (
              <FashionProductCard
                key={String(product.id)}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onBuyWithPaystack={() => handleBuyWithPaystack(product)}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
}

function formatNairaFromSubunit(subunit?: number | null) {
  const naira = subunit != null ? Math.round((subunit ?? 0) / 100) : 0;
  return `₦${naira.toLocaleString()}`;
}

interface FashionProductCardProps {
  product: RemoteProduct;
  onAddToCart: () => void;
  onBuyWithPaystack: () => void;
  index: number;
}

function FashionProductCard({ product, onBuyWithPaystack, index }: FashionProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const SVG_PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="100%" height="100%" fill="#1e293b"/><text x="50%" y="50%" fill="#94a3b8" font-size="24" font-family="Arial" text-anchor="middle" dominant-baseline="middle">Fashion Item</text></svg>`
    );

  const imgSrc = product.image ?? SVG_PLACEHOLDER;

  const badgeColors: { [key: string]: string } = {
    "New Arrival": "from-green-500 to-emerald-500",
    "Bestseller": "from-orange-500 to-red-500",
    "Limited Edition": "from-purple-500 to-pink-500",
    "Trending": "from-blue-500 to-cyan-500",
    "Sale": "from-red-500 to-pink-500",
  };

  const badgeColor = badgeColors[product.badge || "New Arrival"] || "from-gray-500 to-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-800">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          unoptimized={imgSrc.startsWith("data:image/svg+xml")}
          style={{ objectFit: "cover" }}
          className={`object-cover transition-all duration-700 ${isHovered ? "scale-110" : "scale-100"} ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            try {
              target.src = SVG_PLACEHOLDER;
            } catch {
              // ignore
            }
          }}
        />

        {!imageLoaded && <div className="absolute inset-0 bg-slate-700 animate-pulse" />}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${badgeColor} text-white text-xs font-bold tracking-wider shadow-lg backdrop-blur-sm`}>
          {product.badge}
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
          
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-white line-clamp-2 group-hover:text-white/90 transition-colors flex-1 pr-2">{product.name}</h3>

          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 flex-shrink-0">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-white font-medium">{product.rating ?? 4.5}</span>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">{product.category}</span>
        </div>

        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mt-4">
          <div className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent text-center xs:text-left">{formatNairaFromSubunit(product.price)}</div>

          <div className="flex flex-col xs:flex-row gap-2 w-full xs:w-auto">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onBuyWithPaystack} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl hover:shadow-green-500/25 px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-xl flex items-center justify-center gap-2 order-2 xs:order-1">
              <Zap className="w-4 h-4" />
              Buy Now
            </motion.button>
          </div>
        </div>

        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 mt-4" />
      </div>
    </motion.div>
  );
}
