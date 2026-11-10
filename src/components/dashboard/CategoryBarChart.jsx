import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { WASTE_CATEGORIES } from "../../data/wasteInfo";

export default function CategoryBarChart({ stats }) {
  const data = WASTE_CATEGORIES.map((category) => ({
    name: category === "Organic Waste" ? "Organic" : category,
    fullName: category,
    Identified: stats.byCategory?.[category] || 0,
    Disposed: stats.disposedByCategory?.[category] || 0,
  }));

  const hasData = data.some((d) => d.Identified > 0);

  if (!hasData) {
    return (
      <div className="eco-glass rounded-2xl border border-emerald-200/80 p-6 shadow-xs flex flex-col justify-center min-h-[340px]">
        <h3 className="font-bold text-[#0A3622] mb-2">Category-Wise Classification</h3>
        <p className="text-[#1E4730]/70 text-sm text-center py-12">
          No classification counts recorded yet. Scan waste items to populate this chart.
        </p>
      </div>
    );
  }

  return (
    <div className="eco-glass rounded-2xl border border-emerald-200/80 p-6 shadow-xs">
      <div className="mb-4">
        <h3 className="font-bold text-[#0A3622]">Category-Wise Classification vs. Disposal</h3>
        <p className="text-xs text-[#1E4730]/80">
          Compares AI-identified items against confirmed proper disposals
        </p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DCFCE7" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""}
              contentStyle={{ borderRadius: "12px", border: "1px solid #A7F3D0" }}
            />
            <Legend />
            <Bar dataKey="Identified" name="AI Identified" fill="#1D74C5" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Disposed" name="Confirmed Disposed" fill="#228B3B" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
