import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const METRICS = [
  { id: "queries", label: "Queries" },
  { id: "tokens", label: "Tokens" },
  { id: "sessions", label: "Sessions" },
];

const RANGES = [
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
  { id: "1y", label: "1Y" },
];

function formatAxis(value) {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}k`;
  }
  return String(value);
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="chart-tooltip">
      <p>{label}</p>
      <strong>{new Intl.NumberFormat("en-US").format(payload[0].value)}</strong>
    </div>
  );
}

export default function UsageOverview({ usage, peakQueryHour }) {
  const [metric, setMetric] = useState("queries");
  const [range, setRange] = useState("7d");
  const data = usage[metric][range];
  const metricLabel = METRICS.find((item) => item.id === metric)?.label ?? "Queries";

  return (
    <section className="usage-card" aria-labelledby="usage-heading">
      <div className="usage-header">
        <div>
          <h2 id="usage-heading">Usage overview</h2>
          <p>Queries, tokens, and sessions for the selected period.</p>
        </div>
        <div className="usage-controls">
          <div className="segmented" role="group" aria-label="Usage metric">
            {METRICS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === metric ? "is-selected" : undefined}
                aria-pressed={item.id === metric}
                onClick={() => setMetric(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="segmented" role="group" aria-label="Time range">
            {RANGES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === range ? "is-selected" : undefined}
                aria-pressed={item.id === range}
                onClick={() => setRange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="chart-frame">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(231, 236, 243, 0.08)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "#8b95a8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              minTickGap={16}
            />
            <YAxis
              tickFormatter={formatAxis}
              tick={{ fill: "#8b95a8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: "rgba(79, 140, 255, 0.45)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              name={metricLabel}
              stroke="#4f8cff"
              strokeWidth={2}
              fill="#4f8cff"
              fillOpacity={0.14}
              dot={false}
              isAnimationActive
              animationDuration={650}
              animationEasing="ease-out"
              activeDot={{ r: 4, strokeWidth: 0, fill: "#4f8cff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="peak-hour">
        Peak query hour <strong>{peakQueryHour}</strong>
      </p>
    </section>
  );
}
