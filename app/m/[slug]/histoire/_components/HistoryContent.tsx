"use client";

import { motion } from "framer-motion";
import OliveDivider from "@/components/OliveDivider";
import type { Memorial } from "@/data/memorials/jean-dupont";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function HistoryContent({ memorial: m }: { memorial: Memorial }) {
  return (
    <main className="px-5 pt-8 pb-6">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center mb-10"
      >
        <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80">Étapes de vie</p>
        <h1 className="mt-2 text-3xl">Son histoire</h1>
        <OliveDivider className="mt-3" />
      </motion.header>

      <ol className="relative pl-8 space-y-9">
        <span
          aria-hidden
          className="absolute left-2 top-1.5 bottom-2 w-px bg-gradient-to-b from-gold-500/70 via-gold-500/30 to-transparent"
        />

        {m.timeline.map((event, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.04 * idx, ease }}
            className="relative"
          >
            <span
              aria-hidden
              className="absolute -left-[28px] top-2 w-3 h-3 rounded-full bg-gold-500 ring-4 ring-sand-100 shadow-sm"
            />
            <p className="font-serif text-2xl text-gold-700 leading-none">{event.year}</p>
            <h3 className="mt-2 text-lg text-ink-900 leading-snug">{event.title}</h3>
            {event.description && (
              <p className="mt-1.5 text-sm text-warm-600 leading-relaxed">{event.description}</p>
            )}
          </motion.li>
        ))}
      </ol>
    </main>
  );
}
