import { Link } from "react-router-dom";
import {
  ScanLine,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Recycle,
  Leaf,
  CheckCircle2,
} from "lucide-react";

const WASTE_STREAMS = [
  {
    name: "Plastic",
    bin: "Dry / Blue Bin",
    icon: "♻️",
    badge: "bg-sky-500/15 text-sky-200 border-sky-400/25",
  },
  {
    name: "Paper",
    bin: "Dry / Blue Bin",
    icon: "📄",
    badge: "bg-amber-500/15 text-amber-200 border-amber-400/25",
  },
  {
    name: "Metal",
    bin: "Dry / Blue Bin",
    icon: "🔩",
    badge: "bg-slate-400/15 text-slate-200 border-slate-300/25",
  },
  {
    name: "Organic Waste",
    bin: "Wet / Green Bin",
    icon: "🌿",
    badge: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
      {/* Subtle Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-green-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Messaging & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-400/15 border border-emerald-400/25 text-emerald-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              Computer Vision Powered by TensorFlow.js &amp; Teachable Machine
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              A Smarter Way to Sort Waste.
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl leading-relaxed">
              Using Artificial Intelligence to build a cleaner and more sustainable future.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/scanner"
                className="group inline-flex items-center justify-center gap-2.5 bg-white text-emerald-950 px-7 py-4 rounded-2xl text-base font-bold shadow-lg shadow-emerald-950/30 hover:bg-emerald-50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ScanLine className="w-5 h-5 text-emerald-700" />
                Scan Your Waste
                <ArrowRight className="w-5 h-5 text-emerald-700 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/impact"
                className="inline-flex items-center justify-center gap-2 bg-emerald-800/60 hover:bg-emerald-800 text-white border border-emerald-500/35 px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5 text-emerald-300" />
                Impact Dashboard
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-emerald-200/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Runs in your browser
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Private local storage
              </span>
              <span className="flex items-center gap-1.5">
                <Recycle className="w-4 h-4 text-emerald-400" />
                4-Class Smart Disposal
              </span>
            </div>
          </div>

          {/* Right Column: Clean System Architecture Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-emerald-950/60 backdrop-blur-md border border-emerald-400/20 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-emerald-400/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Supported Waste Streams</p>
                    <p className="text-xs text-emerald-300/75">4 AI Recognition Categories</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/25">
                  CBSE AI Project
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {WASTE_STREAMS.map((stream) => (
                  <div
                    key={stream.name}
                    className={`rounded-2xl border p-3.5 transition-transform hover:-translate-y-0.5 ${stream.badge}`}
                  >
                    <div className="text-2xl mb-1.5">{stream.icon}</div>
                    <p className="font-bold text-sm text-white">{stream.name}</p>
                    <p className="text-xs opacity-85 mt-0.5">{stream.bin}</p>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-900/60 border border-emerald-500/20 rounded-2xl p-4 text-xs text-emerald-100/85 space-y-1.5">
                <p className="font-semibold text-white">How EcoVision AI helps:</p>
                <p>
                  1. Upload or capture a photo &rarr; 2. AI classifies waste &rarr; 3. Follow bin &amp; recycling guidance &rarr; 4. Mark item as properly disposed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
