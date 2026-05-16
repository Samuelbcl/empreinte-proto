"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import OliveDivider from "@/components/OliveDivider";
import Candle from "@/components/Candle";
import { useCandle } from "@/hooks/useCandle";
import type { Memorial } from "@/data/memorials/jean-dupont";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function MessagesContent({
  memorial: m,
  slug,
}: {
  memorial: Memorial;
  slug: string;
}) {
  const { lit, ready, toggle } = useCandle(slug);
  const total = m.candles + (lit ? 1 : 0);

  return (
    <main className="px-5 pt-8 pb-6">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center mb-7"
      >
        <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80">En souvenir</p>
        <h1 className="mt-2 text-3xl">Vos messages</h1>
        <OliveDivider className="mt-3" />
      </motion.header>

      <ul className="space-y-4">
        {m.messages.map((msg, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 * idx, ease }}
            className="bg-sand-50/80 backdrop-blur-sm border border-sand-200/60 rounded-xl p-4 shadow-soft"
          >
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <div>
                <p className="font-serif text-base text-ink-900 leading-none">{msg.author}</p>
                {msg.relation && (
                  <p className="text-[11px] text-warm-500 mt-1 italic">{msg.relation}</p>
                )}
              </div>
              <p className="text-[10px] text-warm-400 whitespace-nowrap shrink-0">{msg.date}</p>
            </div>
            <p className="text-sm text-warm-600 leading-relaxed">{msg.text}</p>
          </motion.li>
        ))}
      </ul>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease }}
        className="mt-10 bg-gradient-to-b from-sand-50 to-sand-200/40 border border-sand-200 rounded-2xl p-6 text-center shadow-soft"
        aria-label="Bougie virtuelle"
      >
        <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80">
          Une bougie pour lui
        </p>

        <div className="my-3 flex items-end justify-center min-h-[170px]">
          <Candle lit={lit} size={90} />
        </div>

        <p className="text-sm">
          <span className="tabular-nums text-ink-900 font-medium text-xl font-serif">
            {total.toLocaleString("fr-BE")}
          </span>
          <span className="text-warm-500 ml-1">bougies allumées</span>
        </p>

        <button
          onClick={toggle}
          disabled={!ready}
          className={
            lit
              ? "mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sand-50 text-ink-900 border border-sand-300 text-sm shadow-soft hover:shadow-gold transition-all active:scale-95"
              : "mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink-900 text-sand-50 text-sm shadow-soft hover:shadow-gold transition-all active:scale-95"
          }
        >
          <Flame size={16} className={lit ? "text-warm-500" : "text-gold-500"} />
          <span>{lit ? "Éteindre ma bougie" : "Allumer une bougie"}</span>
        </button>

        <AnimatePresence mode="wait">
          {lit ? (
            <motion.p
              key="thanks"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className="mt-3 text-xs text-gold-700 italic"
            >
              Merci pour votre lumière.
            </motion.p>
          ) : ready ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-[11px] text-warm-400"
            >
              Une seule bougie par personne, en mémoire.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.section>
    </main>
  );
}
