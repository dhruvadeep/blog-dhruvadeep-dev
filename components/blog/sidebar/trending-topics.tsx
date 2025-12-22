"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Eye, Users } from "lucide-react";

interface TrendingTopicsProps {
  tags: string[];
}

export function TrendingTopics({ tags }: TrendingTopicsProps) {
  const data = [35, 52, 48, 76, 65, 89, 72];
  const max = Math.max(...data);

  return (
    <Card className="bg-card border-border/50 shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Blog Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Eye className="h-3 w-3" /> Total Views
            </p>
            <p className="text-2xl font-bold">128K</p>
            <p className="text-xs text-green-500 font-medium">
              +12% this month
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" /> Readers
            </p>
            <p className="text-2xl font-bold">42K</p>
            <p className="text-xs text-green-500 font-medium">+8% new</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Weekly Activity</span>
            <span>Last 7 days</span>
          </div>
          <div className="flex items-end justify-between h-24 gap-2 pt-2">
            {data.map((value, i) => (
              <div
                key={i}
                className="relative flex-1 h-full flex items-end group"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / max) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-full bg-primary/20 rounded-sm group-hover:bg-primary/40 transition-colors relative"
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-sm whitespace-nowrap transition-opacity z-10 pointer-events-none">
                    {value}k
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
