import {
  CheckCircle2,
  Trash2,
  Recycle,
  Lightbulb,
  TreePine,
  RotateCcw,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Info,
} from "lucide-react";
import ConfidenceBars from "./ConfidenceBars";
import WASTE_INFO from "../../data/wasteInfo";

export default function ClassificationResult({
  predictions,
  imagePreview,
  savedEntry,
  onToggleDisposed,
  onVerifyPrediction,
  onReset,
}) {
  if (!predictions || predictions.length === 0) return null;

  const topPrediction = predictions[0];
  const info = WASTE_INFO[topPrediction.category];
  const isLowConfidence = topPrediction.confidence < 50;
  const isDisposed = Boolean(savedEntry?.disposed);
  const verifiedState = savedEntry?.userVerifiedCorrect;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Low Confidence Alert */}
      {isLowConfidence && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Low Confidence Prediction ({topPrediction.confidence}%)</p>
            <p className="text-amber-800 mt-0.5">
              The AI model is uncertain about this image. For better accuracy, place a single waste item on a plain surface with clear lighting and try again.
            </p>
          </div>
        </div>
      )}

      {/* Main Classification & Smart Recommendation Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg overflow-hidden">
        {/* Prediction Summary Header */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Thumbnail */}
            <div className="w-full md:w-52 h-52 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img
                src={imagePreview}
                alt="Scanned waste item"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Prediction Details & Confidence Scores */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Predicted Waste Category
                  </span>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="text-3xl">{info?.icon || "📦"}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {topPrediction.category}
                    </h2>
                    <span className="bg-emerald-900 text-white text-sm font-bold px-3.5 py-1 rounded-full">
                      {topPrediction.confidence.toFixed(1)}% Confidence
                    </span>
                  </div>
                  {info?.commonExamples && (
                    <p className="text-xs text-slate-500 mt-2">
                      Typical items: {info.commonExamples}
                    </p>
                  )}
                </div>

                {savedEntry && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Saved to Local History
                  </span>
                )}
              </div>

              {/* Recommended Waste Bin Pill */}
              {info && (
                <div className="flex flex-wrap items-center gap-2.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl px-4 py-3 text-sm">
                  <Trash2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-slate-600 font-medium">Recommended Waste Bin:</span>
                  <span className="font-bold text-emerald-950">{info.binType}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${info.badgeClass}`}
                  >
                    {info.binColor}
                  </span>
                </div>
              )}

              {/* Visual Confidence Bars */}
              <ConfidenceBars predictions={predictions} />
            </div>
          </div>
        </div>

        {/* Smart Disposal Recommendations Body */}
        {info && (
          <div className="border-t border-emerald-100 bg-[#F9FCFA] p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Disposal Instructions */}
              <div className="bg-white rounded-2xl border border-emerald-100 p-5">
                <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Disposal Instructions
                </h3>
                <ol className="space-y-2.5">
                  {info.disposalSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Recycling / Reuse Suggestions */}
              <div className="bg-white rounded-2xl border border-emerald-100 p-5">
                <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-3.5">
                  <Recycle className="w-5 h-5 text-sky-600" />
                  {info.canCompost && !info.canRecycle
                    ? "Composting & Reuse Suggestions"
                    : "Recycling & Reuse Suggestions"}
                </h3>
                <ul className="space-y-2.5">
                  {info.recyclingSuggestions.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Environmental Benefit */}
            <div className="bg-emerald-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h4 className="flex items-center gap-2 font-bold text-emerald-200 text-sm uppercase tracking-wide">
                  <TreePine className="w-4 h-4 text-emerald-300" />
                  Environmental Benefit
                </h4>
                <p className="text-sm text-emerald-50 leading-relaxed">
                  {info.environmentalBenefit}
                </p>
              </div>
              <div className="shrink-0 bg-emerald-800/80 border border-emerald-700 rounded-xl px-4 py-3 text-center">
                <p className="text-[11px] uppercase tracking-wide text-emerald-300 font-semibold">
                  Natural Breakdown
                </p>
                <p className="text-sm font-bold text-white mt-0.5">{info.decompositionTime}</p>
              </div>
            </div>

            {/* Local Rules Reminder */}
            <div className="flex items-start gap-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl px-4 py-3 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Local Rules Reminder:</strong> Waste segregation and municipal recycling guidelines may differ by city, housing society, or school campus. Always follow your local collection rules.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Disposal Confirmation & Model Verification Bar */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {savedEntry && (
            <button
              type="button"
              onClick={() => onToggleDisposed(savedEntry.id, !isDisposed)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                isDisposed
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isDisposed ? "Marked as Properly Disposed" : "Mark as Properly Disposed"}
            </button>
          )}

          {savedEntry && (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs">
              <span className="font-medium text-slate-600">Was AI correct?</span>
              <button
                type="button"
                onClick={() => onVerifyPrediction(savedEntry.id, true)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  verifiedState === true
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200"
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                Yes
              </button>
              <button
                type="button"
                onClick={() => onVerifyPrediction(savedEntry.id, false)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  verifiedState === false
                    ? "bg-red-600 text-white"
                    : "bg-white text-slate-600 hover:bg-red-50 hover:text-red-700 border border-slate-200"
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                No
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Classify Another Image
        </button>
      </div>
    </div>
  );
}
