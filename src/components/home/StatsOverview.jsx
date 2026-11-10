import { Link } from "react-router-dom";
import { Package, Recycle, Leaf, CheckCircle2, ArrowRight, ScanLine, ShieldCheck, BarChart3 } from "lucide-react";
import useClassificationHistory from "../../hooks/useClassificationHistory";

export default function StatsOverview() {
  const { stats } = useClassificationHistory();

  const summaryCards = [
    {
      icon: Package,
      label: "Total Items Classified",
      value: stats.totalClassified,
      sub: "Recorded in browser",
      theme: "bg-white border-emerald-100 text-emerald-950",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: Recycle,
      label: "Identified for Recycling",
      value: stats.identifiedForRecycling,
      sub: "Plastic, Paper & Metal",
      theme: "bg-white border-sky-100 text-slate-900",
      iconBg: "bg-sky-100 text-sky-700",
    },
    {
      icon: Leaf,
      label: "Identified for Composting",
      value: stats.identifiedForComposting,
      sub: "Organic Waste stream",
      theme: "bg-white border-green-100 text-slate-900",
      iconBg: "bg-green-100 text-green-700",
    },
    {
      icon: CheckCircle2,
      label: "Confirmed Properly Disposed",
      value: stats.disposedCorrectly,
      sub: "Verified by user action",
      theme: "bg-emerald-900 border-emerald-800 text-white",
      iconBg: "bg-emerald-700 text-emerald-200",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Live Summary Header & Cards */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Live Local Statistics
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Classification &amp; Disposal Summary
            </h2>
          </div>
          <Link
            to="/impact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            Open Full Impact Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map(({ icon: Icon, label, value, sub, theme, iconBg }) => (
            <div
              key={label}
              className={`rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all ${theme}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-3xl font-extrabold">{value}</span>
              </div>
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs opacity-70 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Category Strip */}
        <div className="mt-4 bg-white border border-emerald-100 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:flex-1">
            {[
              { name: "Plastic", icon: "♻️", count: stats.byCategory.Plastic },
              { name: "Paper", icon: "📄", count: stats.byCategory.Paper },
              { name: "Metal", icon: "🔩", count: stats.byCategory.Metal },
              { name: "Organic Waste", icon: "🌿", count: stats.byCategory["Organic Waste"] },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2.5 bg-emerald-50/60 border border-emerald-100 rounded-xl px-3.5 py-2.5"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{item.name}</p>
                  <p className="text-base font-bold text-slate-900">{item.count}</p>
                </div>
              </div>
            ))}
          </div>

          {stats.totalClassified === 0 && (
            <Link
              to="/scanner"
              className="shrink-0 inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <ScanLine className="w-4 h-4" />
              Classify First Item
            </Link>
          )}
        </div>

        <p className="text-xs text-slate-500 mt-3">
          Transparent tracking: &ldquo;Identified&rdquo; metrics reflect AI predictions only. Only items you confirm as properly disposed count under &ldquo;Confirmed Properly Disposed&rdquo;.
        </p>
      </div>

      {/* 3 Core Capabilities Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: ScanLine,
            title: "Real-Time AI Classification",
            desc: "Upload waste photos or capture directly from your webcam. Inference runs inside your browser with TensorFlow.js.",
            link: "/scanner",
            cta: "Open AI Scanner",
          },
          {
            icon: ShieldCheck,
            title: "Smart Disposal Recommendations",
            desc: "View the recommended waste bin, preparation steps, recycling tips, and local guidelines reminder for every scan.",
            link: "/guide",
            cta: "View Recycling Guide",
          },
          {
            icon: BarChart3,
            title: "Impact & History Analytics",
            desc: "Review thumbnail history, track daily and weekly sorting trends, and confirm proper waste disposal locally.",
            link: "/history",
            cta: "Explore History",
          },
        ].map(({ icon: Icon, title, desc, link, cta }) => (
          <div
            key={title}
            className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
            </div>
            <Link
              to={link}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              {cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
