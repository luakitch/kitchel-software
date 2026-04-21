"use client";

import type { MotionValue } from "motion/react";
import { VinylRecord } from "./vinyl-record";

type Props = {
  rotation: MotionValue<number>;
};

/**
 * Full-viewport ambient platter on small screens (no desktop rail).
 * Sits behind page content (z-0); large, low-contrast, and softly vignetted
 * so it reads as atmosphere rather than UI chrome.
 */
export function DeepCutMobileVinylBackdrop({ rotation }: Props) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden lg:hidden"
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-[38%] aspect-square -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "max(132vw, 118vh)",
          height: "max(132vw, 118vh)",
          opacity: 0.17,
          WebkitMaskImage:
            "radial-gradient(closest-side, #000 48%, rgba(0,0,0,0.55) 68%, transparent 100%)",
          maskImage:
            "radial-gradient(closest-side, #000 48%, rgba(0,0,0,0.55) 68%, transparent 100%)",
        }}
      >
        <VinylRecord
          ambient
          idPrefix="deepcut-mobile-backdrop"
          rotation={rotation}
          className="aspect-square h-full w-full max-w-none"
        />
      </div>

      {/* Pull viewport edges back to page background so the disc melts in */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 95% 88% at 50% 36%, transparent 32%, var(--background) 96%),
            linear-gradient(to bottom, var(--background) 0%, transparent 14%, transparent 86%, var(--background) 100%)
          `,
          opacity: 0.92,
        }}
      />
    </div>
  );
}
