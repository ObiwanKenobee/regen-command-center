// Lightweight, custom Sankey-style treasury flow visualization (no extra deps)
const SOURCES = [
  { name: "Reserves", value: 42, color: "var(--forest)" },
  { name: "Carbon Sales", value: 28, color: "var(--success)" },
  { name: "Grants In", value: 18, color: "var(--accent)" },
  { name: "Yield", value: 12, color: "var(--eco-blue)" },
];

const TARGETS = [
  { name: "Ecosystem Restoration", value: 34, color: "var(--success)" },
  { name: "Community Payouts", value: 24, color: "var(--accent)" },
  { name: "DAO Grants", value: 18, color: "var(--eco-blue)" },
  { name: "Operations", value: 12, color: "var(--muted-foreground)" },
  { name: "Emergency Reserve", value: 12, color: "var(--warning)" },
];

export function SankeyFlow() {
  const total = 100;
  const W = 600;
  const H = 320;
  const colW = 14;

  let sy = 0;
  const sourceBars = SOURCES.map((s) => {
    const h = (s.value / total) * (H - 20);
    const y = sy + 10;
    sy += h;
    return { ...s, y, h };
  });

  let ty = 0;
  const targetBars = TARGETS.map((t) => {
    const h = (t.value / total) * (H - 20);
    const y = ty + 10;
    ty += h;
    return { ...t, y, h };
  });

  // Build flows: distribute each source proportionally across targets
  const flows: Array<{ s: typeof sourceBars[number]; t: typeof targetBars[number]; sy: number; ty: number; sh: number; th: number; color: string }> = [];
  const sCursor = sourceBars.map((s) => s.y);
  const tCursor = targetBars.map((t) => t.y);
  sourceBars.forEach((s, si) => {
    targetBars.forEach((t, ti) => {
      const portion = (s.value * t.value) / total;
      const sh = (portion / total) * (H - 20);
      const th = sh;
      flows.push({
        s,
        t,
        sy: sCursor[si],
        ty: tCursor[ti],
        sh,
        th,
        color: s.color,
      });
      sCursor[si] += sh;
      tCursor[ti] += th;
    });
  });

  return (
    <div className="glass overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Treasury Flow
          </div>
          <div className="text-sm font-semibold">Capital movement · last 30d</div>
        </div>
        <div className="font-mono text-xs text-muted-foreground">$184.2M</div>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-72 w-full">
          <defs>
            {sourceBars.map((s, i) => (
              <linearGradient key={i} id={`flow-${i}`} x1="0" x2="1">
                <stop offset="0" stopColor={s.color} stopOpacity="0.55" />
                <stop offset="1" stopColor={s.color} stopOpacity="0.15" />
              </linearGradient>
            ))}
          </defs>

          {flows.map((f, i) => {
            const x1 = colW;
            const x2 = W - colW;
            const cx = (x1 + x2) / 2;
            const sourceIdx = sourceBars.indexOf(f.s);
            const path = `M${x1},${f.sy} C${cx},${f.sy} ${cx},${f.ty} ${x2},${f.ty} L${x2},${f.ty + f.th} C${cx},${f.ty + f.th} ${cx},${f.sy + f.sh} ${x1},${f.sy + f.sh} Z`;
            return <path key={i} d={path} fill={`url(#flow-${sourceIdx})`} />;
          })}

          {sourceBars.map((s) => (
            <g key={s.name}>
              <rect x={0} y={s.y} width={colW} height={s.h} fill={s.color} rx="2" />
              <text x={colW + 6} y={s.y + s.h / 2} dominantBaseline="middle" className="fill-foreground" fontSize="10">
                {s.name} <tspan className="fill-muted-foreground" fontSize="9">{s.value}%</tspan>
              </text>
            </g>
          ))}
          {targetBars.map((t) => (
            <g key={t.name}>
              <rect x={W - colW} y={t.y} width={colW} height={t.h} fill={t.color} rx="2" />
              <text x={W - colW - 6} y={t.y + t.h / 2} dominantBaseline="middle" textAnchor="end" className="fill-foreground" fontSize="10">
                <tspan className="fill-muted-foreground" fontSize="9">{t.value}% </tspan>{t.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
