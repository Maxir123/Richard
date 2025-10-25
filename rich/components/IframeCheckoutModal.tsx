// components/IframeCheckoutModal.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";

interface Props {
  open: boolean;
  url: string | null;
  onClose: () => void;
  autoFallbackMs?: number; // fallback after X ms if iframe never loads
}

export default function IframeCheckoutModal({ open, url, onClose, autoFallbackMs = 7000 }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [checking, setChecking] = useState(false);
  const [frameable, setFrameable] = useState<boolean | null>(null);
  const [blockedReason, setBlockedReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !url) return;
    let cancelled = false;
    setChecking(true);
    setFrameable(null);
    setBlockedReason(null);
    setLoading(true);

    const encoded = encodeURIComponent(url);
    fetch(`/api/check-frame?url=${encoded}`)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json?.ok) {
          setFrameable(Boolean(json.frameable));
          if (!json.frameable) {
            setBlockedReason(
              `Blocked by response headers (x-frame-options: ${json.headers["x-frame-options"] ?? "none"}, csp: ${json.headers["content-security-policy"] ? "present" : "none"})`
            );
          }
        } else {
          setFrameable(false);
          setBlockedReason(json?.message ?? "Unknown check failure");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Frame check error:", err);
        setFrameable(false);
        setBlockedReason(err?.message ?? "Network error");
      })
      .finally(() => {
        if (!cancelled) {
          setChecking(false);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, url]);

  // If iframe fails to load / never calls onLoad within autoFallbackMs, fallback to opening in new tab
  useEffect(() => {
    if (!open || frameable !== true) return;
    let timeout = window.setTimeout(() => {
      // if iframe didn't successfully load or seems stuck, fallback
      // we won't check contentDocument (cross-origin) — just provide user fallback
      console.warn("Iframe might be blocked or stuck — suggesting fallback.");
      // we keep the modal open but show a 'Open in new tab' button and offer to auto-open
    }, autoFallbackMs);
    return () => clearTimeout(timeout);
  }, [open, frameable, autoFallbackMs]);

  function openInNewTab() {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  function onIframeLoad() {
    // iframe fired load — good sign (but not guarantee)
    console.log("iframe onLoad fired");
    setLoading(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Top tab */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/60 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="text-sm text-white/90">Secure payment</div>
            {checking && <div className="ml-2 text-xs text-gray-300">checking embed capability…</div>}
            {frameable === false && <div className="ml-2 text-xs text-orange-300">embed blocked</div>}
          </div>

          <div className="flex items-center gap-2">
            <button className="text-sm px-3 py-1 rounded bg-white/10" onClick={openInNewTab}>
              Open in new tab
            </button>
            <button className="text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>

        <div className="p-4">
          {frameable === null && (
            <div className="text-center text-sm text-gray-300 py-8">
              {checking ? "Checking whether this provider allows embedding…" : "Preparing…"}
            </div>
          )}

          {frameable === false && (
            <div className="text-center py-8">
              <div className="text-yellow-300 mb-4">This payment provider cannot be embedded in an iframe.</div>
              <div className="text-sm text-gray-300 mb-6">{blockedReason}</div>
              <div className="flex justify-center gap-3">
                <button onClick={openInNewTab} className="px-4 py-2 bg-blue-600 rounded">
                  Open in new tab
                </button>
                <button onClick={onClose} className="px-4 py-2 border rounded">
                  Close
                </button>
              </div>
            </div>
          )}

          {frameable === true && (
            <div className="relative">
              <div className="text-sm text-gray-300 mb-2">If nothing happens, click “Open in new tab”.</div>

              <div className="w-full h-[600px] bg-black/10 rounded overflow-hidden border border-zinc-800">
                <iframe
                  ref={iframeRef}
                  title="Checkout"
                  src={url ?? undefined}
                  onLoad={onIframeLoad}
                  // sandbox attributes: allow-same-origin + allow-scripts permit many flows.
                  // allow-top-navigation-by-user-activation allows navigation to top after user interaction.
                  sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>

              <div className="flex gap-3 justify-center mt-4">
                <button onClick={openInNewTab} className="px-4 py-2 bg-blue-600 rounded">
                  Open in new tab
                </button>
                <button onClick={onClose} className="px-4 py-2 border rounded">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
