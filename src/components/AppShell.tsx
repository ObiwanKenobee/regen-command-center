import { ReactNode } from "react";
import { Bell, Command, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/70 px-3 backdrop-blur-xl">
            <SidebarTrigger />
            <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
              <Badge variant="outline" className="border-success/40 text-success">
                <span className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success" />
                LIVE
              </Badge>
              <span className="font-mono">UTC {new Date().toISOString().slice(11, 16)}</span>
              <span className="text-border">|</span>
              <span>Block 19,284,201</span>
              <span className="text-border">|</span>
              <span>Gas 14 gwei</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search assets, regions, DAOs..."
                  className="h-8 w-72 border-border/60 bg-card/40 pl-8 pr-12 text-xs"
                />
                <kbd className="pointer-events-none absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border border-border/60 bg-muted px-1.5 font-mono text-[10px] text-muted-foreground md:inline-flex">
                  <Command className="h-3 w-3" />K
                </kbd>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-2 py-1 text-xs">
                <div className="h-6 w-6 rounded-full bg-[var(--gradient-gold)]" />
                <div className="hidden flex-col leading-tight md:flex">
                  <span className="font-medium">Treasury Operator</span>
                  <span className="text-[10px] text-muted-foreground">0xA7…91fC</span>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
