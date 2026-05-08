import { createFileRoute } from "@tanstack/react-router";
import { Users, HandCoins, FileText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { StatCard, StatGrid } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community Revenue · Atlas Sanctum" }] }),
  component: CommunityPage,
});

const LEDGER = [
  { ts: "2026-05-08 12:14", recipient: "Kibera Waste Coop", amount: "$14,210", reason: "Verified plastic recovery (4.2t)", evidence: "IoT scale + photo hash" },
  { ts: "2026-05-08 11:48", recipient: "Mau Ranger Collective", amount: "$8,420", reason: "Patrol hours · NDVI uplift", evidence: "GPS trace + Sentinel" },
  { ts: "2026-05-08 10:22", recipient: "Lamu Fisherwomen DAO", amount: "$6,180", reason: "Mangrove planting (1,820 units)", evidence: "Drone survey" },
  { ts: "2026-05-08 09:01", recipient: "Sahel Agro Coop #12", amount: "$3,940", reason: "Tree survival rate Q1 (87%)", evidence: "Auditor sign-off" },
  { ts: "2026-05-07 18:36", recipient: "Andes Páramo Guard", amount: "$2,210", reason: "Water source protection", evidence: "Sensor mesh" },
];

function CommunityPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Community Revenue Sharing"
        title="Communities as direct beneficiaries of regeneration"
        description="Treasury-to-community flows with on-chain transparency and verified impact."
      />
      <div className="space-y-4 p-6">
        <StatGrid>
          <StatCard label="Payouts (30d)" value="$842k" delta="+18%" trend="up" icon={HandCoins} sparkline={[10, 14, 16, 18, 22, 24, 28]} accent="gold" />
          <StatCard label="Active Wallets" value="12,482" delta="+412" trend="up" icon={Users} sparkline={[80, 84, 88, 92, 96, 100, 104]} accent="forest" />
          <StatCard label="Avg Payout" value="$67" delta="+$4" trend="up" sparkline={[60, 61, 62, 63, 64, 66, 67]} />
          <StatCard label="Cooperatives" value="184" delta="+6" trend="up" icon={FileText} sparkline={[14, 15, 16, 17, 18, 18, 18]} accent="blue" />
        </StatGrid>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-xl p-4 lg:col-span-2">
            <div className="mb-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Top earning communities</div>
              <div className="text-sm font-semibold">Verified contribution → income</div>
            </div>
            <div className="space-y-3">
              {[
                { name: "Kibera Waste Coop", region: "Nairobi, KE", impact: "Plastic recovered · sanitation", earn: 184200, max: 200000 },
                { name: "Mau Ranger Collective", region: "Mau, KE", impact: "Forest protection patrols", earn: 142800, max: 200000 },
                { name: "Lamu Fisherwomen DAO", region: "Lamu, KE", impact: "Mangrove restoration", earn: 96400, max: 200000 },
                { name: "Sahel Agro Coop #12", region: "Burkina Faso", impact: "Agroforestry survival", earn: 72100, max: 200000 },
                { name: "Andes Páramo Guard", region: "Colombia", impact: "Watershed stewardship", earn: 41800, max: 200000 },
              ].map((c) => (
                <div key={c.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <div>
                      <span className="font-medium">{c.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{c.region}</span>
                    </div>
                    <span className="font-mono text-sm">${c.earn.toLocaleString()}</span>
                  </div>
                  <div className="mb-1 text-[11px] text-muted-foreground">{c.impact}</div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[var(--gradient-gold)]" style={{ width: `${(c.earn / c.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="mb-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Distribution Engine</div>
              <div className="text-sm font-semibold">Live state</div>
            </div>
            <div className="space-y-3">
              {[
                { k: "Pending approvals", v: "14", tone: "text-warning" },
                { k: "Auto-distributing", v: "8", tone: "text-success" },
                { k: "Awaiting evidence", v: "3", tone: "text-muted-foreground" },
                { k: "Disputed", v: "1", tone: "text-destructive" },
              ].map((s) => (
                <div key={s.k} className="flex items-center justify-between rounded-md border border-border/60 bg-card/40 px-3 py-2">
                  <span className="text-sm">{s.k}</span>
                  <span className={`font-mono text-sm font-semibold ${s.tone}`}>{s.v}</span>
                </div>
              ))}
              <div className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-accent">
                Next batch executes in <span className="font-mono">04:12</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass overflow-hidden rounded-xl">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Transparency Ledger</div>
              <div className="text-sm font-semibold">Publicly auditable payouts</div>
            </div>
            <Badge variant="outline" className="border-success/40 text-success">on-chain</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-card/40 text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Timestamp</th>
                  <th className="px-4 py-2 text-left font-medium">Recipient</th>
                  <th className="px-4 py-2 text-left font-medium">Reason</th>
                  <th className="px-4 py-2 text-left font-medium">Evidence</th>
                  <th className="px-4 py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {LEDGER.map((r) => (
                  <tr key={r.ts + r.recipient} className="transition-colors hover:bg-card/30">
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{r.ts}</td>
                    <td className="px-4 py-2.5 font-medium">{r.recipient}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.reason}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{r.evidence}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-success">{r.amount}</td>
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
