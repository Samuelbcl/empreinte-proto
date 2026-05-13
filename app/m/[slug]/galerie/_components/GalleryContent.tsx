"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import OliveDivider from "@/components/OliveDivider";
import type { Memorial } from "@/data/memorials/jean-dupont";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function GalleryContent({ memorial: m }: { memorial: Memorial }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const photos = m.photos;

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (openIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, next, prev]);

  return (
    <main className="px-5 pt-8 pb-6">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center mb-6"
      >
        <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80">Galerie</p>
        <h1 className="mt-2 text-3xl">Souvenirs</h1>
        <OliveDivider className="mt-3" />
      </motion.header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
          hidden: {},
        }}
        className="grid grid-cols-2 gap-2.5"
      >
        {photos.map((photo, idx) => (
          <motion.button
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 14, scale: 0.96 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.55, ease }}
            onClick={() => setOpenIdx(idx)}
            className="relative aspect-square overflow-hidden rounded-md bg-sand-200 shadow-soft active:scale-95 transition-transform group"
            aria-label={`Voir : ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 440px) 50vw, 220px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 ring-1 ring-inset ring-gold-500/0 group-hover:ring-gold-500/30 transition-shadow" />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-ink-900/95 backdrop-blur-md flex items-center justify-center"
            onClick={close}
          >
            <button
              className="absolute top-4 right-4 text-sand-50/80 hover:text-sand-50 p-2 z-10"
              aria-label="Fermer"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 text-sand-50/70 hover:text-sand-50 p-2 z-10"
              aria-label="Photo précédente"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sand-50/70 hover:text-sand-50 p-2 z-10"
              aria-label="Photo suivante"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={openIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease }}
              className="relative w-full h-full max-w-md flex flex-col items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-square max-h-[70vh]">
                <Image
                  src={photos[openIdx].src}
                  alt={photos[openIdx].alt}
                  fill
                  sizes="(max-width: 440px) 100vw, 440px"
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-4 text-sand-50/80 text-sm text-center px-4">
                {photos[openIdx].alt}
              </p>
              <p className="mt-1 text-sand-50/50 text-xs text-center">
                {openIdx + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
