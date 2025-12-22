"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface BlogFiltersProps {
  categories: string[];
}

export function BlogFilters({ categories }: BlogFiltersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const placeholders = [
    "Search articles...",
    "Explore design...",
    "Find tutorials...",
    "Discover trends...",
    "Read insights...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs
          defaultValue="All"
          className="w-full sm:w-auto max-w-full overflow-hidden"
        >
          <div className="relative flex items-center group">
            {canScrollLeft && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm -ml-2 hover:bg-background"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="w-full overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-1 px-1"
            >
              <TabsList className="bg-transparent p-0 h-auto flex w-max gap-2 justify-start">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="rounded-full border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm transition-all whitespace-nowrap"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {canScrollRight && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm -mr-2 hover:bg-background"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Tabs>

        <div className="relative w-full sm:w-72 shrink-0">
          <div className="relative">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="rounded-full bg-secondary/30 pr-10 h-10 truncate"
              placeholder=""
            />
            <div className="absolute inset-0 flex items-center px-4 pointer-events-none overflow-hidden">
              <AnimatePresence mode="wait">
                {searchValue === "" && (
                  <motion.span
                    key={placeholderIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.5 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-sm text-muted-foreground truncate w-full pr-8"
                  >
                    {placeholders[placeholderIndex]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
