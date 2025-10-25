// app/store-locator/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Store = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  lat: number;
  lng: number;
  hours: string;
};

const STORES: Store[] = [
  {
    id: "lagos-ikeja",
    name: "Richview Flagship — Ikeja",
    address: "12 Allen Ave, Ikeja, Lagos",
    city: "Lagos",
    phone: "+234 800 000 1001",
    lat: 6.6018,
    lng: 3.3515,
    hours: "Mon–Sat 9:00–19:00",
  },
  {
    id: "lagos-vi",
    name: "Richview Store — Victoria Island",
    address: "Shop 4, Victoria Island, Lagos",
    city: "Lagos",
    phone: "+234 800 000 1002",
    lat: 6.4383,
    lng: 3.4483,
    hours: "Mon–Sun 10:00–20:00",
  },
  {
    id: "abuja-central",
    name: "Richview — Abuja Central",
    address: "Plot 45, Wuse, Abuja",
    city: "Abuja",
    phone: "+234 800 000 2001",
    lat: 9.0765,
    lng: 7.3986,
    hours: "Mon–Sat 9:00–18:00",
  },
  {
    id: "ph-port",
    name: "Richview — Port Harcourt",
    address: "Rivers Ave, Port Harcourt",
    city: "Port Harcourt",
    phone: "+234 800 000 3001",
    lat: 4.8156,
    lng: 7.0498,
    hours: "Mon–Sat 9:30–18:00",
  },
  {
    id: "kano-mall",
    name: "Richview — Kano Mall",
    address: "Mall Road, Kano",
    city: "Kano",
    phone: "+234 800 000 4001",
    lat: 11.9964,
    lng: 8.5167,
    hours: "Tue–Sun 10:00–19:00",
  },
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function StoreLocatorPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Store>(STORES[0]);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [mapSrc, setMapSrc] = useState(
    `https://www.google.com/maps?q=${STORES[0].lat},${STORES[0].lng}&z=14&output=embed`
  );
  const [loadingGeo, setLoadingGeo] = useState(false);

  useEffect(() => {
    if (selected) {
      setMapSrc(`https://www.google.com/maps?q=${selected.lat},${selected.lng}&z=14&output=embed`);
    }
  }, [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STORES;
    return STORES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    );
  }, [query]);

  const findNearest = async () => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not available in your browser.");
      return;
    }
    
    setLoadingGeo(true);
    setErrorMsg("");
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      const { latitude, longitude } = position.coords;
      setUserPos({ lat: latitude, lng: longitude });

      let nearest: Store | null = null;
      let minD = Infinity;
      
      for (const s of STORES) {
        const d = calculateDistance(latitude, longitude, s.lat, s.lng);
        if (d < minD) {
          minD = d;
          nearest = s;
        }
      }

      if (nearest) {
        setSelected(nearest);
        setMapSrc(`https://www.google.com/maps?q=${nearest.lat},${nearest.lng}&z=13&output=embed`);
      } else {
        setErrorMsg("No stores available.");
      }
    } catch {
      setErrorMsg("Location permission denied or unavailable.");
    } finally {
      setLoadingGeo(false);
    }
  };

  const handleSelect = (store: Store) => {
    setSelected(store);
    setErrorMsg("");
  };

  const copyStoreInfo = async () => {
    try {
      await navigator.clipboard.writeText(
        `${selected.name} — ${selected.address} — ${selected.phone}`
      );
      // You could replace alert with a toast notification
      alert("Store info copied to clipboard!");
    } catch {
      alert("Failed to copy store info.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-slate-900 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Store Locator
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover your nearest Richview boutique. Search by location or let us find the closest store for you.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Search & Stores */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Search Section */}
            <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/20 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city, address, or store..."
                    className="w-full px-4 py-4 pl-12 rounded-xl bg-slate-800/50 border border-slate-600 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={findNearest}
                    disabled={loadingGeo}
                    className="col-span-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25"
                  >
                    {loadingGeo ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Finding Nearest Store...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Find Nearest Store
                      </span>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMapSrc(`https://www.google.com/maps?q=${selected.lat},${selected.lng}&z=14&output=embed`)}
                    className="px-4 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 font-medium transition-all duration-300"
                  >
                    Center Map
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuery("")}
                    className="px-4 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 font-medium transition-all duration-300"
                  >
                    Clear Search
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Stores List */}
            <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/20 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-semibold text-lg mb-4 text-zinc-200">
                Stores ({filtered.length})
              </h3>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {filtered.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <div className="text-6xl mb-4">🔍</div>
                      <p className="text-zinc-500">No stores found</p>
                      <p className="text-zinc-600 text-sm mt-1">Try adjusting your search terms</p>
                    </motion.div>
                  ) : (
                    filtered.map((store, index) => {
                      const distance = userPos ? calculateDistance(userPos.lat, userPos.lng, store.lat, store.lng).toFixed(1) : null;
                      const isActive = selected?.id === store.id;

                      return (
                        <motion.div
                          key={store.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSelect(store)}
                          className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20"
                              : "bg-slate-800/30 border-slate-600/50 hover:border-slate-500 hover:bg-slate-700/30"
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white truncate">{store.name}</h4>
                              <p className="text-zinc-400 text-sm mt-1 truncate">{store.address}</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                                <span>🕒 {store.hours}</span>
                                <span>•</span>
                                <span>📍 {store.city}</span>
                              </div>
                            </div>
                            
                            <div className="text-right space-y-2 flex-shrink-0">
                              {distance && (
                                <div className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                  {distance} km
                                </div>
                              )}
                              <motion.a
                                whileHover={{ scale: 1.05 }}
                                href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-medium transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Directions
                              </motion.a>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Helper Text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-zinc-500 text-sm bg-slate-900/30 rounded-xl p-4 border border-slate-700/30"
            >
              <p>💡 Click any store to view details and center the map</p>
            </motion.div>

            {/* Error Display */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errorMsg}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Panel - Map & Store Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Map Container */}
            <div className="rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl bg-slate-900">
              <iframe
                title="store-map"
                src={mapSrc}
                className="w-full h-[400px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Selected Store Card */}
            <motion.div 
              layout
              className="bg-gradient-to-br from-slate-900 to-purple-900/20 backdrop-blur-sm border-2 border-slate-700/50 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3"
                  >
                    {selected.name}
                  </motion.h2>
                  <div className="space-y-2 text-zinc-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <span>{selected.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span>{selected.hours}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span>{selected.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-center transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Get Directions
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyStoreInfo}
                    className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Info
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Store Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "🕒", title: "Opening Hours", content: selected.hours },
                { icon: "📞", title: "Contact", content: selected.phone },
                { icon: "📍", title: "Location", content: selected.city }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-xl bg-gradient-to-br from-slate-900/80 to-purple-900/20 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-zinc-300 text-sm">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}