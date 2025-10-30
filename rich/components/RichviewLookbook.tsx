'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  images?: string[];
  title?: string;
  subtitle?: string;
  pdfHref?: string;
};

export default function RichviewLookbook({
  images = [],
  title = 'RICHVIEW',
  subtitle = 'FW25 — The Eclipse Drop',
  pdfHref = '/assets/lookbook/richview-fw25-lookbook.pdf',
}: Props) {
  const router = useRouter();

  const gallery = images.length
    ? images.map((p) => (p.startsWith('/') ? p : `/assets/lookbook/${p}`))
    : [
        '/assets/lookbook/midnight-trench.jpg',
        '/assets/lookbook/obsidian-suit.jpg',
        '/assets/lookbook/noir-slip.jpg',
        '/assets/lookbook/eclipse-bomber.jpg',
        '/assets/lookbook/onyx-turtleneck.jpg',
        '/assets/lookbook/shadow-trousers.jpg',
        '/assets/lookbook/lumen-scarf.jpg',
        '/assets/lookbook/apex-boots.jpg',
      ];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<string, true>>({});

  const inlineFallback =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
         <rect width="100%" height="100%" fill="#0b0b0b"/>
         <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="28" fill="#6b7280">Image not found</text>
       </svg>`
    );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + gallery.length) % gallery.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, gallery.length]);

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#070707] text-white p-8 relative">
      {/* Close Button (top-right corner) */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2"
        aria-label="Close Lookbook"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-serif tracking-tight">{title}</h1>
        <p className="mt-2 text-gray-300">{subtitle}</p>
      </header>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((src, i) => {
          const imgSrc = failed[src] ? inlineFallback : src;

          return (
            <button
              key={`${i}-${src}`}
              onClick={() => openAt(i)}
              className="group overflow-hidden rounded-2xl bg-black relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
              aria-label={`Open look ${i + 1}`}
            >
              <div className="w-full h-80 bg-[#0b0b0b]">
                <img
                  src={imgSrc}
                  alt={`Look ${i + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src !== inlineFallback) {
                      setFailed((s) => ({ ...s, [src]: true }));
                      img.src = inlineFallback;
                    }
                  }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            </button>
          );
        })}
      </section>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
        >
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ✕
          </button>

          <div className="max-w-4xl max-h-[90vh] w-full flex items-center justify-center">
            <button
              aria-label="Previous"
              onClick={() => setIndex((i) => (i - 1 + gallery.length) % gallery.length)}
              className="hidden md:flex items-center justify-center h-12 w-12 mr-4 bg-black/30 rounded-full"
            >
              ‹
            </button>

            <div className="w-full flex items-center justify-center">
              <img
                src={failed[gallery[index]] ? inlineFallback : gallery[index]}
                alt={`Look ${index + 1}`}
                className="max-h-[86vh] w-auto object-contain"
              />
            </div>

            <button
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % gallery.length)}
              className="hidden md:flex items-center justify-center h-12 w-12 ml-4 bg-black/30 rounded-full"
            >
              ›
            </button>
          </div>

          <div className="absolute bottom-6 left-6 text-sm text-gray-300">
            <div>{`Look ${index + 1} of ${gallery.length}`}</div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-12 text-gray-400 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          Contact:{' '}
          <a className="underline" href="mailto:richviewlimited@gmail.com">
            richviewlimited@gmail.com
          </a>{' '}
          • IG:{' '}
          <a
            className="underline"
            href="https://instagram.com/richview"
            target="_blank"
            rel="noreferrer"
          >
            @richview
          </a>
        </div>

        {/* Download Button */}
        <a
          href={pdfHref}
          download
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition font-medium"
        >
          Download Lookbook PDF
        </a>
      </footer>
    </main>
  );
}
