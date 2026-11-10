import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Filter,
  Trash2,
  ScanLine,
  Camera,
  Upload,
} from "lucide-react";
import WASTE_INFO, { WASTE_CATEGORIES } from "../../data/wasteInfo";

const CATEGORY_FILTERS = ["All", ...WASTE_CATEGORIES];
const STATUS_FILTERS = [
  { key: "all", label: "All Status" },
  { key: "pending", label: "Pending Disposal" },
  { key: "disposed", label: "Properly Disposed" },
];

export default function HistoryList({ history, onToggleDisposed, onDeleteEntry }) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = history.filter((item) => {
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "disposed" && item.disposed) ||
      (statusFilter === "pending" && !item.disposed);
    return matchesCategory && matchesStatus;
  });

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-emerald-100 p-12 text-center shadow-xs">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Classification History Yet</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Your classified waste thumbnails, confidence scores, and disposal confirmations will appear here automatically after scanning.
        </p>
        <Link
          to="/scanner"
          className="mt-6 inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <ScanLine className="w-4 h-4" />
          Go to AI Waste Scanner
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {CATEGORY_FILTERS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setCategoryFilter(opt)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                categoryFilter === opt
                  ? "bg-emerald-900 text-white shadow-2xs"
                  : "bg-emerald-50/70 text-slate-600 hover:bg-emerald-100 hover:text-emerald-900"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Status:
          </span>
          {STATUS_FILTERS.map((status) => (
            <button
              key={status.key}
              type="button"
              onClick={() => setStatusFilter(status.key)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === status.key
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const info = WASTE_INFO[item.category];
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-emerald-100 p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-2xs hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.category}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">{info?.icon || "📦"}</span>
                  )}
                </div>

                {/* Prediction Metadata */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg">{info?.icon || "📦"}</span>
                    <h4 className="font-bold text-slate-900 text-base">{item.category}</h4>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                      {Number(item.confidence).toFixed(1)}% confidence
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>
                      {new Date(item.timestamp).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {item.source === "webcam" ? (
                        <>
                          <Camera className="w-3 h-3" /> Webcam
                        </>
                      ) : (
                        <>
                          <Upload className="w-3 h-3" /> Upload
                        </>
                      )}
                    </span>
                    {info?.binType && <span>• {info.binType}</span>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onToggleDisposed(item.id, !item.disposed)}
                  className={`inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl font-bold transition-colors ${
                    item.disposed
                      ? "bg-emerald-700 text-white hover:bg-emerald-800"
                      : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-emerald-700 hover:text-white hover:border-emerald-700"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item.disposed ? "Properly Disposed" : "Mark Properly Disposed"}
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteEntry(item.id)}
                  title="Delete entry"
                  aria-label="Delete classification entry"
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-sm text-slate-500">
          No records match the selected filters.
        </div>
      )}
    </div>
  );
}
