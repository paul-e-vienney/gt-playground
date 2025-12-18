import { cn } from "@/lib/utils"

export function KeyboardKey({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 w-5 select-none items-center justify-center rounded border border-border bg-muted font-mono text-[10px] font-medium text-muted-foreground opacity-100 shadow-[0_1px_0_0_rgb(0_0_0_/_0.2),0_0_1px_0_rgb(0_0_0_/_0.15)]",
        className
      )}
    >
      {children}
    </kbd>
  )
}

