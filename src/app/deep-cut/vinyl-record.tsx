"use client";

import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

const GROOVE_START = 196;
const GROOVE_END = 88;
const GROOVE_STEP = 3;

type VinylRecordProps = {
  rotation: MotionValue<number>;
  className?: string;
  /** Unique prefix for SVG defs ids when multiple instances exist in the DOM. */
  idPrefix?: string;
};

export function VinylRecord({ rotation, className, idPrefix = "deepcut-vinyl" }: VinylRecordProps) {
  const pid = `${idPrefix}-`;
  const grooves = [];
  for (let r = GROOVE_START; r >= GROOVE_END; r -= GROOVE_STEP) {
    grooves.push(r);
  }

  return (
    <div
      className={className}
      style={{
        filter: "drop-shadow(0 28px 48px rgba(0, 0, 0, 0.45))",
      }}
    >
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Stylized vinyl record"
      >
        <defs>
          <radialGradient id={`${pid}sheen`} cx="32%" cy="28%" r="72%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
          </radialGradient>
          <radialGradient id={`${pid}label`} cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="var(--card-elevated)" />
            <stop offset="100%" stopColor="var(--card)" />
          </radialGradient>
          <linearGradient id={`${pid}label-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <motion.g style={{ rotate: rotation, transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="198" fill="#050508" />
          <circle cx="200" cy="200" r="198" fill={`url(#${pid}sheen)`} />

          {grooves.map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.045)"
              strokeWidth={0.6}
            />
          ))}

          <circle cx="200" cy="200" r="82" fill={`url(#${pid}label)`} />
          <circle
            cx="200"
            cy="200"
            r="82"
            fill="none"
            stroke={`url(#${pid}label-ring)`}
            strokeWidth={1.5}
            opacity={0.9}
          />

          <text
            x="200"
            y="186"
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              fontSize: "22px",
              fill: "var(--foreground)",
              letterSpacing: "-0.02em",
            }}
          >
            Deep Cut
          </text>
          <text
            x="200"
            y="214"
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "10px",
              fill: "var(--muted)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            Spin journal
          </text>

          <circle cx="200" cy="200" r="5.5" fill="var(--background)" stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
        </motion.g>
      </svg>
    </div>
  );
}
