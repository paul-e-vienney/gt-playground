"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/": "PR inbox",
  "/merge-queue": "Merge queue",
  "/ai-agents": "AI agents",
  "/ai-reviews": "AI reviews",
  "/insights": "Insights",
  "/automations": "Automations",
  "/protections": "Protections",
  "/notifications": "Notifications",
}

export function Header() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "PR inbox"
  
  return (
    <header className="h-14 flex items-center gap-3 px-3">
      <SidebarTrigger variant="outline" className="h-8 w-8" />
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}

