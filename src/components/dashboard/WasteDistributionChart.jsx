import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CATEGORY_COLORS } from "../../data/wasteInfo";

export default function WasteDistributionChart({ stats }) {
  const data = Object.entries(stats.byCategory || {})
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="eco-glass rounded-2xl border border-emerald-200/80 p-6 shadow-xs flex flex-col justify-center min-h-[340px]">
        <h3 className="font-bold text-[#0A3622] mb-2">Waste Distribution (Pie Chart)</h3>
        <p className="text-[#1E4730]/70 text-sm text-center py-12">
          No items classified yet. Scan waste items in the AI Scanner to view real distribution data.
        </p>
      </div>
    );
  }

  return (
    <div className="eco-glass rounded-2xl border border-emerald-200/80 p-6 shadow-xs">
      <div className="mb-4">
        <h3 className="font-bold text-[#0A3622]">Waste Distribution</h3>
        <p className="text-xs text-[#1E4730]/80">Share of classified items by waste category</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="48%"
              innerRadius={58}
              outerRadius={96}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#94A3B8"} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} item${value === 1 ? "" : "s"}`, name]}
              contentStyle={{ borderRadius: "12px", border: "1px solid #A7F3D0" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
