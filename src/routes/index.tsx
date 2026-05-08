import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Coins, Users, Activity, Download, Filter } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { StatCard, StatGrid } from "@/components/StatCard";
import { LiveFeed } from "@/components/LiveFeed";
import { RegenMap } from "@/components/RegenMap";
import { SankeyFlow } from "@/components/SankeyFlow";
import { AIInsight } from "@/components/AIInsight";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mission Control · Atlas Sanctum" },
      { name: "description", content: "Live treasury, regeneration funding map and verified ecological events." },
    ],
  }),
  component: Overview,
});

function Overview() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Mission Control"
        title="Regenerative economy at a glance"
        description="Live coordination across treasury, ecosystems, communities and verified planetary outcomes."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-3.5 w-3.5" />Filter</Button>
            <Button size="sm" className="gap-1.5 bg-[var(--gradient-forest)] text-primary-foreground hover:opacity-90">
              <Download className="h-3.5 w-3.5" />Export
            </Button>
          </>
        }
      />

      <div className="space-y-4 p-6">
        <StatGrid>
          <StatCard label="Treasury Value" value="$1.84B" delta="+2.4% / 24h" trend="up" icon={Wallet} sparkline={[40, 42, 41, 45, 47, 46, 49, 52]} accent="forest" />
          <StatCard label="Regen Assets Issued" value="284k" delta="+1,420 today" trend="up" icon={Coins} sparkline={[20, 25, 28, 30, 32, 38, 40, 44]} accent="gold" />
          <StatCard label="Community Payouts" value="$12.4M" delta="832 wallets" trend="up" icon={Users} sparkline={[10, 12, 11, 14, 15, 16, 18, 20]} accent="blue" />
          <StatCard label="Active Programs" value="142" delta="+3 this week" trend="up" icon={Activity} sparkline={[8, 9, 10, 10, 11, 12, 12, 14]} />
        </StatGrid>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><RegenMap /></div>
          <LiveFeed />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><SankeyFlow /></div>
          <AIInsight />
        </div>

        <HealthIndicators />
      </div>
    </AppShell>
  );
}

function HealthIndicators() {
  const items = [
    { label: "Liquidity Health", value: 94, hint: "Stable reserves > 12mo runway" },
    { label: "Reserve Ratio", value: 68, hint: "Target 60–75%" },
    { label: "Protocol Solvency", value: 99, hint: "Collateral 1.42×" },
    { label: "Treasury Diversification", value: 76, hint: "Across 14 asset classes" },
  ];
  return (
    <div className="glass rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Financial Health</div>
          <div className="text-sm font-semibold">Real-time protocol indicators</div>
        </div>
        <span className="font-mono text-[10px] text-success">All systems nominal</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">{it.label}</span>
              <span className="font-mono text-sm font-semibold">{it.value}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-[var(--gradient-forest)]" style={{ width: `${it.value}%` }} />
            </div>
            <div className="text-[10px] text-muted-foreground">{it.hint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
