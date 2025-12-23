"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

// --- Types ---
interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "All Posts", href: "/posts" },
  { name: "Resume", href: "/resume.pdf" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Lock body scroll when mobile menu is open (optional, good for UX)
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-md dark:bg-black/60 dark:border-white/5 supports-[backdrop-filter]:bg-white/60"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        {/* --- LOGO SECTION: The "Echo" Effect --- */}
        <div className="relative flex items-center justify-center">
          <a href="/" className="group relative z-10 flex items-center">
            {/* Main Text */}
            <span className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Echo of Lifes
            </span>

            {/* The Echo Ripples (Absolute positioned behind main text) */}
            <span className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center text-xl font-bold tracking-tight text-slate-900/30 dark:text-white/30">
              <motion.span
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.6, 0], scale: [1, 1.05, 1.15] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
                className="whitespace-nowrap"
              >
                Echo of Lifes
              </motion.span>
            </span>

            <span className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center text-xl font-bold tracking-tight text-slate-900/10 dark:text-white/10">
              <motion.span
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.1, 1.3] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8, // Staggered delay for echo effect
                }}
                className="whitespace-nowrap"
              >
                Echo of Lifes
              </motion.span>
            </span>
          </a>
        </div>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-slate-600 transition-colors hover:text-black dark:text-slate-300 dark:hover:text-white"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {item.name}
              {/* Subtle underline dot on hover */}
              <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-900 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white" />
            </motion.a>
          ))}
          <ModeToggle />
        </nav>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden p-2 text-slate-800 dark:text-slate-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.div initial={false} animate={{ rotate: isOpen ? 90 : 0 }}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.div>
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-full w-full overflow-hidden bg-white/95 backdrop-blur-xl dark:bg-black/95 md:hidden border-t border-slate-100 dark:border-white/5"
          >
            <div className="flex flex-col items-center justify-center space-y-8 p-10 pt-20">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-medium text-slate-800 dark:text-slate-200"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <ModeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
