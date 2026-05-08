import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Coins, Leaf, Vote, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedKind = "verify" | "alert" | "issue" | "ecosystem" | "vote" | "payout";

interface FeedItem {
  id: string;
  kind: FeedKind;
  title: string;
  meta: string;
  time: string;
}

const SEED: FeedItem[] = [
  { id: "1", kind: "verify", title: "Mau Forest reforestation verified", meta: "+ 1,420 tCO₂e · oracle 0.97", time: "just now" },
  { id: "2", kind: "issue", title: "Watershed Bond #WB-0042 issued", meta: "Lake Victoria basin · $2.4M", time: "12s" },
  { id: "3", kind: "payout", title: "Kibera waste cooperative payout", meta: "832 wallets · $14,210", time: "47s" },
  { id: "4", kind: "vote", title: "DAO proposal #128 passed", meta: "Quorum 71% · For 84%", time: "2m" },
  { id: "5", kind: "ecosystem", title: "Sentinel-2 NDVI sync complete", meta: "Sub-Saharan grid · 312 zones", time: "3m" },
  { id: "6", kind: "alert", title: "Anomaly: credit cluster CR-7188", meta: "Risk score 0.81 · flagged", time: "5m" },
  { id: "7", kind: "verify", title: "Mangrove restoration confirmed", meta: "Lamu coast · IoT 24/24", time: "7m" },
  { id: "8", kind: "issue", title: "Biodiversity credits minted", meta: "Serengeti corridor · 8.2k units", time: "9m" },
];

const ICONS: Record<FeedKind, { icon: typeof Leaf; color: string }> = {
  verify: { icon: CheckCircle2, color: "text-success" },
  alert: { icon: AlertTriangle, color: "text-destructive" },
  issue: { icon: Coins, color: "text-accent" },
  ecosystem: { icon: Leaf, color: "text-success" },
  vote: { icon: Vote, color: "text-eco-blue" },
  payout: { icon: Users, color: "text-accent" },
};

export function LiveFeed() {
  const [items, setItems] = useState(SEED);

  useEffect(() => {
    const t = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const head = next.shift();
        if (head) next.push({ ...head, time: "now" });
        return next;
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Regenerative Economy Feed
          </div>
          <div className="text-sm font-semibold">Live verified events</div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-success">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" />
          STREAMING
        </div>
      </div>
      <ul className="flex-1 divide-y divide-border/60 overflow-y-auto">
        {items.map((it) => {
          const { icon: Icon, color } = ICONS[it.kind];
          return (
            <li key={it.id} className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-card/40">
              <div className={cn("mt-0.5 rounded-md border border-border/60 bg-card/40 p-1.5", color)}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">{it.title}</div>
                <div className="truncate font-mono text-[11px] text-muted-foreground">{it.meta}</div>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">{it.time}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
