"use client";

import { useEffect } from "react";

const CLASS_NAME = "deepcut-theme";

/** Applies Deep Cut (purple) tokens on `/deep-cut` only via `body` class. */
export function DeepCutThemeScope() {
  useEffect(() => {
    document.body.classList.add(CLASS_NAME);
    return () => {
      document.body.classList.remove(CLASS_NAME);
    };
  }, []);
  return null;
}
