/**
 * CurveSeparator component
 *
 * Renders a decorative curved SVG separator used to visually divide
 * sections of a webpage. The component includes:
 * - A black background curve.
 * - A gradient stroke curve layered on top.
 * - A glow effect created with SVG drop shadows.
 *
 * The SVG scales responsively thanks to `preserveAspectRatio="none"`,
 * ensuring smooth stretching across all screen sizes.
 */

export default function CurveSeparator() {
  return (
    <div className="relative w-full bg-black">
      <svg
        className="w-full h-24 block"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0,100 C400,0 1040,0 1440,100" fill="black" />

        <path
          d="M0,98 C400,-2 1040,-2 1440,98"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.05" />
          </linearGradient>

          <filter id="glow" x="-90%" y="-80%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="10"
              floodColor="#DC2626"
              floodOpacity="0.9"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="6"
              floodColor="#9333EA"
              floodOpacity="0.4"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
