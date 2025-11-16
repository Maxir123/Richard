"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cart-store";

type RemoteProduct = {
  id: string | number;
  name: string;
  description?: string | null;
  price?: number | null;
  currency?: string | null;
  unlimited?: boolean;
  active?: boolean;
  metadata?: any;
  image?: string | null;
  badge?: string | null;
  rating?: number | null;
  category?: string | null;
};

// Enhanced image extraction function that properly checks Paystack files array
function extractImageFromProduct(product: any, metadata: any): string | null {
  console.log("🖼️ Starting comprehensive image extraction for:", product.name);
  
  try {
    // 1. Check product.files array (Paystack's main files field with images)
    console.log("1. Checking product.files:", product.files);
    if (Array.isArray(product.files) && product.files.length > 0) {
      for (let i = 0; i < product.files.length; i++) {
        const file = product.files[i];
        console.log(`   File ${i}:`, file);
        
        // Check if it's an image file and has a path
        if (file?.type === 'image' && file?.path && typeof file.path === 'string' && file.path.trim() !== '') {
          console.log(`✅ Found image in product.files[${i}].path:`, file.path);
          return file.path;
        }
        // Also check if it has path without type check (for backward compatibility)
        if (file?.path && typeof file.path === 'string' && file.path.trim() !== '') {
          console.log(`✅ Found image in product.files[${i}].path (no type check):`, file.path);
          return file.path;
        }
      }
    }

    // 2. Check product.images array (alternative location)
    console.log("2. Checking product.images:", product.images);
    if (Array.isArray(product.images) && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        const img = product.images[i];
        console.log(`   Image ${i}:`, img);
        if (typeof img === 'string' && img.trim() !== '') {
          console.log(`✅ Found image in product.images[${i}] (string):`, img);
          return img;
        }
        if (img && typeof img.url === 'string' && img.url.trim() !== '') {
          console.log(`✅ Found image in product.images[${i}].url:`, img.url);
          return img.url;
        }
        if (img && typeof img.path === 'string' && img.path.trim() !== '') {
          console.log(`✅ Found image in product.images[${i}].path:`, img.path);
          return img.path;
        }
      }
    }

    // 3. Check product.image (single image field)
    console.log("3. Checking product.image:", product.image);
    if (product.image && typeof product.image === 'string' && product.image.trim() !== '') {
      console.log("✅ Found image in product.image:", product.image);
      return product.image;
    }

    // 4. Check metadata.files array
    console.log("4. Checking metadata.files:", metadata?.files);
    if (Array.isArray(metadata?.files) && metadata.files.length > 0) {
      for (let i = 0; i < metadata.files.length; i++) {
        const file = metadata.files[i];
        console.log(`   Metadata file ${i}:`, file);
        if (file?.path && typeof file.path === 'string' && file.path.trim() !== '') {
          console.log(`✅ Found image in metadata.files[${i}].path:`, file.path);
          return file.path;
        }
      }
    }

    // 5. Check metadata.images array
    console.log("5. Checking metadata.images:", metadata?.images);
    if (Array.isArray(metadata?.images) && metadata.images.length > 0) {
      for (let i = 0; i < metadata.images.length; i++) {
        const img = metadata.images[i];
        console.log(`   Metadata image ${i}:`, img);
        if (typeof img === 'string' && img.trim() !== '') {
          console.log(`✅ Found image in metadata.images[${i}] (string):`, img);
          return img;
        }
        if (img && typeof img.url === 'string' && img.url.trim() !== '') {
          console.log(`✅ Found image in metadata.images[${i}].url:`, img.url);
          return img.url;
        }
      }
    }

    // 6. Check metadata.image (single image in metadata)
    console.log("6. Checking metadata.image:", metadata?.image);
    if (metadata?.image && typeof metadata.image === 'string' && metadata.image.trim() !== '') {
      console.log("✅ Found image in metadata.image:", metadata.image);
      return metadata.image;
    }

    // 7. Check for any other common image fields
    const additionalFields = ['photo', 'picture', 'img', 'thumbnail', 'product_image'];
    for (const field of additionalFields) {
      console.log(`7. Checking metadata.${field}:`, metadata?.[field]);
      if (metadata?.[field] && typeof metadata[field] === 'string' && metadata[field].trim() !== '') {
        console.log(`✅ Found image in metadata.${field}:`, metadata[field]);
        return metadata[field];
      }
    }

    console.log("❌ No valid image found in any location");
    return null;
  } catch (error) {
    console.error('🚨 Error extracting image from product:', error);
    return null;
  }
}

export default function HeroProductsSection() {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const [products, setProducts] = useState<RemoteProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🔄 Fetching products from Paystack...");
        const res = await fetch("/api/products", { signal: controller.signal });
        
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload?.message || "Failed to fetch products");
        }
        
        const data = await res.json();
        const remote = data?.data ?? data?.products ?? [];
        console.log(`📊 Found ${remote.length} products from Paystack:`);
        
        if (mounted) {
          const mapped: RemoteProduct[] = remote.map((p: any, idx: number) => {
            console.log(`\n📦 Product ${idx + 1}:`, {
              id: p.id,
              name: p.name,
              hasImages: Array.isArray(p.images) && p.images.length > 0,
              images: p.images,
              hasImage: !!p.image,
              image: p.image,
              hasFiles: Array.isArray(p.files) && p.files.length > 0,
              files: p.files,
              hasMetadata: !!p.metadata,
              metadata: p.metadata
            });

            // Parse metadata if it's a string
            let meta = p.metadata;
            if (typeof p.metadata === "string") {
              try {
                meta = JSON.parse(p.metadata || "{}");
              } catch (e) {
                meta = p.metadata;
              }
            } else {
              meta = p.metadata ?? {};
            }

            const image = extractImageFromProduct(p, meta);
            console.log(`🖼️ Final image for ${p.name}:`, image);

            return {
              id: p.id ?? `paystack_${idx}`,
              name: p.name ?? p.title ?? `Product ${idx + 1}`,
              description: p.description ?? null,
              price: typeof p.price === "number" ? p.price : null,
              currency: p.currency ?? "NGN",
              metadata: meta,
              image,
              badge: meta?.badge ?? p.badge ?? (idx % 3 === 0 ? "New" : idx % 3 === 1 ? "Hot" : "Sale"),
              rating: meta?.rating ?? Math.round((Math.random() * 1 + 4) * 10) / 10,
            };
          });

          console.log(`🎯 Final mapped products:`, mapped);
          // ONLY TAKE FIRST 3 PRODUCTS
         mapped.sort((a, b) => a.metadata?.position - b.metadata?.position)
        setProducts(mapped.slice(0, 3))

        }
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("❌ Products fetch error:", err);
        if (mounted) setError(err?.message ?? "Unknown error");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const handleAddToCart = (product: RemoteProduct) => {
    const priceInNaira = product.price ? Math.round(product.price / 100) : 0;
    const fallbackDataUri = "/fallback-product.jpg";

    addItem({
      id: String(product.id),
      name: product.name,
      price: priceInNaira,
      imageUrl: product.image ?? fallbackDataUri,
    });
  };

  const handleBuyWithPaystack = (product: RemoteProduct) => {
    const meta = typeof product.metadata === "string" ? 
      JSON.parse(product.metadata || "{}") : product.metadata || {};
    
    const shareableLink = meta.shareable_link || `https://paystack.com/buy/${product.id}`;
    
    // Navigate to dedicated checkout page with the Paystack URL
    router.push(`/checkout?url=${encodeURIComponent(shareableLink)}`);
  };

  return (
    <section className="bg-black text-white py-16 lg:py-24" aria-labelledby="featured-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="featured-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Featured Drops
          </h2>
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Curated selection — limited runs and best-sellers. Tap a product to preview or add to cart.
          </p>
        </motion.div>

        {/* Loading / Error */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-zinc-900/50 border border-zinc-800 rounded-2xl h-96" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {/* ONLY 3 PRODUCTS DISPLAYED */}
            {products.map((product, index) => (
              <ProductCard 
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
    </section>
  );
}

function formatNairaFromSubunit(subunit?: number | null) {
  const naira = subunit != null ? Math.round(subunit / 100) : 0;
  return `₦${naira.toLocaleString()}`;
}

interface ProductCardProps {
  product: RemoteProduct;
  onAddToCart: () => void;
  onBuyWithPaystack: () => void;
  index: number;
}

function ProductCard({ product, onAddToCart, onBuyWithPaystack, index }: ProductCardProps) {
  const SVG_PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
       <rect width="100%" height="100%" fill="#0f1724"/>
       <text x="50%" y="50%" fill="#9ca3af" font-size="32" font-family="Arial" text-anchor="middle" dominant-baseline="middle">
         No image
       </text>
     </svg>`
    );

  const imgSrc = product.image ?? SVG_PLACEHOLDER;

  return (
    <motion.div
      className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-zinc-900/50 transition-all duration-500 hover:-translate-y-2"
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        },
      }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      {/* Image Container */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          unoptimized={imgSrc.startsWith('data:image/svg+xml')}
          style={{ objectFit: "cover" }}
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = SVG_PLACEHOLDER;
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold tracking-wider shadow-lg">
          {product.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg sm:text-xl text-white line-clamp-2 group-hover:text-white/90 transition-colors flex-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-zinc-800/50 rounded-full px-2 py-1 ml-2">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-white font-medium">{product.rating ?? 4.5}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-white">{formatNairaFromSubunit(product.price)}</div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBuyWithPaystack}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl hover:shadow-green-500/25 px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Buy Now
          </motion.button>
        </div>

        {/* Hover Indicator */}
        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mt-4" />
      </div>
    </motion.div>
  );
}
