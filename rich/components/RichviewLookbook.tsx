'use client';

import React, { useEffect, useState } from 'react';

type Props = {
  images?: string[]; // array of public paths (e.g. '/assets/lookbook/midnight-trench.jpg')
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
  const gallery = images.length
    ? images
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
    <main className="min-h-screen bg-[#070707] text-white p-8">
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-serif tracking-tight">{title}</h1>
        <p className="mt-2 text-gray-300">{subtitle}</p>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((src, i) => (
          <button
            key={src + i}
            onClick={() => openAt(i)}
            className="group overflow-hidden rounded-2xl bg-black relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
            aria-label={`Open look ${i + 1}`}
          >
            <div className="w-full h-80 bg-[#0b0b0b]">
              <img
                src={src}
                alt={`Look ${i + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  // fallback to avoid broken images
                  (e.currentTarget as HTMLImageElement).src = '/assets/lookbook/placeholder.jpg';
                }}
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
          </button>
        ))}
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
                src={gallery[index]}
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

      <footer className="max-w-6xl mx-auto mt-12 text-gray-400 text-sm flex items-center justify-between">
        <div>Contact: <a className="underline" href="mailto:hello@richview.co">hello@richview.co</a> • IG: <a className="underline" href="https://instagram.com/richview" target="_blank" rel="noreferrer">@richview</a></div>
        <div>
          <a href={pdfHref} download className="underline">
            Download PDF
          </a>
        </div>
      </footer>
    </main>
  );
}
