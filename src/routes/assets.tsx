import { createFileRoute } from "@tanstack/react-router";
import { Coins, Plus, Satellite, Cpu, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { StatCard, StatGrid } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assets")({
  head: () => ({ meta: [{ title: "Asset Issuance · Atlas Sanctum" }] }),
  component: AssetsPage,
});

const TYPES = [
  { name: "Carbon Credit", desc: "Verified sequestration", icon: "🌳" },
  { name: "Biodiversity", desc: "Species & habitat units", icon: "🦒" },
  { name: "Watershed Bond", desc: "Fresh water restoration", icon: "💧" },
  { name: "Community Token", desc: "Local regeneration", icon: "🤝" },
  { name: "Cultural Asset", desc: "Heritage preservation", icon: "🏛️" },
];

const REGISTRY = [
  { id: "CR-7102", type: "Carbon", region: "Mau Forest, KE", score: 0.94, vol: "12,400 t", value: "$284k", status: "issued" },
  { id: "BD-0211", type: "Biodiversity", region: "Serengeti, TZ", score: 0.88, vol: "8,210 u", value: "$162k", status: "verified" },
  { id: "WB-0042", type: "Watershed", region: "Lake Victoria", score: 0.91, vol: "1 bond", value: "$2.4M", status: "issued" },
  { id: "CM-1188", type: "Community", region: "Kibera, KE", score: 0.83, vol: "120,000 u", value: "$94k", status: "validating" },
  { id: "CR-7188", type: "Carbon", region: "Amazon, BR", score: 0.71, vol: "4,210 t", value: "$84k", status: "disputed" },
  { id: "CL-0009", type: "Cultural", region: "Lamu, KE", score: 0.86, vol: "1 asset", value: "$120k", status: "pending" },
];

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  validating: "bg-warning/15 text-warning",
  verified: "bg-eco-blue/15 text-eco-blue",
  disputed: "bg-destructive/15 text-destructive",
  issued: "bg-success/15 text-success",
};

function AssetsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Asset Issuance"
        title="Turn ecosystems into verifiable financial assets"
        description="Create, verify, and issue regenerative assets backed by satellite, IoT, and AI-scored evidence."
        actions={
          <Button size="sm" className="gap-1.5 bg-[var(--gradient-gold)] text-accent-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" />New asset
          </Button>
        }
      />
      <div className="space-y-4 p-6">
        <StatGrid>
          <StatCard label="Issued (YTD)" value="284,120" delta="+12.4%" trend="up" icon={Coins} sparkline={[10, 14, 18, 22, 26, 28, 32]} accent="gold" />
          <StatCard label="Pending Verification" value="48" delta="-3" trend="down" icon={Satellite} sparkline={[20, 18, 16, 15, 14, 12, 11]} />
          <StatCard label="Avg Verification Score" value="0.91" delta="+0.02" trend="up" icon={ShieldCheck} sparkline={[80, 82, 85, 87, 88, 90, 91]} accent="forest" />
          <StatCard label="Oracles Online" value="312" delta="100%" trend="neutral" icon={Cpu} sparkline={[12, 12, 12, 12, 12, 12, 12]} accent="blue" />
        </StatGrid>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {TYPES.map((t) => (
            <button key={t.name} className="glass group flex flex-col items-start gap-2 rounded-xl p-4 text-left transition-colors hover:border-accent/40 hover:bg-card/60">
              <div className="text-2xl">{t.icon}</div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-[11px] text-muted-foreground">{t.desc}</div>
              </div>
              <span className="mt-auto text-[10px] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Create →
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-xl p-4 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Verification Pipeline</div>
                <div className="text-sm font-semibold">CR-7102 · Mau Forest reforestation</div>
              </div>
              <Badge className="bg-success/15 text-success" variant="outline">Verified · 0.94</Badge>
            </div>
            <ol className="space-y-3">
              {[
                { label: "Satellite (Sentinel-2 NDVI)", done: true, value: "Δ +0.18 canopy" },
                { label: "IoT sensor mesh", done: true, value: "24/24 sensors online" },
                { label: "AI ecological scoring", done: true, value: "Confidence 0.94" },
                { label: "Auditor approval", done: false, value: "In review · 2 of 3 signed" },
              ].map((s, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className={cn("grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold", s.done ? "bg-success/20 text-success" : "bg-muted text-muted-foreground")}>
                    {s.done ? "✓" : i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{s.label}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{s.value}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Verification health</div>
            <div className="space-y-3">
              {[
                { label: "Satellite coverage", value: 97 },
                { label: "Sensor reliability", value: 92 },
                { label: "AI confidence", value: 89 },
                { label: "Auditor SLA", value: 81 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span className="font-mono">{m.value}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[var(--gradient-forest)]" style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass overflow-hidden rounded-xl">
          <div className="border-b border-border/60 px-4 py-3">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Asset Registry</div>
            <div className="text-sm font-semibold">All issued & pending regenerative assets</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-card/40 text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Asset ID</th>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Region</th>
                  <th className="px-4 py-2 text-right font-medium">Score</th>
                  <th className="px-4 py-2 text-right font-medium">Volume</th>
                  <th className="px-4 py-2 text-right font-medium">Value</th>
                  <th className="px-4 py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {REGISTRY.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-card/30">
                    <td className="px-4 py-2.5 font-mono text-xs">{r.id}</td>
                    <td className="px-4 py-2.5">{r.type}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.region}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{r.score.toFixed(2)}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-muted-foreground">{r.vol}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{r.value}</td>
                    <td className="px-4 py-2.5 text-right">
                      <Badge variant="outline" className={cn("uppercase tracking-wider", STATUS_STYLE[r.status])}>{r.status}</Badge>
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
