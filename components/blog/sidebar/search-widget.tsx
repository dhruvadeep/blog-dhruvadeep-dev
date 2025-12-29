"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const placeholders = [
  "Search blog...",
  "Find tutorials...",
  "React guides...",
  "UI patterns...",
];

export function SearchWidget() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/posts?search=${encodeURIComponent(searchValue)}`);
    } else {
      router.push("/posts");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-4 pr-10 rounded-full bg-secondary/20 border-white/10 focus:border-primary/50 transition-all h-10"
        placeholder=""
      />
      <div className="absolute inset-0 left-4 flex items-center pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {searchValue === "" && (
            <motion.span
              key={placeholderIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.5 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-sm text-muted-foreground truncate w-full pr-10"
            >
              {placeholders[placeholderIndex]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
