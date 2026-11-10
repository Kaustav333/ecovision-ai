import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDailyActivityData, getWeeklyActivityData } from "../../utils/storage";

export default function ActivityChart({ history }) {
  const [view, setView] = useState("daily"); // "daily" | "weekly"

  const dailyData = getDailyActivityData(history);
  const weeklyData = getWeeklyActivityData(history);
  const activeData = view === "daily" ? dailyData : weeklyData;
  const hasData = activeData.some((d) => d.count > 0);

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-bold text-slate-900">
            {view === "daily" ? "Daily Classification Activity (Last 7 Days)" : "Weekly Classification Activity (Last 4 Weeks)"}
          </h3>
          <p className="text-xs text-slate-500">
            Based on actual classification timestamps stored in your browser
          </p>
        </div>

        <div className="inline-flex bg-emerald-50 border border-emerald-100 rounded-xl p-1 self-start">
          <button
            type="button"
            onClick={() => setView("daily")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === "daily"
                ? "bg-emerald-900 text-white shadow-2xs"
                : "text-emerald-900/70 hover:text-emerald-950"
            }`}
          >
            Daily
          </button>
          <button
            type="button"
            onClick={() => setView("weekly")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === "weekly"
                ? "bg-emerald-900 text-white shadow-2xs"
                : "text-emerald-900/70 hover:text-emerald-950"
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {!hasData ? (
        <p className="text-slate-400 text-sm text-center py-12">
          No {view} classification activity recorded yet. Start scanning waste items to track your activity over time.
        </p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeData} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECFDF5" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value) => [`${value} item${value === 1 ? "" : "s"}`, "Classified"]}
                labelFormatter={(_, payload) =>
                  view === "daily"
                    ? `Date: ${payload?.[0]?.payload?.date || ""}`
                    : `Period: ${payload?.[0]?.payload?.dateRange || ""}`
                }
                contentStyle={{ borderRadius: "12px", border: "1px solid #D1FAE5" }}
              />
              <Bar dataKey="count" fill="#15803D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
