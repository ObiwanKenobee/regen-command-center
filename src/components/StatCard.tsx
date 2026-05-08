import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  sparkline,
  accent,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  sparkline?: number[];
  accent?: "gold" | "forest" | "blue";
}) {
  const trendColor =
    trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <div className="glass relative overflow-hidden rounded-xl p-4">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px",
          accent === "gold" && "bg-[var(--gradient-gold)]",
          accent === "forest" && "bg-[var(--gradient-forest)]",
          accent === "blue" && "bg-eco-blue/60",
          !accent && "bg-border",
        )}
      />
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="font-mono text-2xl font-semibold tracking-tight">{value}</div>
        </div>
        {Icon && (
          <div className="rounded-md border border-border/60 bg-card/40 p-1.5">
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        {delta && (
          <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
            <TrendIcon className="h-3 w-3" />
            <span className="font-mono">{delta}</span>
          </div>
        )}
        {sparkline && <Sparkline data={sparkline} trend={trend} />}
      </div>
    </div>
  );
}

function Sparkline({ data, trend }: { data: number[]; trend: "up" | "down" | "neutral" }) {
  const w = 80;
  const h = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / span) * h}`)
    .join(" ");
  const stroke =
    trend === "up" ? "var(--success)" : trend === "down" ? "var(--destructive)" : "var(--muted-foreground)";
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}
