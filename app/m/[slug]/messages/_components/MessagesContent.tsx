"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import OliveDivider from "@/components/OliveDivider";
import Candle from "@/components/Candle";
import { useCandle } from "@/hooks/useCandle";
import { useMessages } from "@/hooks/useMessages";
import MessageComposer from "./MessageComposer";
import type { Memorial, Message } from "@/data/memorials/jean-dupont";

const ease = [0.22, 0.61, 0.36, 1] as const;

type DisplayMessage = Message & { isUser?: boolean; id?: string };

export default function MessagesContent({
  memorial: m,
  slug,
}: {
  memorial: Memorial;
  slug: string;
}) {
  const { lit, ready: candleReady, light } = useCandle(slug);
  const { messages: userMessages, add } = useMessages(slug);

  const total = m.candles + (lit ? 1 : 0);

  const allMessages: DisplayMessage[] = [
    ...m.messages,
    ...userMessages.map((u) => ({
      author: u.author,
      relation: u.relation,
      text: u.text,
      date: u.date,
      id: u.id,
      isUser: true,
    })),
  ];

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
        <AnimatePresence initial={false}>
          {allMessages.map((msg, idx) => (
            <motion.li
              key={msg.id ?? `static-${idx}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: msg.isUser ? 0 : 0.05 * idx, ease }}
              className={
                msg.isUser
                  ? "bg-sand-50 border border-gold-500/40 rounded-xl p-4 shadow-soft"
                  : "bg-sand-50/80 backdrop-blur-sm border border-sand-200/60 rounded-xl p-4 shadow-soft"
              }
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
              <p className="text-sm text-warm-600 leading-relaxed whitespace-pre-line">{msg.text}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <MessageComposer onSubmit={add} />

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

        {!lit ? (
          <button
            onClick={light}
            disabled={!candleReady}
            className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink-900 text-sand-50 text-sm shadow-soft hover:shadow-gold transition-all active:scale-95 disabled:opacity-60"
          >
            <Flame size={16} className="text-gold-500" />
            <span>Allumer une bougie</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sand-50 text-gold-700 border border-gold-500/40"
          >
            <Flame size={14} className="text-gold-600" fill="currentColor" />
            <span className="text-sm italic">Votre bougie brûle pour lui</span>
          </motion.div>
        )}

        <AnimatePresence>
          {lit && (
            <motion.p
              key="thanks"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-3 text-xs text-gold-700 italic"
            >
              Merci pour votre lumière.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.section>
    </main>
  );
}
