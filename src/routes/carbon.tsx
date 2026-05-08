import { createFileRoute } from "@tanstack/react-router";
import { Leaf, TrendingUp, Globe } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { StatCard, StatGrid } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/carbon")({
  head: () => ({ meta: [{ title: "Carbon Exchange · Atlas Sanctum" }] }),
  component: CarbonPage,
});

const CARDS = [
  { name: "Mau Forest", biome: "Montane forest", region: "Kenya", capacity: "12,400 tCO₂e", biodiversity: 8.4, issuer: "Atlas Africa Trust", confidence: 0.94, price: "$22.80" },
  { name: "Lamu Mangroves", biome: "Coastal mangrove", region: "Kenya", capacity: "6,210 tCO₂e", biodiversity: 9.1, issuer: "Coastal Regen Coop", confidence: 0.91, price: "$28.40" },
  { name: "Serengeti Corridor", biome: "Savanna", region: "Tanzania", capacity: "4,820 tCO₂e", biodiversity: 9.4, issuer: "EAC Wildlife DAO", confidence: 0.89, price: "$26.10" },
  { name: "Congo Basin Plot 14", biome: "Tropical forest", region: "DRC", capacity: "21,300 tCO₂e", biodiversity: 9.6, issuer: "Basin Stewards", confidence: 0.96, price: "$31.20" },
  { name: "Sahel Agroforestry", biome: "Drylands", region: "Burkina Faso", capacity: "3,140 tCO₂e", biodiversity: 6.8, issuer: "Great Green Wall", confidence: 0.82, price: "$18.40" },
  { name: "Andean Páramos", biome: "Highland wetland", region: "Colombia", capacity: "2,680 tCO₂e", biodiversity: 8.0, issuer: "Páramo Alianza", confidence: 0.86, price: "$24.60" },
];

function CarbonPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Carbon & Ecosystem Exchange"
        title="The regenerative marketplace"
        description="Buy, sell, transfer or retire credits backed by live ecological evidence."
      />
      <div className="space-y-4 p-6">
        <StatGrid>
          <StatCard label="24h Volume" value="$2.84M" delta="+8.2%" trend="up" icon={TrendingUp} sparkline={[18, 22, 20, 24, 28, 26, 30]} accent="forest" />
          <StatCard label="Avg Price / tCO₂e" value="$24.60" delta="+$0.40" trend="up" icon={Leaf} sparkline={[20, 21, 22, 22, 23, 24, 25]} accent="gold" />
          <StatCard label="Open Listings" value="1,284" delta="+42" trend="up" icon={Globe} sparkline={[40, 42, 44, 46, 48, 50, 52]} accent="blue" />
          <StatCard label="Retired YTD" value="184k tCO₂e" delta="+24%" trend="up" sparkline={[10, 12, 14, 16, 18, 20, 24]} />
        </StatGrid>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <div key={c.name} className="glass group overflow-hidden rounded-xl">
              <div className="relative h-32 overflow-hidden bg-[var(--gradient-forest)]">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute right-2 top-2">
                  <Badge variant="outline" className="border-success/40 bg-background/60 text-success backdrop-blur">
                    ✓ {c.confidence.toFixed(2)}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-3">
                  <div className="text-xs text-muted-foreground">{c.region}</div>
                  <div className="text-lg font-semibold">{c.name}</div>
                </div>
              </div>
              <div className="space-y-2 p-4 text-sm">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{c.biome}</span><span>{c.issuer}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="rounded-md border border-border/60 bg-card/40 p-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Capacity</div>
                    <div className="font-mono text-sm">{c.capacity}</div>
                  </div>
                  <div className="rounded-md border border-border/60 bg-card/40 p-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Biodiversity</div>
                    <div className="font-mono text-sm">{c.biodiversity}/10</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Price</div>
                    <div className="font-mono text-lg font-semibold text-accent">{c.price}</div>
                  </div>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline">Retire</Button>
                    <Button size="sm" className="bg-[var(--gradient-forest)] text-primary-foreground hover:opacity-90">Buy</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
