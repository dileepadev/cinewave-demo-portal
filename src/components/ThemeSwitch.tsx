"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cw-theme");
      if (saved) setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved ?? "light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("cw-theme", next);
      document.documentElement.setAttribute("data-theme", next);
    }
  };

  return (
    <button
      type="button"
      className="footer-theme-btn"
      aria-label="Switch Theme"
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
