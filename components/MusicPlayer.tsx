"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import clsx from "clsx";

type Props = {
  src?: string;
  volume?: number; // 0..1
};

export default function MusicPlayer({ src = "/audio/ambient.mp3", volume = 0.4 }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Fade helper
  const fadeTo = (target: number, durationMs = 1500) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start = audio.volume;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      audio.volume = start + (target - start) * t;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Auto-start on the very first user interaction anywhere in the page.
  useEffect(() => {
    if (hasStarted) return;
    const onFirstInteraction = async () => {
      const audio = audioRef.current;
      if (!audio || hasStarted) return;
      try {
        audio.volume = 0;
        await audio.play();
        setHasStarted(true);
        setIsPlaying(true);
        fadeTo(volume, 1500);
      } catch {
        // Autoplay still blocked — wait for explicit toggle click.
      }
    };
    const events: (keyof DocumentEventMap)[] = ["click", "touchstart", "keydown"];
    events.forEach((e) => document.addEventListener(e, onFirstInteraction, { once: true, passive: true }));
    return () => {
      events.forEach((e) => document.removeEventListener(e, onFirstInteraction));
    };
  }, [hasStarted, volume]);

  // Pause when tab hidden, resume when visible (if was playing)
  useEffect(() => {
    const onVisChange = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        if (!audio.paused) audio.pause();
      } else if (isPlaying && audio.paused) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisChange);
    return () => document.removeEventListener("visibilitychange", onVisChange);
  }, [isPlaying]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        audio.volume = 0;
        await audio.play();
        setHasStarted(true);
        setIsPlaying(true);
        fadeTo(volume, 900);
      } catch {
        /* ignore */
      }
    } else {
      fadeTo(0, 500);
      setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, 520);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" aria-hidden />

      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Couper la musique" : "Activer la musique"}
        aria-pressed={isPlaying}
        className={clsx(
          "fixed top-3 right-3 z-[60] flex items-center justify-center",
          "w-10 h-10 rounded-full",
          "bg-sand-50/90 backdrop-blur-sm border border-sand-200",
          "shadow-soft hover:shadow-gold transition-all active:scale-95",
          isPlaying ? "text-gold-700" : "text-warm-500"
        )}
      >
        {/* Halo pulsant tant que la musique n'a pas démarré, pour attirer l'œil */}
        <AnimatePresence>
          {!hasStarted && (
            <motion.span
              key="halo"
              className="absolute inset-0 rounded-full bg-gold-500/30"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: [1, 1.55, 1], opacity: [0.6, 0, 0.6] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          )}
        </AnimatePresence>

        {isPlaying ? (
          <Music size={16} strokeWidth={1.8} className="relative" />
        ) : (
          <VolumeX size={16} strokeWidth={1.8} className="relative" />
        )}
      </button>
    </>
  );
}
