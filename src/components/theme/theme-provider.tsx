"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "dark" | "light";

type ThemeContextValue = {
  mode: ThemeMode;
  ready: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const MODE_KEY = "at-theme-mode";

function applyDom(mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.dataset.atmosphere = "ink";
  root.classList.toggle("dark", mode === "dark");
  root.classList.toggle("light", mode === "light");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedMode = window.localStorage.getItem(MODE_KEY) as ThemeMode | null;
    const nextMode =
      storedMode === "light" || storedMode === "dark"
        ? storedMode
        : document.documentElement.dataset.theme === "light"
          ? "light"
          : "dark";
    setModeState(nextMode);
    applyDom(nextMode);
    setReady(true);
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    window.localStorage.setItem(MODE_KEY, next);
    applyDom(next);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const value = useMemo(
    () => ({ mode, ready, setMode, toggleMode }),
    [mode, ready, setMode, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
