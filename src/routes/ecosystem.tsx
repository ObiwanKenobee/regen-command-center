import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { RegenMap } from "@/components/RegenMap";
import { StatCard, StatGrid } from "@/components/StatCard";
import { Leaf, Droplet, Trees, Bird } from "lucide-react";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({ meta: [{ title: "Ecosystem Analytics · Atlas Sanctum" }] }),
  component: EcoPage,
});

function EcoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Ecosystem Analytics"
        title="Verified planetary outcomes"
        description="Live ecological telemetry across funded ecosystems."
      />
      <div className="space-y-4 p-6">
        <StatGrid>
          <StatCard label="Carbon Sequestered" value="184,210 tCO₂e" delta="+14% YoY" trend="up" icon={Leaf} sparkline={[20, 24, 26, 28, 32, 36, 40]} accent="forest" />
          <StatCard label="Water Restored" value="42M m³" delta="+8% YoY" trend="up" icon={Droplet} sparkline={[10, 12, 14, 16, 18, 20, 22]} accent="blue" />
          <StatCard label="Trees Planted" value="9.4M" delta="87% survival" trend="up" icon={Trees} sparkline={[40, 50, 55, 60, 70, 80, 94]} accent="forest" />
          <StatCard label="Species Recovered" value="142" delta="+12 this Q" trend="up" icon={Bird} sparkline={[100, 110, 116, 124, 130, 136, 142]} accent="gold" />
        </StatGrid>

        <RegenMap />

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-xl p-4">
            <div className="mb-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Biome Contribution</div>
              <div className="text-sm font-semibold">Share of verified outcomes</div>
            </div>
            <div className="space-y-2.5">
              {[
                { name: "Tropical forest", v: 38, color: "var(--forest)" },
                { name: "Mangrove & coastal", v: 18, color: "var(--eco-blue)" },
                { name: "Savanna", v: 14, color: "var(--gold)" },
                { name: "Drylands & agroforestry", v: 12, color: "var(--warning)" },
                { name: "Wetland & peat", v: 10, color: "var(--success)" },
                { name: "Coral & marine", v: 8, color: "oklch(0.7 0.15 200)" },
              ].map((b) => (
                <div key={b.name}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span>{b.name}</span><span className="font-mono">{b.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${b.v * 2}%`, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="mb-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Forecast (12 mo)</div>
              <div className="text-sm font-semibold">Atlas AI regeneration projection</div>
            </div>
            <ForecastChart />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ForecastChart() {
  const actual = [40, 44, 49, 52, 58, 64];
  const forecast = [64, 70, 78, 86, 94, 104];
  const w = 600, h = 200, pad = 24;
  const all = [...actual, ...forecast];
  const max = Math.max(...all);
  const min = 0;
  const span = max - min || 1;
  const total = actual.length + forecast.length - 1;
  const x = (i: number) => pad + (i / total) * (w - pad * 2);
  const y = (v: number) => h - pad - ((v - min) / span) * (h - pad * 2);
  const actualPts = actual.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const forecastPts = forecast.map((v, i) => `${x(i + actual.length - 1)},${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full">
      <defs>
        <linearGradient id="fillForest" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--forest)" stopOpacity="0.4" />
          <stop offset="1" stopColor="var(--forest)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`${pad},${h - pad} ${actualPts} ${x(actual.length - 1)},${h - pad}`} fill="url(#fillForest)" />
      <polyline points={actualPts} fill="none" stroke="var(--success)" strokeWidth="2" />
      <polyline points={forecastPts} fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
      {[0, 0.5, 1].map((p) => (
        <line key={p} x1={pad} x2={w - pad} y1={pad + p * (h - pad * 2)} y2={pad + p * (h - pad * 2)} stroke="oklch(1 0 0 / 6%)" />
      ))}
      <text x={pad} y={h - 4} fontSize="9" className="fill-muted-foreground">now − 6mo</text>
      <text x={w - pad} y={h - 4} textAnchor="end" fontSize="9" className="fill-muted-foreground">+ 6mo forecast</text>
    </svg>
  );
}
