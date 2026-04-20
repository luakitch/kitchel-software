import type { ReactNode } from "react";
import { DeepCutThemeScope } from "./deep-cut-theme-scope";

export default function DeepCutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DeepCutThemeScope />
      {children}
    </>
  );
}
