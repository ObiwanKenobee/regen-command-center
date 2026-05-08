import { Brain, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  kind: "opportunity" | "risk" | "forecast";
  title: string;
  body: string;
  metric?: string;
}

const DEFAULT: Insight[] = [
  {
    kind: "opportunity",
    title: "Underfunded: Lake Chad basin",
    body: "AI estimates 4.2× regenerative ROI if $1.8M deployed to drought-resilient agroforestry over 18 months.",
    metric: "ROI 4.2×",
  },
  {
    kind: "forecast",
    title: "Mau Forest carbon yield",
    body: "Projected sequestration of 18.6k tCO₂e in Q3, +14% vs. baseline given current rainfall + NDVI signals.",
    metric: "+14% yield",
  },
  {
    kind: "risk",
    title: "Cluster CR-7188 anomaly",
    body: "Sensor variance 3.4σ above norm across 6 oracles. Recommend manual auditor review before issuance.",
    metric: "Risk 0.81",
  },
];

const META = {
  opportunity: { icon: Sparkles, color: "text-accent", ring: "ring-accent/30" },
  forecast: { icon: TrendingUp, color: "text-success", ring: "ring-success/30" },
  risk: { icon: AlertTriangle, color: "text-destructive", ring: "ring-destructive/30" },
} as const;

export function AIInsight({ insights = DEFAULT }: { insights?: Insight[] }) {
  return (
    <div className="glass overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-[var(--gradient-forest)]">
            <Brain className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Atlas AI
            </div>
            <div className="text-sm font-semibold">Strategic recommendations</div>
          </div>
        </div>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
          Beta
        </span>
      </div>
      <ul className="divide-y divide-border/60">
        {insights.map((i, idx) => {
          const m = META[i.kind];
          return (
            <li key={idx} className="space-y-1.5 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={cn("rounded-md border border-border/60 bg-card/40 p-1.5 ring-1", m.color, m.ring)}>
                    <m.icon className="h-3 w-3" />
                  </div>
                  <div className="text-sm font-medium">{i.title}</div>
                </div>
                {i.metric && (
                  <span className={cn("rounded-md border border-border/60 px-1.5 py-0.5 font-mono text-[10px]", m.color)}>
                    {i.metric}
                  </span>
                )}
              </div>
              <p className="pl-8 text-xs leading-relaxed text-muted-foreground">{i.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
