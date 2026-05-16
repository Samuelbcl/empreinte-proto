"use client";

import { useCallback, useEffect, useState } from "react";

export type UserMessage = {
  id: string;
  author: string;
  relation?: string;
  text: string;
  date: string;
};

const key = (slug: string) => `empreinte:messages:${slug}`;

/**
 * Messages laissés par le visiteur, persistés en localStorage (proto only).
 * Plusieurs messages autorisés.
 */
export function useMessages(slug: string) {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key(slug));
      if (raw) setMessages(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [slug]);

  const add = useCallback(
    (msg: Omit<UserMessage, "id" | "date">) => {
      const now = new Date();
      const date = now.toLocaleDateString("fr-BE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `m-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      setMessages((prev) => {
        const next: UserMessage[] = [...prev, { ...msg, id, date }];
        try {
          localStorage.setItem(key(slug), JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [slug]
  );

  return { messages, ready, add };
}
