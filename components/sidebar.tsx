"use client"

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import {
  InboxIcon,
  GitMergeIcon,
  BotIcon,
  FileCheckIcon,
  BarChartIcon,
  ZapIcon,
  ShieldIcon,
  BellIcon,
  ChevronDownIcon,
  SearchIcon,
  HelpCircleIcon,
  PlusIcon,
  UserPlusIcon,
  PuzzleIcon,
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  CheckIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
} from "lucide-react"
import * as React from "react"
import { useTheme } from "@/components/theme-provider"
import { toast } from "sonner"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function Sidebar() {
  const [currentWorkspaceIndex, setCurrentWorkspaceIndex] = React.useState(0)
  const [keySequence, setKeySequence] = React.useState<string>("")
  const [commandOpen, setCommandOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { toggleSidebar } = useSidebar()
  
  const menuItems = [
    { icon: InboxIcon, label: "PR inbox", href: "/" },
    { icon: GitMergeIcon, label: "Merge queue", href: "/merge-queue" },
    { icon: BotIcon, label: "AI agents", href: "/ai-agents" },
    { icon: FileCheckIcon, label: "AI reviews", href: "/ai-reviews" },
    { icon: BarChartIcon, label: "Insights", href: "/insights" },
    { icon: ZapIcon, label: "Automations", href: "/automations" },
    { icon: ShieldIcon, label: "Protections", href: "/protections" },
    { icon: BellIcon, label: "Notifications", href: "/notifications" },
  ]
  
  const pathname = usePathname()
  const router = useRouter()

  const workspaces = [
    { name: "Screenplay", avatar: "https://github.com/vercel.png" },
    { name: "Graphite", avatar: "https://github.com/nextjs.png" },
  ]
  
  const currentWorkspace = workspaces[currentWorkspaceIndex]

  // Handle keyboard shortcuts for workspace switching
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command+K to open command palette
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setCommandOpen(true)
        return
      }
      
      // [ key to toggle sidebar
      if (event.key === "[" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        toggleSidebar()
        return
      }
      
      // Check if a number key (1-9) is pressed
      const key = event.key
      if (key >= "1" && key <= "9") {
        const index = parseInt(key) - 1
        if (index < workspaces.length) {
          event.preventDefault()
          setCurrentWorkspaceIndex(index)
        }
      }
      
      // Handle G then S sequence for Workspace settings
      if (key.toLowerCase() === "g") {
        setKeySequence("g")
        setTimeout(() => setKeySequence(""), 1000) // Reset after 1 second
      } else if (key.toLowerCase() === "s" && keySequence === "g") {
        event.preventDefault()
        setKeySequence("")
        // Handle workspace settings action
        console.log("Open workspace settings")
      } else if (keySequence === "g") {
        setKeySequence("") // Reset if not S
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [workspaces.length, keySequence, toggleSidebar])

  return (
    <ShadcnSidebar 
      collapsible="offExamples"
      className="w-[240px] h-screen border-r border-sidebar-border"
    >
      <SidebarHeader className="!p-3">
        <div className="flex items-center gap-2 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 pl-2">
                <Avatar className="w-4 h-4 rounded-[4px]">
                  <AvatarImage src={currentWorkspace.avatar} alt={currentWorkspace.name} className="rounded-[4px]" />
                  <AvatarFallback className="text-xs rounded-[4px]">{currentWorkspace.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{currentWorkspace.name}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!w-[280px]" sideOffset={24}>
              {workspaces.map((workspace, index) => {
                const isSelected = workspace.name === currentWorkspace.name
                return (
                  <DropdownMenuItem 
                    key={workspace.name}
                    className={isSelected ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium mb-1 whitespace-normal" : "mb-1 whitespace-normal"}
                    onClick={() => setCurrentWorkspaceIndex(index)}
                  >
                    <Avatar className="w-4 h-4 rounded-[4px]">
                      <AvatarImage src={workspace.avatar} alt={workspace.name} className="rounded-[4px]" />
                      <AvatarFallback className="text-xs rounded-[4px]">{workspace.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{workspace.name}</span>
                    <DropdownMenuShortcut>
                      <Kbd>{index + 1}</Kbd>
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuItem className="whitespace-normal">
                <PlusIcon />
                <span>Add workspace</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="whitespace-normal">
                <UserPlusIcon />
                <span>Invite teammates</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="whitespace-normal">
                <PuzzleIcon />
                <span>Extensions</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                <span className="truncate">Workspace settings</span>
                <DropdownMenuShortcut className="shrink-0">
                  <div className="flex items-center gap-1">
                    <Kbd>G</Kbd>
                    <span className="text-xs text-muted-foreground">then</span>
                    <Kbd>S</Kbd>
                  </div>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Avatar className="w-4 h-4 rounded-full">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="text-xs">U</AvatarFallback>
                </Avatar>
                <span>Account settings</span>
                <DropdownMenuShortcut>
                  <span className="text-xs text-muted-foreground">John Doe</span>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="whitespace-normal">
                <LogOutIcon />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={() => setCommandOpen(true)}
          >
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0 w-full" />
      <SidebarContent className="p-3">
        <SidebarMenu className="gap-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                const isNotifications = item.label === "Notifications"
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive}
                    >
                      <Link 
                        href={item.href}
                        onClick={() => {
                          if (isNotifications) {
                            toast("You have 3 new notifications", {
                              description: "Check your notifications to see what's new.",
                            })
                          }
                        }}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {isNotifications && (
                      <SidebarMenuBadge>3</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <Button variant="ghost" className="w-full justify-start">
          <HelpCircleIcon className="h-4 w-4" />
          <span>Help</span>
        </Button>
      </SidebarFooter>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      router.push(item.href)
                      setCommandOpen(false)
                    }}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandGroup heading="Theme">
              <CommandItem
                keywords={["theme", "light", "bright"]}
                onSelect={() => {
                  setTheme("light")
                  setCommandOpen(false)
                }}
              >
                <SunIcon />
                <span>Light theme</span>
              </CommandItem>
              <CommandItem
                keywords={["theme", "dark", "night"]}
                onSelect={() => {
                  setTheme("dark")
                  setCommandOpen(false)
                }}
              >
                <MoonIcon />
                <span>Dark theme</span>
              </CommandItem>
              <CommandItem
                keywords={["theme", "system", "auto", "default"]}
                onSelect={() => {
                  setTheme("system")
                  setCommandOpen(false)
                }}
              >
                <MonitorIcon />
                <span>System theme</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </ShadcnSidebar>
  )
}

