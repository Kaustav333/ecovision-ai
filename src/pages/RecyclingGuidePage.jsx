import { useState } from "react";
import {
  BookOpen,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  ChevronDown,
  ChevronUp,
  Droplets,
  Recycle,
  AlertTriangle,
  Sprout,
  Heart,
  CheckSquare,
  Square,
} from "lucide-react";
import { AWARENESS_CONTENT, DID_YOU_KNOW_FACTS } from "../data/ecoFacts";
import WASTE_INFO from "../data/wasteInfo";

function ExpandableSection({ title, icon: Icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="eco-glass rounded-2xl border border-emerald-200/80 shadow-2xs overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-emerald-50/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-6 border-t border-emerald-50 pt-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

export default function RecyclingGuidePage() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [checkedHabits, setCheckedHabits] = useState({});

  const {
    whySegregation,
    wetVsDry,
    recyclingBenefits,
    plasticPollution,
    composting,
    sustainableHabits,
  } = AWARENESS_CONTENT;

  const prevFact = () => {
    setCurrentFactIndex(
      (prev) => (prev - 1 + DID_YOU_KNOW_FACTS.length) % DID_YOU_KNOW_FACTS.length
    );
  };

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % DID_YOU_KNOW_FACTS.length);
  };

  const randomFact = () => {
    if (DID_YOU_KNOW_FACTS.length <= 1) return;
    let next = currentFactIndex;
    while (next === currentFactIndex) {
      next = Math.floor(Math.random() * DID_YOU_KNOW_FACTS.length);
    }
    setCurrentFactIndex(next);
  };

  const toggleHabit = (index) => {
    setCheckedHabits((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedHabitCount = Object.values(checkedHabits).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="eco-glass rounded-3xl border border-emerald-200/80 px-6 py-7 text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <BookOpen className="w-7 h-7 text-[#14532D]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A3622]">
          Eco Awareness &amp; Recycling Guide
        </h1>
        <p className="text-[#1E4730] mt-2 text-sm sm:text-base">
          Learn why segregation matters, how wet and dry waste differ, and practical habits for everyday sustainability.
        </p>
      </div>

      {/* Interactive "Did You Know?" Environmental Facts Deck */}
      <div className="bg-gradient-to-br from-[#0B3521]/95 via-[#14532D]/95 to-[#228B3B]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-200 self-start">
            <Lightbulb className="w-4 h-4 text-amber-300" />
            Did You Know?
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevFact}
              aria-label="Previous fact"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-emerald-200 px-2">
              {currentFactIndex + 1} / {DID_YOU_KNOW_FACTS.length}
            </span>
            <button
              type="button"
              onClick={nextFact}
              aria-label="Next fact"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={randomFact}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-colors ml-1"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Surprise Me
            </button>
          </div>
        </div>

        <p className="text-lg sm:text-xl font-semibold leading-relaxed text-emerald-50">
          &ldquo;{DID_YOU_KNOW_FACTS[currentFactIndex]}&rdquo;
        </p>
      </div>

      {/* 4 Waste Categories Quick Reference */}
      <div className="eco-glass rounded-3xl border border-emerald-200/80 p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          4-Category Smart Segregation Reference
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(WASTE_INFO).map(([name, info]) => (
            <div
              key={name}
              className="rounded-2xl p-4 border transition-shadow hover:shadow-sm"
              style={{
                backgroundColor: info.bgColor,
                borderColor: `${info.color}30`,
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{info.icon}</span>
                  <h3 className="font-bold text-slate-900">{name}</h3>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${info.badgeClass}`}>
                  {info.binColor}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mb-2">{info.description}</p>
              <p className="text-xs text-slate-500">
                <strong>Examples:</strong> {info.commonExamples}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Accordion Sections */}
      <div className="space-y-4">
        <ExpandableSection title={whySegregation.title} icon={Recycle} defaultOpen={true}>
          <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
            {whySegregation.content}
          </p>
          <ul className="space-y-2">
            {whySegregation.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </ExpandableSection>

        <ExpandableSection title={wetVsDry.title} icon={Droplets} defaultOpen={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <h4 className="font-bold text-emerald-900 mb-2">🟢 Wet Waste (Green Bin)</h4>
              <p className="text-sm text-slate-700 mb-3">{wetVsDry.wet.description}</p>
              <ul className="space-y-1.5">
                {wetVsDry.wet.examples.map((ex, i) => (
                  <li key={i} className="text-sm text-slate-700">• {ex}</li>
                ))}
              </ul>
            </div>
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
              <h4 className="font-bold text-sky-900 mb-2">🔵 Dry Waste (Blue Bin)</h4>
              <p className="text-sm text-slate-700 mb-3">{wetVsDry.dry.description}</p>
              <ul className="space-y-1.5">
                {wetVsDry.dry.examples.map((ex, i) => (
                  <li key={i} className="text-sm text-slate-700">• {ex}</li>
                ))}
              </ul>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection title={recyclingBenefits.title} icon={Recycle}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recyclingBenefits.points.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                <div className="w-7 h-7 bg-emerald-700 text-white rounded-lg flex items-center justify-center shrink-0 font-bold text-xs">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ExpandableSection>

        <ExpandableSection title={plasticPollution.title} icon={AlertTriangle}>
          <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
            {plasticPollution.content}
          </p>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <h4 className="font-bold text-red-900 mb-2 text-sm">Key Environmental Impacts</h4>
            <ul className="space-y-1.5">
              {plasticPollution.impacts.map((impact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                  <span>•</span>
                  <span>{impact}</span>
                </li>
              ))}
            </ul>
          </div>
        </ExpandableSection>

        <ExpandableSection title={composting.title} icon={Sprout}>
          <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
            {composting.content}
          </p>
          <ol className="space-y-2.5">
            {composting.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-6 h-6 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </ExpandableSection>

        <ExpandableSection
          title={`${sustainableHabits.title} (${completedHabitCount}/${sustainableHabits.habits.length} Committed)`}
          icon={Heart}
        >
          <p className="text-xs text-slate-500 mb-3">
            Click habits below to commit to practicing them in your daily routine:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sustainableHabits.habits.map((item, i) => {
              const checked = Boolean(checkedHabits[i]);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleHabit(i)}
                  className={`text-left rounded-2xl p-4 border transition-all flex items-start gap-3 ${
                    checked
                      ? "bg-emerald-900 text-white border-emerald-900"
                      : "bg-emerald-50/60 hover:bg-emerald-50 border-emerald-100 text-slate-900"
                  }`}
                >
                  {checked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm">{item.habit}</h4>
                    <p
                      className={`text-xs mt-1 ${
                        checked ? "text-emerald-100" : "text-slate-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </ExpandableSection>
      </div>
    </div>
  );
}
