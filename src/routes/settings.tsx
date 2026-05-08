import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Atlas Sanctum" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const groups = [
    {
      title: "Notifications",
      items: [
        { k: "Treasury anomalies", d: "Page on detection over 0.7 risk score", on: true },
        { k: "Verified ecosystem events", d: "Daily digest", on: true },
        { k: "DAO proposal alerts", d: "Notify on quorum reached", on: false },
      ],
    },
    {
      title: "AI",
      items: [
        { k: "Funding advisor", d: "Show recommendations on Overview", on: true },
        { k: "Fraud sentinel", d: "Auto-freeze assets above 0.9 risk", on: true },
        { k: "Forecaster", d: "Include in ecosystem analytics", on: true },
      ],
    },
    {
      title: "Display",
      items: [
        { k: "Reduced motion", d: "Disable map pulse and tickers", on: false },
        { k: "Compact tables", d: "Higher density across modules", on: false },
      ],
    },
  ];
  return (
    <AppShell>
      <PageHeader eyebrow="Settings" title="Workspace preferences" description="Configure notifications, AI behavior and display." />
      <div className="grid gap-4 p-6 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="glass rounded-xl p-4">
            <div className="mb-3 text-sm font-semibold">{g.title}</div>
            <div className="space-y-3">
              {g.items.map((it) => (
                <div key={it.k} className="flex items-start justify-between gap-3 rounded-md border border-border/60 bg-card/40 p-3">
                  <div>
                    <Label className="text-sm font-medium">{it.k}</Label>
                    <div className="text-[11px] text-muted-foreground">{it.d}</div>
                  </div>
                  <Switch defaultChecked={it.on} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
