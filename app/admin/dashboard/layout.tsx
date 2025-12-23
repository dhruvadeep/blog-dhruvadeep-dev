"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple check for the cookie
    const hasSession = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_session="));

    if (!hasSession) {
      router.push("/admin");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-end p-4 border-b">
          <ModeToggle />
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
