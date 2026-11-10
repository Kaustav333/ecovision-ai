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
    bin: "Blue Bin • Dry Waste",
    icon: "♻️",
    cardClass: "bg-[#1D74C5]/12 border-[#1D74C5]/35 hover:bg-[#1D74C5]/18",
    dotClass: "bg-[#1D74C5]",
  },
  {
    name: "Paper",
    bin: "Yellow Bin • Dry Waste",
    icon: "📄",
    cardClass: "bg-[#EAB308]/14 border-[#EAB308]/40 hover:bg-[#EAB308]/20",
    dotClass: "bg-[#EAB308]",
  },
  {
    name: "Metal",
    bin: "Red Bin • Dry Waste",
    icon: "🔩",
    cardClass: "bg-[#C2412D]/12 border-[#C2412D]/35 hover:bg-[#C2412D]/18",
    dotClass: "bg-[#C2412D]",
  },
  {
    name: "Organic Waste",
    bin: "Green Bin • Wet Waste",
    icon: "🌿",
    cardClass: "bg-[#228B3B]/12 border-[#228B3B]/35 hover:bg-[#228B3B]/18",
    dotClass: "bg-[#228B3B]",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Sunlit Frosted Hero Messaging & CTA */}
          <div className="lg:col-span-7 eco-glass rounded-3xl border border-emerald-200/80 p-7 sm:p-10 shadow-lg shadow-emerald-950/5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100/85 border border-emerald-300/70 text-[#14532D] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-[#228B3B]" />
              Computer Vision Powered by TensorFlow.js &amp; Teachable Machine
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight leading-[1.08] text-[#0A3622]">
              A Smarter Way to{" "}
              <span className="bg-gradient-to-r from-[#166534] to-[#2E9B47] bg-clip-text text-transparent">
                Sort Waste.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#1E4730] max-w-2xl leading-relaxed">
              Using Artificial Intelligence to build a cleaner and more sustainable future.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                to="/scanner"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#14532D] to-[#228B3B] hover:from-[#0F3F22] hover:to-[#1B7330] text-white px-7 py-4 rounded-2xl text-base font-bold shadow-md shadow-emerald-900/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ScanLine className="w-5 h-5" />
                Scan Your Waste
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/impact"
                className="inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-[#14532D] border border-emerald-300/80 px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5 text-[#228B3B]" />
                Impact Dashboard
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm font-medium text-[#1E4730]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#228B3B]" />
                Runs in your browser
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#228B3B]" />
                Private local storage
              </span>
              <span className="flex items-center gap-1.5">
                <Recycle className="w-4 h-4 text-[#228B3B]" />
                4-Bin Smart Segregation
              </span>
            </div>
          </div>

          {/* Right Column: Color-Matched 4-Bin Glass Card */}
          <div className="lg:col-span-5">
            <div className="eco-glass rounded-3xl border border-emerald-200/85 p-6 shadow-xl shadow-emerald-950/10 space-y-5">
              <div className="flex items-center justify-between border-b border-emerald-200/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#166534] to-[#2E9B47] flex items-center justify-center shadow-xs">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0A3622]">
                      Supported Waste Bins
                    </p>
                    <p className="text-xs text-[#1E6B38]">
                      4 AI Recognition Categories
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] border border-emerald-300">
                  CBSE AI Project
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {WASTE_STREAMS.map((stream) => (
                  <div
                    key={stream.name}
                    className={`rounded-2xl border p-3.5 transition-all hover:-translate-y-0.5 ${stream.cardClass}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xl">{stream.icon}</span>
                      <span className={`w-3 h-3 rounded-full ${stream.dotClass}`} />
                    </div>
                    <p className="font-bold text-sm text-[#0A3622]">{stream.name}</p>
                    <p className="text-xs font-medium text-[#1E4730]/85 mt-0.5">{stream.bin}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0B3521] text-emerald-50 rounded-2xl p-4 text-xs space-y-1">
                <p className="font-bold text-emerald-200">How EcoVision AI works:</p>
                <p className="leading-relaxed text-emerald-100/90">
                  1. Upload or capture a waste item &rarr; 2. AI classifies it locally &rarr; 3. Sort into the right bin &rarr; 4. Mark it as properly disposed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
