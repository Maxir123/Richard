"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X, Shield, Lock, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const paystackUrl = searchParams.get("url");

  useEffect(() => {
    if (!paystackUrl) {
      router.push("/");
    }
  }, [paystackUrl, router]);

  const handleClose = () => {
    router.back();
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
  };

  const handleRetry = () => {
    setIframeError(false);
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  if (!paystackUrl) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Checkout URL</h1>
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Enhanced Viewport Meta for Mobile */}
      <style jsx global>{`
        body {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          height: 100% !important;
        }
        
        /* Ensure iframe gets all touch events */
        iframe {
          -webkit-overflow-scrolling: touch !important;
          touch-action: auto !important;
        }
      `}</style>

      {/* Minimal Floating Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md py-2 px-4"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="p-2 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-200 group shadow-lg"
          >
            <X className="w-5 h-5 text-white group-hover:text-gray-300" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="hidden xs:flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              <Shield className="w-3 h-3" />
              <span>Secure</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
              <Lock className="w-3 h-3" />
              <span>Paystack</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-40 bg-black flex items-center justify-center p-4">
          <div className="text-center max-w-xs">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg mb-2">Loading Checkout</p>
            <p className="text-gray-400 text-sm">
              Preparing secure payment environment...
            </p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {iframeError && (
        <div className="absolute inset-0 z-40 bg-black flex items-center justify-center p-4">
          <div className="text-center max-w-sm w-full">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <X className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">
              Checkout Failed
            </h3>
            <p className="text-gray-400 mb-2 text-sm">
              We couldn&apos;t load the payment page. This might be due to:
            </p>
            <ul className="text-gray-400 text-xs mb-6 text-left space-y-1 max-w-xs mx-auto">
              <li>• Poor network connection</li>
              <li>• Browser security settings</li>
              <li>• Temporary service issue</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={handleClose}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Iframe - Absolutely positioned */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          key={iframeKey}
          src={paystackUrl}
          className="w-full h-full border-0 absolute inset-0"
          title="Paystack Secure Checkout"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox"
          allow="payment *; fullscreen *"
          allowFullScreen
          // Use standard attributes only
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
      </div>

      {/* Floating Security Badge - Only on mobile and when loaded */}
      {!isLoading && !iframeError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
        >
          <div className="bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-zinc-700 shadow-2xl">
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Secure Payment</span>
              </div>
              <div className="w-px h-3 bg-zinc-600"></div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-blue-400" />
                <span className="hidden xs:inline">Paystack</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
