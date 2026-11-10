import { History, Lock, Trash2 } from "lucide-react";
import HistoryList from "../components/history/HistoryList";
import useClassificationHistory from "../hooks/useClassificationHistory";

export default function HistoryPage() {
  const { history, toggleDisposed, deleteEntry, clearData } = useClassificationHistory();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center shrink-0">
            <History className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Classification History</h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Review past AI classifications, filter by category, and update disposal status.
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Clear all locally stored classification history? This action cannot be undone."
                )
              ) {
                clearData();
              }
            }}
            className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-semibold px-4 py-2 rounded-xl border border-red-200 hover:bg-red-50 transition-colors self-start"
          >
            <Trash2 className="w-4 h-4" />
            Clear All History
          </button>
        )}
      </div>

      <HistoryList
        history={history}
        onToggleDisposed={toggleDisposed}
        onDeleteEntry={deleteEntry}
      />

      {/* Privacy Notice */}
      <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex items-center justify-center gap-2 text-xs text-emerald-900">
        <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>
          Privacy Guarantee: Classification thumbnails and timestamps are stored only inside your browser&rsquo;s{" "}
          <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200">localStorage</code>. No images are uploaded to any server.
        </span>
      </div>
    </div>
  );
}
