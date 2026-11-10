import { Package, Recycle, Leaf, CheckCircle2, Layers } from "lucide-react";

export default function ImpactStats({ stats }) {
  const kpis = [
    {
      icon: Package,
      label: "Total Items Classified",
      value: stats.totalClassified || 0,
      note: "All local scans recorded",
      cardStyle: "eco-glass border-emerald-200/80 text-[#0A3622]",
      iconStyle: "bg-emerald-100 text-[#14532D]",
    },
    {
      icon: Recycle,
      label: "Identified for Recycling",
      value: stats.identifiedForRecycling || 0,
      note: "Plastic + Paper + Metal predictions",
      cardStyle: "eco-glass border-sky-200/80 text-[#0A3622]",
      iconStyle: "bg-sky-100 text-[#1D74C5]",
    },
    {
      icon: Leaf,
      label: "Identified for Composting",
      value: stats.identifiedForComposting || 0,
      note: "Organic Waste predictions",
      cardStyle: "eco-glass border-emerald-200/80 text-[#0A3622]",
      iconStyle: "bg-emerald-100 text-[#228B3B]",
    },
    {
      icon: CheckCircle2,
      label: "Confirmed Properly Disposed",
      value: stats.disposedCorrectly || 0,
      note: "Marked disposed by user",
      cardStyle: "bg-[#14532D]/92 backdrop-blur-md border-emerald-700 text-white",
      iconStyle: "bg-[#228B3B] text-emerald-100",
    },
  ];

  const categories = [
    {
      name: "Plastic",
      icon: "♻️",
      count: stats.byCategory?.Plastic || 0,
      disposed: stats.disposedByCategory?.Plastic || 0,
      style: "bg-sky-50/90 border-sky-200",
    },
    {
      name: "Paper",
      icon: "📄",
      count: stats.byCategory?.Paper || 0,
      disposed: stats.disposedByCategory?.Paper || 0,
      style: "bg-amber-50/90 border-amber-200",
    },
    {
      name: "Metal",
      icon: "🔩",
      count: stats.byCategory?.Metal || 0,
      disposed: stats.disposedByCategory?.Metal || 0,
      style: "bg-red-50/90 border-red-200",
    },
    {
      name: "Organic Waste",
      icon: "🌿",
      count: stats.byCategory?.["Organic Waste"] || 0,
      disposed: stats.disposedByCategory?.["Organic Waste"] || 0,
      style: "bg-emerald-50/90 border-emerald-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ icon: Icon, label, value, note, cardStyle, iconStyle }) => (
          <div
            key={label}
            className={`rounded-2xl border p-5 shadow-xs transition-shadow hover:shadow-md ${cardStyle}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconStyle}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-3xl font-extrabold">{value}</span>
            </div>
            <p className="font-semibold text-sm">{label}</p>
            <p className="text-xs opacity-75 mt-1">{note}</p>
          </div>
        ))}
      </div>

      {/* Category Counts */}
      <div className="eco-glass rounded-2xl border border-emerald-200/80 p-6 shadow-xs">
        <h3 className="font-bold text-[#0A3622] mb-4 flex items-center gap-2 text-base">
          <Layers className="w-5 h-5 text-[#228B3B]" />
          Category-Wise Detection Counts
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className={`${cat.style} border rounded-2xl p-4 text-center`}>
              <span className="text-2xl">{cat.icon}</span>
              <p className="text-2xl font-extrabold text-[#0A3622] mt-1">{cat.count}</p>
              <p className="text-sm font-semibold text-[#173E28]">{cat.name}</p>
              <p className="text-xs text-[#1E4730]/75 mt-1">
                {cat.disposed} confirmed disposed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
