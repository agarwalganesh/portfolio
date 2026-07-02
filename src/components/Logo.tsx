const Logo = ({ size = 48 }: { size?: number }) => {
  const w = size * 1.3;
  return (
    <svg
      viewBox="0 0 115 88"
      width={w}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GA. — Ganesh Agarwal"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1ae8cc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* G — large ghost fill */}
      <text
        x="4"
        y="82"
        fontSize="90"
        fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif"
        fill="url(#logoGrad)"
        opacity="0.12"
      >
        G
      </text>

      {/* G — outlined stroke */}
      <text
        x="4"
        y="82"
        fontSize="90"
        fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif"
        fill="none"
        stroke="url(#logoGrad)"
        strokeWidth="2"
        filter="url(#logoGlow)"
      >
        G
      </text>

      {/* A layered on top */}
      <text
        x="50"
        y="74"
        fontSize="54"
        fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif"
        fill="url(#logoGrad)"
      >
        A
      </text>

      {/* Dot — cyan accent */}
      <circle cx="106" cy="72" r="5" fill="#1ae8cc" filter="url(#logoGlow)" />
    </svg>
  );
};

export default Logo;
