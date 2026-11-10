import {
  Info,
  Brain,
  Globe,
  Target,
  Code,
  Cpu,
  Eye,
  Image,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { SDG_GOALS } from "../data/ecoFacts";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-4">
        <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Info className="w-7 h-7 text-emerald-700" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          About the Project
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          Class 12 CBSE Artificial Intelligence Practical Project Documentation &amp; Architecture
        </p>
      </div>

      {/* Core Metadata + Problem Statement */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
              Project Name
            </p>
            <p className="text-xl font-extrabold text-emerald-950 mt-1">
              EcoVision AI – Smart Waste Classification &amp; Management System
            </p>
          </div>
          <div className="bg-emerald-950 text-white rounded-2xl p-5">
            <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
              Project Domain
            </p>
            <p className="text-xl font-extrabold text-white mt-1">
              Artificial Intelligence – Computer Vision
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-slate-900 mb-2.5 flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-emerald-700" />
            Problem Statement
          </h2>
          <p className="text-slate-700 leading-relaxed bg-[#F9FCFA] border border-emerald-100 rounded-2xl p-4 text-sm sm:text-base">
            Improper waste segregation makes recycling difficult and increases environmental pollution. People often struggle to identify the correct category and disposal method for everyday waste. EcoVision AI aims to simplify this process using image classification and smart disposal recommendations.
          </p>
        </div>

        {/* AI Technologies */}
        <div>
          <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-lg">
            <Brain className="w-5 h-5 text-emerald-700" />
            AI &amp; Software Technologies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: Brain, label: "Machine Learning" },
              { icon: Eye, label: "Computer Vision" },
              { icon: Image, label: "Image Classification" },
              { icon: Cpu, label: "TensorFlow.js" },
              { icon: Globe, label: "Google Teachable Machine" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl px-3.5 py-3"
              >
                <Icon className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full Stack Summary Table */}
        <div>
          <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-lg">
            <Code className="w-5 h-5 text-emerald-700" />
            Application Architecture Stack
          </h2>
          <div className="overflow-x-auto border border-emerald-100 rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="text-left py-3 px-4 font-bold text-emerald-950">Layer</th>
                  <th className="text-left py-3 px-4 font-bold text-emerald-950">Technology Used</th>
                  <th className="text-left py-3 px-4 font-bold text-emerald-950">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50 text-slate-700">
                {[
                  ["Frontend UI", "React.js + Vite", "Fast, component-driven web interface"],
                  ["Styling", "Tailwind CSS", "Responsive green & white startup design"],
                  ["Model Training", "Google Teachable Machine", "Transfer-learning CNN (MobileNet) on 4 waste classes"],
                  ["In-Browser Inference", "TensorFlow.js", "Runs predictions locally without backend upload"],
                  ["Analytics Charts", "Recharts", "Interactive pie, bar & daily/weekly charts"],
                  ["Icons", "Lucide React", "Consistent environmental & UI iconography"],
                  ["Persistence", "Browser localStorage", "Stores thumbnail history & disposal confirmations"],
                ].map(([layer, tech, purpose]) => (
                  <tr key={layer} className="hover:bg-emerald-50/30">
                    <td className="py-2.5 px-4 font-semibold text-slate-900">{layer}</td>
                    <td className="py-2.5 px-4">{tech}</td>
                    <td className="py-2.5 px-4 text-slate-600">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* System Workflow */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-xs">
        <h2 className="font-bold text-slate-900 mb-5 text-lg">
          End-to-End AI Workflow (Viva Reference)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { step: "01", title: "Input Image", desc: "User uploads photo or captures webcam frame." },
            { step: "02", title: "Preprocessing", desc: "Image is cropped & normalized to 224×224 pixels." },
            { step: "03", title: "CNN Inference", desc: "TensorFlow.js computes probabilities across 4 classes." },
            { step: "04", title: "Smart Guidance", desc: "Recommends bin, cleanup steps & reuse tips." },
            { step: "05", title: "Impact Tracking", desc: "Saves to localStorage & tracks confirmed disposal." },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#F9FCFA] border border-emerald-100 rounded-2xl p-4"
            >
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                Step {item.step}
              </span>
              <h3 className="font-bold text-slate-900 text-sm mt-2">{item.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Development Goals */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-xs">
        <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
          <Globe className="w-5 h-5 text-emerald-700" />
          Alignment with UN Sustainable Development Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SDG_GOALS.map((goal) => (
            <div
              key={goal.number}
              className="rounded-2xl p-5 border border-slate-200 flex flex-col gap-3"
              style={{ backgroundColor: `${goal.color}12` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold shrink-0"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.number}
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  SDG {goal.number}: {goal.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {goal.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Viva Key Highlights */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-300" />
          CBSE AI Viva-Voce Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-100/90">
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="font-bold text-white mb-1">Why Transfer Learning (Teachable Machine)?</p>
            <p className="text-xs leading-relaxed">
              Teachable Machine uses MobileNet pretrained on ImageNet and retrains the final classification layer on our 4 waste categories, achieving high accuracy even with 50–100 photos per class.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="font-bold text-white mb-1">Why Client-Side Inference (TensorFlow.js)?</p>
            <p className="text-xs leading-relaxed">
              Predictions execute directly inside the browser using WebGL acceleration. This removes server hosting costs, keeps user photos private, and provides instant feedback.
            </p>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-slate-800 mb-3 text-sm">Official Documentation &amp; References</h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "Google Teachable Machine", url: "https://teachablemachine.withgoogle.com/" },
            { label: "TensorFlow.js", url: "https://www.tensorflow.org/js" },
            { label: "UN Sustainable Development Goals", url: "https://sdgs.un.org/goals" },
          ].map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 px-4 py-2 rounded-xl text-xs font-semibold border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
