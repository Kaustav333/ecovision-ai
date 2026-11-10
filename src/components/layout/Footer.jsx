import { Link } from "react-router-dom";
import { Leaf, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 mt-auto border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="font-bold text-white text-base">EcoVision AI</span>
            </div>
            <p className="text-xs text-emerald-200/75 max-w-md">
              Class 12 CBSE Artificial Intelligence Practical Project — Computer Vision for Responsible Waste Segregation &amp; Sustainability.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-emerald-200/80">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/scanner" className="hover:text-white transition-colors">AI Scanner</Link>
            <Link to="/history" className="hover:text-white transition-colors">History</Link>
            <Link to="/impact" className="hover:text-white transition-colors">Impact Dashboard</Link>
            <Link to="/guide" className="hover:text-white transition-colors">Recycling Guide</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-300/70">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% browser-based inference &amp; localStorage — your images never leave your device.
          </p>
          <p>Aligned with UN SDGs 11, 12 &amp; 13</p>
        </div>
      </div>
    </footer>
  );
}
