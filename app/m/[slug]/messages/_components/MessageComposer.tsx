"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Send, X } from "lucide-react";

const MAX_LEN = 500;
const ease = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  onSubmit: (msg: { author: string; relation?: string; text: string }) => void;
  disabled?: boolean;
};

export default function MessageComposer({ onSubmit, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [relation, setRelation] = useState("");
  const [text, setText] = useState("");

  const canSubmit = author.trim().length > 0 && text.trim().length > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      author: author.trim(),
      relation: relation.trim() || undefined,
      text: text.trim(),
    });
    setAuthor("");
    setRelation("");
    setText("");
    setOpen(false);
  };

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.button
            key="trigger"
            type="button"
            onClick={() => setOpen(true)}
            disabled={disabled}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-ink-800 text-sm shadow-soft hover:shadow-gold transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <PenLine size={15} className="text-gold-600" />
            <span>Laisser un message</span>
          </motion.button>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="bg-sand-50 border border-gold-500/40 rounded-xl p-4 shadow-soft overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] tracking-wider2 uppercase text-gold-700/80">
                Votre message
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-warm-500 hover:text-ink-800 p-1 -mr-1"
                aria-label="Annuler"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Votre prénom"
                  maxLength={40}
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-sand-300 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition"
                />
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="Lien (ex : Sa nièce)"
                  maxLength={40}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-sand-300 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition"
                />
              </div>

              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_LEN))}
                  placeholder="Quelques mots en sa mémoire…"
                  rows={4}
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-sand-300 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition resize-none leading-relaxed"
                />
                <p className="absolute bottom-1.5 right-2 text-[10px] text-warm-400 pointer-events-none">
                  {text.length}/{MAX_LEN}
                </p>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-ink-900 text-sand-50 text-sm shadow-soft hover:shadow-gold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} className="text-gold-500" />
                <span>Envoyer mon message</span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
