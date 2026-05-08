import { createFileRoute } from "@tanstack/react-router";
import { Brain, Target, Compass } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { AIInsight } from "@/components/AIInsight";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/funding")({
  head: () => ({ meta: [{ title: "Funding Intelligence · Atlas Sanctum" }] }),
  component: FundingPage,
});

const ROI = [
  { name: "Lake Chad Agroforestry", region: "Sahel", roi: 4.2, urgency: "high", spend: "$1.8M" },
  { name: "Kibera Sanitation Loop", region: "Kenya", roi: 3.6, urgency: "high", spend: "$0.9M" },
  { name: "Andean Páramos Recovery", region: "Colombia", roi: 3.1, urgency: "med", spend: "$2.4M" },
  { name: "Borneo Peat Rewetting", region: "Indonesia", roi: 2.9, urgency: "high", spend: "$3.6M" },
  { name: "Lamu Mangrove Expansion", region: "Kenya", roi: 2.7, urgency: "med", spend: "$1.2M" },
  { name: "Pantanal Fire Resilience", region: "Brazil", roi: 2.4, urgency: "med", spend: "$2.8M" },
];

const HEAT = [
  ["flood", "drought", "pollution", "food", "health"],
];
const HEAT_DATA: Array<{ region: string; row: number[] }> = [
  { region: "Sahel", row: [0.2, 0.92, 0.4, 0.88, 0.7] },
  { region: "East Africa", row: [0.6, 0.7, 0.5, 0.7, 0.6] },
  { region: "South Asia", row: [0.84, 0.5, 0.78, 0.6, 0.66] },
  { region: "SE Asia", row: [0.9, 0.3, 0.7, 0.4, 0.5] },
  { region: "Andes", row: [0.5, 0.6, 0.4, 0.5, 0.55] },
  { region: "Amazon", row: [0.7, 0.8, 0.6, 0.4, 0.45] },
];

function heatColor(v: number) {
  // green → gold → red gradient based on intensity
  if (v < 0.4) return `oklch(0.55 ${0.12 + v * 0.1} 155 / ${0.4 + v})`;
  if (v < 0.7) return `oklch(0.75 ${0.1 + v * 0.08} 80 / ${0.5 + v * 0.4})`;
  return `oklch(0.6 ${0.18 + v * 0.05} 28 / ${0.5 + v * 0.4})`;
}

function FundingPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Funding Intelligence"
        title="AI-assisted capital deployment"
        description="Where to deploy capital next, ranked by ecological & social return."
      />
      <div className="space-y-4 p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-xl p-4 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-accent" />
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Regeneration ROI Engine</div>
                  <div className="text-sm font-semibold">Ranked opportunities</div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">scored {new Date().toLocaleDateString()}</span>
            </div>
            <div className="space-y-2">
              {ROI.map((r, i) => (
                <div key={r.name} className="flex items-center gap-3 rounded-md border border-border/60 bg-card/40 px-3 py-2">
                  <div className="grid h-8 w-8 place-items-center rounded-md bg-[var(--gradient-forest)] font-mono text-xs font-bold text-primary-foreground">
                    #{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-[11px] text-muted-foreground">{r.region} · suggested {r.spend}</div>
                  </div>
                  <div className="hidden w-40 sm:block">
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[var(--gradient-gold)]" style={{ width: `${(r.roi / 5) * 100}%` }} />
                    </div>
                  </div>
                  <div className="font-mono text-sm font-semibold text-accent">{r.roi.toFixed(1)}×</div>
                  <span className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] uppercase",
                    r.urgency === "high" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-warning/40 bg-warning/10 text-warning",
                  )}>{r.urgency}</span>
                </div>
              ))}
            </div>
          </div>
          <AIInsight />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-xl p-4 lg:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <Brain className="h-4 w-4 text-eco-blue" />
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Vulnerability Heatmap</div>
                <div className="text-sm font-semibold">Where intervention compounds</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-1">
                <thead>
                  <tr>
                    <th />
                    {HEAT[0].map((h) => (
                      <th key={h} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HEAT_DATA.map((row) => (
                    <tr key={row.region}>
                      <td className="pr-2 text-right text-xs text-muted-foreground">{row.region}</td>
                      {row.row.map((v, i) => (
                        <td key={i}>
                          <div className="grid h-10 place-items-center rounded-md font-mono text-[10px] text-foreground/90" style={{ background: heatColor(v) }}>
                            {v.toFixed(2)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="mb-3 flex items-center gap-2">
              <Compass className="h-4 w-4 text-success" />
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Opportunity Discovery</div>
                <div className="text-sm font-semibold">Emerging signals</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              {[
                "New mangrove site detected · Pemba (TZ)",
                "Youth coop forming · Mathare (KE)",
                "Drought-resilient sorghum trial · Niger",
                "Coral micro-fragmentation · Visayas",
                "Urban food forest · Lagos sector 4",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-success" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
