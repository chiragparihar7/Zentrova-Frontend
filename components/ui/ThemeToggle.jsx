"use client";

import {
  FiMoon,
  FiSun,
} from "react-icons/fi";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } =
    useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-11 h-11 rounded-2xl border border-border bg-soft flex items-center justify-center"
    >
      {theme === "light" ? (
        <FiMoon />
      ) : (
        <FiSun />
      )}
    </button>
  );
}