type Props = {
  name: string;
  size?: number;
  className?: string;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function InitialAvatar({ name, size = 56, className = "" }: Props) {
  const initials = getInitials(name);
  const fontSize = Math.round(size * 0.42);

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label={name}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id={`bg-${initials}`} cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#F9F4EC" />
            <stop offset="60%" stopColor="#EDE3D1" />
            <stop offset="100%" stopColor="#D4B97A" stopOpacity="0.45" />
          </radialGradient>
          <linearGradient id={`text-${initials}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A961" />
            <stop offset="100%" stopColor="#8A6F38" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#bg-${initials})`} />
        <text
          x="50"
          y="58"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontWeight="500"
          fontSize={fontSize}
          fill={`url(#text-${initials})`}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
