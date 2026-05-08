import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  Coins,
  Leaf,
  Users,
  Brain,
  ShieldAlert,
  Vote,
  Globe2,
  Settings as SettingsIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const modules = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Treasury", url: "/treasury", icon: Wallet },
  { title: "Asset Issuance", url: "/assets", icon: Coins },
  { title: "Carbon Exchange", url: "/carbon", icon: Leaf },
  { title: "Community Revenue", url: "/community", icon: Users },
  { title: "Funding Intelligence", url: "/funding", icon: Brain },
  { title: "Risk & Fraud", url: "/risk", icon: ShieldAlert },
  { title: "Governance", url: "/governance", icon: Vote },
  { title: "Ecosystem Analytics", url: "/ecosystem", icon: Globe2 },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-[var(--gradient-forest)] glow-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">Atlas Sanctum</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Regen Finance OS
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Command Center</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((m) => (
                <SidebarMenuItem key={m.url}>
                  <SidebarMenuButton asChild isActive={isActive(m.url)} tooltip={m.title}>
                    <Link to={m.url}>
                      <m.icon className="h-4 w-4" />
                      <span>{m.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip="Settings">
              <Link to="/settings">
                <SettingsIcon className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 pb-2 pt-1 group-data-[collapsible=icon]:hidden">
          <div className="rounded-md border border-border/60 bg-card/40 p-2 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success text-success" />
              <span>All oracles online</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
