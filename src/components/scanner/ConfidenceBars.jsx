import WASTE_INFO from "../../data/wasteInfo";

export default function ConfidenceBars({ predictions }) {
  if (!predictions || predictions.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Model Confidence Across All 4 Categories
        </h4>
      </div>

      <div className="space-y-2.5">
        {predictions.map((pred, index) => {
          const info = WASTE_INFO[pred.category];
          const barClass = info?.barClass || "bg-emerald-600";
          const trackClass = info?.barTrackClass || "bg-emerald-100";
          const isTop = index === 0;

          return (
            <div key={pred.category} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`flex items-center gap-1.5 ${
                    isTop ? "font-bold text-slate-900" : "font-medium text-slate-600"
                  }`}
                >
                  <span>{info?.icon || "•"}</span>
                  <span>{pred.category}</span>
                  {isTop && (
                    <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Top Match
                    </span>
                  )}
                </span>
                <span className={`font-bold ${isTop ? "text-emerald-800" : "text-slate-700"}`}>
                  {pred.confidence.toFixed(1)}%
                </span>
              </div>

              <div className={`h-2.5 ${trackClass} rounded-full overflow-hidden`}>
                <div
                  className={`h-full ${barClass} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${Math.min(100, Math.max(0, pred.confidence))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
