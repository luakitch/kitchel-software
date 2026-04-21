"use client";

import type { MotionValue } from "motion/react";
import { VinylRecord } from "./vinyl-record";

type DeepCutFixedVinylProps = {
  rotation: MotionValue<number>;
};

/**
 * Oversized disc fixed to the viewport right; most of the platter sits past the edge.
 * Content-side mask feathers the disc in; a slim strip at the viewport edge uses
 * backdrop blur so the cutoff reads soft rather than razor-sharp.
 */
export function DeepCutFixedVinyl({ rotation }: DeepCutFixedVinylProps) {
  return (
    <div
      className="pointer-events-none fixed inset-y-0 right-0 z-[1] hidden w-0 overflow-visible lg:block"
      aria-hidden
    >
      <div className="relative h-full">
        <div
          className="absolute right-0 top-1/2 aspect-square w-[min(132vmin,1080px)] max-w-[160vw] -translate-y-1/2 translate-x-[min(40vw,46%)]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.85) 24%, #000 38%, #000 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.85) 24%, #000 38%, #000 100%)",
          }}
        >
          <VinylRecord
            idPrefix="deepcut-fixed"
            rotation={rotation}
            className="aspect-square h-full w-full max-w-none"
          />
        </div>

        <div
          className="absolute inset-y-0 right-0 w-[min(5.5rem,14vw)]"
          style={{
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
