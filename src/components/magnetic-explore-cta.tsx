"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import styles from "./magnetic-explore-cta.module.css";

type Props = { href: string; label: string };

const SPRING_INITIAL = { stiffness: 10_000, damping: 500 } as const;
const SPRING_LEAVE = { stiffness: 100, damping: 20 } as const;

export function MagneticExploreCta({ href, label }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [t, setT] = useState(105);
  const [springCfg, setSpringCfg] = useState<typeof SPRING_INITIAL | typeof SPRING_LEAVE>(SPRING_INITIAL);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const x = useMotionValue(0);
  const spring = useSpring(x, springCfg);

  const xTransform = useTransform(
    spring,
    [-t, -0.7 * t, -0.3 * t, 0, 0.3 * t, 0.7 * t, t],
    [-t, -0.7 * t, -0.3 * t, 0, 0.3 * t, 0.7 * t, t],
  );

  const leftGradientOpacity = useTransform(
    spring,
    [0, 0.1 * t, 0.3 * t, 0.5 * t, 0.7 * t, 0.9 * t, t],
    [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
  );

  const rightGradientOpacity = useTransform(
    spring,
    [-t, -0.9 * t, -0.7 * t, -0.5 * t, -0.3 * t, -0.1 * t, 0],
    [1, 0.9, 0.7, 0.5, 0.3, 0.1, 0],
  );

  const initialCfg = useMemo(() => ({ ...SPRING_INITIAL }), []);
  const leaveCfg = useMemo(() => ({ ...SPRING_LEAVE }), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const el = wrapRef.current;
    if (!el) return;

    const applySize = () => {
      const w = el.getBoundingClientRect().width;
      const r = Math.max(8, w / 2 - 6);
      setT(r);
      x.set(0);
    };

    const onMove = (e: MouseEvent) => {
      if (leaveTimeout.current) {
        clearTimeout(leaveTimeout.current);
        leaveTimeout.current = null;
      }
      setSpringCfg(initialCfg);
      const rect = el.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      x.set(localX - rect.width / 2);
    };

    const onLeave = () => {
      setSpringCfg(leaveCfg);
      leaveTimeout.current = setTimeout(() => {
        x.set(0);
        setSpringCfg(initialCfg);
        leaveTimeout.current = null;
      }, 1000);
    };

    const ro = new ResizeObserver(applySize);
    ro.observe(el);
    applySize();
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      ro.disconnect();
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    };
  }, [reduceMotion, x, initialCfg, leaveCfg]);

  if (reduceMotion) {
    return (
      <div className={styles.shell}>
        <div className={styles.hulyWrap}>
          <div className={styles.ringBlur} style={{ opacity: 1 }} aria-hidden>
            <div className={styles.ringLight} />
          </div>
          <div className={`${styles.ringBlur} ${styles.ringFlip}`} style={{ opacity: 0 }} aria-hidden>
            <div className={styles.ringLight} />
          </div>
          <Link href={href} className={styles.cta}>
            <div className={styles.glowShell} aria-hidden>
              <div className={styles.glowMotion}>
                <div className={styles.glowOrb1} />
                <div className={styles.glowOrb2} />
              </div>
            </div>
            <span className={styles.inner}>
              <span className={styles.label}>{label}</span>
              <span className={styles.icon} aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 9">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <div ref={wrapRef} className={styles.hulyWrap}>
        <motion.div className={styles.ringBlur} style={{ opacity: leftGradientOpacity }} aria-hidden>
          <div className={styles.ringLight} />
        </motion.div>
        <motion.div
          className={`${styles.ringBlur} ${styles.ringFlip}`}
          style={{ opacity: rightGradientOpacity }}
          aria-hidden
        >
          <div className={styles.ringLight} />
        </motion.div>
        <Link href={href} className={styles.cta}>
          <div className={styles.glowShell} aria-hidden>
            <motion.div className={styles.glowMotion} style={{ x: xTransform }}>
              <div className={styles.glowOrb1} />
              <div className={styles.glowOrb2} />
            </motion.div>
          </div>
          <span className={styles.inner}>
            <span className={styles.label}>{label}</span>
            <span className={styles.icon} aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 9">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
