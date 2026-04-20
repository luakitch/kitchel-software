import type { ReactNode } from "react";
import { WaveDotsBackground } from "@/components/home/wave-dots-background";
import styles from "./section-band.module.css";

export type SectionBandTone = "surface" | "muted" | "tint";

type Props = {
  tone: SectionBandTone;
  waveNext?: SectionBandTone;
  halftone?: boolean;
  halftoneFullBleed?: boolean;
  /** Extra top padding when this is the first band below the hero. */
  firstBelowHero?: boolean;
  children: ReactNode;
};

const toneClass: Record<SectionBandTone, string> = {
  surface: styles.bandSurface,
  muted: styles.bandMuted,
  tint: styles.bandTint,
};

function SectionWave({ next }: { next: SectionBandTone }) {
  return (
    <div className={styles.waveDivider} aria-hidden>
      <svg
        className={styles.waveSvg}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.wavePath}
          data-wave-fill={next}
          d="M0,6 C220,78 420,-4 620,42 C820,96 1020,8 1200,58 L1200,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}

export function SectionBand({
  tone,
  waveNext,
  halftone,
  halftoneFullBleed,
  firstBelowHero,
  children,
}: Props) {
  return (
    <div className={`${styles.sectionBand} ${toneClass[tone]}`}>
      {halftone ? <WaveDotsBackground fullBleed={halftoneFullBleed} /> : null}
      <div
        className={`${styles.bandInner}${firstBelowHero ? ` ${styles.bandInnerFirst}` : ""}`}
      >
        {children}
      </div>
      {waveNext ? <SectionWave next={waveNext} /> : null}
    </div>
  );
}
