"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navItems = ["Home", "Artists", "onboard", "dashboard"];

  return (
    <header
      className={`w-full px-4 sm:px-6 py-4 bg-white fixed top-0 left-0 right-0 z-50 transition-shadow ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <motion.h1
            className="text-xl sm:text-2xl font-bold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Artistly
          </motion.h1>
        </Link>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        <nav className="hidden md:block space-x-4">
          {navItems.map((item) => (
            <motion.span
              key={item}
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-blue-600 hover:underline"
              >
                {item}
              </Link>
            </motion.span>
          ))}
        </nav>
      </div>

      {isMenuOpen && (
        <motion.nav
          className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block py-2 text-blue-600 hover:bg-gray-50 hover:pl-2 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </motion.nav>
      )}
    </header>
  );
};

export default Header;
