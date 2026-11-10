import { Link } from "react-router-dom";
import {
  BarChart3,
  Recycle,
  Leaf,
  CheckCircle2,
  ShieldCheck,
  Info,
  ScanLine,
} from "lucide-react";
import ImpactStats from "../components/dashboard/ImpactStats";
import WasteDistributionChart from "../components/dashboard/WasteDistributionChart";
import CategoryBarChart from "../components/dashboard/CategoryBarChart";
import ActivityChart from "../components/dashboard/ActivityChart";
import useClassificationHistory from "../hooks/useClassificationHistory";
import WASTE_INFO from "../data/wasteInfo";

export default function DashboardPage() {
  const { history, stats, toggleDisposed } = useClassificationHistory();
  const pendingItems = history.filter((item) => !item.disposed).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            Real-Time Local Analytics
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Environmental Impact Dashboard
          </h1>
          <p className="text-slate-600 mt-1.5 text-sm sm:text-base">
            Tracks your actual waste classifications, daily &amp; weekly trends, and confirmed responsible disposals.
          </p>
        </div>

        <Link
          to="/scanner"
          className="inline-flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors shrink-0"
        >
          <ScanLine className="w-4 h-4" />
          Scan More Waste
        </Link>
      </div>

      {/* KPIs & Category Breakdown */}
      <ImpactStats stats={stats} />

      {/* Pie & Category Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WasteDistributionChart stats={stats} />
        <CategoryBarChart stats={stats} />
      </div>

      {/* Daily & Weekly Activity Chart */}
      <ActivityChart history={history} />

      {/* Our Environmental Impact Section */}
      <section className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800 pb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Our Environmental Impact</h2>
            <p className="text-sm text-emerald-200/85 mt-1">
              Clearly separates AI waste recognition from confirmed user disposal actions.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-emerald-800/80 border border-emerald-700 text-emerald-200 text-xs font-semibold px-3.5 py-1.5 rounded-full self-start">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            No Estimated or Fake Stats
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Recycle className="w-4 h-4" />
              Identified for Recycling
            </div>
            <p className="text-3xl font-extrabold text-white">
              {stats.identifiedForRecycling}
            </p>
            <p className="text-xs text-emerald-100/75 mt-1.5">
              Plastic, Paper &amp; Metal items classified ({stats.confirmedRecycledDisposals} confirmed disposed)
            </p>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-green-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Leaf className="w-4 h-4" />
              Identified for Composting
            </div>
            <p className="text-3xl font-extrabold text-white">
              {stats.identifiedForComposting}
            </p>
            <p className="text-xs text-emerald-100/75 mt-1.5">
              Organic Waste items classified ({stats.confirmedCompostDisposals} confirmed disposed)
            </p>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Confirmed Properly Disposed
            </div>
            <p className="text-3xl font-extrabold text-white">
              {stats.disposedCorrectly}
            </p>
            <p className="text-xs text-emerald-100/75 mt-1.5">
              Out of {stats.totalClassified} total scanned item{stats.totalClassified === 1 ? "" : "s"}
            </p>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              Classified Correctly (User Check)
            </div>
            <p className="text-3xl font-extrabold text-white">
              {stats.verifiedCorrectCount}
            </p>
            <p className="text-xs text-emerald-100/75 mt-1.5">
              {stats.reviewedCount > 0
                ? `Confirmed accurate out of ${stats.reviewedCount} reviewed`
                : "Verify predictions after scanning to track accuracy"}
            </p>
          </div>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-700/70 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-100/90">
          <Info className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
          <p>
            <strong>Important Distinction:</strong> Detecting a bottle or peel with AI only identifies how it <em>should</em> be sorted. An item is only counted as properly disposed once you follow the recommendation and confirm it below or in Classification History.
          </p>
        </div>
      </section>

      {/* Pending Disposal Quick Action Queue */}
      {pendingItems.length > 0 && (
        <section className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Awaiting Disposal Confirmation</h3>
              <p className="text-xs text-slate-500">
                Mark items as properly disposed once you have placed them into the recommended bin.
              </p>
            </div>
            <Link
              to="/history"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
            >
              View All History &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingItems.map((item) => {
              const info = WASTE_INFO[item.category];
              return (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.category}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-lg shrink-0">
                        {info?.icon || "📦"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-slate-900 truncate">
                        {item.category} ({item.confidence}%)
                      </p>
                      <p className="text-xs text-slate-500">
                        {info?.binType || "Follow local guidance"} •{" "}
                        {new Date(item.timestamp).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleDisposed(item.id, true)}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mark Properly Disposed
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
