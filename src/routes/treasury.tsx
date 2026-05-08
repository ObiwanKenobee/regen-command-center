import { createFileRoute } from "@tanstack/react-router";
import { Wallet, ArrowDownToLine, ArrowUpFromLine, ShieldCheck, Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { StatCard, StatGrid } from "@/components/StatCard";
import { SankeyFlow } from "@/components/SankeyFlow";
import { AIInsight } from "@/components/AIInsight";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/treasury")({
  head: () => ({ meta: [{ title: "Treasury · Atlas Sanctum" }] }),
  component: TreasuryPage,
});

const WALLETS = [
  { name: "Primary Reserve", address: "0xA7…91fC", balance: "$842.1M", chain: "Ethereum", role: "Reserves", risk: "Low" },
  { name: "DAO Operating", address: "0x4B…22aE", balance: "$184.7M", chain: "Polygon", role: "DAO", risk: "Low" },
  { name: "Ecosystem Pool — Africa", address: "0x9D…78c1", balance: "$112.4M", chain: "Celo", role: "Ecosystem", risk: "Med" },
  { name: "Carbon Settlement", address: "0x2E…34bb", balance: "$94.2M", chain: "Base", role: "Markets", risk: "Low" },
  { name: "Emergency Reserve", address: "0xFE…01dd", balance: "$420.0M", chain: "Bitcoin", role: "Reserves", risk: "Low" },
];

function TreasuryPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Treasury"
        title="Capital flow across the regenerative economy"
        description="Multi-wallet treasury visibility with live allocation intelligence."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><ArrowDownToLine className="h-3.5 w-3.5" />Receive</Button>
            <Button size="sm" className="gap-1.5 bg-[var(--gradient-forest)] text-primary-foreground hover:opacity-90">
              <ArrowUpFromLine className="h-3.5 w-3.5" />Allocate
            </Button>
          </>
        }
      />
      <div className="space-y-4 p-6">
        <StatGrid>
          <StatCard label="Total Treasury" value="$1.84B" delta="+2.4%" trend="up" icon={Wallet} sparkline={[40, 42, 44, 47, 50, 52, 55]} accent="forest" />
          <StatCard label="Stable Reserves" value="$842M" delta="46% of total" icon={ShieldCheck} sparkline={[42, 43, 44, 45, 45, 46, 46]} />
          <StatCard label="Inflows 30d" value="$184.2M" delta="+18.4%" trend="up" sparkline={[10, 14, 13, 16, 19, 22, 24]} accent="gold" />
          <StatCard label="Outflows 30d" value="$96.8M" delta="-3.1%" trend="down" sparkline={[20, 18, 16, 17, 15, 14, 13]} accent="blue" />
        </StatGrid>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><SankeyFlow /></div>
          <AIInsight
            insights={[
              { kind: "opportunity", title: "Rebalance to Celo pool", body: "Shift 4% from primary reserve to Africa ecosystem pool to meet Q3 grant pipeline.", metric: "$73.6M" },
              { kind: "forecast", title: "Inflows trending up", body: "Carbon settlement projected +22% next 30d based on verification queue depth.", metric: "+22%" },
              { kind: "risk", title: "Concentration on ETH", body: "62% of liquid reserves on a single chain. Consider bridging to Bitcoin reserve.", metric: "62%" },
            ]}
          />
        </div>

        <div className="glass overflow-hidden rounded-xl">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Wallets</div>
              <div className="text-sm font-semibold">Multi-wallet treasury layer</div>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add wallet</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-card/40 text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Wallet</th>
                  <th className="px-4 py-2 text-left font-medium">Address</th>
                  <th className="px-4 py-2 text-left font-medium">Chain</th>
                  <th className="px-4 py-2 text-left font-medium">Role</th>
                  <th className="px-4 py-2 text-right font-medium">Balance</th>
                  <th className="px-4 py-2 text-right font-medium">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {WALLETS.map((w) => (
                  <tr key={w.address} className="transition-colors hover:bg-card/30">
                    <td className="px-4 py-2.5 font-medium">{w.name}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{w.address}</td>
                    <td className="px-4 py-2.5"><Badge variant="outline" className="border-border/60">{w.chain}</Badge></td>
                    <td className="px-4 py-2.5 text-muted-foreground">{w.role}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{w.balance}</td>
                    <td className="px-4 py-2.5 text-right">
                      <Badge className={w.risk === "Low" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"} variant="outline">{w.risk}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
