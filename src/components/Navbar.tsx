"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiX, HiOutlineMenuAlt4 } from "react-icons/hi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tickets", href: "/tickets" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Account", href: "/account" },
  ];

  return (
    <header className="cw-bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold cw-gray-900"
        >
          <Image
            src="/logo-text-light.svg"
            alt="CineWave Logo"
            width={150}
            height={40}
          />
        </Link>
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors px-2 py-1 rounded ${
                pathname === item.href
                  ? "cw-nav-selected"
                  : "cw-gray-700 hover:cw-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            type="button"
            title="Toggle Navigation Menu"
            className="focus:outline-none p-1 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <HiX className="cursor-pointer cw-hamburger" size={28} />
            ) : (
              <HiOutlineMenuAlt4
                className="cursor-pointer cw-hamburger"
                size={28}
              />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="cw-bg-white md:hidden absolute top-full left-0 right-0 shadow-lg flex flex-col items-center z-40 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full text-center py-2 font-medium transition-colors rounded ${
                pathname === item.href
                  ? "cw-nav-selected-mobile"
                  : "cw-gray-700 hover:cw-primary"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
