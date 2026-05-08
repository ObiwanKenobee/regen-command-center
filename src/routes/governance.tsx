import { createFileRoute } from "@tanstack/react-router";
import { Vote, Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/governance")({
  head: () => ({ meta: [{ title: "Governance · Atlas Sanctum" }] }),
  component: GovPage,
});

const PROPOSALS = [
  { id: "#129", title: "Allocate $4.2M to Lake Chad agroforestry", dao: "Atlas Earth DAO", for: 78, against: 14, abstain: 8, ends: "in 2d 14h", status: "active" },
  { id: "#128", title: "Onboard Visayas Coral DAO as ecosystem partner", dao: "Atlas Earth DAO", for: 84, against: 10, abstain: 6, ends: "passed", status: "passed" },
  { id: "#127", title: "Increase emergency reserve target to 25%", dao: "Treasury Council", for: 62, against: 32, abstain: 6, ends: "in 5d 02h", status: "active" },
  { id: "#126", title: "Sunset legacy carbon registry CR-v1", dao: "Markets Working Group", for: 41, against: 49, abstain: 10, ends: "rejected", status: "rejected" },
];

function GovPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Governance"
        title="Decentralized coordination for regeneration"
        description="Proposals, voting analytics and treasury execution across DAOs."
        actions={
          <Button size="sm" className="gap-1.5 bg-[var(--gradient-forest)] text-primary-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" />New proposal
          </Button>
        }
      />
      <div className="grid gap-4 p-6 lg:grid-cols-2">
        {PROPOSALS.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] text-muted-foreground">{p.dao} · {p.id}</div>
                <div className="text-base font-semibold leading-tight">{p.title}</div>
              </div>
              <Badge variant="outline" className={
                p.status === "active" ? "border-eco-blue/40 text-eco-blue" :
                p.status === "passed" ? "border-success/40 text-success" :
                "border-destructive/40 text-destructive"
              }>{p.status}</Badge>
            </div>
            <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-muted">
              <div className="bg-success" style={{ width: `${p.for}%` }} />
              <div className="bg-destructive/70" style={{ width: `${p.against}%` }} />
              <div className="bg-muted-foreground/40" style={{ width: `${p.abstain}%` }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
              <span className="text-success">For {p.for}%</span>
              <span className="text-destructive">Against {p.against}%</span>
              <span>Abstain {p.abstain}%</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Vote className="h-3.5 w-3.5" /> Quorum 71%
              </div>
              <div className="text-muted-foreground">{p.ends}</div>
              {p.status === "active" && (
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline">Against</Button>
                  <Button size="sm" className="bg-success/20 text-success hover:bg-success/30">For</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
