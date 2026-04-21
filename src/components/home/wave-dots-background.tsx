"use client";

import { useEffect, useRef } from "react";
import styles from "./section-band.module.css";

type Props = {
  /** Skip gradient mask so dots read across the full band. */
  fullBleed?: boolean;
};

/** Animated halftone dot field (Acceling HomeWaveDotsBackground). Dark palette only. */
export function WaveDotsBackground({ fullBleed = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const canvasEl = canvas;
    const wrapEl = wrap;

    const maybeCtx = canvasEl.getContext("2d", { alpha: true });
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    let raf = 0;
    let t = 0;

    const prefersReducedMotion = () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const spacing = 22;
    const kx = 0.017;
    const ky = 0.014;

    function resize() {
      const parent = wrapEl.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      canvasEl.width = Math.floor(w * dpr);
      canvasEl.height = Math.floor(h * dpr);
      canvasEl.style.width = `${w}px`;
      canvasEl.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const parent = wrapEl.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);
      const minA = 0.05;
      const maxA = 0.22;

      for (let x = 0; x < w + spacing; x += spacing) {
        for (let y = 0; y < h + spacing; y += spacing) {
          const wave =
            0.5 +
            0.5 * Math.sin(x * kx + t * 1.05) * Math.cos(y * ky + t * 0.92);
          const a = minA + (maxA - minA) * wave;
          if (a < 0.035) continue;
          const r = 1.05 + 0.5 * wave;
          ctx.fillStyle = `rgba(228, 228, 231, ${a})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function tick() {
      if (prefersReducedMotion()) {
        draw();
        return;
      }
      t += 0.011;
      draw();
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    if (wrapEl.parentElement) {
      ro.observe(wrapEl.parentElement);
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionPref = () => {
      cancelAnimationFrame(raf);
      t = 0;
      resize();
      if (prefersReducedMotion()) {
        draw();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    mq.addEventListener("change", onMotionPref);

    resize();
    if (prefersReducedMotion()) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener("change", onMotionPref);
    };
  }, []);

  const wrapClass = fullBleed
    ? `${styles.bandHalftoneWrap} ${styles.bandHalftoneWrapFull}`
    : styles.bandHalftoneWrap;

  return (
    <div ref={wrapRef} className={wrapClass} aria-hidden>
      <canvas ref={canvasRef} className={styles.waveCanvas} />
    </div>
  );
}
