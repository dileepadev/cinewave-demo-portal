"use client";
import Image from "next/image";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
// import ThemeSwitch from "./ThemeSwitch"
import { useEffect, useState } from "react";

const socialLinks = [
  { href: "https://facebook.com/", icon: <FaFacebookF />, label: "Facebook" },
  { href: "https://instagram.com/", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://linkedin.com/", icon: <FaLinkedin />, label: "LinkedIn" },
  { href: "https://twitter.com/", icon: <FaXTwitter />, label: "Twitter" },
];

export default function Footer() {
  // Detect theme for logo
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cw-theme");
      setTheme(saved ?? "light");
      // Listen for theme changes
      const observer = new MutationObserver(() => {
        setTheme(
          document.documentElement.getAttribute("data-theme") ?? "light"
        );
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <footer className="footer-enhanced">
      <div className="footer-row">
        {/* Col 1: Logo */}
        <div className="footer-col1">
          <Image
            src={
              theme === "dark" ? "logo-text-dark.svg" : "logo-text-light.svg"
            }
            alt="CineWave Logo"
            width={120}
            height={40}
            className="footer-logo"
          />
        </div>
        {/* Col 2: Copyright */}
        <div className="footer-copy footer-col-center">
          © {new Date().getFullYear()} CineWave. All rights reserved.
        </div>
        {/* Col 3: Social Icons + Divider + Theme Switcher */}
        <div className="footer-col3">
          <div className="footer-social">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social-icon"
              >
                {s.icon}
              </a>
            ))}
          </div>
          {/* <span className="footer-col3-divider" /> */}
          {/* <ThemeSwitch /> */}
        </div>
      </div>
    </footer>
  );
}
