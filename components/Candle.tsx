"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  lit: boolean;
  size?: number;
};

/**
 * SVG candle with an animated flame ignition + continuous flicker
 * + glow halo + smoke wisp when extinguished.
 */
export default function Candle({ lit, size = 100 }: Props) {
  // viewBox = 100x170. Width auto-scales by `size`; height keeps the SVG aspect ratio.
  return (
    <svg
      width={size}
      height={size * 1.7}
      viewBox="0 0 100 170"
      className="overflow-visible"
      aria-hidden
    >
      <defs>
        <radialGradient id="cglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#FFE6A8" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#F5C56B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cflame-outer" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%"  stopColor="#FF7A1F" />
          <stop offset="55%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#FFE08A" />
        </linearGradient>
        <linearGradient id="cflame-inner" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%"  stopColor="#FFC15A" />
          <stop offset="100%" stopColor="#FFF5C8" />
        </linearGradient>
        <linearGradient id="ccandle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#E5D6BB" />
          <stop offset="50%"  stopColor="#FBF8F2" />
          <stop offset="100%" stopColor="#D4C3A0" />
        </linearGradient>
      </defs>

      {/* Base shadow */}
      <ellipse cx={50} cy={166} rx={18} ry={3} fill="#1A1A2E" opacity={0.18} />

      {/* Glow halo, only when lit */}
      <AnimatePresence>
        {lit && (
          <motion.g key="glow">
            <motion.circle
              cx={50}
              cy={50}
              r={32}
              fill="url(#cglow)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                scale:   { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "50px 50px", transformBox: "view-box" as const }}
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Candle body */}
      <rect x={38} y={78} width={24} height={84} rx={2} fill="url(#ccandle)" stroke="#C9B58D" strokeWidth={0.4} />
      <rect x={38} y={78} width={3}  height={84} rx={1} fill="#FFFFFF" opacity={0.35} />

      {/* Top of candle — slight melted wax */}
      <ellipse cx={50} cy={78} rx={12} ry={3} fill="#F9F4EC" stroke="#D4C3A0" strokeWidth={0.4} />
      <path
        d="M 39 78 Q 42 82 45 79 Q 48 83 51 79 Q 54 82 57 79 Q 60 82 61 78"
        fill="none" stroke="#D4C3A0" strokeWidth={0.4}
      />

      {/* Wick */}
      <line
        x1={50} y1={68} x2={50} y2={78}
        stroke={lit ? "#5A3E22" : "#1F1B16"}
        strokeWidth={1.4}
        strokeLinecap="round"
      />

      {/* Flame */}
      <AnimatePresence>
        {lit && (
          <motion.g
            key="flame"
            initial={{ opacity: 0, scaleY: 0.05, scaleX: 0.4 }}
            animate={{
              opacity: 1,
              scaleY: [0.96, 1.05, 0.98, 1.04, 0.97, 1.02, 1],
              scaleX: [1.02, 0.97, 1.03, 0.98, 1.04, 0.99, 1],
            }}
            exit={{ opacity: 0, scaleY: 0, y: -2 }}
            transition={{
              opacity: { duration: 0.35 },
              y: { duration: 0.35 },
              scaleY: { duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
              scaleX: { duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
            }}
            style={{ transformOrigin: "50px 68px", transformBox: "view-box" as const }}
          >
            {/* Outer flame */}
            <path
              d="M 50 28
                 Q 38 42 38 56
                 Q 38 67 50 67
                 Q 62 67 62 56
                 Q 62 42 50 28 Z"
              fill="url(#cflame-outer)"
              opacity={0.96}
            />
            {/* Inner flame */}
            <path
              d="M 50 38
                 Q 43 47 43 58
                 Q 43 64 50 64
                 Q 57 64 57 58
                 Q 57 47 50 38 Z"
              fill="url(#cflame-inner)"
            />
            {/* Hot core */}
            <ellipse cx={50} cy={58} rx={1.6} ry={3.5} fill="#FFFFFF" opacity={0.75} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Smoke wisp when just extinguished */}
      <AnimatePresence>
        {!lit && (
          <motion.path
            key="smoke"
            d="M 50 66 Q 53 58 48 50 Q 53 42 50 34"
            stroke="rgba(180,175,165,0.6)"
            strokeWidth={1.2}
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.7, 0], y: -18 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}
