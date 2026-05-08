import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Eye, Activity } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { StatCard, StatGrid } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/risk")({
  head: () => ({ meta: [{ title: "Risk & Fraud · Atlas Sanctum" }] }),
  component: RiskPage,
});

const ALERTS = [
  { id: "AL-901", kind: "Sensor manipulation", target: "Cluster CR-7188", score: 0.81, status: "Investigating" },
  { id: "AL-900", kind: "Treasury anomaly", target: "Wallet 0x4B…22aE", score: 0.62, status: "Monitoring" },
  { id: "AL-899", kind: "Duplicate credit", target: "BD-0190", score: 0.94, status: "Frozen" },
  { id: "AL-898", kind: "Oracle deviation", target: "NDVI grid SE-12", score: 0.55, status: "Cleared" },
  { id: "AL-897", kind: "Vote concentration", target: "Proposal #128", score: 0.41, status: "Cleared" },
];

function RiskPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Risk & Fraud Intelligence"
        title="Trust is the product"
        description="AI sentinels monitoring credit integrity, treasury anomalies and governance attacks."
      />
      <div className="space-y-4 p-6">
        <StatGrid>
          <StatCard label="Active Alerts" value="14" delta="-3" trend="down" icon={ShieldAlert} sparkline={[20, 18, 17, 16, 15, 15, 14]} />
          <StatCard label="Frozen Assets" value="$182k" delta="2 cases" icon={Eye} sparkline={[5, 6, 7, 8, 8, 8, 8]} accent="gold" />
          <StatCard label="Integrity Score" value="0.96" delta="+0.01" trend="up" icon={Activity} sparkline={[92, 93, 94, 94, 95, 96, 96]} accent="forest" />
          <StatCard label="Oracle Reliability" value="99.4%" delta="312/312" trend="neutral" sparkline={[99, 99, 99, 99, 99, 99, 99]} accent="blue" />
        </StatGrid>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-xl p-4 lg:col-span-2">
            <div className="mb-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Fraud Sentinel</div>
              <div className="text-sm font-semibold">Live anomaly detection</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-2 text-left font-medium">Alert</th>
                    <th className="py-2 text-left font-medium">Type</th>
                    <th className="py-2 text-left font-medium">Target</th>
                    <th className="py-2 text-right font-medium">Risk</th>
                    <th className="py-2 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {ALERTS.map((a) => (
                    <tr key={a.id} className="transition-colors hover:bg-card/30">
                      <td className="py-2.5 font-mono text-xs">{a.id}</td>
                      <td className="py-2.5">{a.kind}</td>
                      <td className="py-2.5 font-mono text-xs text-muted-foreground">{a.target}</td>
                      <td className="py-2.5 text-right">
                        <span className={cn("font-mono", a.score > 0.7 ? "text-destructive" : a.score > 0.5 ? "text-warning" : "text-muted-foreground")}>
                          {a.score.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <Badge variant="outline" className={cn(
                          a.status === "Frozen" && "border-destructive/40 text-destructive",
                          a.status === "Investigating" && "border-warning/40 text-warning",
                          a.status === "Monitoring" && "border-eco-blue/40 text-eco-blue",
                          a.status === "Cleared" && "border-success/40 text-success",
                        )}>{a.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="mb-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Integrity Scoring</div>
              <div className="text-sm font-semibold">Confidence by domain</div>
            </div>
            <div className="space-y-3">
              {[
                { k: "Data confidence", v: 96 },
                { k: "Ecological consistency", v: 92 },
                { k: "Oracle reliability", v: 99 },
                { k: "Verification quality", v: 89 },
                { k: "Governance health", v: 84 },
              ].map((m) => (
                <div key={m.k}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-muted-foreground">{m.k}</span>
                    <span className="font-mono">{m.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[var(--gradient-forest)]" style={{ width: `${m.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
