"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ChevronRight } from "lucide-react";
import OliveDivider from "@/components/OliveDivider";
import type { Memorial } from "@/data/memorials/jean-dupont";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function HomeContent({ memorial: m, slug }: { memorial: Memorial; slug: string }) {
  return (
    <main className="pb-6">
      {/* Cover */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={m.cover.src}
          alt={m.cover.alt}
          fill
          priority
          sizes="(max-width: 440px) 100vw, 440px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/10 via-sand-100/30 to-sand-100" />
      </div>

      {/* Portrait + identity */}
      <div className="-mt-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto w-40 h-40 rounded-full overflow-hidden ring-4 ring-sand-50 shadow-soft"
        >
          <div className="absolute inset-0 rounded-full ring-1 ring-gold-500/40 z-10 pointer-events-none" />
          <Image
            src={m.hero.src}
            alt={m.hero.alt}
            fill
            priority
            sizes="160px"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-6"
        >
          <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80">En mémoire de</p>
          <h1 className="mt-2 text-4xl text-ink-900 leading-tight">{m.name}</h1>
          <div className="flex items-center justify-center gap-3 mt-3 text-warm-500 text-sm tracking-wider">
            <span>{m.born}</span>
            <span className="block w-8 h-px bg-gold-500/60" />
            <span>{m.died}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
        >
          <OliveDivider className="my-7" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="font-serif italic text-ink-800 text-lg leading-relaxed text-balance px-2"
        >
          « {m.epitaph} »
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="mt-6 text-sm text-warm-600 leading-relaxed text-balance px-1"
        >
          {m.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
          className="mt-9"
        >
          <Link
            href={`/m/${slug}/messages`}
            className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-ink-900 text-sand-50 text-sm shadow-soft hover:shadow-gold transition-all"
          >
            <Flame size={16} className="text-gold-500 transition-transform group-hover:scale-110" />
            <span className="tabular-nums">
              <strong className="font-semibold">{m.candles.toLocaleString("fr-BE")}</strong>
              <span className="opacity-80"> bougies allumées</span>
            </span>
            <ChevronRight size={14} className="opacity-50 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
