"use client";

import { useCallback, useEffect, useState } from "react";

const key = (slug: string) => `empreinte:candle:${slug}`;

/**
 * One candle per device, per memorial. Persisted in localStorage.
 * Hydration-safe (returns `lit=false, ready=false` on the server).
 */
export function useCandle(slug: string) {
  const [lit, setLit] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setLit(localStorage.getItem(key(slug)) === "1");
    } catch {
      // localStorage may be unavailable (private mode, etc.) — stay silent.
    }
    setReady(true);
  }, [slug]);

  const toggle = useCallback(() => {
    setLit((prev) => {
      const next = !prev;
      try {
        if (next) localStorage.setItem(key(slug), "1");
        else localStorage.removeItem(key(slug));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, [slug]);

  return { lit, ready, toggle };
}
