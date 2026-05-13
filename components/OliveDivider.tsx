export default function OliveDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/70" />
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" className="text-gold-600">
        <path
          d="M12 4 C 12 4, 7 7, 7 11 C 7 13, 9 14, 12 14 C 15 14, 17 13, 17 11 C 17 7, 12 4, 12 4 Z"
          fill="currentColor" opacity="0.85"
        />
        <path d="M12 14 V 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/70" />
    </div>
  );
}
