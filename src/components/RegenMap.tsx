import { useState } from "react";
import { cn } from "@/lib/utils";

interface Zone {
  id: string;
  name: string;
  cx: number; // %
  cy: number; // %
  intensity: number; // 0..1
  category: "biodiversity" | "carbon" | "water" | "health" | "agriculture";
  value: string;
}

const ZONES: Zone[] = [
  { id: "kibera", name: "Kibera Regen Zone", cx: 58, cy: 58, intensity: 0.95, category: "health", value: "$1.8M flowing" },
  { id: "mau", name: "Mau Forest", cx: 56, cy: 55, intensity: 0.85, category: "carbon", value: "12.4k tCO₂e" },
  { id: "lamu", name: "Lamu Mangroves", cx: 61, cy: 56, intensity: 0.7, category: "biodiversity", value: "Coastal restoration" },
  { id: "amazon", name: "Amazon Basin", cx: 32, cy: 60, intensity: 0.92, category: "carbon", value: "84.1k tCO₂e" },
  { id: "borneo", name: "Borneo Peatlands", cx: 76, cy: 60, intensity: 0.78, category: "biodiversity", value: "Peat protection" },
  { id: "sahel", name: "Great Green Wall", cx: 50, cy: 50, intensity: 0.66, category: "agriculture", value: "Drylands +" },
  { id: "andes", name: "Andean Watersheds", cx: 28, cy: 68, intensity: 0.58, category: "water", value: "Páramos" },
  { id: "ganges", name: "Ganges Basin", cx: 70, cy: 52, intensity: 0.6, category: "water", value: "Sanitation" },
  { id: "congo", name: "Congo Basin", cx: 53, cy: 60, intensity: 0.88, category: "carbon", value: "Primary forest" },
  { id: "philippines", name: "Visayas Coral", cx: 80, cy: 56, intensity: 0.5, category: "biodiversity", value: "Reef recovery" },
];

const CATEGORY_COLOR: Record<Zone["category"], string> = {
  biodiversity: "var(--success)",
  carbon: "var(--forest)",
  water: "var(--eco-blue)",
  health: "var(--gold)",
  agriculture: "var(--warning)",
};

const FILTERS: Array<Zone["category"] | "all"> = ["all", "carbon", "biodiversity", "water", "health", "agriculture"];

export function RegenMap() {
  const [filter, setFilter] = useState<Zone["category"] | "all">("all");
  const [hover, setHover] = useState<Zone | null>(null);
  const visible = ZONES.filter((z) => filter === "all" || z.category === filter);

  return (
    <div className="glass relative overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Global Regeneration Map
          </div>
          <div className="text-sm font-semibold">Funded ecosystems & ROI hotspots</div>
        </div>
        <div className="flex flex-wrap gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider transition-colors",
                filter === f
                  ? "border-accent/60 bg-accent/15 text-accent"
                  : "border-border/60 text-muted-foreground hover:bg-card/60",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/8] grid-bg">
        <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {/* abstract continental silhouettes */}
          <g fill="oklch(0.3 0.02 165 / 60%)" stroke="oklch(1 0 0 / 8%)" strokeWidth="0.15">
            <path d="M10,18 Q14,12 22,14 Q30,11 34,18 Q38,28 30,34 Q22,38 16,34 Q8,28 10,18 Z" />
            <path d="M44,16 Q50,10 58,14 Q66,12 70,20 Q74,30 64,38 Q54,42 50,36 Q44,28 44,16 Z" />
            <path d="M70,20 Q78,16 86,22 Q90,30 84,36 Q76,40 72,34 Q68,28 70,20 Z" />
            <path d="M22,40 Q28,36 32,42 Q30,46 24,46 Q20,44 22,40 Z" />
          </g>

          {visible.map((z) => (
            <g key={z.id} onMouseEnter={() => setHover(z)} onMouseLeave={() => setHover(null)} className="cursor-pointer">
              <circle
                cx={z.cx / 2}
                cy={z.cy / 2}
                r={1 + z.intensity * 2.2}
                fill={CATEGORY_COLOR[z.category]}
                opacity={0.18}
              >
                <animate attributeName="r" values={`${1 + z.intensity * 2};${2 + z.intensity * 3.4};${1 + z.intensity * 2}`} dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={z.cx / 2} cy={z.cy / 2} r={0.7 + z.intensity * 0.9} fill={CATEGORY_COLOR[z.category]} />
            </g>
          ))}
        </svg>

        {hover && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[120%] rounded-md border border-border/60 bg-popover/95 px-2.5 py-1.5 text-[11px] shadow-elevated backdrop-blur-md"
            style={{ left: `${hover.cx}%`, top: `${hover.cy}%` }}
          >
            <div className="font-semibold">{hover.name}</div>
            <div className="font-mono text-[10px] text-muted-foreground">
              {hover.category} · {hover.value}
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute bottom-2 right-3 flex items-center gap-2 rounded-md border border-border/60 bg-card/60 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur">
          <span>Sentinel-2</span>
          <span className="text-border">•</span>
          <span>312 active zones</span>
        </div>
      </div>
    </div>
  );
}
