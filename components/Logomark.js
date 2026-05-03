export default function Logomark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="lgrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#22d3a5" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" stroke="url(#lgrad)" strokeWidth="1.4" />
      <g className="kw-logo-globe">
        <ellipse cx="16" cy="16" rx="15" ry="6" stroke="#22d3a5" strokeOpacity="0.35" fill="none" />
        <line x1="16" y1="1" x2="16" y2="31" stroke="#7c5cff" strokeOpacity="0.4" />
      </g>
      <path d="M9 10 L9 22 M9 16 L15 10 M9 16 L15 22" stroke="#f5f5f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="10" r="1.6" fill="#22d3a5" />
    </svg>
  );
}
